import { Types } from 'mongoose';

export interface IComment {
  _id?: Types.ObjectId;
  review: Types.ObjectId; // Which review this comment belongs to
  user: Types.ObjectId; // Who posted the comment
  text: string; // Comment content
  parentComment?: Types.ObjectId; // For nested replies (optional)
  isDeleted?: boolean; // Soft delete for admin moderation
  createdAt?: Date;
  updatedAt?: Date;
}
