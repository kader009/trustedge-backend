import { Review } from './review.model';
import { IReview } from './review.interface';
import { Product } from '../products/product.model';
import { Types } from 'mongoose';

const createReview = async (payload: IReview) => {
  // Check if user already reviewed this product
  const existing = await Review.findOne({
    product: payload.product,
    user: payload.user,
  });

  if (existing) {
    throw new Error('You have already reviewed this product.');
  }

  const review = await Review.create(payload);

  // Update Product rating after save
  const productId =
    typeof payload.product === 'string'
      ? new Types.ObjectId(payload.product)
      : payload.product;

  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        numReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(payload.product, {
      numReviews: stats[0].numReviews,
      ratings: Math.round(stats[0].avgRating * 10) / 10, // Round to 1 decimal
    });
  }

  return review;
};

const getAllReviews = async (productId?: string) => {
  const filter = productId ? { product: productId } : {};
  return await Review.find(filter)
    .populate('user', 'name email')
    .populate('product', 'title slug price');
};

const getSingleReview = async (id: string) => {
  return await Review.findById(id)
    .populate('user', 'name email')
    .populate('product', 'title slug price');
};

const updateReview = async (
  id: string,
  userId: string,
  payload: Partial<IReview>
) => {
  const review = await Review.findById(id);
  if (!review) throw new Error('Review not found.');
  if (review.user.toString() !== userId) throw new Error('Unauthorized.');

  const updated = await Review.findByIdAndUpdate(id, payload, { new: true });

  // Recalculate product rating
  const productId =
    typeof review.product === 'string'
      ? new Types.ObjectId(review.product)
      : review.product;

  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        numReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Product.findByIdAndUpdate(review.product, {
    numReviews: stats[0]?.numReviews || 0,
    ratings: stats[0]?.avgRating ? Math.round(stats[0].avgRating * 10) / 10 : 0,
  });

  return updated;
};

const deleteReview = async (id: string, userId: string, isAdmin = false) => {
  const review = await Review.findById(id);
  if (!review) throw new Error('Review not found.');

  if (!isAdmin && review.user.toString() !== userId)
    throw new Error('Unauthorized.');

  await Review.findByIdAndDelete(id);

  // Update product stats
  const productId =
    typeof review.product === 'string'
      ? new Types.ObjectId(review.product)
      : review.product;

  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        numReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Product.findByIdAndUpdate(review.product, {
    numReviews: stats[0]?.numReviews || 0,
    ratings: stats[0]?.avgRating ? Math.round(stats[0].avgRating * 10) / 10 : 0,
  });

  return { message: 'Review deleted successfully.' };
};

// ==================== ADMIN MODERATION ====================

// Get pending reviews (awaiting approval)
const getPendingReviews = async () => {
  return await Review.find({ status: 'pending' })
    .populate('user', 'name email image')
    .populate('product', 'title slug images')
    .sort({ createdAt: -1 });
};

// Approve a review (pending → published)
const approveReview = async (reviewId: string) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.status === 'published') {
    throw new Error('Review is already published');
  }

  review.status = 'published';
  review.moderationReason = undefined; // Clear any previous reason
  await review.save();

  return await Review.findById(reviewId)
    .populate('user', 'name email')
    .populate('product', 'title slug');
};

// Unpublish a review (published → unpublished)
const unpublishReview = async (reviewId: string, reason: string) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.status === 'unpublished') {
    throw new Error('Review is already unpublished');
  }

  if (!reason || reason.trim().length === 0) {
    throw new Error('Moderation reason is required');
  }

  review.status = 'unpublished';
  review.moderationReason = reason;
  await review.save();

  return await Review.findById(reviewId)
    .populate('user', 'name email')
    .populate('product', 'title slug');
};

// Get reviews by status
const getReviewsByStatus = async (
  status: 'pending' | 'published' | 'unpublished'
) => {
  return await Review.find({ status })
    .populate('user', 'name email image')
    .populate('product', 'title slug images')
    .sort({ createdAt: -1 });
};

// ==================== SEARCH & FILTER ====================

interface SearchFilterOptions {
  keyword?: string;
  category?: string;
  rating?: number;
  status?: 'pending' | 'published' | 'unpublished';
  isPremium?: boolean;
  sort?: 'date' | 'rating' | 'votes';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

const searchAndFilterReviews = async (options: SearchFilterOptions) => {
  const {
    keyword,
    category,
    rating,
    status = 'published', // Default: only show published reviews
    isPremium,
    sort = 'date',
    order = 'desc',
    page = 1,
    limit = 10,
  } = options;

  // Build filter query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = { status };

  // Text search
  if (keyword) {
    filter.$text = { $search: keyword };
  }

  // Filter by rating
  if (rating) {
    filter.rating = rating;
  }

  // Filter by premium status
  if (isPremium !== undefined) {
    filter.isPremium = isPremium;
  }

  // Build sort object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortObj: any = {};
  switch (sort) {
    case 'date':
      sortObj.createdAt = order === 'asc' ? 1 : -1;
      break;
    case 'rating':
      sortObj.rating = order === 'asc' ? 1 : -1;
      break;
    case 'votes':
      // Sort by net votes (upvotes - downvotes)
      sortObj.upvoteCount = order === 'asc' ? 1 : -1;
      break;
    default:
      sortObj.createdAt = -1;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get reviews with population
  let query = Review.find(filter)
    .populate('user', 'name email image')
    .populate('product', 'title slug images category')
    .sort(sortObj)
    .skip(skip)
    .limit(limit);

  // If category filter, we need to populate and filter
  if (category) {
    query = query.populate({
      path: 'product',
      match: { category: category },
      select: 'title slug images category',
    });
  }

  const reviews = await query;

  // Filter out null products (if category didn't match)
  const filteredReviews = category
    ? reviews.filter((review) => review.product !== null)
    : reviews;

  // Get total count for pagination
  const total = await Review.countDocuments(filter);

  return {
    reviews: filteredReviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get premium reviews only
const getPremiumReviews = async () => {
  return await Review.find({ isPremium: true, status: 'published' })
    .populate('user', 'name email image')
    .populate('product', 'title slug images')
    .sort({ createdAt: -1 });
};

// Get review preview (for premium reviews - first 100 chars)
const getReviewPreview = async (reviewId: string) => {
  const review = await Review.findById(reviewId)
    .populate('user', 'name email image')
    .populate('product', 'title slug images');

  if (!review) {
    throw new Error('Review not found');
  }

  if (!review.isPremium) {
    // If not premium, return full review
    return review;
  }

  // Return preview only (first 100 characters)
  return {
    ...review.toObject(),
    description: review.description.substring(0, 100) + '...',
    isPreview: true,
  };
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,

  // Admin Moderation
  getPendingReviews,
  approveReview,
  unpublishReview,
  getReviewsByStatus,

  // Search & Filter
  searchAndFilterReviews,
  getPremiumReviews,
  getReviewPreview,
};
