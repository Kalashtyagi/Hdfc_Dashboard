import { Box , CircularProgress,Button} from "@mui/material";
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
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";



const MerchantForm = () => {  
  
  const [data,setData]=useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);

  const columns = [
    { field: "submissionID",
     headerName: "Submission Id", 
     flex:2
    },
    {
      field: "merchantID",
      headerName: "Merchant Id",
      flex: 2,
    },
   
    {
      field: "formID",
      headerName: "Form Id",
      flex: 2,
    },
    {
      field: "submissionDate",
      headerName: "Submission Date",
      flex: 2,
    },
    {
      field: "isFinalSubmission",
      headerName: "Is Final Submission",
      flex: 2,
    },
    {
      field:'reviewedBy',
      headerName:'Reviewed By',
      flex:2
    },
    {
      field:'reviewComments',
      headerName:'Review Comments',
      flex:2
    },
    {
      field: "action",
      headerame: "Action",
      flex: 3,
      renderCell: (params) => (
        <div style={{cursor:'pointer',textAlign:'center'}}>
        <Button size="small" variant="contained" color="success" >
            Approve
          </Button>&nbsp; <Button size="small" variant="contained" color="error" >
            Disapprove
          </Button>
        </div>
      ),
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 2,
    //   renderCell: (params) => (
    //     <div>
    //       {/* <a href={`download-link-for-row-${params.id}`}> */}
    //         {/* <IconButton> */}
    //           <DownloadIcon />
    //         {/* </IconButton> */}
    //       {/* </a> */}
    //     </div>
    //   ),
    // },
    
  ];
  const fetchData=async()=>{
    try{
      const response=await fetch(`${BASE_URL}GetallMerchantFormSubmissions`)
      const result=await response.json();
      const rowsWithIds = result?.data.map(row => ({ ...row, id: uuidv4() }));
      setData(rowsWithIds);
      setLoading(false); // Set loading to false when data is fetched

    }catch(error){
      console.log(error);
      setLoading(false); // Set loading to false when data is fetched

    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  console.log(data);
  
  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      <Header title="Merchant Form Submission" />
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

export default MerchantForm;
