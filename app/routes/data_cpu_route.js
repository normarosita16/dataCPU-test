const dotEnv = require('dotenv');
const { Router } = require('express');

const DataCPUController = require('../controllers/DataCPUController');

const router = Router();
dotEnv.config();

router.get('', DataCPUController.list);
router.post('',DataCPUController.create);

module.exports = router;
