import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Form from "./form";
import FlexBetween from '../../components/FlexBetween';

const LoginPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 768px)");
    const theme = useTheme();
    const navigate = useNavigate();

    const alt = theme.palette.background.alt;

    return (

        <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100vh" flexDirection={isNonMobileScreens ? "row" : "column"} >
            <Box>
                <Box component="img" height="10rem" src="/assets/brand.png" alt="Connecti" onClick={() => navigate("/home")} sx={{
                    "&:hover": {
                        height: "11rem",
                        filter: "grayscale(100%)",
                        cursor: "pointer",
                        transition: " 1s ",
                    },
                }} />
            </Box>

            <Box>
                <Box width="300px" p="2rem" borderRadius="1.5rem" backgroundColor={alt}>
                    <Form />
                </Box>
            </Box >
        </Box >
    )
}

export default LoginPage;