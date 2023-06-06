import { db } from "../database";
import * as admin from 'firebase-admin'

export const addNewMovieToDiary = {
    method: 'POST',
    path: '/api/diary',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.user_id;
        
        const { movieId, description, score, watchAgain } = req.payload;
        await db.query(
            'INSERT INTO diary_movies (user_id, movie_id, description, score, watch_again) VALUES (?,?,?,?,?)',
            [userId, movieId, description, score, watchAgain]
        )

        return {movieId, userId, description, score, watchAgain};
    }
}

