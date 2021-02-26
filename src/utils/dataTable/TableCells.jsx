import {Input, InputAdornment, MenuItem, TextField, Typography} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

export const cellTypes = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOL: 'bool',
    IMAGE: 'image',
    CURRENCY: 'currency',
    SELECTOR: 'selector',
    DATE: 'date'
}

export default function getTableCellChild(type, editable, cellData, elementProperties) {
    switch (type) {
        case cellTypes.TEXT:
            if (editable) {
                return <Input value={cellData} style={elementProperties.style}/>
            } else {
                return <Typography style={elementProperties.style}>{cellData}</Typography>
            }
        case cellTypes.NUMBER:
            if (editable) {
                return <Input value={cellData} type='number' style={elementProperties.style}/>
            } else {
                return <Typography style={elementProperties.style}>{cellData}</Typography>
            }
        case cellTypes.BOOL:
            if (editable) {
                return <Checkbox
                    checked={cellData}
                    style={elementProperties.style}
                />
            } else {
                //TODO: improt FA-Icons
                return cellData ? <Typography>TRUE</Typography> : <Typography>FALSE</Typography>
            }
        case cellTypes.IMAGE:
            return <img alt="No Image found" src={cellData} style={elementProperties.style} onMouseEnter={event => {
                elementProperties.onMouseEnter(event, cellData)
            }} onMouseLeave={elementProperties.onMouseLeave}/>
        case cellTypes.CURRENCY:
            return <Input value={cellData} style={elementProperties.style}
                          endAdornment={<InputAdornment position="end">{elementProperties.currency}</InputAdornment>}/>
        case cellTypes.SELECTOR:
            return <TextField
                value={cellData}
                select
                style={elementProperties.style}>
                {elementProperties.selectorOptions.map(option => {
                    return <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                })}</TextField>
        default:
            return <Typography style={elementProperties.style}>{cellData}</Typography>

    }

}
