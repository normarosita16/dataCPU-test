const dotEnv = require('dotenv');
const { Router } = require('express');

const DataCPUController = require('../controllers/DataCPUController');

const router = Router();
dotEnv.config();

router.get('', DataCPUController.list);
router.post('',DataCPUController.create);
router.get('/:id', DataCPUController.view);
router.delete('/:id', DataCPUController.delete);

module.exports = router;
