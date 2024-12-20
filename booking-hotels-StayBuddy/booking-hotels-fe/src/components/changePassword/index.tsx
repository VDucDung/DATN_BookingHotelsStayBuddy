/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import useBreakpoint from "@/hooks/useBreakpoint";
import FormikTextField from "@/components/formik/FormikTextField";
import CustomButton from "@/components/button/CustomButton";
import { ChangePasswordValues } from "@/interfaces";
import { changePassword } from "@/api/userService";
import { useClientTranslation } from "@/i18n/client";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux";

function ChangePassword() {
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useClientTranslation('Common');
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .matches(
        /^(?=.*[!@#$%^&*])/,
        "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)"
      ),
    confirmPassword: Yup.string()
      .required("Vui lòng xác nhận mật khẩu")
      .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không khớp"),
  });

  const initialValues: ChangePasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: ChangePasswordValues,
    { setSubmitting, resetForm }: FormikHelpers<ChangePasswordValues>
  ) => {
    try {
      if(values.newPassword === values.oldPassword){
        toast.error(t("toast.errorPassword"));
        return;
      }
      
      const userData: ChangePasswordValues = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }
      
      await dispatch(changePassword(userData)).then(({ payload }: { payload: any }) => {
        if (payload.statusCode === 200) {
          toast.success(t("toast.successUpdate"));
          resetForm(); 
        } else if(payload.statusCode === 400){
          toast.error(t("toast.incorrectPassword"));
        }
      })
    } catch {
      toast.error(t("toast.errorUpdate")); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-black shadow-md p-4">
        {t("profile.passwordChange")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm, isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-6 sm:gap-y-6 gap-y-14 sm:mt-7 mt-14">
              <FormikTextField
                name="oldPassword"
                label="Mật khẩu hiện tại:"
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="newPassword"
                label="Mật khẩu mới:"
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="confirmPassword"
                label="Xác nhận mật khẩu mới:"
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />
            </div>
            <div className="flex mt-10">
              <div className="flex gap-4 ml-auto">
                <CustomButton
                  type="button"
                  onClick={() => resetForm()} 
                >
                  {t('button.btn18')}
                </CustomButton>

                <CustomButton 
                  type="submit" 
                  className=""
                  disabled={isSubmitting}
                >
                  {t('button.btn17')}
                </CustomButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
