import React from "react";
import NewsAddUpdate from "./NewsAddUpdate";
import {getCategory} from "../../../../redux/categoryReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import {
    addNews,
    updateNews,
    getNewsItem,
} from "../../../../redux/newsAdminReducer";
import {useLocation, Navigate} from "react-router-dom";
import {compose} from "redux";
import {withRouter} from "../../../../hoc/withRouter";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";

const NewsAddUpdateContainer = (props) => {
    const location = useLocation();
    const { state } = location;
    let url = window.location.href;
    let infoPage = url.match(/(?<=(http:\/\/localhost:3000\/admin\/news\/))((add)|(update))$/)[0]

    useEffect( () => {
        props.getCategory();
        if (state) {
            props.getNewsItem(state.row.id)
        }
    },[] )

    if (infoPage === 'update' && state) {
        return (
            <NewsAddUpdate {...props} id={state.row.id} />
        )
    }
    else if (infoPage === 'add') {
        return (
            <NewsAddUpdate {...props} />
        )
    }
    else {
        return (
            <Navigate to={"/admin/news"} />
        )
    }

}

const mapStateToProps = (state) => ({
    categories: state.category.category,
    newsItem: state.newsAdminPage.newsItem
})

export default compose(connect(mapStateToProps, {getCategory, addNews, updateNews,getNewsItem}),
    withRouter, withAuthRedirect)(NewsAddUpdateContainer);
