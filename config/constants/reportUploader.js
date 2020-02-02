const constants = {
  supportedFileFormats: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
  documentNames: {
    lbReport: 'LB_REPORT',
    nachtxnReport: 'NACH_TXN_REPORT',
    nachRegReport: 'NACH_REG_REPORT',
    lbIcici: 'ICICI_VAC'
  },
  fileType: {
    ADD_FUND_SHEET: 'ADD_FUND_SHEET',
    DISBURSAL_USER_ID_SHEET: 'DISBURSAL_USER_ID_SHEET',
    NACH_REGISTRATION_REPORT: 'NACH_REGISTRATION_REPORT',
    DISBURSAL_ACKNOWLEDGEMNET_REPORT: 'DISBURSAL_ACKNOWLEDGEMNET_REPORT',
    NACH_TXN_REPORT: 'NACH_TXN_REPORT',
    BULK_RM_UPLOAD: 'BULK_RM_UPLOAD',
    BULK_USER_ACTIVATION: 'BULK_USER_ACTIVATION',
    UPDATE_ICICI_TX: 'UPDATE_ICICI_TX'
  },
  resMsg: {
    INVALID_DOC: 'UPLOADED_DOCUMENT_INVALID'
  },
  reportErrorMsg: {
    FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
    NO_ELIGIBLE_INVESTOR_FOUND_FOR_DISBURSAL: 'Associated Investors have Insufficient amount in wallet.',
    INVALID_DATA_IN_SHEET: 'Data is not valid in the sheet uploaded.',
    INVALID_LOAN_ID_IN_SHEET: 'Loan id is not valid in the sheet uploaded.',
    USER_ID_LOAN_ID_MISMATCH_IN_SHEET: 'User id and Loan id mismatch in the sheet uploaded.',
    INVALID_DISBURSAL_DATE_IN_SHEET: 'Disbursal Date is not valid in the sheet uploaded.',
    INVALID_TXN_DATE_IN_SHEET: 'Txn Date is not valid in the sheet uploaded.',
    INVALID_EMI_DATE_IN_SHEET: 'EMI Date is not valid in the sheet uploaded.',
    EMI_DATE_NOT_PRESENT_IN_SHEET: 'EMI Date is not present in the sheet uploaded.',
    PROBLEM_IN_TXN_REFUNDED: 'Problem occured while soft transfer, Refunded Back!',
    INV_ID_NOT_SECURED: 'Loan Id is secure for this user but investment id is not secured.',
    ALREADY_FUNDED_ADDED_FOR_TXN: 'Funds already added for this txn id.',
    ERROR_WHILE_ADDING_FUND: 'Some Error Occured while adding funds in wallet.',
    UNSUPPORTED_LOAN_TYPE: 'Unsupported Loan Type'
  },
  secureLoans: ['BOARD_INFINITY', 'HOMERGIZE', 'ISERVEU', 'MAHAGRAM', 'SMART_SCHOOL', 'SAFEXPAY'],
  normalLoans: ['P2P', 'SHORT_TERM', 'TOPUP'],
  restrictedLoans: ['MICRO', 'ZEST', 'BON']
};

module.exports = constants;
