/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { getReviews } from '@/api/reviewService';
import Loading from '@/components/loading';
import { sortByType } from '@/type/sortBy';
import Image from 'next/image';
import { FilterState, HasImages, RatingDistributionProps, ReviewProps, Reviews } from '@/interfaces/review';
import { formatDate } from '@/utils/formatDate';

const RatingDistribution: React.FC<RatingDistributionProps> = ({ ratingDistribution }) => {
  const entries = [
    ['5 sao', ratingDistribution.fiveStars],
    ['4 sao', ratingDistribution.fourStars],
    ['3 sao', ratingDistribution.threeStars],
    ['2 sao', ratingDistribution.twoStars],
    ['1 sao', ratingDistribution.oneStar],
  ];

  const total = Object.values(ratingDistribution).reduce((sum, current) => sum + current, 0);

  return (
    <div className="flex-none w-48">
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <div className="text-sm min-w-16">{key}</div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{
                  width: total > 0 ? `${(value as number / total) * 100}%` : '0%'
                }}
              />
            </div>
            <div className="text-sm text-gray-500 min-w-8 text-right">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewFilters: React.FC<{
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: keyof FilterState, value: boolean | string | sortByType | Date) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex gap-4 text-sm border-t border-b py-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sort by</span>
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => handleFilterChange('sortByCreatedAt', e.target.value as sortByType)}
          value={filters.sortByCreatedAt}
        >
          <option value="DESC">Newest first</option>
          <option value="ASC">Oldest first</option>
        </select>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <input
          type="checkbox"
          className="rounded cursor-pointer"
          checked={filters.hasImages === HasImages.True}
          onChange={(e) => handleFilterChange('hasImages', e.target.checked ? HasImages.True : HasImages.All)}
        />
        <span>Show Reviews with Photos</span>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: {review: Reviews}) => (
  <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
    <div className="flex gap-4 mb-4">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-500">
        {review?.userId?.fullname && review.userId.fullname.charAt(0).toUpperCase()}
      </div>
      <div className="flex-grow">
        <div className="font-semibold text-lg">{review.userId.fullname}</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
            <span className="text-blue-500 ml-2">{review.rating}</span>
            <span className="text-gray-400 text-sm">&nbsp;/ 5</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{formatDate(review.createdAt)}</span>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <p className="text-gray-700">{review.comment}</p>

      {review?.images && review.images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-4">
          {review.images.map((image: any, index: number) => (
            <div key={index} className="relative w-32 h-24 overflow-hidden rounded-lg">
              <Image
                width={300}
                height={300}
                src={image}
                alt={`Review image ${index + 1}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {review.replies && review.replies.length > 0 && (
        <div className="mt-6 pl-4 border-l-2 border-gray-200">
          {review.replies.map((reply: any, index: number) => (
            <div key={index} className="mt-4 first:mt-0">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-base text-gray-500">
                  {reply.user?.fullname?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{reply.user.fullname}</span>
                    <span className="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
                    <p className="mt-2 text-gray-700">{reply.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Review: React.FC<ReviewProps> = ({ hotel }) => {
  const dispatch = useAppDispatch();
  const { reviews, statistics, loading, error } = useAppSelector((state) => state.reviews);
  const [filters, setFilters] = useState<FilterState>({
    sortByCreatedAt: "DESC",
    hasImages: HasImages.All,
    page: 1,
    limit: 10
  });

  useEffect(() => {
    if (hotel?.id) {
      dispatch(getReviews({
        hotelId: hotel.id,
        ...filters
      }));
    }
  }, [dispatch, hotel, filters]);

  if (loading) return <Loading className="mt-5 mx-auto" />;
  if (error) return <div className="text-red-500 text-center mt-5">{error}</div>;
  if (!statistics) return null;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        More Reviews from Other Guests in {hotel?.hotelName}
      </h2>

      <div className="mb-8">
        <h3 className="font-semibold mb-4">Overall Rating & Reviews</h3>

        <div className="flex gap-8 mb-6">
          <div className="flex-none">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">
                  {statistics.averageRating?.toFixed(1)}
                </div>
                <div className="text-blue-500">Impressive</div>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-24 text-sm">
                Traveloka ({statistics.totalReviews})
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              From {statistics.totalReviews} verified guests reviews
            </div>
          </div>

          <RatingDistribution ratingDistribution={statistics.ratingDistribution} />
        </div>

        <ReviewFilters filters={filters} onFiltersChange={setFilters} />

        {reviews?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Review;
