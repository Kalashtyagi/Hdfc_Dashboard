import { Box, Button, Modal, TextField,Grid ,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { useEffect, useState,useContext } from "react";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import {ToastContainer,toast } from "react-toastify"
import { DarkContext } from "../../scenes/global/DarkBar";
function SendEmailModal({rowData,emailModalOpen,setEmailModalOpen,handleCloseEmailModal}){   
  const { isDark } = useContext(DarkContext); 
     const[formId,setFormId]=useState([]);
     const storedUserId = sessionStorage.getItem("userId");
     const[body,setBody]=useState('');
     const[subject,setSubject]=useState('');

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
    },[rowData])
    const handleSendEmail=async(e)=>{   
      e.preventDefault();
      if(body===''||subject===''){
        toast.error("Please Select all the field");
        return ;
      }
           try{ 
            const response=await axios.post(`${BASE_URL}SendEmail`,{
                adminId:storedUserId,
                toEmailId:rowData?.email,
                body:body,
                subject:subject
            })
             if(response?.status===200){
              toast.success(response.data.message);
              console.log("response",response.data.message);
              setBody('');
              setSubject('');
             }
            else{
              // toast.error("somethings went wrong please try again")
            }

           }catch(error){
            toast.error(error.message)

            console.log("error",error);
           }

        console.log("die",subject,body)
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
                InputLabelProps={{
                  style: {
                    color: isDark ? "black" : "white",
                  },
                }}
    
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                value={emailData.email}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: isDark ? "black" : "white",
                  },
                }}
    
              />
            </Grid>
          </Grid>
          <TextField
            label="Merchant ID"
            value={emailData.merchantId}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}

            
            fullWidth
            margin="normal"
          />
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="form-id-label"style={{ color: isDark ? "black" : "white" }}
>FormId</InputLabel>
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
          <TextField
          label="Subject"
          name="subject"
          required
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}

          fullWidth
          margin="normal"
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}
        />
         <TextField
          label="Body"
          name="body"
          required
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          InputLabelProps={{
            style: {
              color: isDark ? "black" : "white",
            },
          }}
        />

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