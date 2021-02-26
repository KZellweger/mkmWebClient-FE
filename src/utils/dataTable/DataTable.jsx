import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import React, {useMemo} from 'react';
import useDebounce from "../../hooks/debounce.hook";
import {getNestedObject} from "../utilities";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {createFilterWidgets, multiPropsFilter} from "./filter";
import {getComparator, stableSort} from "./sorting";
import getTableCellChild from "./TableCells";

export function createHeaderData(id, numeric, disablePadding, label, type, editable, enableFilter, elementProperties) {
    return {
        id: id,
        numeric: numeric,
        disablePadding: disablePadding,
        label: label,
        type: type,
        editable: editable,
        enableFilter: enableFilter,
        elementProperties: elementProperties
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function DataTable(props) {
    const classes = useStyles();
    const raw_data = props.data
    const headerData = props.header
    const [filterCriteria, setFilterCriteria] = React.useState({})
    const debouncedFilterCriteria = useDebounce(300, filterCriteria,{})
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const filtered_and_sorted_data = useMemo(() => filterAndSortData(raw_data, debouncedFilterCriteria,order,orderBy),[raw_data, debouncedFilterCriteria,order,orderBy])
    const rows = useMemo(() => paginateData(filtered_and_sorted_data,page,rowsPerPage),[filtered_and_sorted_data,page,rowsPerPage]);
    // useEffect(() => {
    //     console.log("on load")
    //     console.log(props)
    // })
    const handleFilterChange = (filterObject) => {
        //console.log(filterObject)
        setFilterCriteria(prev => ({
            ...prev,
            [filterObject.key]: filterObject
        }))
        //console.log(filterCriteria)
    }

    const filterWidgets = createFilterWidgets(headerData,filterCriteria, handleFilterChange);

    const handleRequestSort = (event, property) => {
        //console.log("handleSort: ", event, property)
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = raw_data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        console.log(name)
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    function filterAndSortData(data, filterCriteria, order, orderBy){
        return stableSort(multiPropsFilter(data,filterCriteria), getComparator(order, orderBy))
    }

    function paginateData(data, page, rowsPerPage){
        return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, raw_data.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    filterWidgets = {filterWidgets}

                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={headerData}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={raw_data.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.article.articleId);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.article.articleId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            {headerData.map(config => {
                                                return <TableCell> {getTableCellChild(config.type, config.editable, getNestedObject(row, config.id), config.elementProperties)} </TableCell>
                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {value: -1, label: 'All'}]}
                    component="div"
                    count={raw_data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </div>
    );
}
