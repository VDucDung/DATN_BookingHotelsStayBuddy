"use client";
import { FacebookIcon, GithubIcon, InstagramIcon } from '@/assets/icons';
import { useClientTranslation } from '@/i18n/client';
import { Layout } from 'antd';
import Link from 'next/link';

const { Footer } = Layout;

const AppFooter = () => {
  const { t } = useClientTranslation('Common');

  return (
    <Footer style={{ textAlign: 'center', padding: '20px 0', backgroundColor: '#0d2436' }}>
      <div className='container mx-auto text-[#738796] '>
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-12 text-[16px] py-6'>
          <div>
            <ul className='space-y-5'>
              <li>
                <Link href="/">{t('footer.na01')}</Link>
              </li>
              <li>
                <Link href="/">{t('footer.na02')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className='space-y-5'>
              <li>
                <Link href="/">{t('footer.na03')}</Link>
              </li>
              <li>
                <Link href="/">{t('footer.na04')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className='space-y-5'>
              <li>
                <Link href="/">{t('footer.na05')}</Link>
              </li>
              <li>
                <Link href="/">{t('footer.na06')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className='space-y-5'>
              <li>
                <Link href="/">{t('footer.na07')}</Link>
              </li>
              <li>
                <Link href="/">{t('footer.na08')}</Link>
              </li>
            </ul>
          </div>
            <div className='flex gap-6 items-center'>
                <Link href="https://www.facebook.com/" 
                rel="noreferrer"
                target="_blank"
                >
                  <FacebookIcon className={'w-8 h-7 hover:scale-95 hover:trasition hover:duration-300 hover:ease-in-out scale-100'}/>
                </Link>
                <Link href="/"
                  rel="noreferrer"
                  target="_blank"
                >
                <InstagramIcon className={'w-8 h-7 hover:scale-95 hover:trasition hover:duration-300 hover:ease-in-out scale-100'}/>
                </Link>
                <Link
                href="https://github.com"
                rel="noreferrer"
                target="_blank"
                >
                  <GithubIcon className={'w-8 h-7 hover:scale-95 hover:trasition hover:duration-300 hover:ease-in-out scale-100'}/>
                </Link>
            </div>
          </div>
        <hr className='my-4' />
        <p>{t('footer.na09')}</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
