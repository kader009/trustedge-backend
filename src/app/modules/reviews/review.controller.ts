import { Request, Response } from 'express';
import { ReviewService } from './review.service';
import { sendErrorResponse } from '../../../utils/sendErrorResponse';
import {
  recalculateAllProductRatings,
  updateProductRating,
} from './review.utils';

export const reviewController = {
  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const reviewData = { ...req.body, user: userId };
      const result = await ReviewService.createReview(reviewData);

      res.status(201).json({
        success: true,
        message: 'Review created successfully',
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.query.productId as string;
      const result = await ReviewService.getAllReviews(productId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  async getSingleReview(req: Request, res: Response): Promise<void> {
    try {
      const result = await ReviewService.getSingleReview(req.params.id);
      if (!result) {
        res.status(404).json({ success: false, message: 'Review not found' });
        return;
      }
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const result = await ReviewService.updateReview(
        req.params.id,
        userId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role;

      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const isAdmin = userRole === 'admin';
      const result = await ReviewService.deleteReview(
        req.params.id,
        userId,
        isAdmin
      );

      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Admin utility: Recalculate single product rating
  async recalculateProductRating(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const result = await updateProductRating(productId);

      res.status(200).json({
        success: true,
        message: 'Product rating recalculated successfully',
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Admin utility: Recalculate all products ratings
  async recalculateAllRatings(req: Request, res: Response): Promise<void> {
    try {
      const results = await recalculateAllProductRatings();

      res.status(200).json({
        success: true,
        message: `Recalculated ratings for ${results.length} products`,
        data: results,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // ==================== ADMIN MODERATION ====================

  // Get pending reviews
  async getPendingReviews(req: Request, res: Response): Promise<void> {
    try {
      const result = await ReviewService.getPendingReviews();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Approve a review
  async approveReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await ReviewService.approveReview(id);

      res.status(200).json({
        success: true,
        message: 'Review approved successfully',
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Unpublish a review
  async unpublishReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      if (!reason) {
        res.status(400).json({
          success: false,
          message: 'Moderation reason is required',
        });
        return;
      }

      const result = await ReviewService.unpublishReview(id, reason);

      res.status(200).json({
        success: true,
        message: 'Review unpublished successfully',
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Get reviews by status
  async getReviewsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;

      if (!['pending', 'published', 'unpublished'].includes(status)) {
        res.status(400).json({
          success: false,
          message:
            'Invalid status. Must be: pending, published, or unpublished',
        });
        return;
      }

      const result = await ReviewService.getReviewsByStatus(
        status as 'pending' | 'published' | 'unpublished'
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // ==================== SEARCH & FILTER ====================

  // Search and filter reviews
  async searchReviews(req: Request, res: Response): Promise<void> {
    try {
      const {
        keyword,
        category,
        rating,
        status,
        isPremium,
        sort,
        order,
        page,
        limit,
      } = req.query;

      const options = {
        keyword: keyword as string,
        category: category as string,
        rating: rating ? Number(rating) : undefined,
        status: status as 'pending' | 'published' | 'unpublished',
        isPremium:
          isPremium === 'true'
            ? true
            : isPremium === 'false'
            ? false
            : undefined,
        sort: sort as 'date' | 'rating' | 'votes',
        order: order as 'asc' | 'desc',
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      };

      const result = await ReviewService.searchAndFilterReviews(options);

      res.status(200).json({
        success: true,
        data: result.reviews,
        pagination: result.pagination,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Get premium reviews
  async getPremiumReviews(req: Request, res: Response): Promise<void> {
    try {
      const result = await ReviewService.getPremiumReviews();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },

  // Get review preview (for premium)
  async getReviewPreview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await ReviewService.getReviewPreview(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  },
};
