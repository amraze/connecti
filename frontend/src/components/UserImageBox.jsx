import { Box } from "@mui/material";
import { GlobalConstants } from "../app.constants";
const { baseURL } = GlobalConstants;

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img style={{ objectFit: "cover", borderRadius: "50%" }} width={size} height={size} src={baseURL + image} alt="user" />
        </Box>
    )
}

export default UserImage;