const generateAccessToken = require("../utils/generateAccessToken");

async function verificationMiddleware(req, res, next) {
  if (
    !req.cookies.accessToken &&
    req.session.accountId &&
    req.session.refreshToken
  ) {
    // Renew access token
    const tokens = await generateAccessToken(req.session.refreshToken);

    if (tokens?.accessToken && tokens?.refreshToken) {
      req.cookies.accessToken = tokens.accessToken;
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: tokens.expiresIn * 60 * 1000, //in ms
      });
      req.session.refreshToken = tokens.refreshToken;
      return next();
    } else {
      return res
        .status(403)
        .json({ success: false, messsage: "Please login again" });
    }
  } else if (!req.session.accountId || !req.session.refreshToken) {
    return res
      .status(403)
      .json({ success: false, messsage: "Please login again" });
  }
  next();
}
module.exports = verificationMiddleware;
