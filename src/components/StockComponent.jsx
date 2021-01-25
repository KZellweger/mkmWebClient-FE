import React, {forwardRef, useState} from "react";
import axios from "axios";
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear, Delete,
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
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    Input, MenuItem,
    Popover,
    Select
} from "@material-ui/core";
import LoadingSpinner from "../utils/LoadingSpinner";
import Link from "@material-ui/core/Link";

const IMAGE_PREFIX = 'https://api.cardmarket.com'

export default function StockComponent(){

    const columns = [

    ]


}