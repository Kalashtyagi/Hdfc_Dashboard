import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";
import { DarkContext } from "../global/DarkBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePass = () => {
  const { isDark } = useContext(DarkContext);
  const Otp = 1234;
  const [enterOtp, setEnterOtp] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // reset();
    setOpenModal(true);
  };
  const isPasswordStrong = (value) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigitOrSpecialChar = /[\d!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-]/.test(value);

    return (
      value.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigitOrSpecialChar
    );
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { isCollapsed } = useContext(SidebarContext);

  const [openModal, setOpenModal] = useState(false);

  const handleGenerateOTP = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const checkOtp = () => {
    if (enterOtp.length === 0) {
      toast.warning("please fill otp", {
        position: "top-center",
      });
    } else if (enterOtp.length !== 4) {
      toast.error("Otp must contains 4 digit ", {
        position: "top-center",
      });
    } else if (Otp == enterOtp) {
      console.log("succes");
      toast.success("reset password successfully", {
        position: "top-center",
      });
      reset();
      setOpenModal(false);
    } else {
      toast.error("Otp does not match", {
        position: "top-center",
      });
      console.log("unsecces");
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
        <Header title="Change Password" subtitle="Create a New Password" />
      </Box>

      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <div>
          <TextField
            fullWidth
            variant="filled"
            type={showPassword1 ? "text" : "password"}
            label="Old password"
            name="oldpassword"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            {...register("oldpassword", {
              required: "Old password is required",
            
            })}
            error={Boolean(errors.oldpassword)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.oldpassword?.message}</span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility1}>
                    {showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        
        </div>
        <div>
          <TextField
            fullWidth
            variant="filled"
            type={showPassword2 ? "text" : "password"}
            label="New Password"
            name="newpassword"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("newpassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
              validate: (value) => isPasswordStrong(value) || "Password is not strong enough",

            })}
            error={Boolean(errors.newpassword)}
            helperText={
              <span style={{position:"absolute",fontSize:'14px',marginLeft:'-10px'}}>{errors.newpassword?.message}</span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility2}>
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          
        </div>
        <div>
          <TextField
            fullWidth
            variant="filled"
            type={showPassword3 ? "text" : "password"}
            label="Confirm New Password"
            name="confirmNewPassword"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("confirmNewPassword", {
              required: "Confirm password is required",
              validate: (value) => value === watch("newpassword")|| "Passwords do not match",
            })}
            error={Boolean(errors.confirmNewPassword)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.confirmNewPassword?.message}</span>
              
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility3}>
                    {showPassword3 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
         
          
        </div>

        <Box mt="10px" ml="40px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
          >
            Generate OTP
          </Button>
        </Box>
      </Box>

      {/* </form> */}

      {/* OTP Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle style={{ marginLeft: "50px", fontWeight: "bold" }}>
          Enter OTP
        </DialogTitle>
        <DialogContent>
          <form>
            {/* <TextField
              fullWidth
              variant="filled"
              type="num"
              label="OTP"
              name="otp"
              required
              inputProps={{ maxLength: 4 }}
              onChange={(e) => setEnterOtp(e.target.value)}
            /> */}
            <OtpInput
              inputType="tel"
              value={enterOtp}
              onChange={setEnterOtp}
              numInputs={4}
              // renderSeparator={<span> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "5px",
                    backgroundColor: "ffff",
                    border: "1px solid black",
                    textAlign: "center",
                    color: "black",
                    fontSize: "20px",
                    marginLeft: "5px",
                  }}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button onClick={checkOtp} style={{ color: "white" }}>
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default ChangePass;
