const ClientSchema = require('../../../models/clients');
const connection = require('../../../database/connection');
const { BAD_REQUEST } = require('../../../constants/status_error');
const { CREATED } = require('../../../constants/status_sucess');

module.exports = (req, res) => {
    const {
        _id,
        name,
        isActive,
        phoneNumber,
        cpf,
        rg,
        address,
        createdAt,
        updatedAt
    } = req.body;

    const client = new ClientSchema({
        _id,
        name,
        isActive,
        phoneNumber,
        cpf,
        rg,
        address,
        createdAt,
        updatedAt
    });

    connection.then(
        () => {
            client.save((error) => {
                if (error) {
                    console.log(error);
                    res.status(400).send(BAD_REQUEST);
                } else {
                    res.status(201).send(CREATED);
                }
            });
        },
        (rejected) => {
            console.error(rejected);
            res.status(400).send(BAD_REQUEST);
        }
    );
};