import { Box, Button, Modal, TextField ,CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import { useContext } from "react";
import { ToastClassName,ToastContainer,toast } from "react-toastify"
import { DarkContext } from "../../scenes/global/DarkBar";

function EditModal({ selectedItem, editModalOpen, setEditModalOpen, handleCloseModal }) { 
  const[loading,setLoading]=useState(false);

  const [editData, setEditData] = useState({
    name:"",
    address:"",
    phone:"",
    email:"",
  });
  const { isDark } = useContext(DarkContext);
  useEffect(()=>{
    setEditData({ 
         name:selectedItem?.merchantName,
         address:selectedItem?.address,
         phone:selectedItem?.phone,
         email:selectedItem?.email
    })

  },[selectedItem])

  const handleEditSubmit = async (email) => { 
    setLoading(true);
    try {
        const patchData = [
            {
                // operationType: 0,
                path: "/merchantName",
                op: "replace",
                from: "string",
                value:`${editData?.name}`,
            },
            {
              // operationType: 0,
              path: "/email",
              op: "replace",
              from: "string",
              value:`${editData?.email}`, 
            },
            {
            // operationType: 0,
                path: "/phone",
                op: "replace",
                from: "string",
                value:`${editData?.phone}`,
            },
            {
              // operationType: 0,
                  path: "/address",
                  op: "replace",
                  from: "string",
                  value:`${editData.address}`,
              },
           
            
        ];

        const response = await axios.patch(
            `${BASE_URL}PatchMerchant`,
            patchData,{
              params:{
                Email:email
              },
            }
        );
        const result=await response.data;
        setLoading(false);
        toast.success(result.message);

    } catch (error) {
        console.error("Error editing merchant:", error);
    }finally{
      setLoading(false);
      setEditModalOpen(false);

    }
};
  return (
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
          value={editData.name}
          name="name"
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

        />
        <TextField
          label="Email"
          name="email"
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={editData.phone}
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

        />
        <TextField
          label="Address"
          value={editData.address}
          name="address"
          onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}

        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleEditSubmit(editData.email)}
          >
           {loading?<CircularProgress size={20}/>:"Edit"}
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
  );
}

export default EditModal;
