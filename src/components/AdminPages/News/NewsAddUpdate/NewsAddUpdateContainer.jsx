import React from "react";
import NewsAddUpdate from "./NewsAddUpdate";
import {connect} from "react-redux";

const NewsAddUpdateContainer = (props) => {
    return (
        <NewsAddUpdate {...props} />
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.category
})


export default connect(mapStateToProps)(NewsAddUpdateContainer);