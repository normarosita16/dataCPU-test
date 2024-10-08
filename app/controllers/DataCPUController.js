// Library
const os = require('os');
// UTILS
const response = require('../helpers/apiResponse');

// MODEL
const Datas = require('../models/data_model'); // Model Mongoose

exports.create = async (req, res) => {
  try {
        const cpuName = os.cpus()[0].model;
        const osType = os.type();
        const osPlatform = os.platform();
        const osRelease = os.release();
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
    const datas = new Datas({
        namacpu: cpuName,
        tipe: osType,
        platform: osPlatform,
        rilis: osRelease,
        ramSisa: freeMemory,
        ramTotal: totalMemory
      });
    await datas.save();
    
    return response.successResponseWithData(res, 'success', datas);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.list = async (req, res) => {
  const limit = req.query.size ? parseInt(req.query.size) : 10;
  const offset = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;
  const search = req.query.search || '';

  try {
    const datas = await Datas.find()
    .skip(offset)
    .limit(limit)

    const totalData = await Datas.countDocuments();

    const payload = {
      content: datas,
      totalData,
    };

    return response.successResponseWithData(res, 'success', payload);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.view = async (req, res) => {
    const id = req.params.id
    try {
        const datas = await Datas.findById(id);
        if (!datas) {
            return res.status(404).json({ message: 'Data not found' });
        }
        return response.successResponseWithData(res, 'success', datas);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    }
  };

  exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Datas.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        return response.successResponse(res, 'Data deleted successfully');
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete data', error });
    }
  };
