import json

def lambda_handler(event, context):
    print(event)
    
    connectionId = event['requestContext']['connectionId']
    

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps(connectionId)
    }
