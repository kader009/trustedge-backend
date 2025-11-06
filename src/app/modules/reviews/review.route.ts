import express from 'express';
import { reviewController } from './review.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getSingleReview);

// Search & Filter routes (public)
router.get('/search/reviews', reviewController.searchReviews);
router.get('/premium/all', reviewController.getPremiumReviews);
router.get('/preview/:id', reviewController.getReviewPreview);

// Protected routes (user + admin)
router.post(
  '/',
  authMiddleware(['user', 'admin']),
  reviewController.createReview
);

router.patch(
  '/:id',
  authMiddleware(['user', 'admin']),
  reviewController.updateReview
);

router.delete(
  '/:id',
  authMiddleware(['user', 'admin']),
  reviewController.deleteReview
);

// Admin moderation routes
router.get(
  '/admin/pending',
  authMiddleware(['admin']),
  reviewController.getPendingReviews
);

router.get(
  '/admin/status/:status',
  authMiddleware(['admin']),
  reviewController.getReviewsByStatus
);

router.patch(
  '/admin/approve/:id',
  authMiddleware(['admin']),
  reviewController.approveReview
);

router.patch(
  '/admin/unpublish/:id',
  authMiddleware(['admin']),
  reviewController.unpublishReview
);

// Admin utility routes
router.post(
  '/admin/recalculate-all',
  authMiddleware(['admin']),
  reviewController.recalculateAllRatings
);

router.post(
  '/admin/recalculate/:productId',
  authMiddleware(['admin']),
  reviewController.recalculateProductRating
);

export const reviewRoutes = router;
