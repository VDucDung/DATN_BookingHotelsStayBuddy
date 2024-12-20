/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import CustomButton from "../button/CustomButton";
// import FormikAutoComplete from "../formik/FormikAutoComplete";
import { useAppDispatch } from "@/redux";
import { getHotels } from "@/api/hotelService";

// interface Option {
//   label: string;
//   value: string;
// }

interface ProductFilterTopBarProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: {
    displayOption: string;
    price: string;
  };
}

const ProductFilterTopBar: React.FC<ProductFilterTopBarProps> = ({ setFieldValue, values }) => {
  const [sortBy, setSortBy] = useState(""); 
  const dispatch = useAppDispatch();
  // const priceOptions: Option[] = [
  //   {
  //     label: "Giá: Tăng dần",
  //     value: "desc",
  //   },
  //   {
  //     label: "Giá: Giảm dần",
  //     value: "asc",
  //   },
  // ];

  // const displayOptions: Option[] = [
  //   {
  //     label: "Mới nhất",
  //     value: "newest",
  //   },
  //   {
  //     label: "Đánh giá cao nhất",
  //     value: "highestRating",
  //   },
  // ];

  useEffect(() => {
    if (sortBy) { // Kiểm tra nếu sortBy có giá trị
      dispatch(getHotels({
        page: 1,
        limit: 20,
        sortBy: sortBy,
        keyword: "", // Nếu cần, có thể thêm keyword từ state
      }));
    }
  }, [sortBy, dispatch]);
  return (
    <div className="flex gap-x-4 mb-4 bg-white shadow-md xl:h-[120px] h-fit px-3 xl:py-0 py-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-lg font-medium hidden sm:block">Hiển thị theo</div>
        <CustomButton
          type="button"
          height="50px"
          className={clsx("text-lg hover:text-black hidden sm:block", {
            "bg-yellow-500 text-black hover:text-white":
              values.displayOption === "newest",
          })}
          onClick={() => {
            setFieldValue("displayOption", "newest")
            setSortBy("createdAt:desc")
          }}
        >
          Mới nhất
        </CustomButton>
        <CustomButton
          type="button"
          height="50px"
          className={clsx("text-lg hover:text-black hidden sm:block", {
            "bg-yellow-500 text-black hover:text-white":
              values.displayOption === "highestRating",
          })}
          onClick={() =>{
            setFieldValue("displayOption", "highestRating")
            setSortBy("rating:desc")
          }}
        >
          Đánh giá cao nhất
        </CustomButton>

        {/* <div className="flex-2 sm:w-[300px] w-full xl:mt-0 mt-7 sm:hidden block">
        <FormikAutoComplete
          name="displayOptions"
          options={displayOptions}
          label="Hiển thị theo"
          getOptionLabel={(opt: Option) => opt.label}
          isEqualValue={(opt: Option, val: Option) => opt.value === val.value}
        />
        </div>

        <div className="flex-2 sm:w-[300px] w-full xl:mt-0 mt-7 ml-[220px]">
          <FormikAutoComplete
            name="price"
            options={priceOptions}
            label="Sắp xếp theo giá"
            getOptionLabel={(opt: Option) => opt.label}
            isEqualValue={(opt: Option, val: Option) => opt.value === val.value}
          />
        </div> */}
      </div>
      
    </div>
  );
};

export default ProductFilterTopBar;
