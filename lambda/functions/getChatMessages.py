import json
import verify_token
import boto3

dynamodb = boto3.resource('dynamodb')

def sort_strings(str1, str2):
    if str1 < str2:
        return str1, str2
    else:
        return str2, str1

def lambda_handler(event, context):
    token = event['headers']['Authorization']
    print(event)
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
    friend_email = event['queryStringParameters']['email']
    
    first_email, second_email = sort_strings(friend_email, user_email)
    
    chat_id = first_email + "_" + second_email 
    
    table = dynamodb.Table('chats')
    try:
        response = table.get_item(Key={'chat_id': chat_id})
        chats = response.get('Item', {}).get('messages', [])
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            },
            'body': json.dumps(chats)
        }
    except Exception as e:
        print("exc", e)
        return {
            'statusCode': 400,
            'body': json.dumps({
                "message": str(e)
            })
        }
