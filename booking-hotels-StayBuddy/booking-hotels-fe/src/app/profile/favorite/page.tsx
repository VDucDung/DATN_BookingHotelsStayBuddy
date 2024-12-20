/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getFavorites } from "@/api/favoriteService";
import images from "@/assets/images";
import FormikTextField from "@/components/formik/FormikTextField";
import HotelCard from "@/components/hotelCard";
import Icon from "@/components/icon";
import Loading from "@/components/loading";
import PaginationApp from "@/components/pagination";
import { useAppDispatch, useAppSelector } from "@/redux";
import { Form, Formik } from "formik";
import Image from "next/image";

import { useCallback, useEffect, useState } from "react";

function Favorite() {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useAppDispatch();
  const { favorites, detailResult, loading, error } = useAppSelector((state) => state.favorites);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const fetchHotels = useCallback(() => {
    dispatch(getFavorites({
      page: currentPage + 1,
      limit: 20,
      sortBy: "",
      keyword: "",
    }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  if (loading) {
    return <Loading className="mt-5 mx-auto" />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5">
        {error}
      </div>
    );
  }

  
  const handleSearch = (values: any) => {
      dispatch(getFavorites({
        page: 1,
        limit: 20,
        sortBy: "",
        keyword: values.search,
      }));
  };

  
  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-black shadow-md p-4">
        Danh sách yêu thích
      </h2>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={handleSearch}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="h-fit flex items-center mt-14">
              <FormikTextField
                name="search"
                rightIcon={<Icon name="search" color="white" className="cursor-pointer"  onClick={() => handleSubmit()}/>}
                rightIconClassName="bg-emerald-500"
                label="Tìm kiếm"
                inputClassName="rounded"
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {favorites?.length > 0 ? (favorites?.map((favorite) => (
          <HotelCard
            key={favorite?.id}
            avgRating={favorite?.avgRating}
            id={favorite?.id}
            hotelName={favorite?.hotelName}
            totalReviews={favorite?.totalReviews || 0}
            images={favorite?.images[0]}
            address={favorite?.address}
            onLikeSuccess={fetchHotels}
            favorites={true}
          />
        ))): (
          <div className="col-span-3 mt-3">
          <Image src={images.empty} alt="empty" width={300} height={300} className="mx-auto" />
          <div className="text-center mt-3">Không tìm thấy nào</div>
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
  );
}

export default Favorite;
