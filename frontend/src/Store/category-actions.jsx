import axios from "axios";
import { categoryActions } from "./category-slice";

const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`http://127.0.0.1:3000/api/v1/categories?limit=1000`);
      const categories = response.data.data;
      dispatch(categoryActions.setCategories(categories));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllIndustries = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`http://127.0.0.1:3000/api/v1/industries`);
      const industries = response.data.data;
      dispatch(categoryActions.setIndustries(industries));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllSkills = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`http://127.0.0.1:3000/api/v1/skills`);
      const skills = response.data.data;
      dispatch(categoryActions.setSkills(skills));
    } catch (error) {
      console.error(error);
    }
  };
};

export default getAllCategories;
