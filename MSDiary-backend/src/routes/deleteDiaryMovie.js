import { db } from "../database";


export const deleteDiaryMovie = {
    method: 'DELETE',
    path: '/api/diary/{movieId}/{userId}',
    handler: async (req, h) => {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const {results} = await db.query(
            'DELETE FROM diary_movies WHERE user_id = ? AND movie_id = ?',
            [userId, movieId]
        );
        return results;
    }
}