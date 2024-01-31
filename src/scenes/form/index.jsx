import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { DarkContext } from "../global/DarkBar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../../apiConfig";

const Form = () => {
  const storedUserId = localStorage.getItem("userId");
  console.log("store", storedUserId);
  const { isDark } = useContext(DarkContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const [type, setType] = React.useState("");
  const { isCollapsed } = useContext(SidebarContext);

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
    console.log("data", data);
    reset();
    // try {
    //   const response = await fetch(`${BASE_URL}CreateMerchant`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: data.email,
    //       merchantName: data.name,
    //       status: "Active",
    //       address: data.address,
    //       phone: data.contact,
    //       merchantType: data.merchantType,
    //       adminId: storedUserId,
    //     }),
    //   });

    //   if (response?.status===200) {
    //     const responseData = await response.json();
    //     toast.success(responseData.message);

    //     console.log("API Response:", responseData);
    //   } else {
    //   }

    //   reset();
    //   console.log("res",response)
    // } catch (error) {
    //   console.error("API Error:", error);
    // }
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
        <Header title="Add Merchant " subtitle="Create a New Merchant" />
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
  label="Name"
  sx={{ gridColumn: "span 2" }}
  InputLabelProps={{
    style: {
      color: isDark ? "black" : "white",
    },
  }}
  {...register("name", {
    required: "Name is required",
    pattern: {
      value: /^[A-Za-z\s]+$/, 
      message: "Only alphabetical characters are allowed",
    },
  })}
  error={Boolean(errors.name)}
  helperText={
    <span
      style={{
        position: "absolute",
        color: "red",
        fontSize: "14px",
        marginLeft:'-10px'  
      }}
    >
      {errors.name?.message}
    </span>
  }
/>


          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            sx={{ gridColumn: "span 2" }}
            error={Boolean(errors.email)}
  helperText={
    <span
      style={{
        position: "absolute",
        color: "red",
        fontSize: "14px",
        // top: '50px',
        marginLeft:'-10px'  
      }}
    >
      {errors.email?.message}
    </span>
  }
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            name="address"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("address", {
              required: "Address is required"
            })}
            error={Boolean(errors.address)}
            helperText={
              <span style={{position: "absolute",
              color: "red",
              fontSize: "14px",
              // top: '50px',
              marginLeft:'-10px'  }}>{errors.address?.message}</span>
            }
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Phone Number"
            name="contact"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("contact", {
              required: "Contact is required",
              pattern: {
                value: /^(\+91-|\+91|0)?\d{10}$/, // Indian phone number regex
                message: "Enter a valid Indian phone number",
              },
            })}
            error={Boolean(errors.contact)}
            helperText={
              <span style={{position:'absolute',color: "red",
              fontSize: "14px",
              marginLeft:'-10px'}}>{errors.contact?.message}</span>
            }
          />
          <Box sx={{ gridColumn: "span 2" }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel
                id="demo-simple-select-filled-label"
                style={{ color: isDark ? "black" : "white" }}
              >
                Merchant Type
              </InputLabel>
               <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Merchant Type"
  type="select"
  {...register("merchantType", {
    required: "Merchant Type is required",
  })}
  error={Boolean(errors.merchantType)}
  helperText={
    <span style={{ position: 'absolute', fontSize: '14px', marginLeft: '-10px' }}>
      {errors.merchantType?.message}
    </span>
  }
>
  <MenuItem disabled value="">
    Choice option
  </MenuItem>
  <MenuItem value="Level 1">Level 1</MenuItem>
  <MenuItem value="Level 2">Level 2</MenuItem>
  <MenuItem value="Level 3">Level 3</MenuItem>
  <MenuItem value="Level 4">Level 4</MenuItem>
</Select>

            </FormControl>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Merchant
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
