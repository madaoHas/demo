import {createSelector} from "reselect";

export const getNewsState = (state) => {
    return state.newsPage.news
}

export const getNewsSuper = createSelector(getNewsState, (news) => {
    return news.filter(u => true);
} )