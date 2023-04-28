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
  }&redirect_uri=${"http://localhost:3000/dashboard"}`;
  res.json({ loginLink: loginLink });
});

router.post("/access-token", async (req, res) => {
  const { code } = req.body;
  // console.log(code);

  apiClient
    .generateAccessToken(integratorKeyAuthCode, clientSecret, code)
    .then(function (oAuthToken) {
      console.log(oAuthToken);

      apiClient
        .getUserInfo(oAuthToken.accessToken)
        .then(function (userInfo) {
          console.log("UserInfo: %j", userInfo.accounts[0].accountId);

          // parse first account's basePath
          // below code required for production, no effect in demo (same
          // domain)
          // apiClient.setBasePath(userInfo.accounts[0].baseUri + "/restapi");

          req.session.accountId = userInfo.accounts[0].accountId;
          req.session.refreshToken = oAuthToken.refreshToken;

          res.cookie("accessToken", oAuthToken.accessToken, {
            maxAge: oAuthToken.expiresIn * 60 * 1000, //in ms
          });
          res.json({ success: true });
        })
        .catch(function (err) {
          console.log(err);
          res.json({ error: err.message });
        });
    })
    .catch(function (err) {
      console.log(err);
      res.status(403).json({ error: err.message });
    });
});

// router.get("/envelope", (req, res) => {
//   eg004EnvelopeInfo.worker = async (args) => {
//     let dsApiClient = new docusign.ApiClient();
//     dsApiClient.setBasePath(args.basePath);
//     dsApiClient.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
//     let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
//       results = null;

//     // Call Envelopes::get
//     // Exceptions will be caught by the calling function
//     results = await envelopesApi.getEnvelope(
//       args.accountId,
//       args.envelopeId,
//       null
//     );
//     templates = await envelopesApi.listTemplates();
//     return results;
//   };
// });

module.exports = router;
