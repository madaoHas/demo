import React from "react";
import NewsAddUpdate from "./NewsAddUpdate";
import {getCategory} from "../../../../redux/categoryReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import {addUser} from "../../../../redux/newsAdminReducer";

const NewsAddUpdateContainer = (props) => {
    useEffect( () => {
        props.getCategory();
    },[] )

    return (
        <NewsAddUpdate {...props} />
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.category
})


export default connect(mapStateToProps, {getCategory, addUser})(NewsAddUpdateContainer);