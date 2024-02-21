const Industry = require("../models/industryModel");
const factory = require("./handlerFactory");

exports.createIndustry = factory.createOne(Industry);
exports.getAllIndustries = factory.getAll(Industry);
exports.getIndustry = factory.getOne(Industry);
exports.updateIndustry = factory.updateOne(Industry);
exports.deleteIndustry = factory.deleteOne(Industry);
