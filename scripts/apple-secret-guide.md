# Apple Sign-In Client Secret Generation Guide

## Option 1: Use Online JWT Generator (Easiest)

1. Go to [jwt.io](https://jwt.io/)
2. In the **Payload** section, enter:

```json
{
  "iss": "YOUR_TEAM_ID",
  "iat": 1640995200,
  "exp": 1672531200,
  "aud": "https://appleid.apple.com",
  "sub": "com.restor3.web"
}
```

3. In the **Verify Signature** section:

   - Algorithm: ES256
   - Copy your private key from the .p8 file
   - Enter your Key ID

4. Copy the generated JWT token

## Option 2: Use Node.js Script

1. Update the values in `scripts/generate-apple-secret.js`:

   - TEAM_ID: Your Apple Developer Team ID
   - KEY_ID: Your 10-character Key ID
   - CLIENT_ID: Your Service ID (com.restor3.web)
   - PRIVATE_KEY_PATH: Path to your .p8 file

2. Run the script:

```bash
node scripts/generate-apple-secret.js
```

## Option 3: Use Python Script

Create a Python script if you prefer:

```python
import jwt
import time

# Your Apple Developer credentials
TEAM_ID = "YOUR_TEAM_ID"
KEY_ID = "YOUR_KEY_ID"
CLIENT_ID = "com.restor3.web"
PRIVATE_KEY_PATH = "path/to/your/AuthKey_XXXXXXXXXX.p8"

# Read private key
with open(PRIVATE_KEY_PATH, 'r') as f:
    private_key = f.read()

# Create JWT payload
payload = {
    'iss': TEAM_ID,
    'iat': int(time.time()),
    'exp': int(time.time()) + (86400 * 180),  # 6 months
    'aud': 'https://appleid.apple.com',
    'sub': CLIENT_ID,
}

# Create JWT header
header = {
    'alg': 'ES256',
    'kid': KEY_ID,
}

# Generate JWT token
client_secret = jwt.encode(payload, private_key, algorithm='ES256', headers=header)
print(f"Apple Client Secret: {client_secret}")
```

## Important Notes:

1. **Team ID**: Found in Apple Developer Account → Membership
2. **Key ID**: The 10-character identifier from your private key
3. **Service ID**: The identifier you created for web authentication
4. **Private Key**: The .p8 file you downloaded (keep it secure!)
5. **Token Expiry**: Apple tokens expire after 6 months, so you'll need to regenerate them

## Update .env.local:

```bash
APPLE_CLIENT_ID=com.restor3.web
APPLE_CLIENT_SECRET=your_generated_jwt_token_here
```
