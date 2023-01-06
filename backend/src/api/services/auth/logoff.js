const blacklist = require('../../../utils/blacklist');

module.exports = (req, res) => {
    blacklist.push(req.headers['x-acess-token']);

    res.status(200).json({
        message: 'logoff sucessfully'
    });
};