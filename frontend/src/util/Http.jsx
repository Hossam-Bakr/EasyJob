import axios from "axios";
const baseServerUrl = process.env.REACT_APP_Base_API_URl;

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
  industryList,
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
    } else if (method === "industryList") {
      response = await axios(`${baseServerUrl}industries`, {});
    } else {
      response = await axios(`${baseServerUrl}industries`, {
        params: {
          limit: 8,
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

export const getJobs = async ({
  type,
  formData,
  method,
  token,
  pageNum,
  searchFilter,
  countryFilteration,
  cityFilteration,
  categoriesFilteration,
  jobTypeFilteration,
  careerLevelFilteration,
  workPlaceFilteration,
  minSalaryFilteration,
  maxSalaryFilteration,
  jobTitleFilteration,
}) => {
  //handle categories
  try {
    let params = {
      limit: 15,
      page: pageNum,
    };
    let response = null;
    let paramValues = "";

    if (!method) {
      if (searchFilter) {
        paramValues = `?keyword=${searchFilter}`;
      }

      if (jobTitleFilteration) {
        params.title = jobTitleFilteration;
      }
      if (countryFilteration.length > 0) {
        countryFilteration.forEach((myCountry) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(`?country=${myCountry}`);
          } else {
            paramValues = paramValues.concat(`&country=${myCountry}`);
          }
        });
      }

      if (cityFilteration.length > 0) {
        cityFilteration.forEach((myCity) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(`?city=${myCity}`);
          } else {
            paramValues = paramValues.concat(`&city=${myCity}`);
          }
        });
      }

      if (jobTypeFilteration.length > 0) {
        jobTypeFilteration.forEach((myType) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(`?type=${myType}`);
          } else {
            paramValues = paramValues.concat(`&type=${myType}`);
          }
        });
      }

      if (careerLevelFilteration.length > 0) {
        careerLevelFilteration.forEach((myCareer) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(`?careerLevel=${myCareer}`);
          } else {
            paramValues = paramValues.concat(`&careerLevel=${myCareer}`);
          }
        });
      }

      if (workPlaceFilteration.length > 0) {
        workPlaceFilteration.forEach((place) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(`?workplace=${place}`);
          } else {
            paramValues = paramValues.concat(`&workplace=${place}`);
          }
        });
      }

      if (minSalaryFilteration.length > 0) {
        minSalaryFilteration.forEach((salary) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(`?salaryRangeMin__gte=${salary}`);
          } else {
            paramValues = paramValues.concat(`&salaryRangeMin__gte=${salary}`);
          }
        });
      }
      if (maxSalaryFilteration.length > 0) {
        maxSalaryFilteration.forEach((salary) => {
          if (paramValues === "") {
            paramValues = paramValues.concat(
              `?salaryRangeMax__lte  =${salary}`
            );
          } else {
            paramValues = paramValues.concat(
              `&salaryRangeMax__lte  =${salary}`
            );
          }
        });
      }
    }

    if (type) {
      if (method === "post") {
        response = await axios.post(`${baseServerUrl}jobs${type}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (method === "patch") {
        response = await axios.patch(`${baseServerUrl}jobs${type}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (method === "delete") {
        response = await axios.delete(`${baseServerUrl}jobs${type}${formData}`);
      }
    } else {
      response = await axios(`${baseServerUrl}jobs/${paramValues}`, {
        params,
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
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

    return response;
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCompanies = async ({
  pageNum,
  indusryFilteration,
  countryFilteration,
  cityFilteration,
  sizeFilteration,
}) => {
  console.log(sizeFilteration);
  let params = {
    limit: 15,
    page: pageNum,
  };
  let paramValues = "";

  if (indusryFilteration) {
    params.IndustryId = indusryFilteration;
  }
  if (countryFilteration.length > 0) {
    countryFilteration.forEach((myCountry) => {
      if (paramValues === "") {
        paramValues = paramValues.concat(`?country=${myCountry}`);
      } else {
        paramValues = paramValues.concat(`&country=${myCountry}`);
      }
    });
  }
  if (cityFilteration.length > 0) {
    cityFilteration.forEach((myCity) => {
      if (paramValues === "") {
        paramValues = paramValues.concat(`?city=${myCity}`);
      } else {
        paramValues = paramValues.concat(`&city=${myCity}`);
      }
    });
  }
  if (sizeFilteration.length > 0) {
    sizeFilteration.forEach((size) => {
      if (paramValues === "") {
        paramValues = paramValues.concat(`?size=${size}`);
      } else {
        paramValues = paramValues.concat(`&size=${size}`);
      }
    });
  }
  try {
    const res = await axios(`${baseServerUrl}companies${paramValues}`, {
      params,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyRelatedJobs = async ({ id }) => {
  try {
    const res = await axios(`${baseServerUrl}jobs/?CompanyId=${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getJobApplications = async ({ jobId, token }) => {
  try {
    const res = await axios.get(`${baseServerUrl}jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getJobsDetails = async ({ jobId, token }) => {
  try {
    const response = await axios(`${baseServerUrl}jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data.job;
  } catch (error) {
    console.error(error);
  }
};