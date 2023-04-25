import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserBox from "../boxes/UserBox";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            <Box width="100%" display={isNonMobileScreens ? "flex" : "block"} gap="0.5rem" justifyContent="space-between">
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined} p="2rem 0rem 0rem 2rem">
                    <UserBox userId={_id} picturePath={picturePath} />
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;