import { db } from "../database";
import * as admin from 'firebase-admin'

export const updateWatches = {
  method: 'POST',
  path: '/api/movie/watches/update',
  handler: async (req, h) => {
    const { movieId } = req.payload;
    const watched = 1;

    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userId = user.user_id;

    try {
      await db.query(
        'INSERT INTO watches (user_id, movie_id, watched) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE watched = 1-watched',
        [userId, movieId, watched]
      );
      return { message: `Successfully updated watched status for user ${userId} and movie ${movieId}`, userId, movieId };
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal Server Error', message: err.message }).code(500);
    }
  }
};