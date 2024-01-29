import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SidebarContext } from "../global/SidebarContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL } from "../../apiConfig";

const Contacts = () => { 
  const[data,setData]=useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);

  const columns = [
    { 
      field: "merchantId",
       headerName: "Id", 
       flex: 3,

      },
    {
      field: "merchantName",
      headerName: "Name",
      flex: 3,
    },
    
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 4,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 6,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 4,
    },
    {
      field: "merchantType",
      headerName: "MerchantType",
      flex: 2,

    },
    {
      field:'adminId',
      headerName:'AdminId',
      flex: 4,

    }
   
  ]; 
  const fetchData=async()=>{
    try{
      const response=await fetch(`${BASE_URL}GetallMerchant`)
      const result= await response.json();
      const rowsWithIds = result?.data.map(row => ({ ...row, id: uuidv4() }));

      console.log(result);
      setData(rowsWithIds);

      // setData(result?.data);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
 console.log(data,"data");
  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      <Header title="Merchant List" subtitle="List of Merchants" />
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

export default Contacts;
