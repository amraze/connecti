import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserBox from "../boxes/UserBox";
import CreatePostBox from "../boxes/CreatePostBox";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            <Box width="100%" display={isNonMobileScreens ? "flex" : "block"} gap="0.5rem" justifyContent="center">
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined} p="2rem">
                    <UserBox userId={_id} picturePath={picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined} p="2rem">
                    <CreatePostBox picturePath={picturePath} />
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;