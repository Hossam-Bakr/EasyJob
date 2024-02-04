const CompanyProfile = require("../models/companyProfileModel");

exports.updateCompanyProfile = async (req, res) => {
  const companyId = req.companyId; 

  try {
    let profile = await CompanyProfile.findOne({ where: { companyId } });

    if (profile) {
      await profile.update(req.body);
    } else {
      await CompanyProfile.create({ ...req.body, companyId });
    }

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully."
    });
  } catch (error) {
    console.error("Error updating company profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update company profile."
    });
  }
};
