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
import {withAdminRedirect} from "../../../../hoc/withAdminRedirect";

const NewsAddUpdateContainer = (props) => {
    const location = useLocation();
    let id = location.pathname.slice(19);
    let infoPage = location.pathname.slice(12);

    useEffect( () => {
        props.getCategory();
        if (id) {
            props.getNewsItem(id)
        }
    },[] )

    if (infoPage === 'update/' + id) {
        if (props.newsItem.error) {
            return <div>{props.newsItem.error}</div>
        }
        else {
            return (
                <NewsAddUpdate {...props} id={id} infoPage={infoPage} />
            )
        }

    }
    else if (infoPage === 'add') {
        return (
            <NewsAddUpdate {...props} infoPage={infoPage} />
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
    withRouter, withAuthRedirect, withAdminRedirect)(NewsAddUpdateContainer);
