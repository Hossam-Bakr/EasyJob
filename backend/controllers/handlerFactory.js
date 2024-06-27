const catchAsync = require("./../utils/catchAsync");
const ApiError = require("./../utils/ApiError");
const { Op, Sequelize } = require("sequelize");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const row = await Model.findByPk(req.params.id);

    if (!row) {
      return next(new ApiError("No document found with that ID", 404));
    }
    await row.destroy();
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new ApiError("No document found with that ID", 404));
    }

    const updatedDoc = await doc.update(req.body);

    res.status(200).json({
      status: "success",
      data: updatedDoc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("from create method");
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findByPk(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new ApiError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model, include = null, overrideFields = null) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.industryId) filter = { industryId: req.params.industryId };

    let { page = 1, limit = 100, sort, fields, keyword } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (keyword && Model.rawAttributes.title) {
      filter = {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("title")),
            "LIKE",
            `%${keyword.toLowerCase()}%`
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("description")),
            "LIKE",
            `%${keyword.toLowerCase()}%`
          ),
        ],
      };
    } else if (keyword && Model.rawAttributes.name) {
      filter = {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("name")),
            "LIKE",
            `%${keyword.toLowerCase()}%`
          ),
        ],
      };
    }

    // Exclude fields from the filter
    const excludedFields = ["page", "limit", "sort", "fields", "keyword"];
    excludedFields.forEach((el) => delete req.query[el]);

    for (const field in req.query) {
      if (Model.rawAttributes[field]) {
        filter[field] = req.query[field];
      }
    }

    for (const key in req.query) {
      if (key.includes("__") && Model.rawAttributes[key.split("__")[0]]) {
        const [field, operator] = key.split("__");
        const value = req.query[key];

        if (operator && ["gt", "gte", "lt", "lte"].includes(operator)) {
          filter[field] = { [Op[operator]]: value };
        }
      }
    }

    let sortArray = [];
    if (sort) {
      sortArray = sort
        .split(",")
        .map((item) =>
          item.startsWith("-") ? [item.slice(1), "DESC"] : [item, "ASC"]
        );
    }

    const attributes = fields ? fields.split(",") : undefined;

    const docs = await Model.findAll({
      where: filter,
      order: sortArray,
      attributes,
      limit,
      offset: (page - 1) * limit,
      include,
    });

    const documentsCount = await Model.count({ where: filter });

    res.status(200).json({
      status: "success",
      results: docs.length,
      paginationResults: {
        currentPage: page,
        limit,
        numberOfPages: Math.ceil(documentsCount / limit),
        next: page * limit < documentsCount ? page + 1 : null,
        prev: page > 1 ? page - 1 : null,
      },
      data: docs,
    });
  });
