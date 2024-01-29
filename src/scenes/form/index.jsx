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
  const [type, setType] = React.useState("");
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
    try {
      const response = await fetch(`${BASE_URL}CreateMerchant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          merchantName: data.name,
          status: "Active",
          address: data.address,
          phone: data.contact,
          merchantType: data.merchantType,
          adminId: storedUserId,
        }),
      });

      if (response?.status===200) {
        const responseData = await response.json();
        toast.success(responseData.message);

        console.log("API Response:", responseData);
      } else {
      }

      reset();
      console.log("res",response)
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   alert("submit");

  //   const formData = new FormData(event.target);
  //   const data = {};
  //   formData.forEach((value, key) => {
  //     data[key] = value;
  //   });
  //   console.log("data", data);

  //   try {
  //     const response = await fetch("url", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log("Data successfully submitted:", data);
  //     } else {
  //       console.error("Error submitting data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

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
            name="name"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("name", {
              required: true,
            })}
            required
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
              required: true,
            })}
            name="email"
            sx={{ gridColumn: "span 2" }}
            required
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
              required: true,
            })}
            required
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
              required: true,
            })}
            required
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
                label="Admin Type"
                name="merchantType"
                type="select"
                {...register("merchantType", {
                  required: true,
                })}
              >
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
