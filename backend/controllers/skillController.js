const Skill = require("../models/skillModel");
const factory = require("./handlerFactory");

exports.getAllSkills = factory.getAll(Skill);
exports.getSkill = factory.getOne(Skill);
exports.createSkill = factory.createOne(Skill);
exports.updateSkill = factory.updateOne(Skill);
exports.deleteSkill = factory.deleteOne(Skill);
