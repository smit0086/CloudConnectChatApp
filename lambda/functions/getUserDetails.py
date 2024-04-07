import os
import json
import verify_token
import boto3

dynamodb = boto3.resource('dynamodb')
client = boto3.client('cognito-idp')
def lambda_handler(event, context):
    # TODO implement
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
    table = dynamodb.Table('user-details')
    response = table.get_item(Key={'user': user_email})
    user_details = response.get('Item', {}).get('details', {})
    user_pool_id = os.environ['USER_POOL_ID']
    print("user_pool_id: ", user_pool_id)
    cognitoAttr = client.admin_get_user(
            UserPoolId=user_pool_id,
            Username=user_email
        )['UserAttributes']
    attr_dict = {d["Name"]: d["Value"] for d in cognitoAttr}
    user_details['attr'] = attr_dict
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*" 
        },
        'body': json.dumps(user_details)
    }
