import {getNestedObject} from "../utilities";

function descendingComparator(a, b, orderBy) {
    if (getNestedObject(b, orderBy) < getNestedObject(a, orderBy)) {
        return -1;
    }
    if (getNestedObject(b, orderBy) > getNestedObject(a, orderBy)) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    if (Array.isArray(array)) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    } else {
        throw new Error("Init Table befor data is Propperly loaded. Take care of this!")
    }
}

export {stableSort, getComparator}