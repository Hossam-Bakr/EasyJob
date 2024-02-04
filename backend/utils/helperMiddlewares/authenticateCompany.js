
/*
    this middleware does not work yes  
    
*/


const generateJWT = require("../generateJWT");

const authenticateCompany = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in! Please log in to get access."
      });
    }

    const decoded = generateJWT.verify(token, SECRET_KEY);
    req.companyId = decoded.companyId;

    const existingCompany = await Company.findByPk(decoded.companyId);
    if (!existingCompany) {
      return res.status(401).json({
        success: false,
        message: "The company belonging to this token no longer exists."
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this resource."
    });
  }
};

module.exports = authenticateCompany;
