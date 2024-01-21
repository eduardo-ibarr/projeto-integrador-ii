module.exports = class AttendanceController {
  attendanceServices;

  constructor(attendanceServices) {
    this.attendanceServices = attendanceServices;
  }

  verifyBody(req, res, next) {
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

    const data = {
      _id,
      client,
      createdAt,
      date,
      isActive,
      services,
      isDone,
      isPaid,
      total
    };

    const isMissingData = Object.values(data).some(value => value === undefined);

    if (isMissingData) {
      return res.status(400).send({
        message: 'Missing data.'
      });
    }

    next(data);
  }

  store(req, res) {
    this.verifyBody(req, res, (data) => {
      try {
        this.attendanceServices.create(data);

        return res.status(201).send({
          message: 'Attendance created successfully.'
        });
      } catch (error) {
        return res.status(500).send({
          message: 'Error creating attendance.'
        });
      }
    });
  }

  list(req, res) {
    try {
      const attendances = this.attendanceServices.read();

      return res.status(200).send(attendances);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading attendances.'
      });
    }
  }

  show(req, res) {
    try {
      const attendance = this.attendanceServices.readOne(req.params.id);

      return res.status(200).send(attendance);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading attendance.'
      });
    }
  }

  update(req, res) {
    this.verifyBody(req, res, (data) => {
      try {
        this.attendanceServices.update(req.params.id, data);

        return res.status(200).send({
          message: 'Attendance updated successfully.'
        });
      } catch (error) {
        return res.status(500).send({
          message: 'Error updating attendance.'
        });
      }
    });
  }

  delete(req, res) {
    try {
      this.attendanceServices.delete(req.params.id);

      return res.status(200).send({
        message: 'Attendance deleted successfully.'
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error deleting attendance.'
      });
    }
  }
};