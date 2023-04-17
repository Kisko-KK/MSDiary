import { getAllUsers } from "./getAllUsers";
import { getAllReviewsForMovie } from "./getAllReviewsForMovie";
import { createNewReview } from "./createNewReview";
import { getUserNameById } from "./getUserNameById";
import { getIsLiked } from "./getIsLiked";
import { updateLikes } from "./updateLikes";
import { updateWatches } from "./updateWatches";
import { getIsWatched } from "./getIsWatched";

export default [
    getAllUsers,
    getAllReviewsForMovie,
    createNewReview,
    getUserNameById,
    getIsLiked,
    updateLikes,
    updateWatches,
    getIsWatched,
    
];