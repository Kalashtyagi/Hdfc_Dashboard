import { Box, Button, Modal, TextField,Grid ,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import { ToastClassName,toast } from "react-toastify"
function SendEmailModal({rowData,emailModalOpen,setEmailModalOpen,handleCloseEmailModal}){   
     const[formId,setFormId]=useState([]);
     const[emailData,setEmailData]=useState({
        name:'',
        email:'',
        merchantId:'',
        formId:''
      })
      useEffect(()=>{
        setEmailData({ 
             name:rowData?.merchantName,
             email:rowData?.email,
             merchantId:rowData?.merchantId,
            //  formId:rowData?.email
    
        })
    
      },[rowData])
    const getAllFormId=async()=>{
        try{
          const response=await fetch(`${BASE_URL}GetAllFormData`)
          const result=await response.json();
          setFormId(result.data);
          console.log("result",result.data);
        }catch(error){
          console.log("error",error);
        }
      } 
    useEffect(()=>{
          getAllFormId();
    },[])
    const handleSendEmail=async()=>{ 
        console.log("die",emailData)
        handleCloseEmailModal();
      }
    return(
        <Modal
        open={emailModalOpen}
        onClose={handleCloseEmailModal}
        aria-labelledby="email-modal-title"
        aria-describedby="email-modal-description"
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
            textAlign:'center'
          }}
        >
          <h4>Send Email</h4>
           <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                value={emailData.name}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                value={emailData.email}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <TextField
            label="Merchant ID"
            value={emailData.merchantId}
            
            fullWidth
            margin="normal"
          />
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="form-id-label">FormId</InputLabel>
          <Select
            
            type="select"
            label="FormId"
            
            value={emailData.formId}
            onChange={(e) => setEmailData({ ...emailData, formId: e.target.value })}

            fullWidth
          >
            {formId.map((formId) => (
              <MenuItem key={formId.formId} value={formId.formId}>
                {formId.formId}
              </MenuItem>
            ))}
          </Select>
          </FormControl>

          <Box sx= {{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: 8 }}
              onClick={handleCloseEmailModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    )
}
export default SendEmailModal;