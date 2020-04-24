const constants = {
  iciciTxnPath: '/transaction',
  referals: {
    zest: 'ZEST',
    bon: 'BON',
    micro: 'MICRO'
  },
  userActivatedDateForDisbursalSheet: '2019-12-21',
  LendboxStartDate: 1420070400000,
  emiChangeDate: 1567276200,
  registartionFee: 500,
  invFeeCheckBar: 200000,
  invBar: 100000,
  rcptType: 'payid',
  investorSort: {
    updated: 'UPDATED',
    created: 'CREATED'
  },
  products: {
    register: 'Registration Fees',
    emandate: 'e-Mandate',
    walletFund: 'Add funds',
    monthlyPull: 'Monthly Pull',
    investment: 'Investment Fees',
    invoice: 'Invoice Payment',
    emiPayment: 'Emi Payment'
  },
  proposalStatus: {
    accepted: 'Accepted',
    rejected: 'Rejected',
    pending: 'Pending',
    closed: 'Closed'
  },
  disbursementStatus: {
    disbursed: 'DISBURSED',
    notyet: 'NOTDISBURSED',
    signed: 'SIGNED',
    notSigned: 'NOTSIGNED'
  },
  proposalIO: {
    all: 'All',
    sent: 'Sent',
    received: 'Received',
    notIn: 'NOEXCHNG'
  },
  productFee: {
    register: 'REGISTER_FEE',
    addFund: 'ADD_FUND_FEE',
    investment: 'INVESTMENT_FEE',
    invoice: 'INVOICE_PAYMENT',
    emiPayment: 'EMI_PAYMENT_FEE'
  },
  pgFees: 18,
  pgConst: {
    np: 'not paid',
    p: 'paid',
    created: 'created'
  },
  lbDataTypes: [
    'TITLE', 'LOAN_PURPOSE', 'CITY', 'RESIDENCE_TYPE', 'MARITAL_STATUS',
    'HIGHEST_EDUCATION', 'PROFESSION', 'DESIGNATION_LEVEL', 'STATE',
    'USER_FLAG', 'APP_ROLE', 'UW_FLAG', 'UW_PENDENCIES', 'STATS_LOAN_DISBURSED'
  ],
  roles: {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER'
  },
  tokenAtAction: {
    login: 'LOGIN',
    logout: 'LOGOUT',
    verifyemail: 'VERIFYEMAIL',
    verifyotp: 'VERIFYOTP'
  },
  accType: ['SAVINGS', 'CURRENT'],
  empType: ['SALARIED_EMP', 'SELF_EMP_BUSINESS', 'SELF_EMP_PROFESSIONAL'],
  bizType: ['PUB_LTD', 'PARTNERSHIP', 'SOLE_PROP', 'LLP', 'PVT_LTD', 'OTHER'],
  education: [44, 45, 46, 47, 48, 49, 50],
  userType: {
    investor: 'INVESTOR',
    borrower: 'BORROWER'
  },
  loanStatus: ['active', 'closed', 'overdue', 'prepaid'],
  userStatus: ['STEP_1', 'STEP_2', 'STEP_3', 'STEP_4', 'ACTIVE'],
  emailTypes: {
    1: 'verifyEmail',
    2: 'referralMail',
    3: 'amountIncreaseConfirmation',
    4: 'callBack',
    5: 'requestDemo',
    6: 'resetPassword',
    7: 'publiclinkagreement',
    8: 'otpEsignBorrowerForBorrower',
    9: 'otpEsignBorrowerForInvestor',
    10: 'otpEsignInvestor',
    11: 'receivedProposal',
    12: 'rejectProposal',
    13: 'updateProposal',
    14: 'reviseProposal',
    15: 'acceptProposal',
    16: 'investorMoneyDisbursed',
    17: 'disbursementReminder',
    18: 'otpEsignEmail'
  },
  awsEmails: {
    fromSupport: 'support@lendbox.in',
    fromNoreply: 'no-reply@lendbox.in',
    fromDisbursement: 'disbursement@lendbox.in'
  },
  referalSignup: {
    mobile: 'https://www.lendbox.in/signupInvestor?referralMobile=',
    email: 'https://www.lendbox.in/signupInvestor?referralEmail='
  },
  maritalStatuses: [40, 41, 42, 43],
  loanPurposes: [6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 129, 261, 273],
  relations: [281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292],
  incomeMode: ['BANK_CREDIT', 'CHEQUE', 'CASH'],
  title: ['Mr.', 'Ms.', '*'],
  otpTokenExpTime: '30min',
  mailTokenExpTime: '259200min',
  loginTokenExpTime: '43200min',
  agreementTokenExpTime: '259200min',
  rpTokenExpTime: '14400min',
  supportedFileFormats: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
  residenceTypes: [38, 39, 80, 94, 95, 95, 96, 97, 98],
  mendatoryDocs: {
    addProofAnyOne: ['MOBILE_BILL', 'GAS_BILL', 'LANDLINE_BILL', 'WATER_BILL', 'ELECTRICITY_BILL', 'RENT_AGREEMENT', 'OTHER'],
    others: ['BANK_STATEMENT', 'PAN', 'AADHAR'],
    salaried: ['SS1', 'SS2', 'SS3'],
    selfEmployed: ['BITR1']
  },
  docsMaxUploads: {
    MOBILE_BILL: 3,
    GAS_BILL: 3,
    LANDLINE_BILL: 3,
    WATER_BILL: 3,
    ELECTRICITY_BILL: 3,
    RENT_AGREEMENT: 3,
    BANK_STATEMENT: 10,
    PAN: 3,
    AADHAR: 6,
    SS1: 3,
    SS2: 3,
    SS3: 3,
    BITR1: 3,
    BITR2: 3,
    ITR: 3,
    PASSPORT: 6,
    VOTER_ID: 6,
    CHEQUE: 3,
    OTHER: 15
  },
  documentNames: {
    pan: 'PAN',
    photo: 'PHOTO',
    rentAggrement: 'RENT_AGREEMENT',
    aadhar: 'AADHAR',
    itr: 'ITR',
    salarySlip1: 'SS1',
    salarySlip2: 'SS2',
    salarySlip3: 'SS3',
    passPosrt: 'PASSPORT',
    bitr1: 'BITR1',
    bitr2: 'BITR2',
    electricityBill: 'ELECTRICITY_BILL',
    voterId: 'VOTER_ID',
    mobileBill: 'MOBILE_BILL',
    bankStmt: 'BANK_STATEMENT',
    cheque: 'CHEQUE',
    gasBill: 'GAS_BILL',
    landline: 'LANDLINE_BILL',
    waterBill: 'WATER_BILL',
    other: 'OTHER'
  },
  wallet: {
    tags: {
      all: 'all',
      emiTransfer: 'emi_transfer',
      disbursal: 'disbursal',
      manualWithdrawal: 'MANUAL_WITHDRAWAL',
    },
    txType: {
      all: 'all',
      credit: 'emi_transfer',
      debit: 'withdrawal'
    },
    investorTx: {
      tags: ['fund_deposit', 'disbursal', 'refund', 'all'],
      type: ['debit', 'credit', 'all']
    },
    pathUrls: {
      txn: 'tx', // both get and post method for creating and getting transactions.
      wallet: 'wallet', // both get and post methods for creating and getting wallets.
      settle: '/invoice/settle'
    },
    method: {
      create: 'post',
      getWallet: 'get'
    },
    types: ['user', 'investment', 'loan']
  },
  lbnUrls: {
    saveFcm: '/subscription/fcmtoken'
  },
  // Front-end Urls
  adminPathUrls: {
    withdrawalReq: 'web/wallet/withdrawalreq'
  },
  webPathUrls: {
    signAgreement: 'sign-agreements',
    publicSign: 'public-esign',
    lbPayments: 'lb-payments'
  },
  eSignReqType: {
    byBorrower: 'AGREEMENT_OTP_ESIGN_BORROWER',
    byInvestor: 'AGREEMENT_OTP_ESIGN_INVESTOR'
  },
  action: {
    accept: 'ACCEPT',
    reject: 'REJECT',
    negotiate: 'NEGOTIATE',
    revise: 'REVISE',
    send: 'SEND'
  },
  proposalMap: {
    borrower: {
      SHORT_TERM: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      TOPUP: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      P2P: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      HOMERGIZE: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      BOARD_INFINITY: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      ISERVEU: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      SMART_SCHOOL: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      MICRO: ['INDIVIDUAL', 'ALT_INVESTMENTS'],
      SAFEXPAY: ['INDIVIDUAL', 'ALT_INVESTMENTS']
    },
    investor: {
      INDIVIDUAL: ['SHORT_TERM', 'TOPUP', 'P2P', 'HOMERGIZE', 'BOARD_INFINITY', 'ISERVEU', 'SMART_SCHOOL', 'MICRO', 'SAFEXPAY'],
      ALT_INVESTMENTS: ['SHORT_TERM', 'TOPUP', 'P2P', 'HOMERGIZE', 'BOARD_INFINITY', 'ISERVEU', 'SMART_SCHOOL', 'MICRO', 'SAFEXPAY']
    }
  },
  resMsg: {
    OK:'OK',
    INVALID_EMAIL: 'Invalid email format.',
    CLIENT_STATUS_UPDATE_ERROR: 'Client status update failed!',
    INVALID_EMAIL_OR_MOBILE: 'Invalid email or mobile format.',
    INVALID_CLIENT_ID: 'Client Id is invalid!',
    DESIGN_QUOTATION_ALREADY_GENERATED: 'Design Quotation Already Generated for this user!',
    SIGNUP_ERROR: 'Signup error. Please try again.',
    DESIGN_QUOTATION_ERROR: 'Error while generating design quotation. Please try again.',
    REQ_FORM_ERROR: 'Error while filling requirement form. Please try again later.',
    ASSIGN_ADMIN_ERROR: 'Error while assigning. Please try again.',
    CLIENT_MET_SUCCESS: 'Client met updated successfully',
    CLIENT_MET_ERROR: 'Error while updating client met! Please try again.',
    RESP_SUCCESS: 'Response success',
    EMAIL_EXIST: 'Email already exist.',
    EMAIL_NOT_EXIST: 'Email does not exist.',
    MOBILE_EXIST: 'Mobile no. already exist.',
    EMAIL_MOBILE_EXIST: 'Email & Mobile no. already exist.',
    REQ_FORM_FILLED: 'Requirement Form Already Filled!',
    REQ_FORM_VERIFIED: 'Requirement Form Token Verified!',
    REQ_FORM_SUCCESS: 'Requirement Form Filled Successfully!',
    USER_NOT_FOUND: 'User not found.',
    INVALID_PAN: 'Invalid PAN number.',
    INVALID_FNAME: 'First name cannot be empty.',
    INVALID_LNAME: 'First name cannot be empty.',
    INVALID_FLNAME: 'First name or last name cannot be empty.',
    INVALID_FATHERSNAME: 'Fathers name cannot be empty.',
    INVALID_NOMINEENAME: 'Nominee name cannot be empty.',
    INVALID_REF_NAME: 'Invalid reference name.',
    PAN_NOT_FOUND: 'PAN details not found.',
    PAN_DOESNT_MATCH: 'Name as on PAN didn\'t match with your name.',
    INVALID_MOBILE: 'Invalid mobile number.',
    INVALID_ADD1: 'Stree 1 cannot be empty.',
    INVALID_ADD2: 'Street 2 cannot be empty.',
    INVALID_CITY: 'City cannot be empty.',
    INVALID_PIN: 'Invalid pincode.',
    PINCODE_NOT_FOUND: 'No records found for pincode.',
    INVALID_PASSWORD: 'Invalid Password.',
    INVALID_USERNAME: 'Invalid Username.',
    INVALID_USER_PASSWORD: 'Invalid username or password. Please try again.',
    INVALID_ACCOUNT: 'Invalid account number.',
    INVALID_ACCTYPE: 'Invalid account type.',
    INVALID_LOAN_STATUS: 'Invalid loan status.',
    INVALID_EMPTYPE: 'Invalid emplyment type.',
    INVALID_BIZTYPE: 'Invalid business type.',
    INVALID_MSTATUS: 'Invalid marital status.',
    INVALID_NOMREL: 'Invalid relationship.',
    INVALID_IFSC: 'Invalid IFSC code format.',
    INVALID_HOLDERNAME: 'Invalid account holder name.',
    LOGGED_IN: 'Loggedin successfully.',
    REGISTER_SUCCESS: 'Successfully Registered.',
    SUCCESSFULLY_ASSIGNED: 'Successfully Assigned.',
    OTP_SERVICE_DOWN: 'OTP service temporary unavailable.',
    SERVICE_DOWN: 'Service is temporarily down. Please come back later.',
    INVALID_OTP: 'Invalid OTP.',
    OTP_VERIFIED: 'OTP verified.',
    PROFILE_DATA: 'Profile Info.',
    PROFILE_UPDATED: 'Profile updated successfully.',
    BANK_INFO: 'Bank Info.',
    BANK_UPDATE: 'Bank details updated.',
    BANK_UPDATE_ERROR: 'For update bank details please contact support.',
    CANNOT_UPDATE_PROFILE: 'For update profile please contact support.',
    SIGNUP_2_3_ERROR: 'Something Went wrong while updating data. Please try again.',
    OTP_SENDING_ERROR: 'Error while sending OTP.',
    LOGOUT: 'Logged out successfully.',
    OTP_VALIDATION_ERROR: 'Oops. OTP verification failed.',
    OTP_SENT: 'OTP has been sent to your mobile.',
    UPLOAD_ALL_DOCS: 'Please upload all the documents.',
    UPLOAD_ADD_PROOF: 'Upload any one of address proof.',
    UPLOAD_KYC: 'Please upload all KYC docs.',
    UPLOAD_SALARY_SLIPS: 'Please upload latest 3 months salary slips',
    UPLOAD_BITR: 'Please upload latest bussiness ITR.',
    DOCS_SUBMITTED: 'Documents submitted for the approval.',
    INVALID_TOKEN: 'Authorization secret Invalid or Expired. Forbidden!',
    INVALID_SECRET: 'Invalid authorization secret.',
    MISSING_TOKEN: 'Did not receive authorization secret.',
    NOT_PERMITTED: 'Access denied!',
    MISSING_BORROWER_PROPOSAL: 'Missing borrower or proposal id.',
    ERROR_FILE_UPLOADING: 'Error in uploading file.',
    ONE_FILE: 'Please upload one file at a time.',
    UNSUPPORTED_FILE: 'Please upload PDF, JPG, JPEG or PNG files only.',
    FILE_SIZE_LIMIT: 'Max file size limit is 15mb.',
    INVALID_DOC: 'Invalid document type.',
    UPLOADED: ' uploaded successfully.',
    MAX_UPLOAD_ERR: ' : Maximum limit of upload has been reached! Contact support.',
    DOC_APPROVED: 'Document has been already approved.',
    UPLOAD_LATER: 'Uploading error. Please try after some time.',
    INVALID_DATE: 'Invalid Date format.',
    ABOVE_18: 'Age should be above 18 years.',
    PASSWORD_VALID: 'Password must be a combination of 8 alphanumeric and special characters.',
    PROFILE_FETCH_ERROR: 'Something went wrong while fetching profile data.',
    PROFILE_UPDATE_ERROR: 'Something went wrong while updating profile data.',
    BANK_ERROR: 'Error in updating bank details.',
    EMP_ERROR: 'Error in updating employment details.',
    INVITED: 'Thank you for your referral!',
    REFER_AFTER_ACTIVATION: 'Can\'t refer before activation.',
    INVESTMENT_INCREASED: 'Investment amount successfully updated.',
    INVESTMENT_UPDATE_ERROR: 'Investment amount must be greater than previous amount.',
    INVESTMENT_ERROR: 'Error in updating investment amount.',
    INVALID_TX: 'Invalid transaction type.',
    INVALID_TAG: 'Invalid tag.',
    WALLET_TXN: 'Transactions fetched successfully.',
    WALLET_BAL: 'Wallet balance.',
    WALLET_FETCH: 'Wallet fetch successfully',
    CALLBACK_MSG: 'Thank you! Your request has been successfully submitted.',
    E_MANDATE: 'Approve E-Mandate.',
    E_MANDATE_BANK_NOT_FOUND: 'Bank not found for E-Mandate.',
    EMANDATE_NOT_AVAILABLE: 'E-Mandate currently isn\'t available. Please contact support.',
    REQUEST_PRIME_ERROR: 'Prime application is not accepting. Please try after some time.',
    PRIME_INTERESTED_ERROR: 'Please choose a valid option',
    NOMINEE_INSERTED: 'Nominee details added successfully.',
    MIN_MAX_WALLET_BAL: 'Add funds between 1000 - 10 Lac.',
    TXN_NOT_AVAILABLE: 'Transactions are not available.',
    INVALID_WALLET_ID: 'Invalid Wallet Id.',
    FUND_TRANSFER_SUCCESSFUL: 'Fund transfer successful',
    OPERATION_NOT_SUPPORTED: 'Operation not supported for your account',
    BAL_NOT_FOUND: 'Wallet Balance not found.',
    TXN_NOT_FOUND: 'Wallet txs not found',
    WALLET_NOT_FOUND: 'Wallets not found.',
    TRANSFER_ERROR: 'Couldn\'t complete transfer! Something went wrong.',
    WENT_WRONG: 'Something went wrong.',
    PSWD_CHANGED: 'Password updated successfully.',
    MAIL_SENT: 'Mail sent, please check your mail.',
    FEE_PAID: 'Registration fee already paid.',
    REG_DATA: 'Registration Data',
    RES_SUCCESS: 'Result fetch successful',
    NO_PROP_FOUND: 'No Proposal Found.',
    NO_BOR_FOUND: 'No Borrower Found',
    NO_DISBURSEMENT_FOUND: 'No Disbursement Found',
    INVALID_PARAM: 'Invalid Parameters',
    MAX_PROPOSAL_LIMIT: 'Maximum proposal limit is INR',
    LOGIN_AGAIN: 'Please login to proceed.',
    TYPE_MISMATCH: 'Users can be either investors or borrowers',
    SIGN_MISMATCH: 'Agreement may have been signed already.',
    PENDING_BORROWER: 'Signature is pending from borrower',
    PROPOSAL_MISMATCH: 'Some proposal doesn\'t belong to user',
    ALREADY_SIGNED: 'Agreement already signed',
    AGREEMENTS: 'Download agreement.',
    AGREEMENT_SIGNED_SUCCESS: 'Agreement successfully signed.',
    NO_AGREEMENTS: 'No agreements found.',
    NOT_MORE_AGREEMENTS: 'Can\'t download more than 10 agreements.',
    INVALID_AGREEMENT: 'Invalid agreement selected.',
    ALREADY_SUBSCRIBED: 'You are already subscribed!',
    SUCCESS_SUBSCRIBE: 'You are successfully subscribed.',
    SUCCESS_UNSUBSCRIBE: 'You are successfully unsubscribed.',
    ALREADY_UNSUBSCRIBED: 'You are already unsubscribed.',
    NOT_SUBSCRIBED: 'You are not subscribed',
    NO_RECORD: 'No Record Found.',
    NA_PROP: 'Can\'t Send new proposal',
    SEND_SUCCESS: 'Proposal sent successfully',
    INVALID_ACTION: 'Invalid action passed.',
    REJECTED: 'Proposal rejected',
    INVALID_PROP_ACTIVITY: 'Invalid proposal activity',
    ACCEPTED: 'Proposal accepted',
    AMT_OR_ROI: 'Amount or ROI violation.',
    INVALID_PROPOSAL_STATE: 'Proposal state invalid.',
    INVALID_USERID: 'User Id invalid for proposal action.',
    PROP_ACC_TXN_FAILED: 'Accepting proposal transaction failed.',
    PREF_SAVED: 'Preference(s) successfully saved.',
    INV_AMT_INC: 'Please increase your investment amount.',
    PAY_FEE: 'Please pay your investment fees.',
    DECL_ACCEPTED: 'Declaration accepted.',
    INVALID_AMOUNT: 'Invalid amount passed.',
    PROP_NOT_FOUND: 'No relevant proposal found.',
    INVALID_PROP: 'Invalid proposal',
    EMAIL_A_VERIFIED: 'Email already verified',
    USER_NOT_DESIGNER: 'The selected user is not a Designer',
    USER_NOT_TL: 'The selected user is not a Team Lead'
  }
};

module.exports = constants;
