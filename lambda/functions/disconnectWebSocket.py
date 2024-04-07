import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    print(event)
    connectionId=event['requestContext']['connectionId']

    table = dynamodb.Table('connections')
    table.delete_item(Key={
        'connectionId': connectionId
    })
    
    return {
        'statusCode': 200
    }
