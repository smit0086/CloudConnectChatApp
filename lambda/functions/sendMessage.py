import json
import os
import verify_token
import boto3
from boto3.dynamodb.conditions import Key
import uuid
from datetime import datetime, timezone

dynamodb = boto3.resource('dynamodb')
socket_address = os.environ['SOCKET_ADDRESS']
print("socket_address: ", socket_address)
client = boto3.client('apigatewaymanagementapi', endpoint_url=socket_address)
sns = boto3.client("sns")

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
            },'body': json.dumps('Token verification failed.')}
    
    user_email = claims['email']
    body = json.loads(event['body'])
    friend_email = body['to']
    message_body = body['message']
    
    first, second = sort_strings(user_email, friend_email)
    
    chat_id = first + "_" + second
    message = {
        "id":  str(uuid.uuid4()),
        "sentAt": str(datetime.now(timezone.utc)),
        "sender": user_email,
        "message": message_body
    }
    
    table = dynamodb.Table('chats')
    response = table.get_item(Key={'chat_id': chat_id})
    if 'Item' in response:
        item = response['Item']
        messages = item.get('messages', [])
        messages.append(message)
        table.update_item(
            Key={'chat_id': chat_id},
            UpdateExpression='SET messages = :val',
            ExpressionAttributeValues={':val': messages}
        )
        
    else:
        table.put_item(
            Item={
                'chat_id': chat_id,
                'messages': [message]
            }
        )
        
    connectionTable = dynamodb.Table('connections')
    responseUserConnections = connectionTable.query(
        IndexName='user-index',
        KeyConditionExpression=Key('user').eq(user_email)
    )
    responseFriendsConnections = connectionTable.query(
        IndexName='user-index',
        KeyConditionExpression=Key('user').eq(friend_email)
    )
    for userConnection in responseUserConnections['Items']:
        connection_id = userConnection['connectionId']
        client.post_to_connection(ConnectionId=connection_id, Data=json.dumps(message).encode('utf-8'))
    for friendConnection in responseFriendsConnections['Items']:
        connection_id = friendConnection['connectionId']
        client.post_to_connection(ConnectionId=connection_id, Data=json.dumps(message).encode('utf-8'))

    snsTopic = os.environ['SNS_TOPIC']
    snsResponse = sns.publish(
            TopicArn=snsTopic,
            Message=json.dumps({
                "to": friend_email,
                "from": user_email
            })
    )
    return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            },
            'body': json.dumps({
                "message": "Message sent"
            })
    }