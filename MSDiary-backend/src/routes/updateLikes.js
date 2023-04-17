import { db } from "../database";

export const updateLikes = {
  method: 'POST',
  path: '/api/movie/likes/update',
  handler: async (req, h) => {
    const { movieId, userId } = req.payload;
    const liked = 1;

    try {
      await db.query(
        'INSERT INTO likes (user_id, movie_id, liked) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE liked = 1-liked',
        [userId, movieId, liked]
      );
      return { message: `Successfully updated like status for user ${userId} and movie ${movieId}`, userId, movieId };
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal Server Error', message: err.message }).code(500);
    }
  }
};