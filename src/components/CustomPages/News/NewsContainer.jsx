import News from "./News";
import {getCategory} from "../../../redux/categoryReducer";
import {getNews} from "../../../redux/newsReducer";
import {connect} from "react-redux";
import {useEffect} from "react";


const NewsContainer = (props) => {
    useEffect( () => {
        props.getNews(null, 1, 10);
        props.getCategory();
    }, [] )
    return (
        <News {...props} />
    )
}

const mapStateToProps = (state) => ({
    newsUserPage: state.newsPage.news,
    category: state.category.category,
})

export default connect(mapStateToProps,{getCategory, getNews})(NewsContainer);