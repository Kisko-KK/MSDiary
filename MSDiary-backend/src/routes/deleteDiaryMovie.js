import { db } from "../database";
import * as admin from 'firebase-admin'

export const deleteDiaryMovie = {
    method: 'DELETE',
    path: '/api/diary/{movieId}',
    handler: async (req, h) => {
        const movieId = req.params.movieId;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token)
        const userId = user.user_id;
        const {results} = await db.query(
            'DELETE FROM diary_movies WHERE user_id = ? AND movie_id = ?',
            [userId, movieId]
        );
        return results;
    }
}