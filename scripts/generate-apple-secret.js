const jwt = require("jsonwebtoken");
const fs = require("fs");

// Apple Sign-In JWT Secret Generator
// Replace these values with your actual Apple Developer credentials

const TEAM_ID = "YOUR_TEAM_ID"; // Found in Apple Developer Account → Membership
const KEY_ID = "YOUR_KEY_ID"; // The 10-character Key ID from Step 4
const CLIENT_ID = "com.restor3.web"; // Your Service ID
const PRIVATE_KEY_PATH = "./path/to/your/AuthKey_XXXXXXXXXX.p8"; // Path to your .p8 file

// Read the private key
const privateKey = fs.readFileSync(PRIVATE_KEY_PATH);

// Create the JWT payload
const payload = {
  iss: TEAM_ID,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 86400 * 180, // 6 months
  aud: "https://appleid.apple.com",
  sub: CLIENT_ID,
};

// Create the JWT header
const header = {
  alg: "ES256",
  kid: KEY_ID,
};

// Generate the JWT token
const clientSecret = jwt.sign(payload, privateKey, {
  algorithm: "ES256",
  header,
});

console.log("Apple Client Secret (JWT Token):");
console.log(clientSecret);
console.log("\nAdd this to your .env.local file as APPLE_CLIENT_SECRET");
