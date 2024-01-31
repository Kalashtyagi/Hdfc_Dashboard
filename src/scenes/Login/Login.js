import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BASE_URL } from "../../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [res, setRes] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  function togglePasswordVisibilty() {
    setShowPassword(!showPassword);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await fetch(`${BASE_URL}Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response?.status===200) {
        
        const responseData = await response.json();
        setRes(responseData?.data);
        console.log("respose",responseData?.data)
        sessionStorage.setItem("userId",responseData?.data?.adminId);
        console.log("res",res);
        navigate("/dashboard");
        toast.success("Login Successfully");

      } else {
        toast.error("Email or password is incorrect");
      }
      reset();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            <br />
            <span
              style={{
                position: "absolute",
                color: "red",
                fontSize: "14px",
                marginTop: "-12px",
              }}
            >
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" && "Email is incorrect"}
            </span>
            <TextField
              margin="normal"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              style={{ width: "400px" }}
              autoComplete="current-password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 12,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibilty} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <span
              style={{
                position: "absolute",
                color: "red",
                fontSize: "14px",
                marginTop: "-12px",
              }}
            >
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" &&
                "Password length must be 4"}
              {errors.password?.type === "maxLength" &&
                "Password contains less than 20 character"}
            </span>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
