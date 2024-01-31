import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { DarkContext } from "../global/DarkBar";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";

const Update = () => { 
  const storedUserId = sessionStorage.getItem("userId");
  console.log("userid",storedUserId)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm(); 
  


  const onSubmit = async(data) => {
    if(data.old_Email==data.new_Email){
      toast.error("old and new Email must not be same");
      reset();
      return;

    }
   

    try{
      const response=await axios.post(`${BASE_URL}ChangeEmailByAdminId`,data,{
              headers:{
                "Content-Type":"application/json",
              },
              params:{
                AdminId:storedUserId
              }
      }
      );
      
      if(response?.status===200){
        const responseData=await response?.data;
        console.log("responseData",responseData)
        toast.success(responseData.message)
      }else{
        const responseData=await response?.data;
        console.log("responseData",responseData)
        // console.error("HTTP error",response.status);
      } 
      reset();
    }catch(error){
      console.log("error",error);
    }
  
    
  };
  const { isDark } = useContext(DarkContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { isCollapsed } = useContext(SidebarContext);

  const handleEmail = async (event) => {
    

  

    
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
        <Header title="Edit Admin Data" />
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
            type="email"
            label="Old Email"
            name="oldemail"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("old_Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.old_Email)}
            helperText={
              <span style={{position:"absolute",fontSize:'14px',marginLeft:'-10px'}}>{errors.old_Email?.message}</span>
            }
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="New Email Address"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("new_Email", {
              required: "New_email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.new_Email)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.new_Email?.message}</span>
            }
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box display="flex" justifyContent="start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Email Address
          </Button>
        </Box>
      </form>
      <form onSubmit={handleEmail} style={{ marginTop: "12px" }}>
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
            type="email"
            label="Alternative Old Email"
            name="alternativeoldemail"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Alternative New Email Address"
            name="alternativenewemail"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
          />
        </Box>
        <Box display="flex" justifyContent="flex-start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Alternative Email
          </Button>
        </Box>
      </form>
      <form onSubmit={handleEmail} style={{ marginTop: "12px" }}>
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
            type="number"
            label="Old Phone Number"
            name="oldcontact"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="New Phone Number"
            name="newcontact"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
          />
        </Box>
        <Box display="flex" justifyContent="start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Phone Number
          </Button>
        </Box>
      </form>
      <form onSubmit={handleEmail} style={{ marginTop: "12px" }}>
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
            type="number"
            label="Alternative old Phone Number"
            name="alternativeoldcontact"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Alternative new Phone Number"
            name="alternativenewcontact"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            required
          />
        </Box>
        <Box display="flex" justifyContent="flex-start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Alternative Phone
          </Button>
        </Box>
      </form>
      
      <ToastContainer position="top-center"/>
    </Box>
  );
};

export default Update;
