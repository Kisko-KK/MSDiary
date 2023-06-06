import * as admin from 'firebase-admin'
import { db } from "../database";


export const getAllMoviesForDiary = {
    method: 'GET',
    path: '/api/diary/{userId}',
    handler: async (req, h) => {
        const userId = req.params.userId;

        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);

        if (user.user_id !== userId) throw new Error("Unauthorized")

        const {results} = await db.query(
            'SELECT * FROM diary_movies WHERE user_id = ? ORDER BY score DESC',
            [userId]
        );
        return results;
    }
}