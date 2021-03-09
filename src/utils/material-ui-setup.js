import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#373737",
        },
        secondary: {
            main: "#1565C0",
            light: "#5E92F3",
            dark: "#003C8F"
        },
        background: {
            default: "#CBCED3",
            paper: "#FEFFFF"
        },
        error: {
            main: "#D0021B"
        },
        success: {
            main: "#2ECC71"
        }
    }
});


export default theme;