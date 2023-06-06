import { db } from "../database";
import * as admin from 'firebase-admin'

export const getIsAdded = {
    method: 'GET',
    path: '/api/diary/{movieId}/{userId}',
    handler: async (req, h) => {

        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        if (user.user_id !== userId) throw new Error("Unauthorized")

        
        const {results} = await db.query(
            'SELECT COUNT(*) FROM diary_movies WHERE user_id = ? AND movie_id = ?',
            [userId, movieId]
        );
        
        if (results[0]['COUNT(*)'] > 0){
            return 1;
        } 
        else{
            return 0;
        }
        
    }
}