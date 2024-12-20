/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../icon";
import { IconName } from "@/type/iconName";
import { PATH } from "@/configs";
import Image from "next/image";
import images from "@/assets/images";
import { Tooltip } from "antd";
import { useClientTranslation } from "@/i18n/client";
import {  setUser, useAppDispatch, useAppSelector } from "@/redux";
import { updateUser } from "@/api/userService";
import { toast } from "react-toastify";
function SideBar() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useClientTranslation('Common');
  const [isHovering, setIsHovering] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar ?? images.avatarDefault);

  const dispatch = useAppDispatch();
  const accountLinks = [
    { name: t("account.title01"), path: PATH.PROFILE_EDIT, icon: "edit" },
    { name: t("account.title02"), path: PATH.CHANGE_PASSWORD, icon: "key" },
  ];

  const transactionLinks = [
    { name: t("account.title03"), path: PATH.ORDER, icon: "order" },
    { name: t("account.title04"), path: PATH.FAVORITE, icon: "heart" },
    { name: t("account.title05"), path: PATH.TOPUP, icon: "coin" },
  ];

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await dispatch(updateUser({ avatar: file })).then(({ payload }) => {
        if (payload) {
          toast.success(t("toast.successUpdate"));
          dispatch(setUser(payload as any));
        }
      }).catch(() => {
        toast.error('Error updating');
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const imageData = {
          src: imageUrl,
          height: 80,
          width: 80,
        };
        setSelectedAvatar(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="p-4 sm:pb-[200px] pb-[100px] bg-white-100 border-r border-gray-200">
      <div className="mb-4">
        <div className="text-black text-xl font-semibold">
          <Tooltip title="Thay đổi avatar">
            <div className="flex justify-center relative">
              <Image
                src={selectedAvatar}
                alt="avatar"
                width={100}
                height={100}
                className={`w-24 h-24 rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-70' : 'opacity-100'}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className={`absolute inset-0 flex items-center justify-center cursor-pointer ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Icon name="edit" size="1.5em" className="text-gray-700" />
              </label>
            </div>
          </Tooltip>
          <div className="text-center mt-2"> VŨ ĐỨC DŨNG</div>
        </div>
        <div className="text-gray-400 text-lg text-center">Chỉnh sửa tài khoản</div>
      </div>

      <div className="mb-6">
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-yellow"></div>
          <h2 className="flex-1 font-semibold text-black text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            {t("account.title06")}
          </h2>
        </div>
        <ul className="space-y-2">
          {accountLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className={`flex items-center space-x-2 p-2 text-lg font-medium rounded ${pathname === link.path ? 'text-yellow hover:text-yellow' : 'text-black hover:text-yellow'}`}>
                <Icon name={link.icon as IconName} size="1.4em" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-yellow"></div>
          <h2 className="flex-1 font-semibold text-black text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            {t("account.title07")}
          </h2>
        </div>
        <ul className="space-y-2">
          {transactionLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className={`flex items-center space-x-2 p-2 text-lg font-medium rounded ${pathname === link.path ? 'text-yellow hover:text-yellow' : 'text-black hover:text-yellow'}`}>
                <Icon name={link.icon as IconName} size="1.4em" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
