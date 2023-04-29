require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const sessions = require("express-session");
const cors = require("cors");
const authRouter = require("./routes/auth.router");
const templateRouter = require("./routes/template.router");
const envelopeRouter = require("./routes/envelope.router");
var cookieParser = require("cookie-parser");
const verificationMiddleware = require("./middleware/verificationMiddleware");
app.use(cookieParser());
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: false },
    resave: false,
  })
);

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.use(verificationMiddleware);

//private routes
app.use("/template", templateRouter);
app.use("/envelope", envelopeRouter);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
