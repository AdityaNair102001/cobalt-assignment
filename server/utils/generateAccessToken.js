const integratorKeyAuthCode = process.env.IK;
const clientSecret = process.env.SECRET;

const axios = require("axios");

async function generateAccessToken(refreshToken) {
  try {
    const base64IKCK = Buffer.from(
      integratorKeyAuthCode + ":" + clientSecret
    ).toString("base64");

    const response = await axios.post(
      "https://account-d.docusign.com/oauth/token",
      {
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
      {
        headers: {
          Authorization: "Basic " + base64IKCK,
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
    };
  } catch (error) {
    console.log(error.message);
    return;
  }
}

module.exports = generateAccessToken;
