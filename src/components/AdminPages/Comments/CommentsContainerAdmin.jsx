import {connect} from "react-redux";
import Comments from "./Comments";

const CommentsContainerAdmin = (props) => {
    return (
        <div>
            <Comments {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    comments: state.commentsAdminPage.comments
})

export default connect(mapStateToProps)(CommentsContainerAdmin);