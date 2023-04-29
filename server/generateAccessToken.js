const docusign = require("docusign-esign");
var restApi = docusign.ApiClient.RestApi;
var oAuth = docusign.ApiClient.OAuth;

var basePath = restApi.BasePath.DEMO;
var oAuthBasePath = oAuth.BasePath.DEMO;

const integratorKeyAuthCode = process.env.IK;
const clientSecret = process.env.SECRET;

const axios = require("axios");

async function generateAccessToken(refreshToken) {
  try {
    const base64IKCK = Buffer.from(
      integratorKeyAuthCode + ":" + clientSecret
    ).toString("base64");
    console.log("base?", base64IKCK);
    console.log(refreshToken);
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
    console.log(response.data);
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
