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
  token,
}) => {
  try {
    let response = null;
    if (type) {
      if (method === "post") {
        response = await axios.post(
          `${baseServerUrl}industries${type}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (method === "put") {
        response = await axios.put(
          `${baseServerUrl}industries${type}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (method === "delete") {
        response = await axios.delete(`${baseServerUrl}industries${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

export const getCategories = async ({ type, formData, method, token }) => {
  try {
    let response;
    if (type) {
      if (method === "post") {
        response = await axios.post(
          `${baseServerUrl}categories${type}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (method === "put") {
        response = await axios.put(
          `${baseServerUrl}categories${type}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (method === "delete") {
        response = await axios.delete(`${baseServerUrl}categories${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } else {
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

export const getCompanyCandidates = async ({
  id,
  token,
  pageNum,
  jobTitleFilteration,
  countryFilteration,
  cityFilteration,
  areaFilteration,
  categoriesFilteration,
  jobTypeFilteration,
  languageFilteration,
  careerLevelFilteration,
  hasDrivingLicense,
  isOpenToWork,
  minYearsOfExpFilteration,
}) => {
  //don't forget categories
  try {
    let params = {
      limit: 15,
      page: pageNum,
    };
    let response = null;
    let paramValues = "";

    if (jobTitleFilteration !== "") {
      if (paramValues === "") {
        paramValues = paramValues.concat(
          `?filter[jobTitle]=${jobTitleFilteration}`
        );
      } else {
        paramValues = paramValues.concat(
          `&filter[jobTitle]=${jobTitleFilteration}`
        );
      }
    }

    if (minYearsOfExpFilteration !== "") {
      if (paramValues === "") {
        paramValues = paramValues.concat(
          `?filter[minExperience]=${minYearsOfExpFilteration}`
        );
      } else {
        paramValues = paramValues.concat(
          `&filter[minExperience]=${minYearsOfExpFilteration}`
        );
      }
    }

    if (countryFilteration.length > 0) {
      countryFilteration.forEach((myCountry) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[country]=${myCountry}`);
        } else {
          paramValues = paramValues.concat(`&filter[country]=${myCountry}`);
        }
      });
    }

    if (cityFilteration.length > 0) {
      cityFilteration.forEach((myCity) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[city]=${myCity}`);
        } else {
          paramValues = paramValues.concat(`&filter[city]=${myCity}`);
        }
      });
    }

    if (areaFilteration.length > 0) {
      areaFilteration.forEach((myArea) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[area]=${myArea}`);
        } else {
          paramValues = paramValues.concat(`&filter[area]=${myArea}`);
        }
      });
    }

    if (categoriesFilteration.length > 0) {
      console.log("catfil",categoriesFilteration)
      categoriesFilteration.forEach((cat) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[jobCategories]=${cat}`);
        } else {
          paramValues = paramValues.concat(`&filter[jobCategories]=${cat}`);
        }
      });
    }

    if (jobTypeFilteration.length > 0) {
      jobTypeFilteration.forEach((myType) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[jobType]=${myType}`);
        } else {
          paramValues = paramValues.concat(`&filter[jobType]=${myType}`);
        }
      });
    }
    console.log(paramValues)
    if (languageFilteration.length > 0) {
      languageFilteration.forEach((myLang) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[language]=${myLang.value}`);
        } else {
          paramValues = paramValues.concat(`&filter[language]=${myLang.value}`);
        }
      });
    }

    if (careerLevelFilteration.length > 0) {
      careerLevelFilteration.forEach((myCareer) => {
        if (paramValues === "") {
          paramValues = paramValues.concat(`?filter[careerLevel]=${myCareer}`);
        } else {
          paramValues = paramValues.concat(`&filter[careerLevel]=${myCareer}`);
        }
      });
    }

    if (isOpenToWork) {
      if (paramValues === "") {
        paramValues = paramValues.concat(`?filter[openToWork]=true`);
      } else {
        paramValues = paramValues.concat(`&filter[openToWork]=true`);
      }
    }

    if (hasDrivingLicense) {
      if (paramValues === "") {
        paramValues = paramValues.concat(`?filter[drivingLicense]=true`);
      } else {
        paramValues = paramValues.concat(`&filter[drivingLicense]=true`);
      }
    }

    response = await axios(
      `${baseServerUrl}companies/${id}/candidates${paramValues}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
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

      if (categoriesFilteration !== "") {
        console.log("catfil",categoriesFilteration)

        if (paramValues === "") {
          paramValues = paramValues.concat(`?cats=${categoriesFilteration}`);
        } else {
          paramValues = paramValues.concat(`&cats=${categoriesFilteration}`);
        }
      }

      if (minSalaryFilteration.length > 0) {
        let myMinSalary = Number(minSalaryFilteration);
        if (paramValues === "") {
          paramValues = paramValues.concat(
            `?salaryRangeMin__gte=${myMinSalary}`
          );
        } else {
          paramValues = paramValues.concat(
            `&salaryRangeMin__gte=${myMinSalary}`
          );
        }
      }

      if (maxSalaryFilteration.length > 0) {
        let myMaxSalary = Number(maxSalaryFilteration);

        if (paramValues === "") {
          paramValues = paramValues.concat(
            `?salaryRangeMax__lte=${myMaxSalary}`
          );
        } else {
          paramValues = paramValues.concat(
            `&salaryRangeMax__lte=${myMaxSalary}`
          );
        }
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

export const getCompanies = async ({
  searchFilter,
  pageNum,
  indusryFilteration,
  countryFilteration,
  cityFilteration,
  sizeFilteration,
}) => {
  let params = {
    limit: 15,
    page: pageNum,
  };
  let paramValues = "";

  if (searchFilter) {
    paramValues = `?keyword=${searchFilter}`;
  }

  if (indusryFilteration) {
    params.IndustryId = indusryFilteration;
  }

  if (countryFilteration !== "") {
    if (paramValues === "") {
      paramValues = paramValues.concat(`?countries=${countryFilteration}`);
    } else {
      paramValues = paramValues.concat(`&countries=${countryFilteration}`);
    }
  }

  if (cityFilteration !== "") {
    if (paramValues === "") {
      paramValues = paramValues.concat(`?cities=${cityFilteration}`);
    } else {
      paramValues = paramValues.concat(`&cities=${cityFilteration}`);
    }
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
    return res.data;
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

export const getCompanyRelatedJobs = async ({ id }) => {
  try {
    const res = await axios(`${baseServerUrl}jobs/?CompanyId=${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getJobApplications = async ({ jobId, token, appId, type }) => {
  try {
    let res;
    if (type === "apply") {
      res = await axios.get(`${baseServerUrl}jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else if (appId !== undefined) {
      console.log("token", token);
      res = await axios.get(
        `${baseServerUrl}jobs/${jobId}/applications/${appId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      res = await axios.get(`${baseServerUrl}jobs/${jobId}/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    console.log(res);
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

export const updateJobQuestion = async ({
  jobId,
  questionId,
  token,
  formData,
}) => {
  try {
    const response = await axios.put(
      `${baseServerUrl}jobs/${jobId}/questions/${questionId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getSpecificJob = async ({ jobId, token }) => {
  try {
    const response = await axios(`${baseServerUrl}jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getJobOnMap = async () => {
  try {
    const response = await axios(`${baseServerUrl}jobs/locations`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendContactUs = async ({ formData }) => {
  try {
    const response = await axios.post(`${baseServerUrl}contact/`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const usersManageMent = async ({ formData, method, type }) => {
  console.log("type", type);
  try {
    let response;
    if (method === "post") {
      response = await axios.post(
        `${baseServerUrl}userManagement/${type}`,
        formData
      );
    } else if (method === "delete") {
      response = await axios.delete(`${baseServerUrl}userManagement/${type}`);
    } else if (method === "patch") {
      response = await axios.patch(`${baseServerUrl}userManagement/${type}`);
    } else if (method === "get") {
      response = await axios(`${baseServerUrl}userManagement/${type}`);
    } else if (method === "changeEmail") {
      response = await axios.patch(
        `${baseServerUrl}userManagement/${type}`,
        formData
      );
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response?.data?.error?.errors) {
      if (
        error.response?.data?.error?.errors[0]?.message ===
        "email must be unique"
      ) {
        return "email is already exist";
      }
    }
    if (error.response?.data?.message === "No user found with that ID") {
      return "No user found with that ID";
    }
  }
};

export const companiesManageMent = async ({ formData, method, type }) => {
  try {
    let response;
    if (method === "post") {
      response = await axios.post(
        `${baseServerUrl}companyManagement/${type}`,
        formData
      );
    } else if (method === "delete") {
      response = await axios.delete(
        `${baseServerUrl}companyManagement/${type}`
      );
    } else if (method === "patch") {
      response = await axios.patch(`${baseServerUrl}companyManagement/${type}`);
    } else if (method === "get") {
      response = await axios(`${baseServerUrl}companyManagement/${type}`);
    } else if (method === "changeEmail") {
      response = await axios.patch(
        `${baseServerUrl}companyManagement/${type}`,
        formData
      );
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response?.data?.error?.errors) {
      if (
        error.response?.data?.error?.errors[0]?.message ===
        "email must be unique"
      ) {
        return "email is already exist";
      }
    }
    if (error.response?.data?.message === "No company found with that ID") {
      return "No company found with that ID";
    }
  }
};

export const skillsManagement = async ({ formData, method, type, token }) => {
  try {
    let response;
    if (method === "post") {
      response = await axios.post(`${baseServerUrl}skills/${type}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else if (method === "delete") {
      response = await axios.delete(`${baseServerUrl}skills/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else if (method === "patch") {
      response = await axios.patch(`${baseServerUrl}skills/${type}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response?.data?.error?.errors) {
      if (
        error.response?.data?.error?.errors[0]?.message ===
        "name must be unique"
      ) {
        return "name must be unique";
      }
    }

    if (error.response?.data?.message === "No document found with that ID") {
      return "No document found with that ID";
    }
  }
};

export const getUserProfile = async ({ token, userId }) => {
  try {
    let response = await axios.get(`${baseServerUrl}users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const scheduleInterview = async ({ token, formData, method }) => {
  try {
    let response;
    if (method === "get") {
      response = await axios.get(`${baseServerUrl}interviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios.post(`${baseServerUrl}interviews`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
