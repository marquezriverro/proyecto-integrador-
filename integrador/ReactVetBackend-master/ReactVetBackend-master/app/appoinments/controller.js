const moment = require('moment');
const { Appointment, Client, Admin } = require('../../models/index');
const { Op } = require('sequelize')

const appoinmentGetAll = async(req, res) => {
    const date = moment(req.query.startsAt).format("dddd, MMMM Do YYYY, h:mm:ss");
    //@gsierra10 @todo el formato moment no sirve porque introuce una fecha siempre y es incompatiple
    const filters = {
        where: {}
    };

    if (req.auth.user.role === 'client') {
        filters.where.id = req.auth.user.id;
    }

    if (date) {
        filters.where.startsAt = {
            [Op.gte]: `%${req.query.startsAt}%`
        }; //@TODO esto no funciona
    }

    try {
        const busqueda = await Appointment.findAll(filters);
        res.json(busqueda);
    } catch (error) {
        res.json({
            message: error.message
        }, 500);
    };
};

const appoinmentGetById = async(req, res) => {
    const id = req.params.id;
    try {
        const busqueda = await Appointment.findByPk(id);
        if (busqueda) {
            res.json(busqueda);
        } else {
            res.status(404).send({
                message: `No existe la cita con el id ${id}.`
            });
        }
    } catch {
        res.status(500).send({
            message: "Ha surgido algún error al intentar acceder a la cita con el id " + id + "."
        });
    }
};
const createAppoinment = async(req, res) => {

    const startAt = moment(req.body.startsAt);
    console.log(startAt);
    const endsAt = startAt.clone().add(2, 'hours');
    console.log(endsAt);
    try {
        if (!startAt) {
            res.json({
                message: 'appoinment is required'
            }, 400);
        } else {
            /**
             * select * from appointments where
             * (appointments.startsAt > STARTSAT and appointments.startsAt < ENDSAT) or
             * (appointments.endsAt > STARTAT and appointments.endsAt < ENDSAT) or
             * (STARTSAT > appointment.startsAt and STARTSAT < appointments.endsAt) or
             * (ENDSAT > appointment.startsAt and ENDSAT < appointment.endsAt)
             */
            const matches = await Appointment.findAll({
                where: {
                    [Op.or]: [{
                            startsAt: {
                                [Op.gt]: `%${startAt}%`,
                                [Op.lt]: `%${endsAt}%`
                            }
                        },
                        {
                            endsAt: {
                                [Op.gt]: `%${startAt}%`,
                                [Op.lt]: `%${endsAt}%`
                            }
                        },
                        {
                            startsAt: {
                                [Op.lt]: `%${startAt}%`
                            },
                            endsAt: {
                                [Op.gt]: `%${startAt}%`
                            }
                        },
                        {
                            startsAt: {
                                [Op.lt]: `%${endsAt}%`
                            },
                            endsAt: {
                                [Op.gt]: `%${endsAt}%`
                            }
                        }
                    ]
                }
            });
            console.log(matches);
            if (matches.length > 0) {
                res.json({
                    message: 'timeframe is already taken'
                }, 400);
            } else {
                //@todo esto no funciona porque no esta pillando bien las fechas
                const appoinment = await Appointment.create({
                    startsAt: startAt,
                    endsAt: endsAt
                });
                res.status(200).json({ appoinment, message: 'Su cita ha sido creada' });
            }
        };
    } catch (error) {
        res.status(500).send({
            message: "Ha surgido algún error al intentar crear la cita."
        });
    };
};

const deleteAppoinmet = async(req, res) => {
    const appoinmentId = req.params.id;
    const appoinment = await Appointment.findByPk(appoinmentId);
    try {
        if (appoinment) {
            await Appointment.destroy({
                where: {
                    id: appoinmentId
                }
            });
            res.json({
                message: 'appoinmet deleted'
            }, 200);
        } else {
            res.json({
                message: 'appoinmet not found'
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
    appoinmentGetAll,
    appoinmentGetById,
    createAppoinment,
    deleteAppoinmet
};