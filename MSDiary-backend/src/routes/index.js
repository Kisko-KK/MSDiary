import { getAllUsers } from "./getAllUsers";
import { getAllReviewsForMovie } from "./getAllReviewsForMovie";
import { createNewReview } from "./createNewReview";
import { getUsernameById } from "./getUserNameById";
import { getIsLiked } from "./getIsLiked";
import { updateLikes } from "./updateLikes";
import { updateWatches } from "./updateWatches";
import { getIsWatched } from "./getIsWatched";
import { addNewMovieToDiary } from "./addNewMovieToDiary";
import { getIsAdded } from "./getIsAdded";
import { deleteDiaryMovie } from "./deleteDiaryMovie";
import { getAllMoviesForDiary } from "./getAllMoviesForDiary";

export default [
    getAllUsers,
    getAllReviewsForMovie,
    createNewReview,
    getUsernameById,
    getIsLiked,
    updateLikes,
    updateWatches,
    getIsWatched,
    addNewMovieToDiary,
    getIsAdded,
    deleteDiaryMovie, 
    getAllMoviesForDiary,
    
];