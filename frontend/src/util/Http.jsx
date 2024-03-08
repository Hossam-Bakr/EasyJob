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

export const updateFormHandler = async ({
  type,
  formData,
  token,
  role,
  method,
}) => {
  try {
    let response;
    if (method === "post") {
      response = await axios.post(
        `${baseServerUrl}${role}/profile/${type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (method === "delete") {
      response = await axios.delete(`${baseServerUrl}${role}/profile/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
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

export const getIndustries = async ({
  signal,
  type,
  formData,
  method,
  pageNum,
}) => {
  try {
    let response = null;
    if (type) {
      if (method === "post") {
        response = await axios.post(
          `${baseServerUrl}industries${type}`,
          formData
        );
      } else if (method === "put") {
        response = await axios.put(
          `${baseServerUrl}industries${type}${formData}`
        );
      } else if (method === "delete") {
        response = await axios.delete(
          `${baseServerUrl}industries${type}${formData}`
        );
      }
    } else {
      response = await axios(`${baseServerUrl}industries`, {
        params: {
          page: pageNum,
        },
      });
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getCategories = async ({ type, formData, method }) => {
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
      console.log("hey");
      response = await axios(`${baseServerUrl}categories?limit=400`);
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const accountSettingHanlder = async ({
  type,
  formData,
  token,
  role,
  method,
}) => {
  try {
    let response;
    if (method === "delete") {
      response = await axios.delete(`${baseServerUrl}${role}/${type}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios.patch(
        `${baseServerUrl}${role}/${type}/`,
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

export const getJobs = async ({ signal, type, formData, method }) => {
  try {
    let response = null;
    if (type) {
      if (method === "post") {
        response = await axios.post(`${baseServerUrl}jobs${type}`, formData);
      } else if (method === "put") {
        response = await axios.put(`${baseServerUrl}jobs${type}${formData}`);
      } else if (method === "delete") {
        response = await axios.delete(`${baseServerUrl}jobs${type}${formData}`);
      }
    } else {
      response = await axios(`${baseServerUrl}jobs/`, { signal });
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getJobsDetails = async (id) => {
  try {
    const response = await axios(`${baseServerUrl}jobs/${id}`);

    return response.data.data.job;
  } catch (error) {
    console.error(error);
  }
};

export const saveJobsHandler = async ({ jobId, token }) => {
  try {
    const res = await axios.post(
      `${baseServerUrl}jobs/saved/`,
      { jobId: jobId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("all saved jobs", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message === "Job already saved") {
      return "Job already saved";
    }
  }
};

export const getLatestJobs = async ({ signal, num }) => {
  try {
    const response = await axios(`${baseServerUrl}jobs/latest/${num}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
