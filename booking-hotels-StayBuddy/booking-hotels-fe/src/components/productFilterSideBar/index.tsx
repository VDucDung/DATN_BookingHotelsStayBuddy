/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import FormikTextField from "../formik/FormikTextField";
import Icon from "../icon";
import Divider from "../devider";
import Image from "next/image";
import FormikCheckBox from "../formik/FormikCheckBox";
import { useAppDispatch } from "@/redux";
import { getHotels } from "@/api/hotelService";
import Accordion from "../accordion";
import { ProductFilterSideBarProps } from "@/interfaces/productFilterSideBar";

interface FilterValues {
  search: string;
  startPrice: string;
  endPrice: string;
  address: string;
  rating: number | string;
}
const LOCAL_STORAGE_KEY = "hotelSearchConditions";

const ProductFilterSideBar: React.FC<ProductFilterSideBarProps> = ({
  categoryList,
  addressList,
}) => {
  const ratings = [1, 2, 3, 4, 5];
  const dispatch = useAppDispatch();

  const [accumulatedValues, setAccumulatedValues] = useState<FilterValues>({
    search: "",
    startPrice: "",
    endPrice: "",
    address: "",
    rating: "",
  });

  const initialValues: FilterValues = {
    search: accumulatedValues.search,
    startPrice: accumulatedValues.startPrice,
    endPrice: accumulatedValues.endPrice,
    address: accumulatedValues.address,
    rating: accumulatedValues.rating,
  };

  const saveSearchConditionsToLocal = (values: FilterValues) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
  };

  const loadSearchConditionsFromLocal = () => {
    const savedConditions = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedConditions) {
      setAccumulatedValues(JSON.parse(savedConditions));
    }
  };

  const updateSearchConditions = (newValues: Partial<FilterValues>) => {
    const updatedValues = { ...accumulatedValues, ...newValues };
    setAccumulatedValues(updatedValues);
    saveSearchConditionsToLocal(updatedValues);
    debouncedSearch(updatedValues);
  };

  const searchHotels = (values: FilterValues) => {
    const params = {
      page: 1,
      limit: 20,
      sortBy: "",
      keyword: values.search || undefined,
      startPrice: values.startPrice || undefined,
      endPrice: values.endPrice || undefined,
      rating: values.rating ? values.rating.toString() : undefined,
      address: values.address || undefined
    };
    
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );
  
    dispatch(getHotels(filteredParams));
  };

  const debouncedSearch = useCallback(
    debounce((values: FilterValues) => {
      searchHotels(values);
    }, 500),
    [dispatch]
  );

  const getAddressLabel = (code: string) => {
    const addressItem = addressList.find(item => item.code === code);
    return addressItem ? addressItem.name : "";
  };

  const resetFilters = () => {
    const resetValues = {
      search: "",
      startPrice: "",
      endPrice: "",
      address: "",
      rating: "",
    };
    setAccumulatedValues(resetValues);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    searchHotels(resetValues);
  };

  useEffect(() => {
    loadSearchConditionsFromLocal();
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={searchHotels}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="xl:h-[120px] h-fit flex items-center xl:mt-0 mt-10">
            <FormikTextField
              name="search"
              rightIcon={
                <button type="submit">
                  <Icon name="search" color="white" />
                </button>
              }
              rightIconClassName="bg-emerald-500"
              label="Tìm kiếm"
              value={accumulatedValues.search}
              inputClassName="rounded"
              className="cursor-pointer"
              onChange={(e) => {
                updateSearchConditions({ search: e.target.value });
                setFieldValue("search", e.target.value); 
              }}
            />
          </div>

          <div className="p-4 border rounded-md shadow-md bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Điều kiện đã chọn</h3>
              <button
                type="button"
                onClick={resetFilters}
                className="text-red-500 hover:text-red-700"
              >
                Xóa tất cả
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {accumulatedValues.search && (
                <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded">
                  <span>Tìm kiếm: {accumulatedValues.search}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchConditions({ search: "" })}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
              {accumulatedValues.address && (
                <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded">
                  <span>Khu vực: {accumulatedValues.address}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchConditions({ address: "" })}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
              {accumulatedValues.rating && (
                <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded">
                  <span>Đánh giá: {accumulatedValues.rating} sao</span>
                  <button
                    type="button"
                    onClick={() => updateSearchConditions({ rating: "" })}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border rounded-md shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="category" size={1.5} />
              <h3 className="text-2xl font-medium text-black mb-0">
                Danh mục khách sạn
              </h3>
            </div>
            <Divider color="black" marginTop="10px" />
            <Accordion minHeight="240px" buttonClassName="text-emerald-500">
              {categoryList.map(({ label, image }) => (
                <div
                  key={label}
                  onClick={() => {
                    updateSearchConditions({ search: label });
                    setFieldValue("search", label);
                  }}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-[30px] h-[30px]">
                      <Image src={image} alt={label} width={30} height={30} />
                    </div>
                    <p className="text-lg font-normal mb-0">
                      {label}
                    </p>
                  </div>
                  <Divider color="white-100" />
                </div>
              ))}
            </Accordion>
          </div>

          <div className="p-4 border rounded-md shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="vendor" size={1.5} />
              <h3 className="text-2xl font-medium text-black mb-0">Khu vực</h3>
            </div>
            <Divider color="text-black" marginTop="10px" />
            <Accordion minHeight="180px" buttonClassName="text-emerald">
              <div className="mt-3 ml-2">
                {addressList.map(({ name, code }) => (
                  <FormikCheckBox
                    key={code}
                    label={name}
                    name={`address.${code}`}
                    checked={accumulatedValues.address === name}
                    onChange={() => {
                      const addressLabel = getAddressLabel(code);
                      updateSearchConditions({ address: addressLabel });
                      setFieldValue("address", addressLabel);
                    }}
                  />
                ))}
              </div>
            </Accordion>
          </div>

          <div className="p-4 border rounded-md shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="rating" size={1.5} color="black" />
              <h3 className="text-2xl font-medium text-black mb-0">Đánh giá</h3>
            </div>
            <Divider color="black" marginTop="10px" />
            <div className="flex flex-col gap-2 mt-3">
              {ratings.slice().reverse().map((rating) => (
                <label
                  key={rating}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={accumulatedValues.rating === rating}
                    onChange={() => {
                      updateSearchConditions({ rating: rating });
                      setFieldValue("rating", rating);
                    }}
                    className="sr-only"
                    aria-label={`Rating ${rating} stars`}
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <Icon
                        key={i}
                        name="starContained"
                        size={1.5}
                        color={accumulatedValues.rating === rating ? "yellow-500" : "emerald-500"}
                      />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <Icon
                        key={i}
                        name="starEmpty"
                        size={1.5}
                        color={accumulatedValues.rating === rating ? "yellow-500" : "emerald-500"}
                      />
                    ))}
                  </div>
                  <span className="text-lg text-black font-medium ml-2">
                    {rating === 5 ? "" : "Trở lên"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductFilterSideBar;
