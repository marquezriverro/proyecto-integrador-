const { Client, Token } = require('../../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUsers = async(req, res) => {
    const name = req.query.fullName;

    let filters = {
        where: {}
    };

    if (req.auth.user.role === 'client') {
        filters.where.id = req.auth.user.id;
    }

    if (name) {
        filters.where.fullName = {
            [Op.like]: `%${req.query.fullName}%`
        };
    }

    try {
        const client = await Client.findAll(filters);
        res.json(client);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    };
};

const getUser = async(req, res) => {
    const primaryK = req.params.id;
    try {
        const client = await Client.findByPk(primaryK);
        if (client) {
            res.json(client);
        } else {
            res.json({
                messege: 'client not found'
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
            message: 'password is required'
        }, 400)
    } else {

        const clientData = req.body;

        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(req.body.password, salt);
        clientData.password = hash;

        try {
            const client = await Client.create(clientData);
            res.json({
                client
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
            messege: "invalid user or password"
        }, 400);
    } else {
        const client = await Client.findOne({ where: { email: req.body.email } });
        if (!client) {
            res.json({
                messege: 'invalid user or password'
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, client.password);
                if (validated) {
                    const token = jwt.sign({
                        id: client.id,
                        role: 'client'
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '24h'
                    });
                    await Token.create({ token: token, clientId: client.id });
                    res.json(token);
                } else {
                    res.json({
                        message: "invalid user or password"
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
        const client = await Client.findByPk(primaryK);
        const newData = req.body;
        if (client) {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(7);
                const hash = bcrypt.hashSync(req.body.password, salt);
                newData.password = hash;
            };
            const clientUpdate = await client.update(newData);
            res.json(clientUpdate);
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
    const primaryK = req.params.id;
    try {
        const client = await Client.findByPk(primaryK);
        if (client) {
            await Client.destroy({
                where: { id: primaryK }
            });
            res.json({
                message: "client deleted"
            });
        } else {
            res.json({
                message: 'client not found'
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
};