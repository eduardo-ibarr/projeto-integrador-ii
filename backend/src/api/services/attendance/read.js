const AttendanceSchema = require('../../../models/attendance');
const connection = require('../../../database/connection');
const { NOT_FOUND, BAD_REQUEST } = require('../../../constants/status_error');

module.exports = (req, res) => {
    connection.then(
        () => {
            AttendanceSchema.find((error, data) => {
                if (error) {
                    console.error(error);
                    res.status(400);
                } else {
                    const index = data.findIndex(item => item);

                    if (index === -1) {
                        res.status(404).send(NOT_FOUND);
                    } else {
                        res.status(200).send(data);
                    }
                }
            });
        },
        (rejected) => {
            console.error(rejected);
            res.status(400).send(BAD_REQUEST);
        }
    );
};