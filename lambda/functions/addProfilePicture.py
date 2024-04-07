import json
import uuid
import base64
import boto3
import verify_token
from requests_toolbelt.multipart import decoder

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # TODO implement
    print('headers', event['headers'])
    token = event['headers']['Authorization']
    claims = verify_token.verify_token(token)
    if claims is None:
        return {'statusCode': 400,
                'headers': {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                }, 
                'body': json.dumps('Token verification failed.')}
    user_email = claims['email']
    
    content_type = event['headers']['Content-Type'] if 'Content-Type' in event['headers'] else event['headers']['content-type']
    print(event)
    postdata = base64.b64decode(event['body'])

    request = {} # Save request here
    
    for part in decoder.MultipartDecoder(postdata, content_type).parts:
        decoded_header = part.headers[b'Content-Disposition'].decode('utf-8')
        key = get_key(decoded_header)
        request[key] = part.content

    print("req", request)
    image = request['image']
    filename = request['filename'].decode("utf-8")
    extension = get_file_extension(filename)
    bucket_name = 'smit0086-profile-pics'
    
    print("EXT", extension)
    
    generated_filename = str(uuid.uuid4()) + '.' + extension

    try:
        # Upload the image to S3
        response = s3.put_object(
            Bucket=bucket_name,
            Key=generated_filename,
            Body=image,
            ContentType=content_type
        )

        # Construct the image URL
        image_url = f'https://{bucket_name}.s3.amazonaws.com/{generated_filename}'
        table = dynamodb.Table('user-details')
        response = table.get_item(Key={'user': user_email})
        
        if 'Item' in response:
            item = response['Item']
            details = item.get('details', {})
            details['avatarURL'] = image_url
            table.update_item(
                Key={'user': user_email},
                UpdateExpression='SET details = :val',
                ExpressionAttributeValues={':val': details}
            )
            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                },
                'body': json.dumps({'message': 'Image uploaded successfully', 'imageUrl': image_url})
            }
        else:
            table.put_item(
                Item={
                    'user': user_email,
                    'details': {
                        'avatarURL': image_url
                    }
                }
            )
            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                },
                'body': json.dumps({'message': 'Image uploaded successfully', 'imageUrl': image_url})
            }
        
    except Exception as e:
        # Handle any errors
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            },
            'body': json.dumps({'message': 'Error uploading image', 'error': str(e)})
        }



def get_key(form_data):
    # 'form-data; name="birth_date"', 'content': b'2012-123'
    key = form_data.split(";")[1].split("=")[1].replace('"', '')
    return key
    
def get_file_extension(file_name):
    print("get_file_extension file_name", file_name)
    x = file_name.split(".")
    return x[-1]