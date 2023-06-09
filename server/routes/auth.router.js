const express = require("express");
const router = express.Router();
require("dotenv").config();
const docusign = require("docusign-esign");
var restApi = docusign.ApiClient.RestApi;
var oAuth = docusign.ApiClient.OAuth;

var basePath = restApi.BasePath.DEMO;
var oAuthBasePath = oAuth.BasePath.DEMO;

const integratorKeyAuthCode = process.env.IK;
const clientSecret = process.env.SECRET;

const apiClient = new docusign.ApiClient({
  basePath: basePath,
  oAuthBasePath: oAuthBasePath,
});

router.get("/", (req, res) => {
  const loginLink = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=${"signature"}&client_id=${
    process.env.IK
  }&redirect_uri=${"http://localhost:3000/login"}`;
  res.json({ loginLink: loginLink });
});

router.post("/", async (req, res) => {
  const { code } = req.body;
  if (code) {
    try {
      const oAuthToken = await apiClient.generateAccessToken(
        integratorKeyAuthCode,
        clientSecret,
        code
      );

      const userInfo = await apiClient.getUserInfo(oAuthToken.accessToken);

      if (userInfo.accounts[0].accountId) {
        req.session.accountId = userInfo.accounts[0].accountId;
        req.session.refreshToken = oAuthToken.refreshToken;

        res.cookie("accessToken", oAuthToken.accessToken, {
          maxAge: oAuthToken.expiresIn * 60 * 1000, //in ms
        });
        res.status(200).json({
          success: true,
          name: userInfo.name,
          email: userInfo.email,
          message: "all tokens set",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({ success: false, message: "Please login again" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy;
  req.session = null;
  res.clearCookie("accessToken");
  res.clearCookie("connect.sid");
  res.end();
});

module.exports = router;
