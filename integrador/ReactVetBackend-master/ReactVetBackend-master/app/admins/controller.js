const { Admin, Token } = require('../../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//si no hay ningun usuario contenplar eso
const getUsers = async(req, res) => {
    let filter = {
        where: {}
    };

    if (req.query.fullName) {
        filter.where.fullName = {
            [Op.like]: `%${req.query.fullName}%`
        }

        console.log(filter.where.fullName);
    }

    try {
        const admins = await Admin.findAll(filter);
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    };
};

const getUser = async(req, res) => {
    const primaryK = req.params.id
    try {
        const admin = await Admin.findByPk(primaryK);
        if (admin) {
            res.json(admin);
        } else {
            res.json({
                messege: 'user not found'
            }, 404)
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const createUser = async(req, res) => {
    if (!req.body.password) {
        res.json({
            messege: 'password is required'
        }, 400)
    } else {

        const adminData = req.body;

        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(req.body.password, salt);
        adminData.password = hash;

        try {
            const admin = await Admin.create(adminData);
            res.json({
                message: 'admin created'
            }, 201);
        } catch (error) {
            console.error(error);
            if (error.message == "Validation error") { // @TODO: include mysql validation errors
                res.json({
                    message: error.original.message
                }, 400);
            } else {
                res.json({
                    message: error.message
                }, 500);
            }
        };
    };
};

const loginUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            messege: "invalid admin or password"
        }, 400);
    } else {
        const admin = await Admin.findOne({ where: { email: req.body.email } });
        if (!admin) {
            res.json({
                messege: 'invalid admin or password'
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, admin.password);
                if (validated) {
                    const token = jwt.sign({
                        id: admin.id,
                        role: 'admin'
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '24h'
                    });
                    await Token.create({ token: token, adminId: admin.id });
                    res.json(token);
                } else {
                    res.json({
                        message: "invalid admin or password"
                    }, 400);
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 500);
            }
        }
    }
};

const logoutUser = async(req, res) => {
    const token = req.auth.token;
    console.log(token);
    try {
        await Token.update({ token: null }, {
            where: {
                token: token
            }
        });
        res.json({
            message: 'your are logout'
        }, 200);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const updateUser = async(req, res) => {

    try {
        const primaryK = req.params.id;
        const admin = await Admin.findByPk(primaryK);
        const newData = req.body;
        if (admin) {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(7);
                const hash = bcrypt.hashSync(req.body.password, salt);
                newData.password = hash;
            };

            const adminUpdate = await admin.update(newData);;
            res.json(adminUpdate);

        } else {
            res.json({
                message: 'user not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const deleteUser = async(req, res) => {
    const primaryK = req.params.id
    try {
        const admin = await Admin.findByPk(primaryK);
        if (admin) {
            await admin.destroy({
                where: { id: primaryK }
            });
            res.json(admin);
        } else {
            res.json({
                messege: 'admin not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    loginUser,
    logoutUser,
    deleteUser
}