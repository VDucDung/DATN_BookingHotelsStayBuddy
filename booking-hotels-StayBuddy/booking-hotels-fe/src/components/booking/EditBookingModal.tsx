/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { EditBookingModalProps, TicketParam } from "@/interfaces/ticket";
import { X } from "lucide-react";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { useClientTranslation } from "@/i18n/client";

const EditBookingModal: React.FC<EditBookingModalProps> = ({ booking, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<TicketParam | null>(null);
  const [rawInput, setRawInput] = useState("");
  const { t } = useClientTranslation('Common');

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "option") {
      setRawInput(value);
    } else {
      setFormData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
    }
  };

  const handleDateChange = (field: string, date: Moment | null) => {
    setFormData((prevData) => {
      if (prevData) {
        return { ...prevData, [field]: date ? date.toISOString() : null };
      }
      return null;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  const handleBlur = () => {
    setFormData((prevData) =>
      prevData
        ? {
          ...prevData,
          option: rawInput.split(",").map((option) => option.trim()).filter((option) => option !== ""),
        }
        : null
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 mt-[115px]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold">{t("dashboard.booking.title01")}</h3>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-200 p-2"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title02")}</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData?.contactName || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title03")}</label>
                <input
                  type="text"
                  name="option"
                  value={rawInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Comma-separated options"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title04")}</label>
                <input
                  type="text"
                  name="checkInTime"
                  value={formData?.checkInTime || ""}
                  onChange={handleChange}
                  placeholder="e.g., 15:00"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title05")}</label>
                <input
                  type="text"
                  name="checkOutTime"
                  value={formData?.checkOutTime || ""}
                  onChange={handleChange}
                  placeholder="e.g., 11:00"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title06")}</label>
                <DatePicker
                  value={formData?.checkInDate ? moment(formData.checkInDate) : null}
                  onChange={(date) => handleDateChange("checkInDate", date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  format="YYYY-MM-DD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title07")}</label>
                <DatePicker
                  value={formData?.checkOutDate ? moment(formData.checkOutDate) : null}
                  onChange={(date) => handleDateChange("checkOutDate", date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  format="YYYY-MM-DD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title08")}</label>
                <input
                  type="number"
                  name="amount"
                  value={formData?.amount || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title09")}</label>
                <input
                  type="text"
                  name="paymentMethods"
                  value={formData?.paymentMethods || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("dashboard.booking.title10")}</label>
                <select
                  name="status"
                  value={formData?.status || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="paid">{t("dashboard.booking.title11")}</option>
                  <option value="pending">{t("dashboard.booking.title12")}</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-t px-6 py-4 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              {t("dashboard.booking.title13")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t("dashboard.booking.title14")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
