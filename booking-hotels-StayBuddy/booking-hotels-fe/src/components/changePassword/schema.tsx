import * as Yup from "yup";

interface PasswordChangeValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = (t: (key: string) => string) => {
  return Yup.object<PasswordChangeValues>({
    currentPassword: Yup.string().required(t("Mật khẩu hiện tại là bắt buộc")),
    newPassword: Yup.string()
      .min(6, t("Mật khẩu mới phải có ít nhất 6 ký tự"))
      .required(t("Mật khẩu mới là bắt buộc")),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], t("Mật khẩu xác nhận không khớp"))
      .required(t("Xác nhận mật khẩu là bắt buộc")),
  });
};

export default validationSchema;
