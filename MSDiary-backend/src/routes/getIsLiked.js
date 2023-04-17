import { db } from "../database";

export const getIsLiked = {
    method: 'GET',
    path: '/api/movie/likes/{movieId}/{userId}',
    handler: async (req, h) => {

        const movieId = req.params.movieId;
        const userId = req.params.userId;
        
        
        
        try {
            const {results} = await db.query(
                'SELECT liked FROM likes WHERE movie_id = ? AND user_id = ?',
                [movieId, userId]
            );
            return results[0];
        } catch (error) {
            console.log("dadaada")
        }
        
        
        return { liked: 0};
        
    }
}