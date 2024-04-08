import json
import verify_token
import boto3

dynamodb = boto3.resource('dynamodb')

def add_friend(user_email, friend_email):
    table = dynamodb.Table('friendlist')
    # Fetch the item from DynamoDB using the 'user' email
    response = table.get_item(Key={'user': user_email})
    if 'Item' in response:
        item = response['Item']
        # Check if the 'friend' email is already in the 'friends' list
        if friend_email in item.get('friends', []):
            # Friend email already exists, throw an error
            raise Exception("Email already exists in the user's friend list.")
        else:
            # Append the 'friend' email to the 'friends' list and update the item in DynamoDB
            updated_friends = item.get('friends', [])
            updated_friends.append(friend_email)
            table.update_item(
                Key={'user': user_email},
                UpdateExpression='SET friends = :val',
                ExpressionAttributeValues={':val': updated_friends}
            )
            return True
    else:
        table.put_item(
            Item={
                'user': user_email,
                'friends': [friend_email]
            }
        )
        return True


def lambda_handler(event, context):
    token = event['headers']['Authorization']
    print("event, ",event)
    claims = verify_token.verify_token(token)
    if claims is None:
        return {'statusCode': 400,'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            }, 'body': json.dumps('Token verification failed.')}

    user_email = claims['email']
    friend_email = json.loads(event['body'])['email']
    
    try:
        part1 = add_friend(user_email, friend_email)
        part2 = add_friend(friend_email, user_email)
        return {'statusCode': 200, 'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            }, 'body': json.dumps({"message": "Friend added successfully"})}
    except Exception as e:
        print(e)
        return {
            "statusCode": 400,
            'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            },
            "body": json.dumps({
                "message": str(e)
            })
        }