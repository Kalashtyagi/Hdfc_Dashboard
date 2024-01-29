import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import Header from "../../components/Header";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomOutlinedInput = styled(OutlinedInput)({
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const hardcodedOptions = [
  { id: 1, name: " 1" },
  { id: 2, name: " 2" },
  { id: 3, name: "3" },
  { id: 4, name: " 4" },
];

const Bulkupload = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [id, setId] = useState();
  const { isCollapsed } = useContext(SidebarContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleMenuItemClick = (event, id) => {
    setId(id);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <Box
        gridRow="span 6"
        sx={{
          flexGrow: 1,
          marginLeft: isCollapsed ? "100px" : "300px",
          transition: "margin-left 0.3s",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Header title="Bulk Upload" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel
                id="demo-multiple-name-label"
                style={{ color: "white" }}
              >
                User Type
              </InputLabel>

              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={personName}
                onChange={handleChange}
                // input={<OutlinedInput label="Select Type" />}
                input={<CustomOutlinedInput label="User Type" />}
                MenuProps={MenuProps}
              >
                {hardcodedOptions.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    style={getStyles(item.name, personName, theme)}
                    onClick={(event) => handleMenuItemClick(event, item.id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
                {dropdownData.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    style={getStyles(item.name, personName, theme)}
                    onClick={(event) => handleMenuItemClick(event, item.id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={2} style={{ marginTop: "13px" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{
                fontSize: "20px",
                color: "blueviolet",
                backgroundColor: "white",
                height: "40px",
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <p>Accept only xls or xlsx</p>
            <p style={{ color: "#03c6a1" }}>
              {selectedFile ? selectedFile.name : "No file selected"}
            </p>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Bulkupload;
