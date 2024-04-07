import json
import requests
import boto3
from jose import jwt, jwk
from jose.utils import base64url_decode
from boto3.dynamodb.conditions import Key

# Initialize the DynamoDB
dynamodb = boto3.resource('dynamodb')
client = boto3.client('cognito-idp')

def lambda_handler(event, context):
    user_pool_id = 'us-east-1_WC5D1U2CZ'
    region = 'us-east-1'
    app_client_id = '25ir8q2ji7jt9abs11ulpvlrqi'
    print("headers", json.dumps(event))
    token = event['headers']['Authorization']
    public_key = get_public_key(token, user_pool_id, region)
    if public_key is None:
        return {'statusCode': 400,'headers': {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*" 
        }, 'body': json.dumps('Public key not found in JWKS.')}

    claims = verify_token(token, public_key, app_client_id)
    if claims is None:
        return {'statusCode': 400,'headers': {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*" 
        }, 'body': json.dumps('Token verification failed.')}

    user_email = claims['email']
    friends_list = get_friends_list(user_email)
    friends_details = get_friends_details(friends_list, user_email)

    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*" 
        },
        'body': json.dumps(friends_details)
    }

def get_public_key(token, user_pool_id, region):
    jwks_url = f'https://cognito-idp.{region}.amazonaws.com/{user_pool_id}/.well-known/jwks.json'
    try:
        jwks = requests.get(jwks_url).json()
    except requests.RequestException as e:
        print(f"Error fetching JWKS: {e}")
        return None
    
    kid = jwt.get_unverified_headers(token)['kid']
    key = next((key for key in jwks['keys'] if key['kid'] == kid), None)
    return jwk.construct(key) if key else None

def verify_token(token, public_key, app_client_id):
    message, encoded_signature = token.rsplit('.', 1)
    decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))
    
    if not public_key.verify(message.encode("utf8"), decoded_signature):
        print("Signature verification failed.")
        return None
    
    return jwt.decode(token, public_key, algorithms=['RS256'], audience=app_client_id)

def get_friends_list(user_email):
    table = dynamodb.Table('friendlist')
    response = table.query(KeyConditionExpression=Key('user').eq(user_email))
    return response['Items'][0]['friends'] if response['Items'] else []

def get_friends_details(friends_list, user_email):
    table = dynamodb.Table('user-details')
    friends_details = {}
    for email in friends_list:
        response = table.get_item(Key={'user': email})
        user_details = response.get('Item', {}).get('details', {})
        cognitoAttr = client.admin_get_user(
            UserPoolId='us-east-1_WC5D1U2CZ',
            Username=email
        )['UserAttributes']
        attr_dict = {d["Name"]: d["Value"] for d in cognitoAttr}
        user_details['attr'] = attr_dict
        first, second = sort_strings(user_email, email)
        user_details['last_message_details'] = get_last_message_details(first + '_' + second)
        friends_details[email] = user_details
    return friends_details
    
def sort_strings(str1, str2):
    if str1 < str2:
        return str1, str2
    else:
        return str2, str1

def get_last_message_details(chat_id):
    table = dynamodb.Table('chats')
    response = table.get_item(Key={'chat_id': chat_id})
    chats = response.get('Item', {}).get('messages', [])
    return chats[-1]