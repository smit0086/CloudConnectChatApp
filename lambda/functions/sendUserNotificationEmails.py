import json
import boto3

ses = boto3.client("ses", region_name="us-east-1")

def lambda_handler(event, context):
    # TODO implement
    print(event)
    message = json.loads(event['Records'][0]['Sns']['Message'])
    print(message)
    
    emailResponse = ses.send_email(
        Destination = {
            "ToAddresses": [
                message['to']
            ]
        },
        Message={
            "Body":{
                "Text": {
                    "Data": "You have received a new message from your friend " + message['from']
                }
            },
            "Subject": {
                "Data": "New message received"
            }
        },
        Source="smitpatel0045@gmail.com"
    )
    return {
        'statusCode': 200
    }
