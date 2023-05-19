import News from "./News";
import {getCategory} from "../../../redux/categoryReducer";
import {getNews} from "../../../redux/newsReducer";
import {connect} from "react-redux";
import {useEffect} from "react";


const NewsContainer = (props) => {
    useEffect( () => {
        props.getNews(null, 1, 8);
        props.getCategory();
    }, [] )
    return (
        <News {...props} />
    )
}

const mapStateToProps = (state) => ({
    newsUserPage: state.newsPage.news,
    category: state.category.category,
    pager: state.newsPage.pager_out
})

export default connect(mapStateToProps,{getCategory, getNews})(NewsContainer);