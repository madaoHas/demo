import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";


export const withFilterParams = (Component) => {
    return (props) => {
        let [filterParams, setFilterParam] = useSearchParams()

        const setFiltersFromParams = () => {
            let page = filterParams.get('page')
            props.changePage(page)
            let changeFlag = false
            let filters = {}
            for (let filterName in props.filter) {
                if (filterParams.get(filterName)) {
                    filters[filterName] = filterParams.get(filterName)
                    changeFlag = true
                }
            }
            if (changeFlag) {
                props.setFilters(filters)
            }

            for (let filterName in props.textFilters) {
                if (filterParams.get(filterName)) {
                    props.setFilterTemporary(filterName, filterParams.get(filterName))
                }
            }
            props.request()
        }

        const setParamsFromFilters = () => {
            let newParams = {page: props.pager}
            for (let paramName in props.filter) {
                if (props.filter[paramName] === "") {
                    props.filter[paramName] = null
                }
                if (props.filter[paramName] != null) {
                    newParams[paramName] = props.filter[paramName]
                } else {
                    filterParams.delete(paramName)
                }
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
            props.filter,
            props.pager
        ])


        return (
            <Component {...props}/>
        )
    }

}


