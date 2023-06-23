import NewsAdmin from "./NewsAdmin";
import {connect} from "react-redux";
import {getNews, updateActiveNews, deleteNews, changePage, setFilters, setFilterTemporary} from "../../../redux/newsAdminReducer";
import {getCategory} from "../../../redux/categoryReducer";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";
import {withFilterParams} from "../../../hoc/withFilterParams";
import {useEffect} from "react";

const NewsContainerAdmin = (props) => {

    if (props.news.length > 0) {
        return (
            <div>
                <NewsAdmin {...props} />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    news: state.newsAdminPage.news,
    categories: state.newsAdminPage.categories,
    pager: state.newsAdminPage.pager_out.page,
    filter: state.newsAdminPage.filters,
    textFilters: state.newsAdminPage.textFilters,
    pagesCount: state.newsAdminPage.pagesCount,
})

export default compose(connect(mapStateToProps,
        {
            request: getNews, updateActiveNews, deleteNews, getCategory, changePage, setFilters, setFilterTemporary
        }),
    withRouter, withAuthRedirect, withAdminRedirect, withFilterParams)(NewsContainerAdmin);
