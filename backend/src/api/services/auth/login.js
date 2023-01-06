/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../../../constants/status_error');

require('dotenv').config();

module.exports = (req, res) => {
    if (
        req.body.user === process.env.API_USER &&
        req.body.password === process.env.API_PASSWORD
    ) {
        const token = jwt.sign({ userID: 1 }, process.env.SECRET, { expiresIn: 3600 });
        return res.json({ auth: true, token, expiresIn: 3600 });
    }

    res.status(401).send(UNAUTHORIZED);
};