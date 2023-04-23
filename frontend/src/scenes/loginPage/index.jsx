import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Form from "./form";

const LoginPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const navigate = useNavigate();

    const neutralLight = theme.palette.neutral.light;
    const alt = theme.palette.background.alt;

    return (
        <Box>
            <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    onClick={() => navigate("/home")}>
                    Connecti
                </Typography>
            </Box>

            <Box width={isNonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={alt}>
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to Connecti, the next-generation Tunisian Social Media !
                </Typography>
                <Form />
            </Box>
        </Box >
    )
}

export default LoginPage;