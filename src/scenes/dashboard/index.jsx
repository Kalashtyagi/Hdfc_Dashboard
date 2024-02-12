
import {
  Box,
  Button,
  IconButton,
  List,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { Notifications } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BookOnlineSharpIcon from "@mui/icons-material/BookOnlineSharp";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { newMerchant } from "../../data/mockData";
import PieActiveArc from "../../components/PieChart";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { SidebarContext } from "../global/SidebarContext";
import { useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../apiConfig";
import { Popover } from "@mui/material";
import { Modal,TextField} from "@mui/material";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { DarkContext } from "../global/DarkBar";



const Dashboard = () => {
  console.log(process.env.REACT_APP_BASE_URL, "d"); 
  const storedUserId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const[open,setOpen]=useState(false);
  const [onBoardedData, setOnBoardedData] = useState([]);
  const [inProcessData, setInProcessData] = useState([]);
  const [getAllMerchantFromSub, setGetAllMerchantFromSub] = useState([]);
  const [notMatchingData, setNotMatchingData] = useState([]);
  const[merchantLogs,setMerchantLogs]=useState([]);
  const theme = useTheme();
  const { isDark } = useContext(DarkContext);

  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);
  const[viewMoreData,setViewMoreData]=useState([]);
  const[reviewComments,setReviewComments]=useState([]);
  const[reviewCom,setReviewCom]=useState('');
  const[allAdminLogs,setAllAdminLogs]=useState([]);
  
  // const[inpro]
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetallMerchantFormSubmissions`);

      const result = await response.json();
      if (result?.statusCode === 200) {
        setGetAllMerchantFromSub(result?.data);
        const approvedData = result?.data.filter((item) => item.reviewComments=== "Approved");
        const remainingData = result?.data.filter((item) => item.reviewComments!== "Approved");
  
        setOnBoardedData(approvedData);
        setReviewComments(remainingData);
        setData(result?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const getAllMerchant = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetallMerchant`);
      const result = await response.json();
      if (result?.statusCode === 200) {
        setInProcessData(result?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const getAllMerchantLogs=async()=>{
    try{
      const response=await fetch(`${BASE_URL}GetallMerchantUpdateLogs`)
      const result=await response.json();
      if(result?.statusCode===200){
        setMerchantLogs(result?.data);
      }

    }catch(error){
      console.log("error",error);
    }
  }
  const openViewMore=(item)=>{
    setOpen(true);
    setViewMoreData([item])
    
    console.log("item",item);
  }
  useEffect(() => {
    fetchData();
    getAllMerchant();
    getAllMerchantLogs();
  }, []);
useEffect(() => {
  const matchingData = [];
  reviewComments.forEach((comment) => {
      const matchingInProcessData = inProcessData.find((processData) => processData.merchantId=== comment.merchantID.toLowerCase());
      if (matchingInProcessData) {
          matchingData.push({
              ...comment, 
              merchantName: matchingInProcessData.merchantName
          });
      }
  });
  setNotMatchingData(matchingData);
}, [inProcessData,onBoardedData]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const[app,setApp]=useState(null);

  const handlePopoverOpen = (event,item,disc) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    setApp(disc)
    console.log("Item",item);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleApprove = async(e) => {  
    e.preventDefault();
    console.log("select",selectedItem)
    try {
      const patchData = [
        {
          path: "/isFinalSubmission",
          op: "replace",
          value:app==="approve"?true:false,
        }, {
          path: "/reviewedBy",
          op: "replace",
          value: storedUserId,

        },
        {
          path: "/reviewComments",
          op: "replace",
          value: app === "approve" ? "Approved" : reviewCom,

        }
      ];
      const response = await axios.patch(`${BASE_URL}UpdateMerchantFormSubmissions?FormId=${selectedItem.formID}&MerchantId=${selectedItem.merchantID}`, patchData);
      console.log("kejio", response.data.message);
      toast.success(response.data.message, {
        position: 'top-center'
      });


    } catch (error) {
      console.log("error", error);
    }

    console.log("Approved:");


    handlePopoverClose();
  };

  const handleDisapprove = () => {
    handlePopoverClose();
  };
  const handleCloseModal=()=>{
    setOpen(false);
  }
  
  const downloadPdf = async (row) => { 
    console.log("ow",row);
    try {
      const response = await axios.get(
        `${BASE_URL}DownloadPDF?FormId=${row.formID}&MerchantId=${row.merchantID}`
      );

      console.log('response 75', response.data);

      const jsonData = JSON.stringify(response.data, null, 2);
      console.log('83', jsonData);

      if (
        response.statusCode === 200 &&
        response.data &&
        response.data.fileUrl
      ) {
        const fileUrl = response.data.fileUrl;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = response.data.name || 'download.xlsx';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      } else {
        console.error('File URL not found in the response');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }

  }
const adminLogs=async()=>{
  try{
    const response=await fetch(`${BASE_URL}GetAllAdminUpdateLogs`)
    const result=await response.json();
    setAllAdminLogs(result.data);
  }catch(error){
    console.log("error",error);
  }
}
useEffect(()=>{
adminLogs();
},[])
console.log("adminlogs",allAdminLogs);
  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="New Merchant-overview" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={reviewComments.length}
            subtitle="In Process"
            progress="0.2"
            // increase="+14%"
            icon={
              <LoopIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={onBoardedData.length}
            subtitle="On Boarded"
            progress="0.50"
            // increase="+21%"
            icon={
              <HandshakeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box gridColumn="span 4" position="relative">
          <div
            style={{
              position: "fixed",
              top: "100px", 
              right: "0", 
              height: "350px",
              width: "400px",
              overflowY: "scroll",
            }}
          >
            <h6
              style={{
                textAlign: "center",
                position: "fixed",
                right: "140px",
                color: "#3da58a",
                fontSize: "26px",
                margin: "0",
              }}
            >
              Admin log
            </h6>
            <br />
            <br />
            <div>
              {allAdminLogs.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                  key={item.adminId}
                >
                  <div>
                    <p>{item.adminId}</p>
                    {/* <p style={{ color: "#3da58a" }}>{not.txId}</p> */}
                  </div>

                  <p style={{ color: "#3da58a",cursor:'pointer' }} onClick ={()=>openViewMore(item)}>view More</p>
                </div>
              ))}
            </div>
          </div>
          

          <div
            style={{
              
              position: "fixed",
              top: "470px", 
              right: "0",
              width: "400px",
              maxHeight: "250px", 
              overflowY: "auto",
            }}
          >
            <h6
              style={{
               

                textAlign: "center",
                color: "#3da58a",
                fontSize: "26px",
                margin: "0",
              }}
            >
              Merchant log
            </h6>
            <br />
            {merchantLogs.map((item) => (
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
                key={item.logId}
              >
                <p>{item.merchantId}</p>
                <p  onClick ={()=>openViewMore(item)} style={{ color: "#3da58a" ,cursor:'pointer' }}>view More</p>
              </div>
            ))}
          </div>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="inprocess"
                  control={<Radio />}
                  label="In Process"
                />
                <FormControlLabel
                  value="onBoarded"
                  control={<Radio />}
                  label="On Boarded"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 */}

        <Box
          gridColumn="span 5"
          gridRow="span 2"
          overflow="auto"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            New Merchant
          </Typography>
          {notMatchingData.map((newItem, index) => (
            <>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  key={index}
                  // variant="h5"
                  fontWeight="100"
                  sx={{ padding: "30px 30px 0 30px" }}
                >
                  {newItem.merchantName}
                </Typography>
                <Box display="flex" marginTop="25px">
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{
                        fontSize: "26px",
                        color: colors.greenAccent[500],
                      }}
                      onClick={()=>downloadPdf(newItem)}
                    />
                  </IconButton>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: colors.greenAccent[500],
                    }}
                    onClick={(e) => handlePopoverOpen(e,newItem,"approve")}
                  >
                    approve
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: colors.greenAccent[500],
                    }}
                    onClick={(e) => handlePopoverOpen(e, newItem,"disapprove")}
                  >
                    disapprove
                  </Button>
                </Box>
              </Box>
            </>
          ))}
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            On Boarding by location
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            mt="25px"
            justifyContent="space-between"
          >
            <PieActiveArc sise="175" />
          </Box>
        </Box>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box p={2} style={{ textAlign: "center" }}>
          <Typography>
            Are you sure  do you want to{" "}
            {selectedItem ? `${app} ${selectedItem.merchantName}`: ""}?
          </Typography>
          {app=="disapprove" && <textarea placeholder="Reason for disapprove" required  onChange={(e)=>setReviewCom(e.target.value)}/>}
          
          <br />
          <Button
            size="small"
            variant="contained"
            onClick={(e)=>handleApprove(e)}
            color="success"
          >
            {app=="disapprove"?"Disapprove":"Approve"}
          </Button>
          &nbsp;
          <Button
            size="small"
            variant="contained"
            onClick={handlePopoverClose}
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Popover>

      <Modal
  open={open}
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
      label="logId"
      name="logId"
      fullWidth
      value={viewMoreData[0]?.logId}
      InputLabelProps={{
        style: {
          color: isDark ? "black" : "white",
        },
      }}

      margin="normal"
    />
    <TextField
  label={viewMoreData[0]?.merchantId ? "MerchantID" : "AdminID"}
  name={viewMoreData[0]?.merchantId?"merchantId":"adminId"}
  fullWidth
  value={viewMoreData[0]?.merchantId || viewMoreData[0]?.adminId}
  margin="normal"
  InputLabelProps={{
    style: {
      color: isDark ? "black" : "white",
    },
  }}

/>
    <TextField
      label="new Value"
     name="newValue"
     value={viewMoreData[0]?.newValue}

      fullWidth
      margin="normal"
      InputLabelProps={{
        style: {
          color: isDark ? "black" : "white",
        },
      }}

    />
    <TextField
      label="old Value"
      name="oldValue"
      value={viewMoreData[0]?.oldValue}
      InputLabelProps={{
        style: {
          color: isDark ? "black" : "white",
        },
      }}

      fullWidth
      margin="normal"
    />
    <TextField
      label="update Field"
      // disabled
    
      name="updateField"
      value={viewMoreData[0]?.updatedField || viewMoreData[0]?.updateField}
      InputLabelProps={{
        style: {
          color: isDark ? "black" : "white",
        },
      }}

      fullWidth
      margin="normal"
    />

  </Box>
</Modal>
    </Box>
  );
};

export default Dashboard;