import json
import boto3
import verify_token

client = boto3.client('apigatewaymanagementapi', endpoint_url="https://71wzcbif8b.execute-api.us-east-1.amazonaws.com/dev")
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    print(event)
    connectionId=event['requestContext']['connectionId']
    body = json.loads(event['body'])
    
    token = body['message']
    claims = verify_token.verify_token(token)
    if claims is None:
        return {'statusCode': 400, 'body': json.dumps('Token verification failed.')}
    user_email = claims['email']
    
    table = dynamodb.Table('connections')
    table.put_item(
        Item={
            'connectionId': connectionId,
            'user': user_email
        }
    )
    
    return {
        'statusCode': 200
    }
