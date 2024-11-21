const router = require('express').Router();
const controller = require('./controller');
const auth = require('../auth');

router.get('/:id', controller.appoinmentGetById);
router.get('/', controller.appoinmentGetAll);
router.post('/', controller.createAppoinment);
//router.put('/:id', controller);
router.delete('/:id', controller.deleteAppoinmet);

module.exports = router;