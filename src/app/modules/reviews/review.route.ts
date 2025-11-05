import express from 'express';
import { reviewController } from './review.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getSingleReview);

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

export const reviewRoutes = router;
