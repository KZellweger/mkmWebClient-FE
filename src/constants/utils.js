import {makeStyles} from "@material-ui/core/styles";
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn
} from "@material-ui/icons";
import React, {forwardRef} from "react";

export const DATEFORMAT_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit'};
export const DATE_TIME_FORMAT_OPTIONS = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
};

export const popOverStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    }
}));

export const TABLE_ICONS = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

export const getCurrencySymbol = (locale, currency) => (0).toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
}).replace(/\d/g, '').trim()

export const CONDITIONS = [
    {
        value: 'MINT',
        label: 'Mint'
    },
    {
        value: 'NEAR_MINT',
        label: 'Near Mint'
    },
    {
        value: 'EXCELLENT',
        label: 'Excellent'
    },
    {
        value: 'GOOD',
        label: 'Good'
    },
    {
        value: 'LIGHT_PLAYED',
        label: 'Light Played'
    },
    {
        value: 'PLAYED',
        label: 'Played'
    },
    {
        value: 'POOR',
        label: 'Poor'
    }
]

export const RARITY = {
    COMMON: "common",
    UNCOMMON: "uncommon",
    RARE: "rare",
    MYTHIC: "mythicrare"
}

export const LANGUAGE = [
    {
        value: 'en',
        label: 'English'
    },
    {
        value: 'de',
        label: 'Deutsch'
    },
    {
        value: 'fr',
        label: 'French'
    },
    {
        value: 'es',
        label: 'Spanish'
    },
    {
        value: 'it',
        label: 'Italian'
    }
]
