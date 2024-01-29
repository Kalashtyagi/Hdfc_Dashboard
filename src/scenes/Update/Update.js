import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { DarkContext } from "../global/DarkBar";

const Update = () => {
  const { isDark } = useContext(DarkContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { isCollapsed } = useContext(SidebarContext);

  const handleEmail = async (event) => {
    event.preventDefault();
    alert("submit");

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("data", data);

    try {
      const response = await fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data successfully submitted:", data);
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
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
        <Header title="Edit Admin Data" />
      </Box>

      <form onSubmit={handleEmail}>
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
            sx={{ gridColumn: "span 2" }}
            required
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="New Email Address"
            name="newemail"
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
    </Box>
  );
};

export default Update;
