import { db } from "../database";
import * as admin from 'firebase-admin'

export const getUsernameById = {
    method: 'GET',
    path: '/api/users/{id}',
    handler: async (req, h) => {
      const userId = req.params.id;
    
      const userRecord = await admin.auth().getUser(userId);
  
      const response = {
        username: userRecord.displayName || ''
      };
  
      return response;
    }
  };