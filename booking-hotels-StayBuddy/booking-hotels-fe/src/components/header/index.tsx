/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Layout, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useClientTranslation } from '@/i18n/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import images from "@/assets/images";
import { DashboardIcon, HertIcon, HomeIcon, LogOutIcon, UserIcon } from "@/assets/icons";
import { logout, useAppSelector } from "@/redux";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { ROLE_NAME } from "@/enum";

const { Header } = Layout;

const AppHeader = () => {
  const { t } = useClientTranslation('Common');
  const { user: userInfo } = useAppSelector((state) => state.auth)
  const languagesRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [avatar, setAvatar] = useState(userInfo?.avatar || images.avatarDefault);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth.isLogin);
  const [token, setToken] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const userData = useAppSelector((state) => state.auth);
  const userOptionsRef = useRef<HTMLUListElement | null>(null);
  const avatarRef = useRef<HTMLImageElement | null>(null);
  const [showUserOptions, setShowUserOptions] = useState(false);

  const handleLanguageChange = (lang: any) => {
    i18n.changeLanguage(lang);
    setShowLanguages(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setShowUserOptions(false);

    localStorage.setItem('showToast', 'true');

    dispatch(logout());

    window.location.href = '/';
  };

  const handleClickOutsideUserOptions = useCallback((event: any) => {
    if (
      userOptionsRef.current &&
      !userOptionsRef.current.contains(event.target) &&
      avatarRef.current && !avatarRef.current.contains(event.target)
    ) {
      setShowUserOptions(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken: any = localStorage.getItem('accessToken');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        languagesRef.current &&
        !languagesRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowLanguages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const showToast = localStorage.getItem('showToast');
    if (showToast === 'true') {
      toast.success(t('login.notify02'));
      const deleteToast = setTimeout(() => {
        localStorage.removeItem('showToast');
      }, 100);
      return () => clearTimeout(deleteToast);
    }
  }, [t]);

  useEffect(() => {
    if (userData.isUpdate) {
      setAvatar(userInfo?.avatar ?? images.avatarDefault);
    }

  }, [userData.isUpdate, userData.user, userInfo?.avatar]);

  useEffect(() => {
    if (auth || token) {
      setIsLogin(true);
      setAvatar(userInfo?.avatar ?? images.avatarDefault);
    } else {
      setIsLogin(false);
    }

  }, [auth, token, userInfo?.avatar]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideUserOptions);

    return () => {
      document.removeEventListener('click', handleClickOutsideUserOptions);
    };
  }, [handleClickOutsideUserOptions]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Header className={` bg-[#00ba51] ${scrolled ? 'opacity-75' : ''}  h-[115px] pt-[8px] fixed z-[999] top-0 w-full px-[230px]`}>
      <div className="container mx-auto">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Link href={'/'}>
              <Image src="/images/logo.svg" alt="logo" width={80} height={80} priority className="w-[100px] h-[100px]" />
            </Link>
          </div>
          <div className="flex text-white gap-2">
            <div className="flex items-center">
              <Tooltip title={t('header.na03')}>
                <Link href={isLogin ? '/profile/favorite' : '/auth/login'} className="border border-red-500 bg-red-500 rounded-full" >
                  <HertIcon className="w-10 h-10 hover:scale-95 transition duration-300 ease-in-out scale-100" />
                </Link>
              </Tooltip>
            </div>
            <div className="flex items-center">
              <Link href={'/partnership'} className="px-[12px] text-[16px] font-medium hover:bg-[#00BA00] hover:text-white">{t('header.na01')}</Link>
            </div>
            {/* Login/Logout */}
            <div className="flex items-center">
              {!isLogin ? (
                <Link href="/auth/login" className="px-3 text-lg font-medium bg-white text-[#00BA00] hover:text-[#00BA00]  hover:opacity-90 border border-white rounded-lg">
                  {t('header.na02')}
                </Link>
              ) : (
                <div className="relative ml-3">
                  <Image
                    ref={avatarRef}
                    onClick={() => setShowUserOptions((prev) => !prev)}
                    className="w-10 h-10 rounded-full cursor-pointer hover:bg-[#00BA00] transition-colors duration-300"
                    src={avatar}
                    width={40}
                    height={40}
                    alt="avatar"
                  />
                  {showUserOptions && (
                    <ul
                      ref={userOptionsRef}
                      className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-[#00BA00] z-[999]"
                    >
                      {userInfo?.role?.name === ROLE_NAME.PARTNER && (
                        <li
                          className="flex items-center p-2 text-[#000] hover:bg-gray-100  cursor-pointer hover:rounded-t-lg"
                          onClick={() => {
                            setShowUserOptions(false);
                          }}
                        >
                          <Link href="/dashboard" className="flex items-center w-full hover:text-[#000]" >
                            <DashboardIcon className="w-6 h-6 mr-2 opacity-50" />
                            <span>{t('user-options.op04')}</span>
                          </Link>
                        </li>
                      )}
                      <li
                        className="flex items-center p-2 text-[#000] hover:bg-gray-100  cursor-pointer hover:rounded-t-lg"
                        onClick={() => {
                          setShowUserOptions(false);
                        }}
                      >
                        <Link href="/profile" className="flex items-center w-full hover:text-[#000]" >
                          <UserIcon className="w-6 h-6 mr-2 " />
                          <span>{t('user-options.op01')}</span>
                        </Link>
                      </li>
                      <li
                        className="flex items-center p-2 text-[#000] hover:bg-gray-100  cursor-pointer hover:rounded-t-lg"
                        onClick={() => {
                          setShowUserOptions(false);
                        }}
                      >
                        <Link href="/profile/booking" className="flex items-center w-full hover:text-[#000]" >
                          <HomeIcon className="mr-2 w-6 h-6 fill-slate-400" />
                          <span>{t('user-options.op02')}</span>
                        </Link>
                      </li>
                      <li
                        className="flex items-center p-2 text-[#000] hover:bg-gray-100 hover:text-[#000] cursor-pointer hover:rounded-b-lg"
                        onClick={handleLogOut}
                      >
                        <LogOutIcon className="w-6 h-6 mr-2 fill-slate-400" />
                        <span>{t('user-options.op03')}</span>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="pl-[12px] relative flex items-center ">
              <button
                ref={buttonRef}
                onClick={() => setShowLanguages(!showLanguages)}
                className="focus:outline-none flex items-center hover:bg-[#00BA00] hover:text-white"
              >
                <Image
                  loading="lazy"
                  className="w-8 h-6"
                  src={images[i18n.language] || images.en}
                  alt={i18n.language}
                />
                <span className="ml-2">{i18n.language.toUpperCase()}</span>
              </button>
              {showLanguages && (
                <ul
                  ref={languagesRef}
                  className="absolute right-0 mt-2 w-[170px] bg-white shadow-lg rounded-lg border border-gray-200 top-[43px] text-gray-600 z-[999]"
                >
                  <li
                    onClick={() => handleLanguageChange('vi')}
                    className="cursor-pointer flex items-center p-2 hover:bg-gray-100 hover:rounded-t-lg transition-colors duration-200"
                  >
                    <Image
                      loading="lazy"
                      className="w-7 h-6"
                      src={images.vi}
                      alt="vi"
                    />
                    <p className="ml-3 m-0">Tiếng Việt</p>
                  </li>
                  <li
                    onClick={() => handleLanguageChange('en')}
                    className="cursor-pointer flex items-center p-2 hover:bg-gray-100 hover:rounded-b-lg transition-colors duration-200"
                  >
                    <Image
                      loading="lazy"
                      className="w-8 h-6"
                      src={images.en}
                      alt="en"
                    />
                    <p className="ml-3 m-0">English</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
