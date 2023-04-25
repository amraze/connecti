import { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const neutralDark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color={theme.palette.mode === "dark" ? "white" : "black"}
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: neutralLight,
                            cursor: "pointer",
                        },
                    }}>
                    Connecti
                </Typography>
            </FlexBetween>
            <FlexBetween>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" >
                        <InputBase placeholder="Search ...">
                            <IconButton>
                                <Search />
                            </IconButton>
                        </InputBase>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* Desktop Navigation Tabs */}
            {isNonMobileScreens ? (
                <FlexBetween gap="1rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "black" }} />
                    <Notifications sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "black" }} />
                    <Help sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "black" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select value={fullName} sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                            }
                        }} input={<InputBase />}>
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>

            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}

            {/* Mobile Navigation Tabs */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "black" }} />
                    <Notifications sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "black" }} />
                    <Help sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? "white" : "black" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select value={fullName} sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                            }
                        }} input={<InputBase />}>
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            )}
        </FlexBetween>
    );
};
export default Navbar;

