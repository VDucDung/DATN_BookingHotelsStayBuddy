/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";
import { useClientTranslation } from "@/i18n/client";
import { useRouter } from "next/navigation";
import { PATH } from "@/configs";
import { statistical } from "@/api/statisticalService";
import { PasswordIcon } from "@/assets/icons";
import AppButton from "@/components/button/AppButton";
import { resetPassword } from "@/api/authService";

const ResetPassword: React.FC = () => {
  const { t } = useClientTranslation('Common');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<"password" | "text">("password");

  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });

  const checkSubmit = useCallback(() => {
    if (!newPassword || !confirmNewPassword) {
      setSubmit(false);
      return;
    }
    const isValid = Object.values(errors).every((err) => err === "");
    setSubmit(isValid);
  }, [errors, newPassword, confirmNewPassword]);

  const handleChangeNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewPassword(value);

      if (!passwordRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          newPassword: t("errors.err04"),
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          newPassword: "",
        }));
      }

      if (!value) {
        setErrors((prev) => ({
          ...prev,
          newPassword: "",
        }));
      }

      checkSubmit();
    },
    [passwordRegex, t, checkSubmit]
  );

  const handleChangeConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setConfirmNewPassword(value);

      if (value !== newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: t("errors.err06"),
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }

      checkSubmit();
    },
    [newPassword, t, checkSubmit]
  );

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const handleResetPassword = useCallback(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(sessionStorage.getItem("tokenVerifyOTP") || "null");

    if (!token) {
      toast.error(t("errors.errInvalidToken"));
      return;
    }

    const data = {
      token,
      newPassword,
    };

    dispatch(resetPassword(data)).then((result: any) => {
      if (result.payload.statusCode === 200) {
        toast.success(result.payload.message);
        router.push(PATH.LOGIN);
      } else {
        toast.error(result.payload.message);
      }
    });
    }
  }, [dispatch, newPassword, router, t]);

  useEffect(() => {
    dispatch(statistical())
      .then((result: any) => {
        if (result.payload.code !== 200) {
          toast.error(result.payload.message);
        }
      })
      .catch((err: Error) => {
        toast.error(err.message);
      });
  }, [dispatch]);

  return (
    <div className="p-6 w-[450px] min-h-[100px] text-center self-center rounded-lg bg-white backdrop-blur-lg shadow-md z-50 mx-auto my-8 mt-[200px]">
      <h1 className="text-2.5xl md:text-2xl font-semibold shine">{t("reset-password.heading")}</h1>
      <p className="mt-2 text-xl md:text-lg text-gray-500">{t("reset-password.desc01")}</p>

      <form className="flex flex-col items-center mt-6" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full mb-4">
          <div
            className={`flex items-center border ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2`}
          >
            <input
              value={newPassword}
              onChange={handleChangeNewPassword}
              onBlur={handleChangeNewPassword}
              type={showPassword}
              placeholder={t("form.tp02")}
              className="flex-1 outline-none text-base"
            />
            <PasswordIcon
              className={`ml-2 ${errors.newPassword ? "text-red-500" : "text-gray-400"}`}
            />
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
        </div>

        <div className="w-full mb-4">
          <div
            className={`flex items-center border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2`}
          >
            <input
              value={confirmNewPassword}
              onChange={handleChangeConfirmPassword}
              onBlur={handleChangeConfirmPassword}
              type={showPassword}
              placeholder={t("form.tp04")}
              className="flex-1 outline-none text-base"
            />
            <PasswordIcon
              className={`ml-2 ${errors.confirmPassword ? "text-red-500" : "text-gray-400"}`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="w-full flex items-center mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword === "text"}
              onChange={handleShowPassword}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-base text-gray-700">{t("form.lb01")}</span>
          </label>
        </div>

        <div className={`w-full ${submit ? "cursor-pointer" : "cursor-not-allowed"}`}>
          <AppButton
            success
            auth
            disabled={!submit}
            onClick={handleResetPassword}
            className="w-full py-2"
          >
            {t("button.btn11")}
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
