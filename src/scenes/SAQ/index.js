import { Box, Button, TextField, Typography } from "@mui/material";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { DarkContext } from "../global/DarkBar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../apiConfig";
import { toast } from "react-toastify";

const AddForm = () => {
  const storedUserId = localStorage.getItem("userId");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [type, setType] = React.useState("");
  const { isCollapsed } = useContext(SidebarContext);
  const { isDark } = useContext(DarkContext);

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
      const response = await axios.post(
        `${BASE_URL}InsertFormData`,
        {
          title: data.title,
          ceatedBy: storedUserId,
          virsion: data.version,
          isActive: 1,
          totalParts: data.totalParts,
          description: data.description,
          formTemplate: "string",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            AdminId: storedUserId,
          },
        }
      );

      if (response?.status === 200) {
        const responseData = response?.data;
        toast.success(responseData.message);
        console.log("API Response:", responseData);
      } else {
        console.error("HTTP error! Status:", response.status);
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
        <Header title="Add Form" subtitle="Create a new Form" />
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
            label="Title"
            name="title"
            sx={{ gridColumn: "span 2" }}
            required
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("title", {
              required: true,
            })}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Version"
            name="version"
            sx={{ gridColumn: "span 2" }}
            required
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("version", {
              required: true,
            })}
          />
          {/* <TextField
            fullWidth
            variant="filled"
            type="file"
            name="template"
            helperText="Template Type"
            sx={{ gridColumn: "span 2" }}
            required
            inputProps={{ accept: ".pdf" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("template", {
              required: true,
            })}
          /> */}
          {/* <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            name="contact"
            sx={{ gridColumn: "span 2" }}
            required
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("email", {
              required: true,
            })}
          /> */}
          <Box sx={{ gridColumn: "span 2" }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel
                id="demo-simple-select-filled-label"
                style={{ color: isDark ? "black" : "white" }}
              >
                Form Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Admin Type"
                type="select"
                name="formType"
                {...register("formType", {
                  required: true,
                })}
              >
                <MenuItem value="Saq">Saq</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Is Active
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes Active"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="Not Active"
              />
            </RadioGroup>
          </FormControl> */}
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Total Parts"
            name="totalParts"
            sx={{ gridColumn: "span 2" }}
            required
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("totalParts", {
              required: true,
            })}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            variant="filled"
            name="description"
            rows={3}
            sx={{ gridColumn: "span 2" }}
            placeholder="Add Description"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("description", {
              required: true,
            })}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Add Form
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddForm;
