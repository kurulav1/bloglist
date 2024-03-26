const router = require('express').Router();
const Comment = require('../models/comment');
const { userExtractor } = require('../utils/middleware');

router.get('/', async (request, response) => {
  try {
    const comments = await Comment.find({}).populate('user', { username: 1, name: 1 });
    response.json(comments);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post('/', userExtractor, async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  const comment = new Comment({
    content: request.body.content,
    user: user._id,
  });

  try {
    const savedComment = await comment.save();
    response.status(201).json(savedComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.delete('/:id', userExtractor, async (request, response) => {
  const commentId = request.params.id;
  const user = request.user;

  try {
    const comment = await Comment.findById(commentId);

    if (!user || !comment || comment.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' });
    }

    await comment.remove();
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = router;
