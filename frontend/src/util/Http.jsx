import axios from "axios";
const baseServerUrl = "http://127.0.0.1:3000/api/v1/";

const signFormsHandler = async ({ type, formData, method }) => {
  try {
    let response = null;
    if (method === "put") {
      console.log("hi");
      response = await axios.put(
        `${baseServerUrl}auth/resetPassword`,
        formData
      );
    } else {
      response = await axios.post(`${baseServerUrl}auth/${type}`, formData);
    }
    return response;
  } catch (error) {
    console.log(error);
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
  type,
  formData,
  method,
  pageNum,
  industryList
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
    }
    else if(method==="industryList"){
      response = await axios(`${baseServerUrl}industries`, {
      });
    }
   else {
      response = await axios(`${baseServerUrl}industries`, {
        params: {
          limit:8,
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

export const getJobs = async ({ type, token, formData, method, pageNum }) => {
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
      response = await axios(
        `${baseServerUrl}jobs/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          params: {
            limit: 15,
            page: pageNum,
          },
        }
      );
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
    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.message === "Job already saved") {
      return "Job already saved";
    }
  }
};

export const getLatestJobs = async (num) => {
  try {
    const response = await axios.get(`${baseServerUrl}jobs/latest/${num}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCountUpNumbers = async () => {
  try {
    const response = await axios.get(
      `${baseServerUrl}specificTasks/display-counts`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserSkills = async ({ formData, method, id, token }) => {
  try {
    let response = null;
    if (method === "post") {
      console.log(formData);
      response = await axios.post(
        `${baseServerUrl}users/addUserSkill`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (method === "put") {
      console.log(`${baseServerUrl}users/skills/${id}`);
      console.log("formData", formData);
      console.log("id", id);
      response = await axios.put(
        `${baseServerUrl}users/skills/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (method === "delete") {
      response = await axios.delete(`${baseServerUrl}users/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios(`${baseServerUrl}users/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // console.log(response.data)
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const languageHandler = async ({ formData, method, id, token }) => {
  console.log(formData);
  try {
    let response = null;
    if (method === "post") {
      response = await axios.post(
        `${baseServerUrl}users/profile/language`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (method === "patch") {
      response = await axios.patch(
        `${baseServerUrl}users/profile/language/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (method === "delete") {
      response = await axios.delete(
        `${baseServerUrl}users/profile/language/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await axios(`${baseServerUrl}profile/language`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getCompanyCandidates = async ({ id, token, pageNum }) => {
  try {
    const response = await axios(`${baseServerUrl}companies/${id}/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 15,
        page: pageNum,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getCompanies = async (pageNum) => {
  try {
    const res = axios(`${baseServerUrl}companies`, {
      params: {
        limit: 15,
        page: pageNum,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
