const ClientSchema = require('../../../models/clients');
const connection = require('../../../database/connection');
const { NOT_FOUND, BAD_REQUEST } = require('../../../constants/status_error');
const { SUCCESS } = require('../../../constants/status_sucess');

module.exports = (req, res) => {
    const { id } = req.params;

    connection.then(
        () => {
            ClientSchema.findOneAndDelete({ _id: id }, (error, data) => {
                if (error) {
                    console.error(error);
                    res.status(400);
                } else {
                    if (data === null) {
                        res.status(404).send(NOT_FOUND);
                    } else {
                        res.status(200).send(SUCCESS);
                    }
                }
            });

            res.status(200);
        },
        (rejected) => {
            console.error(rejected);
            res.status(400).send(BAD_REQUEST);
        }
    );
};