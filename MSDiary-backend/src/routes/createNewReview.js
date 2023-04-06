import { db } from "../database";


export const createNewReview = {
    method: 'POST',
    path: '/api/movie/reviews',
    handler: async (req, h) => {
        
        
        const now = new Date();

        // Set the timezone offset
        const timezoneOffset = now.getTimezoneOffset() + 240; 
        now.setTime(now.getTime() + timezoneOffset * 60 * 1000); // Convert minutes to milliseconds
        const mysqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');

        const { movieId, description, score } = req.payload;
        const time = mysqlDatetime;
        const userId = '0';

        await db.query(
            'INSERT INTO reviews (user_id, movie_id, time, description, score) VALUES(?, ?, ?, ?, ?);',
            [userId, movieId, time, description, score]
        )

        return {userId, movieId, time, description, score};
    }
}