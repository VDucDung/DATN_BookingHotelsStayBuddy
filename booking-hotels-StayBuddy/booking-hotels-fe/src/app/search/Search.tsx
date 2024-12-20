/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import PaginationApp from "@/components/pagination";
import ProductFilterSideBar from "@/components/productFilterSideBar";
import Loading from "@/components/loading";
import images from "@/assets/images";
import { useAppDispatch, useAppSelector } from "@/redux";
import { getHotels } from "@/api/hotelService";
import { getCategories } from "@/api/categoryService";
import ProductFilterTopBar from "@/components/productFilterTopBar";
import HotelCard from "@/components/hotelCard";
import { FetchHotelParams, FormValues, SearchParams } from "@/interfaces/search";



function Search() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const {user, isLogin} = useAppSelector((state) => state.auth);
  const params = useMemo((): SearchParams => ({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    totalRoom: searchParams.get('totalRoom') || '',
    capacity: searchParams.get('capacity') || '',
    address: searchParams.get('address') || '',
  }), [searchParams]);

  const { hotels, detailResult, loading, error } = useAppSelector((state) => state.hotels);
  const { categories } = useAppSelector((state) => state.categories);

  const getSearchKeyword = useMemo(() => {
    if (params.location && !params.keyword) return params.location;
    if (params.keyword && !params.location) return params.keyword;
    return '';
  }, [params.keyword, params.location]);

  const fetchParams = useMemo((): FetchHotelParams => ({
    page: currentPage + 1,
    limit: 20,
    sortBy: '',
    keyword: getSearchKeyword,
    startDate: params.startDate,
    endDate: params.endDate,
    totalRoom: params.totalRoom,
    capacity: params.capacity,
    address: params.address
  }), [currentPage, getSearchKeyword, params.startDate, params.endDate, params.totalRoom, params.capacity, params.address]);

  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(getCategories());
      dispatch(getHotels(fetchParams));
    };

    loadInitialData();
  }, [dispatch, fetchParams]);

  const fetchHotels = useCallback(() => {
    dispatch(getHotels(fetchParams));
  }, [dispatch, fetchParams]);

  useEffect(() => {
    fetchHotels();
  }, [fetchParams, fetchHotels]);

  const addressList = useMemo(() =>
    categories.map(item => ({
      name: item.name as string,
      code: item.id as string
    })),
    [categories]
  );

  const categoryList = useMemo(() =>
    hotels.map(item => ({
      label: item.hotelName,
      image: item.images[0],
    })),
    [hotels]
  );

  const initialValues: FormValues = {
    rating: 1,
    displayOption: "newest",
    maxPrice: "",
    minPrice: "",
    displayOptions: {},
    price: "",
    search: "",
    address: "",
  };

  const handlePageChange = useCallback(({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  }, []);

  const handleSubmit = (values: FormValues) => {
    const filterParams = {
      ...fetchParams,
      minPrice: values.minPrice,
      maxPrice: values.maxPrice,
      rating: values.rating.toString()
    };
    dispatch(getHotels(filterParams));
  };

  if (loading) return <Loading className="mt-5 mx-auto" />;
  if (error) return <div className="text-red-500 text-center mt-5">{error}</div>;

  return (
    <div className="container mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="container pt-[125px]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 xl:block hidden">
                  <ProductFilterSideBar
                    values={values}
                    setFieldValue={setFieldValue}
                    addressList={addressList}
                    categoryList={categoryList}
                  />
                </div>

                <div className="xl:col-span-9 col-span-full">
                  <ProductFilterTopBar
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels?.length > 0 ? (
                      hotels.map((item) => (
                        <HotelCard
                          key={item?.id}
                          avgRating={item?.avgRating}
                          id={item?.id}
                          hotelName={item?.hotelName}
                          address={item.address}
                          totalReviews={item.totalReviews ?? 0}
                          images={item?.images[0]}
                          favorites={isLogin && item?.favorites?.length > 0 
                            ? item.favorites.some((favorite: any) => {
                                return favorite?.user?.id === user?.id;
                              })
                            : false}
                          onLikeSuccess={fetchHotels}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 mt-3">
                        <Image
                          src={images.empty}
                          alt="empty"
                          width={300}
                          height={300}
                          className="mx-auto"
                        />
                        <div className="text-center mt-3">
                          Không tìm thấy kết quả nào
                        </div>
                      </div>
                    )}
                  </div>

                  <PaginationApp
                    pageCount={detailResult?.totalPages}
                    onPageChange={handlePageChange}
                    forcePage={currentPage}
                    className="ml-auto mt-10"
                  />
                </div>

                <div className="col-span-full xl:hidden block">
                  <ProductFilterSideBar
                    values={values}
                    setFieldValue={setFieldValue}
                    addressList={addressList}
                    categoryList={categoryList}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Search;
