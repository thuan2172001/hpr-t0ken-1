var User = require("../../../models/user");
const {TOKEN_SECRET} = process.env
// const { unauthorized } = require("../../../utils/response-utils");
// const { VerifyMessage } = require("../../../utils/crypto-utils");
// const { access } = require("fs-extra");
const jwt = require("jsonwebtoken");

// function findUserByUsername(username) {
//     return new Promise((resolve, reject) => {
//         User.findOne(
//             { username },
//             (err, userInDB) => {
//                 if (err) reject(err);
//                 resolve(userInDB);
//             },
//         );
//     });
// }

// const ByPassAuth = (req, res, next) => {
//     if (!CHECK_AUTH || CHECK_AUTH === 'false') {
//         const username = req.query.fakeUsername ? req.query.fakeUsername : 'superadmin@gmail.com';
//         findUserByUsername(username).then((userInfo) => {
//             req.userInfo = userInfo;
//             next();
//         });
//         return true;
//     }
//     return false;
// };

// const CheckAuth = (req, res, next) => {
//     try {
//         const authString = req.headers.authorization;
//         if (!authString || authString === '') {
//             if (ByPassAuth(req, res, next)) return;
//             res.json(unauthorized('AUTH.ERROR.NOT_LOGGED_IN'));
//             return;
//         }
//         const authInfo = JSON.parse(authString);
//         const unexpired = () => {
//             if (ByPassAuth(req, res, next)) return;
//             const expiredTime = new Date(authInfo.certificateInfo.timestamp);
//             expiredTime.setSeconds(
//                 expiredTime.getSeconds() + authInfo.certificateInfo.exp,
//             );
//             return new Date() < expiredTime;
//         };
//         if (!unexpired()) {
//             if (ByPassAuth(req, res, next)) return;
//             res.json(unauthorized('AUTH.ERROR.EXPIRED'));
//             return;
//         }
//         let isValid = false
//         if (req.method === 'GET') {
//             isValid = VerifyMessage(
//                 authInfo.signature,
//                 authInfo.certificateInfo,
//                 authInfo.publicKey
//             );
//         } else {
//             isValid = VerifyMessage(
//                 authInfo.signature,
//                 req.body,
//                 authInfo.publicKey
//             );
//         }

//         if (!isValid) {
//             if (ByPassAuth(req, res, next)) return;
//             return res.json(unauthorized('AUTH.ERROR.INVALID'));
//         }
//         findUserByUsername(authInfo.certificateInfo.username).then((userInfo) => {
//             if (!userInfo) {
//                 if (ByPassAuth(req, res, next)) return;

//                 return res.json(unauthorized('AUTH.ERROR.USERNAME_NOTFOUND'));
//             }
//             // if (userInfo.isLocked) {
//             //   if (ByPassAuth(req, res, next)) return;

//             //   return res.json(unauthorized('AUTH.ERROR.LOCKED'));
//             // }
//             if (userInfo.publicKey !== authInfo.publicKey) {
//                 if (ByPassAuth(req, res, next)) return;

//                 return res.json(unauthorized('AUTH.ERROR.MISMATCH_PUBLIC_KEY'));
//             }
//             // const isSetTempPassword = req.originalUrl === `${API_PREFIX}/auth/temp-password`;
//             // const isChangePassword = req.originalUrl === `${API_PREFIX}/auth/password`;
//             if ((CHECK_CHANGE_PASSWORD === 'true' || CHECK_CHANGE_PASSWORD === true)
//                 && userInfo.publicKey === userInfo.issuedPublicKey
//                 //   && !isSetTempPassword
//                 //   && !isChangePassword
//             ) {
//                 if (ByPassAuth(req, res, next)) return;
//                 return res.json(unauthorized('AUTH.ERROR.NEED_TO_CHANGE_PASSWORD'));
//             }
//             if (CHECK_REQUEST_SIGNATURE === 'true') {
//                 if (req.method !== 'GET') {
//                     const { _signature, _actionType, _timestamp } = req.body;
//                     const GetActionModule = (_url) => {
//                         return _url.replaceAll('/', '-').substring(1);
//                     };
//                     const realMethod = req.method.toLowerCase();
//                     const getActionType = () => {
//                         return (realMethod + '_' + GetActionModule(req.originalUrl ?? '')).toUpperCase();
//                     }
//                     if (typeof _actionType !== 'string' || _actionType.length === 0) {
//                         return res.json(badRequest('AUTH.ERROR.ACTION_TYPE_INVALID'));
//                     }
//                     if (_actionType !== getActionType()) {
//                         return res.json(badRequest('AUTH.ERROR.ACTION_TYPE_MISMATCH'));
//                     }
//                     if (!_signature) {
//                         return res.json(unauthorized('AUTH.ERROR.SIGNATURE_BODY_MISSING'));
//                     }
//                     if (!_timestamp) {
//                         return res.json(unauthorized('AUTH.ERROR.TIMESTAMP_MISSING'));
//                     }
//                     const isUnexpired = () => {
//                         const expiredTime = new Date(_timestamp);
//                         expiredTime.setSeconds(
//                             expiredTime.getSeconds() + 600,
//                         );
//                         return new Date() < expiredTime;
//                     }
//                     if (!isUnexpired()) {
//                         return res.json(unauthorized('AUTH.ERROR.REQUEST_EXPIRED'));
//                     }
//                     if (
//                         !VerifyMessage(
//                             _signature,
//                             {
//                                 ...req.body,
//                                 _signature: undefined,
//                             },
//                             authInfo.publicKey,
//                         )
//                     ) return res.json(unauthorized('AUTH.ERROR.SIGNATURE_BODY_MISMATCH'));
//                 }
//             }
//             req.userInfo = userInfo;
//             return next();
//         });
//     } catch (e) {
//         console.log(e.message);
//         return res.json(unauthorized('AUTH.ERROR.INTERNAL_ERROR'));
//     }
// };



const CheckAccessToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization.split(' ')[1]
        if (!auth || auth === '') throw new Error('AUTH.MISSING_ACCESS_TOKEN')

        jwt.verify(auth, TOKEN_SECRET, (err, data) => {
            if (err) throw new Error(err)
            req.userInfo = data.email
            return next()
        })
    } catch (err) {
        console.log(err)
        return res.json(err.message)
    }
}
module.exports = {
    // CheckAuth,
    CheckAccessToken
}