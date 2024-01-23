module.exports = class AttendanceController {
  attendanceServices;

  constructor(attendanceServices) {
    this.attendanceServices = attendanceServices;
  }

  async verifyBody(req, res, callback) {
    const {
      _id,
      client,
      createdAt,
      date,
      isActive,
      works,
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
      works,
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

    await callback(data);
  }

  async store(req, res) {
    await this.verifyBody(req, res, async (data) => {
      try {
        await this.attendanceServices.create(data);

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

  async list(req, res) {
    try {
      const attendances = await this.attendanceServices.read();

      return res.status(200).send(attendances);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading attendances.'
      });
    }
  }

  async show(req, res) {
    try {
      const attendance = await this.attendanceServices.readOne(req.params.id);

      return res.status(200).send(attendance);
    } catch (error) {
      return res.status(500).send({
        message: 'Error reading attendance.'
      });
    }
  }

  async update(req, res) {
    await this.verifyBody(req, res, async (data) => {
      try {
        await this.attendanceServices.update(req.params.id, data);

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

  async delete(req, res) {
    try {
      await this.attendanceServices.delete(req.params.id);

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