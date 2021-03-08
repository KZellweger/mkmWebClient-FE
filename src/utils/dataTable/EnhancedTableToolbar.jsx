import {Button, Input, List, ListItem, Menu, MenuItem, Popover} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import {readProductsFromMkm} from "../../actions/accountActions";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export default function EnhancedTableToolbar(props) {
    const classes = useToolbarStyles();
    const title = props.title
    const submitLabel = props.submitLabel
    const [anchorEl, setAnchorEl] = React.useState(null)
    const {numSelected} = props;
    const filterWidgets = props.filterWidgets
    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}
            <Button
                variant='contained'
                size='small'
                onClick={props.onSubmit}
            >
                {submitLabel}
            </Button>

            <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                    <FilterListIcon
                        onClick={handleFilterClick}
                    />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <Popover
                id='filtermenu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <List>
                    {filterWidgets.map((widget) => (
                        <ListItem>
                            {widget}
                        </ListItem>
                    ))}

                </List>
            </Popover>
        </Toolbar>
    );
}
;

EnhancedTableToolbar.propTypes =
{
    numSelected: PropTypes.number.isRequired,
    filterWidgets: PropTypes.array.isRequired,
    onSubmit: PropTypes.func,
    title:PropTypes.string,
    onSubmitLabel:PropTypes.string
}
;