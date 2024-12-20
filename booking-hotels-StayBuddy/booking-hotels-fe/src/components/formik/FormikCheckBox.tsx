import React from "react";
import { useField } from "formik";
import Checkbox from "../checkBox";

interface FieldHookConfig<T> {
  name?: string;
  value?: T;
  onChange?: (value: T) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

interface FormikCheckBoxProps extends FieldHookConfig<boolean> {
  name: string;
  label: string;
}

const FormikCheckBox: React.FC<FormikCheckBoxProps> = ({
  name,
  label,
  onChange: externalOnChange,
  ...props
}) => {
  const [field, meta, helpers] = useField<boolean>(name);
  const { setValue } = helpers;

  const handleChange = (value: boolean) => {
    setValue(value);
    if (externalOnChange) {
      externalOnChange(value);
    }
  };

  return (
    <Checkbox
      {...props}
      label={label}
      onChange={handleChange}
      checked={field.value}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

export default FormikCheckBox;
