import axios from "axios";

const signFormsHandler = async ({ type, formData }) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/auth/${type}`,
      formData
    );

    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }
    throw error.message;
  }
};

export default signFormsHandler;

export const updateFormHandler = async ({ type, formData, companyToken }) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:3000/api/v1/companies/profile/${type}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }
    throw error.message;
  }
};
