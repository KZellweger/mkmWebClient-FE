import {FormLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import {Label} from "@material-ui/icons";
import React from "react"
import {getNestedObject} from "../utilities";
import {cellTypes} from "./TableCells";

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
            if(filters[key].type === cellTypes.TEXT){
                //Ignore an empty filter
                if (!filters[key].value.length) {
                    return true
                }
                return getNestedObject(item,key).includes(filters[key].value)
            }else if(filters[key].type === cellTypes.NUMBER){
                if (!filters[key].min.length && !filters[key].max.length) {
                    return true
                }
                const num = getNestedObject(item,key)
                const min = filters[key].min
                const max = filters[key].max
                return (min.length && num >= parseFloat(min)) && (!max.length || num <= parseFloat(max))
            }else if(filters[key].type === cellTypes.BOOL){
                return filters[key].value === getNestedObject(item,key)
            }
        })
    })
}

function createFilterWidgets(tableHeaderData, filterCriterias, onChange) {
    const widgets = []
    tableHeaderData.map((column) => {
            if (column.enableFilter) {
                widgets.push(FilterWidget(column, onChange))
            }
        }
    )
    return widgets
}

function FilterWidget(column, onChange) {
    const handleChange = (field) => (event) => {
        const filterObject = {
            "type": cellTypes.TEXT,
            "key": field,
            "value": event.target.value
        }
        onChange(filterObject)
    }

    const handleBooleanChange = (field) => (event) => {
        const filterObject = {
            "type": cellTypes.BOOL,
            "key": field,
            "value": event.target.checked
        }
        onChange(filterObject)
    }

    const handleNumericChange = (field, boundary) => (event) => {
        if (boundary === 'min') {
            const filterObject = {
                "type": cellTypes.NUMBER,
                "key": field,
                "min": event.target.value,
                "max": document.getElementById(field + 'MAX').value
            }
            onChange(filterObject)
        } else if (boundary === 'max') {
            const filterObject = {
                "type": cellTypes.NUMBER,
                "key": field,
                "min": document.getElementById(field + 'MIN').value,
                "max": event.target.value
            }
            onChange(filterObject)
        }
    }

    switch (column.type) {
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
                        id={column.id + 'MIN'}
                        type='number'
                        label={'Min: ' + column.label}
                        onChange={handleNumericChange(column.id, "min")}
                    />
                    <TextField
                        id={column.id + 'MAX'}
                        type='number'
                        label={'Max: ' + column.label}
                        onChange={handleNumericChange(column.id, "max")}
                    />
                </div>
            )
        case cellTypes.BOOL:
            return (
                <div>
                    <FormLabel>{column.label}</FormLabel>
                    <Checkbox
                        size='small'
                        onChange={handleBooleanChange(column.id)}
                    />
                </div>
            )
        // case cellTypes.SELECTOR:
        //     return(
        //     <div>
        //         <FormLabel>{column.label}</FormLabel>
        //         <Select
        //         multiple
        //         value={[]}
        //         >
        //         {column.elementProperties.selectorOptions.map(option => {
        //             return <MenuItem key={option.value} value={option.value}>
        //                 {option.label}
        //             </MenuItem>
        //         })}</Select>
        //     </div>
        //     )
        default:
            return (
                <FormLabel>Not Implement yet</FormLabel>
            )
    }
}

export {multiPropsFilter, createFilterWidgets}