import {Input, InputAdornment, MenuItem, TextField, Typography} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React, {useState} from "react";

export const cellTypes = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOL: 'bool',
    IMAGE: 'image',
    CURRENCY: 'currency',
    SELECTOR: 'selector',
    DATE: 'date'
}

export default function getTableCellChild(type, editable, rowId, columnId, cellData, elementProperties, onEdit) {
    const handleChange = (rowId, columnId, type) => (event) => {
        let value;
        switch (type) {
            case cellTypes.TEXT:
                value = event.target.value;
                break;
            case cellTypes.NUMBER:
                value = parseFloat(event.target.value)
                break;
            case cellTypes.BOOL:
                value = event.target.value.toLowerCase() === 'true'
                break;
            default:
                value = event.target.value
        }

        onEdit(rowId, columnId, value)
    }

    switch (type) {
        case cellTypes.TEXT:
            if (editable) {
                return <Input
                    id={rowId + ':' + columnId}
                    value={cellData}
                    style={elementProperties.style}
                    onChange={handleChange(rowId, columnId, cellTypes.TEXT)}
                />
            } else {
                return <Typography
                    id={rowId + ':' + columnId}
                    style={elementProperties.style}>
                    {cellData}
                </Typography>
            }
        case cellTypes.NUMBER:
            if (editable) {
                return <Input
                    id={rowId + ':' + columnId}
                    value={cellData}
                    type='number'
                    style={elementProperties.style}
                    onChange={handleChange(rowId, columnId, cellTypes.NUMBER)}/>
            } else {
                return <Typography id={rowId + ':' + columnId} style={elementProperties.style}>{cellData}</Typography>
            }
        case cellTypes.BOOL:
            if (editable) {
                return <Checkbox
                    id={rowId + ':' + columnId}
                    checked={cellData}
                    style={elementProperties.style}
                    onChange={handleChange(rowId, columnId, cellTypes.BOOL)}
                />
            } else {
                //TODO: improt FA-Icons
                return cellData ? <Typography>TRUE</Typography> : <Typography>FALSE</Typography>
            }
        case cellTypes.IMAGE:
            return <img alt="No Image found" id={rowId + ':' + columnId} src={cellData} style={elementProperties.style}
                        onMouseEnter={event => {
                            elementProperties.onMouseEnter(event, cellData)
                        }} onMouseLeave={elementProperties.onMouseLeave}/>
        case cellTypes.CURRENCY:
            return <Input value={cellData}
                          style={elementProperties.style}
                          onChange={handleChange(rowId, columnId, cellTypes.NUMBER)}
                          endAdornment={<InputAdornment position="end">{elementProperties.currency}</InputAdornment>}/>
        case cellTypes.SELECTOR:
            return <TextField
                id={rowId + ':' + columnId}
                value={cellData}
                select
                style={elementProperties.style}
                onChange={handleChange(rowId, columnId, cellTypes.TEXT)}>
                {elementProperties.selectorOptions.map(option => {
                    return <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                })}</TextField>
        default:
            return <Typography style={elementProperties.style}>{cellData}</Typography>

    }

}
