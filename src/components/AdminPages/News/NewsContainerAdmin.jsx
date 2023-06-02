import NewsAdmin from "./NewsAdmin";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getNews, updateActiveNews, deleteNews} from "../../../redux/newsAdminReducer";
import {getCategory} from "../../../redux/categoryReducer";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";
import {useLocation} from "react-router-dom";

const NewsContainerAdmin = (props) => {
    const location = useLocation();
    const { state } = location;
    useEffect( () => {
        props.getCategory();
        props.getNews({},1, 10);
    },[] )
    return (
        <div>
            <NewsAdmin {...props} state={state} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    news: state.newsAdminPage.news,
    pager: state.newsAdminPage.pagerOut,
    categories: state.category.category
})

export default compose(connect(mapStateToProps, {getNews, updateActiveNews, deleteNews, getCategory}),
    withRouter, withAuthRedirect, withAdminRedirect)(NewsContainerAdmin);
