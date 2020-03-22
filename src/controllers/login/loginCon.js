const { getAdminByMobileOrEmail, getUserRoles, updateLoginTime } = require('../../models/basicQueries');
const { execSql } = require('../../models/sqlGetResult');
const { generateToken } = require('../../middlewares/jwt');
const {
  resMsg
} = require('../../../config/constants/constant');

class Login {
  async loginByPassword(reqData) {
    const [user] = await execSql(getAdminByMobileOrEmail(reqData));
    if (!user) {
      return {
        httpStatus: 400, body: { success: false, msg: resMsg.INVALID_USER_PASSWORD, data: {} }
      };
    }
    const roles = await execSql(getUserRoles(user.id));
    user.role = roles.map(x => x.roles);
    console.log(user);
    execSql(updateLoginTime(user.id));
    const tokenData = {
      id: user.id,
      status: user.status,
      type: user.type,
      role: user.role
    };
    const jwt = await generateToken(tokenData, '5000min');
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: resMsg.LOGGED_IN,
        data: {
          profileInfo: user, token: jwt
        }
      }
    };
  }
}
module.exports = new Login();
