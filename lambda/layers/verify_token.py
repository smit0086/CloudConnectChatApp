import requests
from jose import jwt, jwk
from jose.utils import base64url_decode

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

def verify_token(token):
    user_pool_id='us-east-1_WC5D1U2CZ'
    app_client_id='25ir8q2ji7jt9abs11ulpvlrqi'
    region='us-east-1'
    public_key = get_public_key(token, user_pool_id, region)
    message, encoded_signature = token.rsplit('.', 1)
    decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))
    
    if not public_key.verify(message.encode("utf8"), decoded_signature):
        print("Signature verification failed.")
        return None
    
    return jwt.decode(token, public_key, algorithms=['RS256'], audience=app_client_id)
    