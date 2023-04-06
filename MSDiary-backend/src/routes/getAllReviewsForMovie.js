import { db } from "../database";


export const getAllReviewsForMovie = {
    method: 'GET',
    path: '/api/movie/reviews/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const {results} = await db.query(
            'SELECT * FROM reviews WHERE movie_id = ?',
            [id],
        );
        return results;
    }
}