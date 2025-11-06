import { Router } from 'express';
import { commentController } from './comment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Create a new comment (requires authentication)
router.post(
  '/',
  authMiddleware(['user', 'admin']),
  commentController.createComment
);

// Get all comments for a review (public - no auth needed)
router.get('/review/:reviewId', commentController.getReviewComments);

// Get a single comment by ID (public)
router.get('/:id', commentController.getSingleComment);

// Get replies to a specific comment (public)
router.get('/replies/:commentId', commentController.getCommentReplies);

// Update a comment (only by owner)
router.put(
  '/:id',
  authMiddleware(['user', 'admin']),
  commentController.updateComment
);

// Delete a comment - soft delete (by owner or admin)
router.delete(
  '/:id',
  authMiddleware(['user', 'admin']),
  commentController.deleteComment
);

// Hard delete a comment - permanent removal (admin only)
router.delete(
  '/hard-delete/:id',
  authMiddleware(['admin']),
  commentController.hardDeleteComment
);

// Get comment count for a review (public)
router.get('/count/:reviewId', commentController.getCommentCount);

// Get all comments by current user (requires authentication)
router.get(
  '/user/my-comments',
  authMiddleware(['user', 'admin']),
  commentController.getUserComments
);

export const commentRoutes = router;
