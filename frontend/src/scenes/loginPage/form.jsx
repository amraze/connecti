import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Alert, AlertTitle } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { GlobalConstants } from "../../app.constants";
const { apiURL, baseURL } = GlobalConstants;

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
});

let confirmation = "";

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:768px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        if (values.picture) {
            formData.append('picturePath', values.picture.name);
        }

        const savedUserResponse = await fetch(apiURL + "register", {
            method: "POST",
            body: formData,
        });

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
            document.getElementById('alert').style.display = "block";
            setTimeout(() => {
                document.getElementById('alert').style.display = "none";
            }, 3000);
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(apiURL + "login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const loggedUser = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (loggedUser) {
            dispatch(setLogin({
                user: loggedUser.user,
                token: loggedUser.token,
            }))
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    const handleConfirmPasswordChange = (e) => {
        const verifiedPassword = e.target.value;
        const password = document.getElementById(':r3:').value;
        let oldColor = "";

        if (verifiedPassword !== password) {
            confirmation = "Make sure your passwords match";
            oldColor = document.getElementById(':rd:').nextSibling.style.borderColor;
            document.getElementById(':rd:').nextSibling.style.border = "1px solid red";
        }
        else {
            confirmation = "";
            document.getElementById(':rd:').nextSibling.style.borderColor = oldColor;
        }
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit} >
                    <Alert severity="success" id="alert" sx={{ position: "absolute", bottom: 0, right: 0, display: "none" }}>
                        <AlertTitle>Success</AlertTitle>
                        User Registered <strong>successfully !</strong>
                    </Alert>
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }} >
                        {isRegister && (
                            <>
                                <TextField label="First Name" onBlur={handleBlur} onChange={handleChange}
                                    value={values.firstName} name="firstName" sx={{ gridColumn: "span 2" }}
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName} >
                                </TextField>
                                <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange}
                                    value={values.lastName} name="lastName" sx={{ gridColumn: "span 2" }}
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}>
                                </TextField>
                                <TextField label="Location" onBlur={handleBlur} onChange={handleChange}
                                    value={values.location} name="location" sx={{ gridColumn: "span 2" }}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}>
                                </TextField>
                                <TextField label="Occupation" onBlur={handleBlur} onChange={handleChange}
                                    value={values.occupation} name="occupation" sx={{ gridColumn: "span 2" }}
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}>
                                </TextField>
                                <Box gridColumn="span 4" border={`1px solid ${theme.palette.neutral.medium}`} borderRadius="5px" p="1rem">
                                    <Dropzone acceptFiles=".jpg, .jpeg, .png" multiple={false} onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}>
                                        {({ getRootProps, getInputProps }) => (
                                            <Box {...getRootProps()} border={`2px dashed ${theme.palette.primary.main}`} p="1rem" color={theme.palette.mode === "dark" ? "white" : "black"}
                                                sx={{ "&:hover": { cursor: "pointer" } }}>
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p >Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField label="Email" onBlur={handleBlur} onChange={handleChange}
                            value={values.email} name="email" sx={{ gridColumn: "span 4" }}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}>
                        </TextField>
                        <TextField label="Password" onBlur={handleBlur} onChange={handleChange} type="password"
                            value={values.password} name="password" sx={{ gridColumn: "span 4" }}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}>
                        </TextField>
                        {isRegister && (
                            <TextField label="Confirm Password" onBlur={handleBlur} onChange={handleConfirmPasswordChange} type="password"
                                sx={{ gridColumn: "span 4" }} helperText={confirmation}>
                            </TextField>
                        )}
                    </Box>
                    <Box>
                        <Button fullWidth type="submit"
                            sx={{ m: "2rem 0", p: "1rem", backgroundColor: theme.palette.primary.main, color: theme.palette.background.alt, "&:hover": { color: theme.palette.primary.main } }}>
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography onClick={() => { setPageType(isLogin ? "register" : "login"); resetForm(); }}
                            sx={{ textDecoration: "underline", color: theme.palette.primary.main, "&:hover": { cursor: "pointer", color: theme.palette.primary.light } }}>
                            {isLogin ? "Don't have an account? Sign Up Here " : "Already have an account ? Login Here."}
                        </Typography>
                    </Box>
                </form >
            )
            }
        </Formik >
    )
}

export default Form;