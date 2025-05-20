import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { loginUser } from "./AccountSlice";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import { getCart } from "../cart/CartSlice";

export function Loginpage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const location = useLocation();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    async function SubmitForm(data: FieldValues) {
        await dispatch(loginUser(data));
        await dispatch(getCart());
        navigate(location.state?.from || "/catalog");
    }


    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit(SubmitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField
                        {...register("username", { required: "username is required" })}
                        label="Enter username" fullWidth required autoFocus sx={{ mb: 2 }} size="small" error={!!errors.username} helperText={errors.username?.message}>
                    </TextField>
                    <TextField
                        {...register("password", { required: "password is required", minLength: { value: 6, message: "min length is 6 charecters" } })}
                        label="Enter password" type="password" fullWidth required sx={{ mb: 2 }} size="small" error={!!errors.password} helperText={errors.password?.message}>
                    </TextField>
                    <Button type="submit" loading={isSubmitting} disabled={!isValid} variant="contained" fullWidth sx={{ mt: 1 }}>Login</Button>
                </Box>
            </Paper>
        </Container>

    )
}