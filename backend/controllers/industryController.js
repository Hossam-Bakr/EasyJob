const Industry = require("../models/industryModel");
const Category = require("../models/categoryModel");
const factory = require("./handlerFactory");

const includeCategoryObj = {
  model: Category,
  attributes: ["id", "name"],
};

exports.createIndustry = factory.createOne(Industry);
exports.getAllIndustries = factory.getAll(Industry, includeCategoryObj);
exports.getIndustry = factory.getOne(Industry);
exports.updateIndustry = factory.updateOne(Industry);
exports.deleteIndustry = factory.deleteOne(Industry);
