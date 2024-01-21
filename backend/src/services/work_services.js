const WorkSchema = require('../models/work_schema');

module.exports = class WorkServices {
  create(data) {
    try {
      const work = new WorkSchema(data);
      return work.save();
    } catch (error) {
      throw new Error(`Error creating work: ${error}`);
    }
  }

  read() {
    try {
      return WorkSchema.find();
    } catch (error) {
      throw new Error(`Error reading works: ${error}`);
    }
  }

  readOne(id) {
    try {
      return WorkSchema.findById(id);
    } catch (error) {
      throw new Error(`Error reading work: ${error}`);
    }
  }

  update(id, data) {
    try {
      return WorkSchema.findByIdAndUpdate(id, data);
    } catch (error) {
      throw new Error(`Error updating work: ${error}`);
    }
  }

  delete(id) {
    try {
      return WorkSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting work: ${error}`);
    }
  }
};