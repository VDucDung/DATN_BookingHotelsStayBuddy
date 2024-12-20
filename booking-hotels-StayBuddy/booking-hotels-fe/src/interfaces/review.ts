import { sortByType } from "@/type/sortBy";
import { User } from "./user";
import { Hotel } from "./hotel";

export interface ReviewReply{
  id: string | number;
  review: Reviews;
  user: User;
  content: string;
  createdAt:Date;
}

export interface Reviews {
  id: string | number;
  comment: string;
  images: string[];
  rating: number;
  userId: User;
  replies: ReviewReply[];
  createdAt: Date;
}

export interface ReviewDto {
  id?: number;
  comment: string;
  images: File[] | string[];
  hotelId?: number;
  rating: number;
  guest?: string
}

export interface Statistics {
  averageRating: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ratingDistribution: any;
  totalReviews: number
}

export interface GetReviewsResponse{
  statusCode: number;
  message: string;
  data: {
    review: Reviews[],
    statistics: Statistics;
  }
}

export interface ReviewsState {
  reviews: Reviews[] | [];
  statistics: Statistics;
  loading: boolean;
  statusCode: number | null;
  error: string | null;
  message: string;
}
export enum HasImages {
  True = 'true',
  False = 'false',
  All = 'all',
}

export interface ReviewProps {
  hotel: Hotel;
}

export interface FilterState {
  sortByCreatedAt: sortByType;
  hasImages: HasImages;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface star {
    oneStar: number;
    twoStars: number;
    threeStars: number;
    fourStars: number;
    fiveStars: number;
}
export interface RatingDistributionProps {
  ratingDistribution: star
}
