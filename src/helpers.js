import React from "react";


export const setFiltersInState = (list, filters, except) => {
    let filterState = {...list}
    for (let filterName in filters) {
        if (filters[filterName] !== undefined) {
            if (filterName === except) {
                if (filters[filterName] != null) {
                    filterState[filterName] = Number(filters[filterName])
                }
                else {
                    filterState[filterName] = filters[filterName]
                }
            } else {
                filterState[filterName] = filters[filterName]
            }
        }
    }
    return filterState
}