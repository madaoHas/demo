import NewsAdmin from "./NewsAdmin";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getNews, updateActiveNews, deleteNews} from "../../../redux/newsAdminReducer";

const NewsContainerAdmin = (props) => {
    useEffect( () => {
        props.getNews(1, 10);
    },[props.news.length] )
    return (
        <div>
            <NewsAdmin {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    news: state.newsAdminPage.news
})

export default connect(mapStateToProps, {getNews, updateActiveNews, deleteNews})(NewsContainerAdmin);