const AttendanceSchema = require('../../../models/attendance');
const connection = require('../../../database/connection');
const { BAD_REQUEST } = require('../../../constants/status_error');

module.exports = (req, res) => {
    const { id } = req.params;

    connection.then(
        () => {
            AttendanceSchema.find({ _id: id }, (error, data) => {
                if (error) {
                    console.error(error);
                    res.status(400);
                } else {
                    const index = data.findIndex(item => item);

                    if (index === -1) {
                        res.status(200).json([]);
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