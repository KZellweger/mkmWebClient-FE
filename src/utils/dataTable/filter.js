import {Input, TextField} from "@material-ui/core";
import {Label} from "@material-ui/icons";
import {getNestedObject} from "../utilities";
import {cellTypes} from "./TableCells";
import React from  "react"
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
    console.log("Filter Objects: ")
    console.log(filters)
    const filterKeys = Object.keys(filters)
    console.log(filterKeys)
    return data.filter(item => {
        return filterKeys.every(key => {
            //ignore an empty filter
            if (!filters[key].length) {
                return true
            }
            //console.log(item,key,getNestedObject(item,key))
            // if(item[key].includes(filters[key])){
            //     console.log(item)
            //     return item
            // }
            return getNestedObject(item,key).includes(filters[key]) //Only Text Filter yet
        })
    })
}

function createFilterWidgets(tableHeaderData,filterCriterias, onChange) {
    const widgets = []
    tableHeaderData.map((column) => {
            if (column.enableFilter) {
                widgets.push(FilterWidget(column,onChange))
            }
        }
    )
    return widgets
}

function FilterWidget(column, onChange){
    const handleChange = (field) => (event) => {
        const filterObject = {
            "type":cellTypes.TEXT,
            "key":field,
            "value":event.target.value
        }
        onChange(filterObject)
    }

    const handleNumericChange = (field, boundary) => (event) => {
        const filterObject = {
            "type":cellTypes.NUMBER,
            "key":field,
            "boundary":boundary,
            "value":event.target.value
        }
        onChange(filterObject)
    }

    switch (column.type){
        case cellTypes.TEXT:
            return (
                <TextField
                    label={column.label}
                    onChange={handleChange(column.id)}
                />
            )
        case cellTypes.CURRENCY:
        case cellTypes.NUMBER:
            return (
                <div>
                    <TextField
                        type='number'
                        label={'Min: ' + column.label}
                        onChange={handleNumericChange(column.id,"min")}
                    />
                    <TextField
                        type='number'
                        label={'Max: ' + column.label}
                        onChange={handleNumericChange(column.id,"max")}
                    />
                </div>
            )
        default:
            return (
                <Label>Not Implement yet</Label>
            )
    }
}

export {multiPropsFilter, createFilterWidgets}