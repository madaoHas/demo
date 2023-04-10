import SelectedNews from "./SelectedNews";
import {useLocation} from 'react-router-dom'
import {getNewsSuper} from "../../../redux/SelectedNewsSelector";
import Comments from "./Comments/Comments";
import classes from "./SelectedNewsContainer.module.css";


const SelectedNewsContainer = () => {
    let location = useLocation();
    return (
        <div className={classes.newsCommentBlock}>
            <SelectedNews {...location} />
            <Comments {...location} />
        </div>
    )
}

const mapStateToProps = (state) => {
    // let location = useLocation();
    return {
        news: getNewsSuper(state),
        comments: state.comments.comments
    }
}


export default SelectedNewsContainer;