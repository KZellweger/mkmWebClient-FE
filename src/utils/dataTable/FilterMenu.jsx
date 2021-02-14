// ignores case-sensitive
import {Menu, MenuItem} from "@material-ui/core";
import React from "react";

const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);

/**
 *  Filters an array of objects (on direct Access level) with multiple criteria.
 *  If for ex. an Object in data has the Struct {A:{b:{c:'someValue'}}} then the criteria has to declare to complete path.
 *
 * @param data Array to be filtered
 * @param filters Object of Filter Criterias
 * @returns {Array} Result Array
 */
function multiPropsFilter(data, filters) {
    const filterKeys = Object.keys(filters)
    return data.filter(item => {
        return filterKeys.every(key => {
            //ignore an empty filter
            if (!filters[key].length) {
                return true
            }
            return filters[key].find(filter => getValue(filter) === getValue(item[key]))
        })
    })
}


export default function FilterMenu(filterCriterias, anchorEl) {
    return (
        <Menu
            id='filtermenu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
        >
            {filterCriterias.map((criteria) => (
                <MenuItem>
                    {criteria}
                </MenuItem>
            ))}
        </Menu>
    )
}
