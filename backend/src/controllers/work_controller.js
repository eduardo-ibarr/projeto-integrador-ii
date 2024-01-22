module.exports = class WorkController {
  workServices;

  constructor(workServices) {
    this.workServices = workServices;
  }

  async verifyBody(req, res, callback) {
    const {
      _id,
      createdAt,
      description,
      isActive,
      name,
      price
    } = req.body;

    const data = {
      _id,
      createdAt,
      description,
      isActive,
      name,
      price
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
    this.verifyBody(req, res, async (data) => {
      try {
        await this.workServices.create(data);

        return res.status(201).send({
          message: 'Work created successfully.'
        });
      } catch (error) {
        return res.status(500).send({
          message: 'Error creating work.'
        });
      }
    });
  }

  async list(req, res) {
    try {
      const works = await this.workServices.read();

      return res.status(200).send(works);
    } catch (error) {
      return res.status(500).send({
        message: 'Error getting works.'
      });
    }
  }

  async show(req, res) {
    try {
      const work = await this.workServices.readOne(req.params.id);

      if (!work) {
        return res.status(404).send({
          message: 'Work not found.'
        });
      }

      return res.status(200).send(work);
    } catch (error) {
      return res.status(500).send({
        message: 'Error getting work.'
      });
    }
  }

  async update(req, res) {
    this.verifyBody(req, res, async (data) => {
      try {
        const work = await this.workServices.update(req.params.id, data);

        if (!work) {
          return res.status(404).send({
            message: 'Work not found.'
          });
        }

        return res.status(200).send(work);
      } catch (error) {
        return res.status(500).send({
          message: 'Error updating work.'
        });
      }
    });
  }

  async delete(req, res) {
    try {
      const work = await this.workServices.delete(req.params.id);

      if (!work) {
        return res.status(404).send({
          message: 'Work not found.'
        });
      }

      return res.status(200).send({
        message: 'Work deleted.'
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error deleting work.'
      });
    }
  }
};