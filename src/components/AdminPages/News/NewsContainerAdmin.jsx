import News from "./News";
import {connect} from "react-redux";

const NewsContainerAdmin = (props) => {
    return (
        <div>
            <News {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    news: state.newsAdminPage.news
})

export default connect(mapStateToProps)(NewsContainerAdmin);