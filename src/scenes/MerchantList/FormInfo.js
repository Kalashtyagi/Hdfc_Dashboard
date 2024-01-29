import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL } from "../../apiConfig";


const FormInfo = () => {
  const theme = useTheme();
  const[data,setData]=useState([]);
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);

  const columns = [
    { field: "formId", headerName: "ID" ,flex:3},
    {
      field: "title",
      headerName: "Title",
      flex:2
    },
   
    {
      field: "virsion",
      headerName: "Version",
      flex: 1,
    },
    {
      field: "ceatedBy",
      headerName: "CreatedBy",
      flex:2
    },
    {
      field: "formTemplate",
      headerName: "FormTemplate",
      flex:1
    },
    {
      field:'description',
      headerName:'Description',
      flex:4
    },{
      field:'totalParts',
      headerName:'TotalParts',
      flex:1
    },{
      field:'isActive',
      headerName:'IsActive',
      flex:1
    }
  ];
  const fetchData=async()=>{
    try{
      const res=await fetch(`${BASE_URL}GetAllFormData`)
      const result=await res.json();
      const rowsWithIds = result?.data.map(row => ({ ...row, id: uuidv4() }));

      setData(rowsWithIds);
    }catch(error){
      console.log(error);
    }
  }
  console.log(data);
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      <Header title="Form Information" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default FormInfo;
