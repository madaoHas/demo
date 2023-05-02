import News from "./News";
import {getCategory} from "../../../redux/categoryReducer";
import {connect} from "react-redux";
import {useEffect} from "react";


const NewsContainer = (props) => {
    useEffect( () => {
        props.getCategory();
    } )
    return (
        <News {...props} />
    )
}

const mapStateToProps = (state) => ({
    news: state.newsPage.news,
    category: state.category.category
})

export default connect(mapStateToProps,{getCategory})(NewsContainer);