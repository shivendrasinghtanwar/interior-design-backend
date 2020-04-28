const config = {
  cryptKey: process.env.CRYPTKEY,
  automationScriptUser: process.env.AUTOMATION_SCRIPT_USER,
  // JWT secrets
  JWT: {
    login: process.env.JWT_LOGIN_KEY
  },
  awsSes: {
    host: process.env.AWS_SES_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.AWS_SES_ACCESS_KEY,
      pass: process.env.AWS_SES_ACCESS_PWD
    }
  },
  // mySql credentials.
  mySql: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    db: process.env.MYSQL_DB,
  },
  s3Config: {
    staticUrl: process.env.S3_URL,
    awsSecreatKey: process.env.AWS_SECRET_KEY,
    awsAccessId: process.env.AWS_ACCESS_ID,
    bucket: process.env.BUCKET,
    disbursalDir: process.env.DISBURSAL_DIR,
    withdrawalReqDir: process.env.WITHDRAWAL_REQ_DIR,
    emiDir: process.env.EMI_DIR
  },
  razorpay: {
    baseUrl: process.env.RAZORPAY_URL,
    secret: process.env.RAZORPAY_WEBHOOK_SECRET,
    username: process.env.RAZORPAY_USERNAME,
    password: process.env.RAZORPAY_PASSWORD
  },
};

module.exports = config;
