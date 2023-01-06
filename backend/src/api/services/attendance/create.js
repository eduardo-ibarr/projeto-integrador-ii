const AttendanceSchema = require('../../../models/attendance');
const connection = require('../../../database/connection');
const { BAD_REQUEST } = require('../../../constants/status_error');
const { CREATED } = require('../../../constants/status_sucess');

module.exports = (req, res) => {
    const {
        _id,
        client,
        createdAt,
        date,
        isActive,
        services,
        isDone,
        isPaid,
        total
    } = req.body;

    const attendance = new AttendanceSchema({
        _id,
        client,
        createdAt,
        date,
        isActive,
        services,
        isDone,
        isPaid,
        total
    });

    connection.then(
        () => {
            attendance.save((error) => {
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