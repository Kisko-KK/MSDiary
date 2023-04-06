import { db } from "../database";

export const getAllUsers = {
    method: 'GET',
    path: '/api/users',
    handler: async (req, h) => {
        const {results} = await db.query(
            'SELECT * FROM users'
        );
        return results;
    }
}