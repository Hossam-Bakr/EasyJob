const catchAsync = require("./../utils/catchAsync");
const ApiError = require("./../utils/ApiError");
const { Op } = require("sequelize");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const row = await Model.findByPk(req.params.id);

    if (!row) {
      return next(new ApiError("No document found with that ID", 404));
    }
    await row.destroy();
    res.status(202).json({
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
      data: {
        data: updatedDoc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("from create method");
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
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
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.industryId) filter = { industryId: req.params.industryId };

    const { page = 1, limit = 100, sort, fields, keyword } = req.query;

    if (keyword && Model.rawAttributes.title) {
      filter = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      };
    }

    const docs = await Model.findAll({
      where: filter,
      // order: sort ? sort.split(",").map((item) => item.split(":")) : [["createdAt", "DESC"]],
      order: sort ? [sort.split(",")] : [["createdAt", "DESC"]],
      attributes: fields ? fields.split(",") : undefined,
      limit,
      offset: (page - 1) * limit,
    });

    const documentsCount = await Model.count();

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
