import News from "./News";
import {getCategory,} from "../../../redux/categoryReducer";
import {getNews, setCategoryId, changePage} from "../../../redux/newsReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withFilterCategory} from "../../../hoc/withFilterCategory";


const NewsContainer = (props) => {
    // let [searchParamsNews, setSearchParamsNews] = useSearchParams({})
    //
    useEffect( () => {
        // props.getNews(null, searchParamsNews.get('page'), 8);
        props.getCategory();
    }, [] )
    //
    // useEffect( () => {
    //     setSearchParamsNews({page: props.pager.page});
    // }, [props.pager.page] )
    //
    // useEffect( () => {
    //     props.getNews(null, searchParamsNews.get('page'), 8);
    // }, [searchParamsNews] )

    return (
        <News {...props} />
    )
}

const mapStateToProps = (state) => ({
    newsUserPage: state.newsPage.news,
    category: state.category.category,
    pager: state.newsPage.pager_out.page,
    categoryId: state.newsPage.idCategory,
    pagesCount: state.newsPage.pagesCount,
})

export default compose(connect(mapStateToProps,
        {
            request: getNews, getCategory, setCategoryId, changePage
        }),
    withRouter, withFilterCategory)(NewsContainer);