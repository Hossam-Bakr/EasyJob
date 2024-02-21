const Category = require("../models/categoryModel");
const factory = require("./handlerFactory");

exports.setIndustryId = (req, res, next) => {
  if (!req.body.IndustryId) req.body.IndustryId = req.params.industryId;
  next();
};

exports.createCategory = factory.createOne(Category);
exports.getAllCategories = factory.getAll(Category);
exports.getCategoryById = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
