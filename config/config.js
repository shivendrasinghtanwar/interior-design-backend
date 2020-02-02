const config = {
  cryptKey: process.env.CRYPTKEY,
  automationScriptUser: process.env.AUTOMATION_SCRIPT_USER,
  // mongoDb credentials
  mongo: {
    uri: process.env.MONGO_URI,
    database: process.env.MONGO_DB
  },
  // JWT secrets
  JWT: {
    login: process.env.JWT_LOGIN_KEY
  },
  serviceUrls: {
    lbWallet: process.env.WALLET_BASE_URL,
    lendboxPg: process.env.PG_BASE_URL,
    adminJava: process.env.ADMIN_JAVA_URL
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
  gupshup: {
    url: process.env.GUPSHUP_URL,
    params: {
      method: process.env.GUPSHUP_METHOD,
      userid: process.env.GUPSHUP_USER,
      password: process.env.GUPSHUP_PASSWORD,
      v: process.env.GUPSHUP_VERSION,
      msg_type: process.env.GUPSHUP_MSGTYPE,
      auth_scheme: process.env.GUPSHUP_AUTH,
      send_to: '',
      msg: ''
    }
  },
  verumviewCred: {
    url: process.env.VERUMVIEW_URL,
    secret: process.env.VERUMVIEW_SECRET,
    callbackUrl: process.env.VERUMVIEW_CB_URL
  },
  iciciCred: {
    url: process.env.ICICI_BASE_URL,
    user: process.env.ICICI_USER,
    password: process.env.ICICI_PASSWORD,
    headerSecret: process.env.ICICI_SECRET_KEY
  }
};

module.exports = config;
