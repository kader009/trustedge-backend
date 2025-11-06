import { Types } from 'mongoose';

export interface IReview {
  _id?: Types.ObjectId;
  product: Types.ObjectId; // Relation with Product
  user: Types.ObjectId; // Relation with User

  // Basic Review Info
  title: string; // Review title
  description: string; // Detailed review text
  rating: number; // 1-5 scale
  comment?: string; // Short comment (optional, backward compatible)
  images?: string[]; // Review images
  purchaseSource?: string; // Where user bought the product

  // Status & Moderation
  status: 'pending' | 'published' | 'unpublished'; // Review status
  moderationReason?: string; // Admin's reason for unpublishing

  // Premium Features
  isPremium: boolean; // Is this a premium review?
  price?: number; // Price for premium review

  // Counts
  upvoteCount?: number; // Total upvotes
  downvoteCount?: number; // Total downvotes
  commentCount?: number; // Total comments

  createdAt?: Date;
  updatedAt?: Date;
}
