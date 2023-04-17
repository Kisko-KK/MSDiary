import { db } from "../database";

export const getIsWatched = {
    method: 'GET',
    path: '/api/movie/watches/{movieId}/{userId}',
    handler: async (req, h) => {

        const movieId = req.params.movieId;
        const userId = req.params.userId;
        
        
        
        try {
            const {results} = await db.query(
                'SELECT watched FROM watches WHERE movie_id = ? AND user_id = ?',
                [movieId, userId]
            );
            return results[0];
        } catch (error) {
            console.log("dadaada")
        }
        return { watched: 0};
        
    }
}