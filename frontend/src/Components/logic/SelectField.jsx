import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const SelectField = ({ options, field, form }) => {
 return( <Select
    closeMenuOnSelect={false}
    components={animatedComponents}
    options={options}
    name={field.name}
    isMulti
    value={
      options ? options.find((option) => option.value === field.value) : ""
    }
    onChange={(option) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
  />)
};

export default SelectField;
