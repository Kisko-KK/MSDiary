import { db } from "../database";


export const getUserNameById = {
    method: 'GET',
    path: '/api/users/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const {results} = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [id],
        );
        return results;
    }
}