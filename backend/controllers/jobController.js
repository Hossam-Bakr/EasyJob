const Job = require("../models/jobModel");
const factory = require("./handlerFactory");

exports.getAllJobs = factory.getAll(Job);
exports.getJob = factory.getOne(Job);
exports.createJob = factory.createOne(Job);
exports.updateJob = factory.updateOne(Job);
exports.deleteJob = factory.deleteOne(Job);


exports.createJobWithCategories = async (req, res) => {
    console.log(req.body);
    const { jobData, categoryIds } = req.body; 
    if (!categoryIds || categoryIds.length < 1 || categoryIds.length > 3) {
        return res.status(400).json({
            success: false,
            message: "You must specify between 1 and 3 categories."
        });
    }
    try {
        const job = await Job.create(jobData);
        await job.setCategories(categoryIds);
        return res.status(201).json({ success: true, jobData , message: "Job created with categories successfully." });
    } catch (error) {
        console.error("Error creating job with categories:", error);
        return res.status(500).json({ success: false, message: "Failed to create job with categories." });
    }
};

