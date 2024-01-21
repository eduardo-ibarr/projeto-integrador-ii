const ServiceSchema = require('../../../models/services');
const connection = require('../../../database/connection');
const { BAD_REQUEST } = require('../../../constants/status_error');
const { CREATED } = require('../../../constants/status_sucess');

module.exports = (req, res) => {
  const {
    _id,
    createdAt,
    description,
    isActive,
    name,
    price
  } = req.body;

  const service = new ServiceSchema({
    _id,
    createdAt,
    description,
    isActive,
    name,
    price
  });

  connection.then(
    () => {
      service.save((error) => {
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