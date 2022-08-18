import {
    LOAD_NEXT_FIVE_POSTS,
    LOAD_PREVIOUS_FIVE_POSTS
} from "../types";


export const nextFive = () => ({
    type: LOAD_NEXT_FIVE_POSTS
});

export const previousFive = () => ({
    type: LOAD_PREVIOUS_FIVE_POSTS
});