import axios from "axios";
const baseServerUrl = "http://127.0.0.1:3000/api/v1/";

const signFormsHandler = async ({ type, formData }) => {
  try {
    const response = await axios.post(`${baseServerUrl}auth/${type}`, formData);
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

export const updateFormHandler = async ({ type, formData, token,role,method}) => {
  try {
    let response;
    if(method==="post"){
      response = await axios.post(
        `${baseServerUrl}${role}/profile/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    else{
      response = await axios.patch(
        `${baseServerUrl}${role}/profile/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
 
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

export const getCategories = async ({ signal, type, formData, method }) => {
  try {
    let response = null;
    if (type) {
      if (method === "post") {
        response = await axios.post(
          `${baseServerUrl}categories${type}`,
          formData
        );
      } else if (method === "put") {
        response = await axios.put(
          `${baseServerUrl}categories${type}${formData}`
        );
      } else if (method === "delete") {
        response = await axios.delete(
          `${baseServerUrl}categories${type}${formData}`
        );
      }
    } else {
      response = await axios(`${baseServerUrl}categories`, { signal });
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
