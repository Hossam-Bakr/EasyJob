const Job = require("../models/jobModel");
const factory = require("./handlerFactory");

exports.getAllJobs = factory.getAll(Job);
exports.getJob = factory.getOne(Job);
exports.createJob = factory.createOne(Job);
exports.updateJob = factory.updateOne(Job);
exports.deleteJob = factory.deleteOne(Job);
