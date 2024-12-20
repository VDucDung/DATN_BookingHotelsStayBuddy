/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { memo } from "react";
import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from "formik";
import AutoComplete from "../autoComplete";

interface FormikAutocompleteProps {
  name: string;
  id?: string;
  onChange?: any;
  onBlur?: (event: any) => void;
  [key: string]: any; 
}

const FormikAutocomplete: React.FC<FormikAutocompleteProps> = ({
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  onChange: externalOnchange,
  onBlur: externalOnBlur,
  ...props
}) => {
  const [field, meta, helpers]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(name);
  const { setValue, setTouched } = helpers;

  return (
    <AutoComplete
      {...props}
      onChange={(val: any) => {
        if (externalOnchange) {
          externalOnchange(val);
        }
        setValue(val);
      }}
      onBlur={(event: any) => {
        if (externalOnBlur) {
          externalOnBlur(event);
        }
        setTouched(true);
      }}
      name={name}
      value={field.value}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

export default memo(FormikAutocomplete);
