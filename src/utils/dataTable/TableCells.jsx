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

export default function getTableCellChild(type, editable, cellId, cellData, elementProperties, onEdit) {
    const handleChange = (field, type) => (event) => {
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

        onEdit(field, value)
    }

    switch (type) {
        case cellTypes.TEXT:
            if (editable) {
                return <Input
                    id={cellId}
                    value={cellData}
                    style={elementProperties.style}
                    onChange={handleChange(cellId, cellTypes.TEXT)}
                />
            } else {
                return <Typography
                    id={cellId}
                    style={elementProperties.style}>
                    {cellData}
                </Typography>
            }
        case cellTypes.NUMBER:
            if (editable) {
                return <Input
                    id={cellId}
                    value={cellData}
                    type='number'
                    style={elementProperties.style}
                    onChange={handleChange(cellId, cellTypes.NUMBER)}/>
            } else {
                return <Typography id={cellId} style={elementProperties.style}>{cellData}</Typography>
            }
        case cellTypes.BOOL:
            if (editable) {
                return <Checkbox
                    id={cellId}
                    checked={cellData}
                    style={elementProperties.style}
                    onChange={handleChange(cellId, cellTypes.BOOL)}
                />
            } else {
                //TODO: improt FA-Icons
                return cellData ? <Typography>TRUE</Typography> : <Typography>FALSE</Typography>
            }
        case cellTypes.IMAGE:
            return <img alt="No Image found" id={cellId} src={cellData} style={elementProperties.style}
                        onMouseEnter={event => {
                            elementProperties.onMouseEnter(event, cellData)
                        }} onMouseLeave={elementProperties.onMouseLeave}/>
        case cellTypes.CURRENCY:
            return <Input value={cellData}
                          style={elementProperties.style}
                          onChange={handleChange(cellId, cellTypes.NUMBER)}
                          endAdornment={<InputAdornment position="end">{elementProperties.currency}</InputAdornment>}/>
        case cellTypes.SELECTOR:
            return <TextField
                id={cellId}
                value={cellData}
                select
                style={elementProperties.style}
                onChange={handleChange(cellId, cellTypes.TEXT)}>
                {elementProperties.selectorOptions.map(option => {
                    return <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                })}</TextField>
        default:
            return <Typography style={elementProperties.style}>{cellData}</Typography>

    }

}
