import News from "./News";
import {connect} from "react-redux";


const NewsContainer = (props) => {
    return (
        <News {...props} />
    )
}

const mapStateToProps = (state) => ({
    news: state.newsPage.news,
    category: state.category.category
})

export default connect(mapStateToProps)(NewsContainer);