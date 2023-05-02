import React from "react";
import CommentsUpdate from "./CommentsUpdate";
import {useLocation} from "react-router-dom";

const CommentsUpdateContainer = () => {
    const location = useLocation();
    return (
        <CommentsUpdate row={location.state.row} />
    )
}

export default CommentsUpdateContainer;