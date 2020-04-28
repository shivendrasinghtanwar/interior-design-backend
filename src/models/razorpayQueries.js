class RazorpayQueries {
  // sql queries
  saveEmandateCustomer(data) {
    const query = `INSERT INTO razorpay_customers (user_id, customer_id, email, contact) VALUES (${data.userId}, '${data.custId}', '${data.email}', '${data.contact}');`;
    return query;
  }

  getOrderInfo(orderId) {
    const query = `SELECT product_info AS productInfo FROM razorpay_orders WHERE order_id = '${orderId}';`;
    return query;
  }

  saveEmandateOrders(data) {
    const query = `INSERT INTO razorpay_orders (loan_id, user_id, order_id, receipt_id, amount, currency, method, status, attempts) VALUES
    (${data.loanId}, ${data.userId}, '${data.orderId}', '${data.receipt}', ${data.amount}, '${data.currency}', '${data.method}', '${data.status}', ${data.attempts});`;
    return query;
  }

  getPendingEmandateOrder(loanId) {
    const query = `SELECT * FROM razorpay_orders WHERE loan_id = '${loanId}' AND status IN ('created', 'paid') AND method = 'emandate';`;
    return query;
  }

  getUserMandateInfo(loanId) {
    const query = `SELECT CONCAT(u.first_name, ' ', u.last_name) AS name, u.username AS email, u.mobile AS contact, u.id AS userId
    FROM loan l
    LEFT JOIN user u ON u.id = l.user_id
    LEFT JOIN user_account_details uad ON uad.user_id = l.user_id
    WHERE l.id = ${loanId}`;
    return query;
  }

  getMandateUser(userId) {
    const query = `SELECT user_id AS userId, customer_id AS id, email, contact FROM razorpay_customers WHERE user_id = ${userId};`;
    return query;
  }

  updateOrderData(data) {
    const query = `UPDATE razorpay_orders SET status = '${data.status}', attempts = ${data.attempts} 
    WHERE order_id = '${data.orderId}' OR receipt_id = '${data.receiptId}'`;
    return query;
  }

  getUserData(loanId) {
    const query = `SELECT l.user_id AS userId, rc.customer_id AS customerId, rc.email, rc.contact
    FROM loan l  LEFT JOIN razorpay_customers rc ON rc.user_id = l.user_id
    WHERE l.id = ${loanId};`;
    return query;
  }

  getMandatePullFees() {
    const query = "SELECT data_value AS charge FROM master_data WHERE data_type = 'MANDATE_PULL_FEE'";
    return query;
  }

  saveOrderData(data) {
    const query = `INSERT INTO razorpay_payments SET client_id = ${data.clientId}, order_id = '${data.orderId}', receipt='${data.receipt}',amount = ${data.amount},
    product_info = '${(JSON.parse(data.notes)).productInfo}',  attempts = ${data.attempts}, order_status = '${data.status}'`;
    console.log(query);
    return query;
  }

  updateOrderStatus(data) {
    return `UPDATE razorpay_orders SET status='${data.status}' WHERE order_id='${data.orderId}'`;
  }

  getToken(loanId) {
    const query = `SELECT rt.token_id AS tokenId FROM user_management.razorpay_tokens rt
    LEFT JOIN user_management.razorpay_payments rp ON rp.token_id = rt.token_id
    LEFT JOIN user_management.razorpay_orders ro ON rp.order_id = ro.order_id
    WHERE (ro.loan_id = '${loanId}') AND (ro.status = 'paid') AND (rt.status = 'confirmed')`;
    return query;
  }

  updateTokenData(data) {
    const query = `INSERT INTO razorpay_tokens (account_id, token_id, token, bank, method, recurring, auth_type, status, failure_reason, wallet, mrn, used_at, max_amount)
    VALUES ('${data.accId}', '${data.tokenId}', '${data.token}', '${data.bank}', '${data.method}', '${data.recurring}', '${data.authType}', '${data.status}',
    '${data.failReason}', '${data.wallet}', '${data.mrn}', '${data.usedAt}', ${data.maxAmount}) ON DUPLICATE KEY UPDATE account_id = '${data.accId}', token_id = '${data.tokenId}',
    token = '${data.token}', bank = '${data.bank}', method = '${data.method}', recurring = '${data.recurring}', auth_type = '${data.authType}', status = '${data.status}',
    failure_reason = '${data.failReason}', wallet = '${data.wallet}', mrn = '${data.mrn}', used_at = '${data.usedAt}', max_amount = ${data.maxAmount}`;
    return query;
  }

  updatePaymentData(data) {
    let tokenStr = '';
    let updateTokenStr = '';
    if (data.tokenId) {
      tokenStr = `token_id = '${data.tokenId}',`;
      updateTokenStr = `token_id = IF( status <> 'captured', '${data.tokenId}', token_id),`;
    }
    const query = `INSERT INTO razorpay_payments SET account_id = '${data.accountId}', payment_id = '${data.id}', order_id= '${data.orderId}', 
    amount = ${data.amount}, status = '${data.status}', currency = '${data.currency}', method = '${data.method}', description = '${data.description}',
    amount_refunded = ${data.amountRefunded}, refund_status = '${data.refundStatus}', ${tokenStr}
    card_id= '${data.cardId}', bank = '${data.bank}', wallet = '${data.wallet}', vpa = '${data.vpa}', fee = ${data.fee}, tax = ${data.tax}, 
    notes = '${data.notes}', error_code = '${data.errorCode}', error_description = '${data.errorDescription}', captured = '${data.captured}' 
    ON DUPLICATE KEY UPDATE 
    amount_refunded = IF( status <> 'captured', ${data.amountRefunded}, amount_refunded), refund_status = IF( status <> 'captured', '${data.refundStatus}',
    refund_status), captured = IF( status <> 'captured', '${data.captured}', captured), description = IF( status <> 'captured', '${data.description}',
    description), error_code = IF( status <> 'captured', '${data.errorCode}', error_code), error_description = IF( status <> 'captured', '${data.errorDescription}',
    error_description), fee = IF( status <> 'captured', '${data.fee}', fee), ${updateTokenStr}
    tax = IF( status <> 'captured', '${data.tax}', tax), status = IF( status <> 'captured', '${data.status}', status)`;
    return query;
  }

  updateTokenApi(data) {
    const query = `INSERT INTO razorpay_tokens SET token = '${data.token}', bank = '${data.bank}', wallet = '${data.wallet}', method = '${data.method}', recurring = '${data.recurring}',
    status = '${data.status}', failure_reason = '${data.failureReason}', auth_type = '${data.authType}', mrn = '${data.mrn}', token_id='${data.id}'
    ON DUPLICATE KEY UPDATE 
    bank = '${data.bank}', wallet = '${data.wallet}', method = '${data.method}', recurring = '${data.recurring}',
    status = '${data.status}', failure_reason = '${data.failureReason}', auth_type = '${data.authType}', mrn = '${data.mrn}', token_id='${data.id}';`;
    return query;
  }

  updateOrderApi(data) {
    const query = `update user_management.razorpay_orders set attempts = IF(status <> 'paid', ${data.attempts}, attempts), status = IF(status <> 'paid', '${data.status}', status)
    where order_id = '${data.orderId}';`;
    return query;
  }

  updatePaymentApi(data) {
    let updateTokenStr = '';
    let tokenStr = '';
    if (data.tokenId) {
      tokenStr = `token_id = '${data.tokenId}',`;
      updateTokenStr = `token_id = IF( ((status <> 'captured') OR (token_id IS NULL) OR (token_id <> '${data.tokenId}')), '${data.tokenId}', token_id),`;
    }
    const query = `INSERT INTO razorpay_payments SET payment_id = '${data.paymentId}', amount = ${data.amount}, currency = 'INR', status = '${data.status}', order_id = '${data.orderId}',
    method = '${data.method}', amount_refunded = ${data.amountRefunded}, captured = '${data.captured}', description = '${data.description}', card_id = '${data.cardId}', bank = '${data.bank}',
    wallet = '${data.wallet}', vpa = '${data.vpa}', notes = '${data.notes}', fee = ${data.fee}, tax = ${data.tax}, error_code = '${data.errorCode}', ${tokenStr}
    error_description = '${data.errorDescription}'
    ON DUPlICATE KEY UPDATE amount_refunded = IF( status <> 'captured', ${data.amountRefunded}, amount_refunded), refund_status = IF( status <> 'captured',
    '${data.refundStatus}', refund_status), captured = IF( status <> 'captured', '${data.captured}', captured), description = IF( status <> 'captured', '${data.description}',
    description), error_code = IF( status <> 'captured', '${data.errorCode}', error_code), error_description = IF( status <> 'captured', '${data.errorDescription}',
    error_description), fee = IF( status <> 'captured', '${data.fee}', fee), ${updateTokenStr} tax = IF( status <> 'captured', '${data.tax}', tax),
    status = IF( status <> 'captured', '${data.status}', status)`;
    return query;
  }

  fetchCustomerId(orderId) {
    const query = `select rc.customer_id AS customerId from user_management.razorpay_customers rc
    LEFT JOIN  user_management.razorpay_orders ro ON ro.user_id = rc.user_id
    Where ro.order_id = '${orderId}';`;
    return query;
  }

  getUserIdFromOrderId(orderId) {
    const query = `SELECT ro.user_id AS userId, ro.product_info AS productInfo, ro.destination_wallet_id AS recipientId,
    (SELECT id FROM wallet w WHERE w.user_id = (SELECT user_id FROM wallet where id = ro.destination_wallet_id) AND w.wallet_type = 'user') AS senderId
    FROM razorpay_orders ro WHERE ro.order_id = '${orderId}'`;
    return query;
  }

  getEmandateStatus(loanId) {
    const query = `SELECT ro.status AS orderStatus, rt.failure_reason AS failureReason, rp.status AS payStatus, rt.status AS status FROM razorpay_orders ro 
    LEFT JOIN razorpay_payments rp ON ro.order_id = rp.order_id
    LEFT JOIN razorpay_tokens rt ON rp.token_id = rt.token_id
    WHERE ro.loan_id = ${loanId} AND ro.method='emandate' ORDER BY ro.created DESC LIMIT 1;`;
    return query;
  }

  getFees() {
    const query = 'SELECT data_type AS feesType, data_value AS fees FROM master_data WHERE parent_data_type = "FEES"';
    return query;
  }

  getWalletTxnId(orderId) {
    const query = `SELECT wallet_txn_id AS txId, lb_wallet_txn_id AS lbTxnId FROM razorpay_payments WHERE order_id = '${orderId}'`;
    return query;
  }

  updateWalletTxnStatus(data) {
    const query = `UPDATE razorpay_payments SET wallet_txn_id = '${data.walletTxnId}', lb_wallet_txn_id = '${data.lbWalletTxnId}' WHERE order_id = '${data.orderId}'`;
    return query;
  }
}

module.exports = new RazorpayQueries();
