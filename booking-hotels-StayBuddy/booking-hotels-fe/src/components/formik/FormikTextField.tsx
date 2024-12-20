import React from "react";
import { useField, FieldConfig } from "formik";
import TextField from "../textField";

interface FormikTextFieldProps extends FieldConfig {
  id?: string;
  label?: string;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  labelWidth?: string;
  rightIconClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  type?: string; 
  rightIcon?: React.ReactNode;
  inputClassName?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  id,
  name,
  type = "text",
  rightIcon,
  inputClassName,
  ...props
}) => {
  const [field, meta, helpers] = useField(name || id || "");
  const { setValue, setTouched } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value); 
    if (props.onChange) props.onChange(event); 
  };

  return (
    <TextField
      {...props}
      type={type}
      onChange={handleChange}
      onBlur={() => setTouched(true)}
      value={field.value || ""}
      error={meta.touched && meta.error ? meta.error : ""}
      disabled={props.disabled}
      rightIcon={rightIcon}
      inputClassName={inputClassName}
    />
  );
};

export default FormikTextField;
