/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useClientTranslation } from '@/i18n/client';
import React, { useState } from 'react';
import { DatePicker, Input, Space, InputNumber, Popover, Button, Select } from 'antd';
import { ArrowDownIcon, LocationIcon, PersonalInfoIcon, SearchIcon } from '@/assets/icons';
import { toast } from 'react-toastify';
const { Option } = Select;

const Banner = () => {
  const { t } = useClientTranslation('Common');
  const { RangePicker } = DatePicker;

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [rooms, setRooms] = useState(1);
  const [capacity, setCapacity] = useState(0);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);

  const handleConfirm = () => {
    const children = childrenAges.filter(child => child > 5)
    setCapacity(children.length + adults)
    setIsPopoverVisible(false);
  };


  const content = (
    <div className='w-[300px] space-y-4'>
      <div>
        <div>{t('header.na07')}</div>
        <InputNumber min={1} max={10} value={adults} onChange={(value) => setAdults(value ?? 0)} className='w-full' />
      </div>
      <div>
        <div>{t('header.na08')}</div>
        <InputNumber
          min={0}
          max={10}
          value={children}
          onChange={(value) => {
            setChildren(value ?? 0);
            setChildrenAges(new Array(value ?? 0).fill(0).map((_, index) => index));
          }}
          className='w-full'
        />
      </div>
      {childrenAges.map((age, index) => (
        <div key={index}>
          <div>{`Child ${index + 1} Age`}</div>
          <Select
            value={age}
            onChange={(value) => {
              const newAges = [...childrenAges];
              newAges[index] = value;
              setChildrenAges(newAges);
            }}
            className='w-full'
          >
            {Array.from({ length: 18 }, (_, i) => i).map((age) => (
              <Option key={age} value={age}>{age}</Option>
            ))}
          </Select>
        </div>
      ))}
      <div>
        <div>{t('header.na09')}</div>
        <InputNumber min={1} max={10} value={rooms} onChange={(value) => setRooms(value ?? 0)} className='w-full' />
      </div>
      <Button type="primary" onClick={handleConfirm} className='w-full'>Confirm</Button>
    </div>
  );

  return (
    <section className='mt-[115px] relative h-[500px]' style={{ backgroundImage: `url(/images/banner.jpg)`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}>
      <div className='container mx-auto'>
        <div className='text-white py-24 mx-[40px]'>
          <h3 className='text-6xl font-bold'>{t('header.na04')}</h3>
          <h5 className='text-2xl font-medium'>{t('header.na05')}</h5>
        </div>
        <div className='mx-[40px] flex justify-center border-gray-300 bg-gray-300 border-[3px] rounded relative top-[25px] z-50 w-full'>
          <div className='w-[35%] '>
            <Input placeholder={t('header.na06')} className='w-[100%] h-[50px] px-2 hover:border-none' prefix={<LocationIcon className={'w-6 h-6 '} />}
              value={location as string}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='w-[30%]'>
            <RangePicker
              className='w-[100%] h-[50px] hover:border-none'
              onChange={(dates: any) => setDateRange(dates)}
            />
          </div>
          <div className='text-gray-500 hover:text-gray-500 w-[25%]'>
            <Popover
              content={content}
              trigger="click"
              placement="bottom"
              visible={isPopoverVisible}
              onVisibleChange={(visible) => setIsPopoverVisible(visible)}
            >
              <Button className='w-[100%] h-[50px] hover:text-gray-500 justify-start'>
                <Space className='hover:text-gray-300 text-gray-500 '>
                  <PersonalInfoIcon className='w-6 h-6' />
                  {`${adults} ${t('header.na07')} - ${children} ${t('header.na08')} - ${rooms} ${t('header.na09')}`}
                  <ArrowDownIcon className='w-6 h-6' />
                </Space>
              </Button>
            </Popover>
          </div>
          <div className='w-[10%]'>
            <Button
              className="h-[50px] px-[22%] hover:border-none text-[16px] font-bold"
              type="primary"
              icon={<SearchIcon className={'w-6 h-6 '} />}
              onClick={() => {
                if (location && dateRange[0] && dateRange[1]) {
                  window.location.href = `/search?location=${location}&startDate=${`${dateRange[0]?.$d.getFullYear()}-${dateRange[0]?.$d.getMonth() + 1}-${dateRange[0]?.$d.getDate()}`}&endDate=${`${dateRange[1]?.$d.getFullYear()}-${dateRange[1]?.$d.getMonth() + 1}-${dateRange[1]?.$d.getDate()}`}&totalRoom=${rooms}&capacity=${capacity}`;
                } else {
                  toast.warning('Vui lòng điền đầy đủ thông tin.');
                }
              }}
            >
              {t('header.na10')}
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
