/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Star, MessageCircle, Trash2, Plus, X, ImageIcon } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { createRatingByPartner, deleteRating, findHotelByPartnerId, getRatingByPartner } from '@/api/dashboarService';
import { ReviewDto } from '@/interfaces/review';
import queryClient from '@/reactQuery/reactQueryClient';

interface RatingData {
  id: number;
  hotelId: {
    id: number;
    hotelName: string;
  };
  comment: string;
  images: string[] | null;
  rating: number;
  createdAt: string;
  updatedAt?: string;
  deleted?: boolean;
  status?: 'PUBLISHED' | 'HIDDEN';
}

const RatingManagement: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedHotels, setExpandedHotels] = useState<{ [key: number]: boolean }>({});
  const [deleteRatingId, setDeleteRatingId] = useState<number | null>(null);
  const [hotelId, setHotelId] = useState<number>();
  const [comment, setComment] = useState<string>();
  const [guest, setGuest] = useState<string>();
  const [rating, setRating] = useState<number>(5);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));

  const { data: hotels } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => findHotelByPartnerId(),
  });

  const { data: ratingsResponse, error } = useQuery({
    queryKey: ['ratings'],
    queryFn: getRatingByPartner
  });

  const createRatingMutation = useMutation({
    mutationFn: createRatingByPartner,
    onSuccess: () => {
      toast.success('Thêm đánh giá thành công');
      setIsAddModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    }
  });

  const deleteRatingMutation = useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      toast.success('Xóa đánh giá thành công');
      setDeleteRatingId(null);
      queryClient.invalidateQueries({ queryKey: ['ratings'] });

    }
  });

  const toggleHotelExpand = (hotelId: number) => {
    setExpandedHotels(prev => ({
      ...prev,
      [hotelId]: !prev[hotelId]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill={index < rating ? '#fbbf24' : 'none'}
      />
    ));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment || !rating || !hotelId) {
      toast.error('Please fill in all fields');
      return;
    }

    const newRating: ReviewDto = {
      guest,
      comment,
      hotelId,
      rating,
      images: selectedFiles,
    };

    createRatingMutation.mutate(newRating)
  };

  const groupedReviews = ratingsResponse?.reduce((acc: any, review: RatingData) => {
    const hotelId = review.hotelId.id;
    if (!acc[hotelId]) {
      acc[hotelId] = {
        hotelName: review.hotelId.hotelName,
        reviews: []
      };
    }
    acc[hotelId].reviews.push(review);
    return acc;
  }, {});

  const renderAddModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Thêm Đánh Giá Mới</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên khách hàng</label>
            <input type="text"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Nhập bình luận của bạn"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Khách Sạn</label>
            <select
              value={hotelId || ''}
              onChange={(e) => setHotelId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a hotel</option>
              {hotels?.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotelName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Đánh Giá</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={30}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill={star <= rating ? '#fbbf24' : 'none'}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bình Luận</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-2 h-24"
              placeholder="Nhập bình luận của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Images</label>
            <div className="flex items-center">
              <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                <ImageIcon size={20} className="mr-2" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-5 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      width={100}
                      height={100}
                      src={src}
                      alt={`Room image ${index + 1}`}
                      className="w-full h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* <p className='font-semibold text-black mt-4'>Please upload at least 2 images</p> */}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm Đánh Giá
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteConfirmModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Xóa Đánh Giá</h2>
          <p className="text-center text-gray-600 mb-6">
            Bạn có chắc chắn muốn xóa đánh giá này?
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setDeleteRatingId(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              onClick={() => deleteRatingId && deleteRatingMutation.mutate(deleteRatingId)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Không thể tải đánh giá.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Star className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white mb-0">Quản Lý Đánh Giá</h2>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Thêm Đánh Giá
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!groupedReviews || Object.keys(groupedReviews).length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Không có đánh giá nào.
            </div>
          ) : (
            Object.entries(groupedReviews).map(([hotelId, hotelData]: [string, any]) => (
              <div
                key={hotelId}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-4"
              >
                <div
                  onClick={() => toggleHotelExpand(parseInt(hotelId))}
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {hotelData.hotelName}
                  </h3>
                  <span className="text-gray-500">
                    {hotelData.reviews.length} đánh giá
                  </span>
                </div>

                {expandedHotels[parseInt(hotelId)] && (
                  <div className="p-4 space-y-4">
                    {hotelData.reviews.map((rating: RatingData) => (
                      <div
                        key={rating.id}
                        className="border-b last:border-b-0 pb-4 last:pb-0"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            {renderStars(rating.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(rating.createdAt)}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-2">{rating.comment}</p>

                        {rating.images && rating.images.length > 0 && (
                          <div className="flex space-x-2 mt-2">
                            {rating.images.map((imageUrl, index) => (
                              <Image
                                key={index}
                                src={imageUrl}
                                alt={`Review image ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                              />
                            ))}
                          </div>
                        )}

                        <div className="flex space-x-3 mt-3">
                          <button className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors" onClick={() => {
                            toast.success('Tính năng không khả dụng')
                          }}>
                            <MessageCircle size={16} />
                            <span>Trả Lời</span>
                          </button>
                          <button
                            onClick={() => setDeleteRatingId(rating.id)}
                            className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {isAddModalOpen && renderAddModal()}
      {deleteRatingId && renderDeleteConfirmModal()}
    </div>
  );
};

export default RatingManagement;
