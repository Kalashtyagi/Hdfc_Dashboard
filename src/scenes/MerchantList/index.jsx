
import { Box,Button,Modal,TextField} from "@mui/material";
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
import axios from "axios";
import { toast } from "react-toastify";

const Contacts = () => { 
  const[data,setData]=useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState(null);
  const { isCollapsed } = useContext(SidebarContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // const[name,setName]=useState("");
  // const[email,setEmail]=useState("");
  // const[merchantId,setMerchantId]=useState("");
  // const[phone,setPhone]=useState("");
  // const[address,setAddress]=useState("");
  const[editData,setEditData]=useState({
    name:'',
    address:'',
    phone:'',
    email:'',
    merchantId:'',
  })

  const columns = [
    { 
      field: "merchantId",
       headerName: "Id", 
       flex: 5,

      },
    {
      field: "merchantName",
      headerName: "Name",
      flex: 2,
    },
    
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 4,
    },
    {
      field: "merchantType",
      headerName: "Merchant Type",
      flex: 2,

    },
    {
      field:'adminId',
      headerName:'Admin Id',
      flex: 4,

    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div style={{cursor:'pointer'}} onClick={() => handleEdit(params.row)}>
        <Button size="small" variant="contained" color="success" >
            Edit
          </Button>
        </div>
      ),
    },
   
  ]; 
  const handleEdit = (row) => {
    setSelectedRow(row);
    // console.log(row);
    // setAddress(row?.address);
    // setEmail(row?.email)
    // setMerchantId(row?.merchantId);
    // setPhone(row?.phone);
    // setName(row?.merchantName);
    setEditData({
      name: row?.merchantName || '',
      address: row?.address || '',
      phone: row?.phone || '',
      email: row?.email || '',
      merchantId: row?.merchantId || '',
  });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };
  const fetchData=async()=>{
    try{
      const response=await fetch(`${BASE_URL}GetallMerchant`)
      const result= await response.json();
      const rowsWithIds = result?.data.map(row => ({ ...row, id: uuidv4() }));

      console.log(result);
      setData(rowsWithIds);

    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  const handleEditSubmit = async (email) => {
    console.log("ed",editData?.email);

    try {
        const patchData = [
            {
                operationType: 0,
                path: "/merchantName",
                op: "replace",
                from: "string",
                value:"sunyo",
            }
        ];

        const response = await axios.patch(
            `${BASE_URL}PatchMerchant`,
            patchData,{
              params:{
                Email:email
              },
            }
        );
        console.log(response.data); 
        toast.success(response.data.message)
    } catch (error) {
        console.error("Error editing merchant:", error);
    }
    setEditModalOpen(false);
};



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
     
      
      <Modal
  open={editModalOpen}
  onClose={handleCloseModal}
  aria-labelledby="edit-modal-title"
  aria-describedby="edit-modal-description"
>
  <Box
    sx={{
      position: "absolute",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <TextField
      label="Name"
      value={editData?.name}
      name="name"
      onChange={(e) =>setEditData({...editData,[e.target.name]:[e.target.value]})}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Email"
      name="email"
      value={editData?.email}
  onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Phone Number"
     name="phone"
      value={editData?.phone}
      onChange={(e) =>setEditData({...editData,[e.target.name]:[e.target.value]})}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Address"
      value={editData?.address}
      name="address"
      onChange={(e) =>setEditData({...editData,[e.target.name]:[e.target.value]})}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Merchant Id"
      value={editData?.merchantId}
      name="merchantId"
      onChange={(e) => setEditData({...editData,[e.target.name]:[e.target.value]})}
      fullWidth
      margin="normal"
    />
    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
      <Button
        variant="contained"
        color="success"
        // onClick={(e) => handleEditSubmit(e, updatedFields)}

        onClick={()=>handleEditSubmit(editData.email)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        style={{ marginLeft: 8 }}
        onClick={handleCloseModal}
      >
        Cancel
      </Button>
    </Box>
  </Box>
</Modal>
    </Box>
  );
};

export default Contacts;
