import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { DarkContext } from "../global/DarkBar";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../apiConfig";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CreateAdmin = () => {
  const { isDark } = useContext(DarkContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [type, setType] = React.useState("");
  const { isCollapsed } = useContext(SidebarContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}InsertAdminDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          alternative_Email: data.alternative_email,
          password: data.password,
          phone_Number: data.contact,
          admin_SubAdmin: data.adminType,
          isActive: 1,
        }),
      });
      const responseData = await response.json();
      console.log(responseData, "rfe");

      if (responseData?.statusCode === 200) {
        toast.success(responseData.message);
        console.log("API Response:", responseData);
      } else {
        console.log("error occurs");
      }

      reset();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Header title="Create Admin" subtitle="Create a New Admin" />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Full Name"
            name="fullName"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("fullName", {
              required: true,
            })}
            required
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="email"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("email", {
              required: true,
            })}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Alternate Email"
            name="alternate_email"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("alternative_email", {
              required: true,
            })}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
            {...register("password", {
              required: true,
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Phone Number"
            name="contact"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
            {...register("contact", {
              required: true,
            })}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Alternate Phone Number"
            name="alternate phone number"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
          />
          <Box sx={{ gridColumn: "span 2" }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel
                id="demo-simple-select-filled-label"
                style={{ color: isDark ? "black" : "white" }}
              >
                Admin Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Admin Type"
                type="select"
                name="adminType"
                {...register("adminType", {
                  required: true,
                })}
              >
                <MenuItem value="subAdmin">SubAdmin</MenuItem>
                <MenuItem value="superAdmin">SuperAdmin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Admin
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateAdmin;
