import NewsAdmin from "./NewsAdmin";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getNews, updateActiveNews, deleteNews} from "../../../redux/newsAdminReducer";
import {getCategory} from "../../../redux/categoryReducer";

const NewsContainerAdmin = (props) => {
    useEffect( () => {
        props.getCategory();
        props.getNews({},1, 10);
    },[] )
    return (
        <div>
            <NewsAdmin {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    news: state.newsAdminPage.news,
    pager: state.newsAdminPage.pagerOut,
    categories: state.category.category
})

export default connect(mapStateToProps, {getNews, updateActiveNews, deleteNews, getCategory})(NewsContainerAdmin);