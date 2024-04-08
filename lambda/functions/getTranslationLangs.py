import json
import verify_token
import boto3

translate = boto3.client('translate')

def lambda_handler(event, context):
    token = event['headers']['Authorization']
    print(event)
    claims = verify_token.verify_token(token)
    if claims is None:
        return {'statusCode': 400,'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            }, 'body': json.dumps('Token verification failed.')}

    response = translate.list_languages()

    return {
        'statusCode': 200,
        'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            },
        'body': json.dumps(response)
    }
