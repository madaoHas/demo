import News from "./News";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getNews} from "../../../redux/newsAdminReducer";

const NewsContainerAdmin = (props) => {
    useEffect( () => {
        props.getNews(1, 10);
    },[props.news.length] )
    return (
        <div>
            <News {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    news: state.newsAdminPage.news
})

export default connect(mapStateToProps, {getNews})(NewsContainerAdmin);