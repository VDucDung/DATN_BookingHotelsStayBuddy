import React, { useMemo, useState } from 'react';
import CustomButton from '../button/CustomButton';
import { useClientTranslation } from '@/i18n/client';
import { toast } from 'react-toastify';

const Email: React.FC = () => {
  const { t } = useClientTranslation('Common');
  const [email, setEmail] = useState('');
  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  return (
    <>
      <section
        style={{
          backgroundImage: `url(/images/email-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="xl:py-[100px] sm:py-[80px] py-[60px] flex items-center justify-center mt-14 relative"
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          className="h-full w-full absolute inset-0 pointer-events-none"
        ></div>
        <div className="text-center p-10 z-[1000] w-full flex flex-col items-center">
          <p className="sm:text-2xl text-xl text-yellow-500 font-semibold mb-0">
            {t("pageTitle.title")}
          </p>
          <h2 className="xl:text-[50px] sm:text-[40px] text-3xl font-semibold text-white mt-2 mb-0">
            {t("home.email.title")}
          </h2>

          <div className="container">
            <div className="relative sm:block flex flex-col xl:w-[70%] m-auto xl:mt-10 sm:mt-5 mt-4">
              <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
                className="sm:absolute inset-0 z-0 outline-none rounded-full p-5"
                type="email"
                placeholder={t("home.email.inputPlaceholder")}
              />
              <CustomButton
              onClick={() => {
                if(!email || !emailRegex.test(email)){
                  toast.error('Please enter email');
                  return;
                }
                localStorage.setItem('newslettersEmail', email);
                setEmail('')
                toast.success('Thanks for register');
              }}
                rounded
                textColor="white"
                bgColor="emerald-700"
                bgHoverColor="yellow"
                size="large"
                width="150px"
                height="60px"
                className="sm:ml-auto sm:mr-0 ml-auto mr-auto hover:text-black font-semibold px-10 mt-5 z-[1000] relative"
              >
                {t("pageTitle.register")}
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Email;
