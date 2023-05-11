import SelectedNews from "./SelectedNews";
import {getNewsSuper} from "../../../redux/SelectedNewsSelector";
import Comments from "./Comments/Comments";
import classes from "./SelectedNewsContainer.module.css";
import ScrollButton from "../../common/ScrollButton/ScrollButton";
import {connect} from "react-redux";
import {getSelectedNews} from "../../../redux/newsReducer";
import React, {useEffect} from "react";
import {getComments, addComment} from "../../../redux/commentsReducer";


const SelectedNewsContainer = (props) => {
    let url = window.location.href;
    let infoPage = url.match(/(?<=(http:\/\/localhost:3000\/news\/))([0-9]+)$/)[0]
    useEffect( () => {
        props.getSelectedNews(infoPage);
        props.getComments(infoPage, 1, 10);
    }, [] )
    return (
        <div className={classes.newsCommentBlock}>
            {props.newsItem.id ? <SelectedNews {...props.newsItem} /> : null}
            {props.newsItem.id ? <Comments postId={infoPage} comments={props.comments} auth={props.auth} addComment={props.addComment} getComments={props.getComments} /> : null}
            {/*<Comments {...location} />*/}
            <ScrollButton className={classes.scroll} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        newsItem: state.newsPage.selectedNews,
        comments: state.comments.comments,
        auth: state.login.auth
    }
}

export default connect(mapStateToProps,{getSelectedNews, getComments, addComment})(SelectedNewsContainer);