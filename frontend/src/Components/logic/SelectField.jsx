import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const animatedComponents = makeAnimated();

const MultiSelect = ({
  field,
  form,
  options,
  isMulti = false,
  isCreatable = false,
  isClearable,
  placeholder = "Select",
  defaultValue
}) => {
  function onChange(option) {
    form.setFieldValue(
      field.name,
      option ? option.map((item) => item.value) : []
    );
  }
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  if (isClearable) {
    return (
      <CreatableSelect
        isClearable
        components={animatedComponents}
        options={options}
        name={field.name}
        value={
          options ? options.find((option) => option.value === field.value):""
        }
        isMulti={false}
        onChange={(option) =>form.setFieldValue(field.name, option?option.value:"")}
        onBlur={field.onBlur}
        placeholder={placeholder}
      />
    );
  } else if (isCreatable) {
    return (
      <CreatableSelect
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={getValue()}
        onChange={onChange}
        options={options}
        isMulti={true}
        placeholder={placeholder}
      />
    );
  } else if (!isMulti) {
    return (
      <Select
        components={animatedComponents}
        options={options}
        name={field.name}
        value={
          options ? options.find((option) => option.value === field.value) : ""
        }
        onChange={(option) => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    );
  } else {
    return (
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={field.name}
        value={getValue()}
        onChange={onChange}
        options={options}
        isMulti={true}
        placeholder={placeholder}
      />
    );
  }
};

export default MultiSelect;
