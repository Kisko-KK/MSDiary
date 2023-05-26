import { db } from "../database";


export const addNewMovieToDiary = {
    method: 'POST',
    path: '/api/diary',
    handler: async (req, h) => {

        const { movieId, userId, description, score, watchAgain } = req.payload;
        await db.query(
            'INSERT INTO diary_movies (user_id, movie_id, description, score, watch_again) VALUES (?,?,?,?,?)',
            [userId, movieId, description, score, watchAgain]
        )

        return {movieId, userId, description, score, watchAgain};
    }
}

