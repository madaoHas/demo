import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";


export const withFilterCategory = (Component) => {
    return (props) => {
        let [filterParams, setFilterParam] = useSearchParams()

        const setFiltersFromParams = () => {
            let page = filterParams.get('page')
            props.changePage(page)

            if (filterParams.get('category_id')) {
                props.setCategoryId(filterParams.get('category_id'));
            }
            props.request()
        }

        const setParamsFromFilters = () => {
            let newParams = {page: props.pager}

            if (props.categoryId !== null) {
                newParams.category_id = props.categoryId
            }
            else {
                filterParams.delete('category_id')
            }

            setFilterParam(newParams)
        }
        //Initialize
        useEffect(() => {
            setFiltersFromParams()
        }, [])

        useEffect(() => {
            setFiltersFromParams()
        }, [filterParams])

        // Set search params
        useEffect(() => {
            setParamsFromFilters()
        }, [
            props.categoryId,
            props.pager
        ])


        return (
            <Component {...props}/>
        )
    }

}


