const router = require ('express').Router();

const controller = require ('./controller.js');
const auth = require('../auth');


router.post('/create',  controller.createPet);
router.get('/:id',auth.checkClient, controller.getPetById);
router.get('/',auth.checkClient, controller.getPets);
router.put('/:id', controller.updatePet);
router.delete('/delete/:id', controller.deletePet);


module.exports = router;