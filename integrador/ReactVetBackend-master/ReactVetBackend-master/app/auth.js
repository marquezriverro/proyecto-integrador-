const jwt = require('jsonwebtoken');
const { Token } = require('../models/index')

const checkToken = async(req, res, next, requiredRole) => {
    let token = null;
    if (req.headers['authorization']) {
        let splitToken = req.headers['authorization'].split(' ');
        if (splitToken.length === 2) {
            token = splitToken[1];
        }
    }

    if (token) {
        try {
            // const dbToken = await Token.findOne({
            //     where:{token:token}
            // });
            // console.log(dbToken);
            // if (dbToken) {
                let userToken = jwt.verify(token, process.env.PRIVATE_KEY);
                if (requiredRole == 'client' ||
                    userToken.role == 'admin' ||
                    (req.baseUrl === '/clients' && req.params.id == userToken.id) // perfil del propio cliente autenticado
                ) {
                    req.auth = {
                        user: userToken,
                        token: token
                    };
                    next();

                } else {
                    res.json({
                        message: 'user not authorized'
                    }, 403);
                }
            // }else{
            //     res.json({
            //         message:'user not authenticate'
            //     },401);
            // }
        } catch (error) {
            res.json({
                message: 'user not authenticated'
            }, 401);
        }
    } else {
        res.json({
            message: 'user not authenticated'
        }, 401);
    }
}

const checkClient = (req, res, next) => {
    checkToken(req, res, next, 'client');
};

const checkAdminOrOwn = (req, res, next) => {
    checkToken(req, res, next, 'admin');
}

module.exports = {
    checkClient,
    checkAdminOrOwn
};