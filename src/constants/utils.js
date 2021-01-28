import {makeStyles} from "@material-ui/core/styles";

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