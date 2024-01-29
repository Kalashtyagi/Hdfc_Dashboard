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
// import SubtitlesOffSharpIcon from "@mui/icons-material/SubtitlesOffSharp";
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
import { useContext,useState,useEffect } from "react";
import { BASE_URL } from "../../apiConfig";

const Dashboard = () => { 
   console.log(process.env.REACT_APP_BASE_URL,"d");
    const [data,setData]=useState([]);
    const[onBoardedData,setOnBoardedData]=useState([]);
    const[inProcessData,setInProcessData]=useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);
  const fetchData=async()=>{
    try{
      const response=await fetch(`${BASE_URL}GetallMerchantFormSubmissions`)

      const result=await response.json();
      if(result?.statusCode===200){ 
        setOnBoardedData(result?.data?.filter((item)=>item.isFinalSubmission))
        setInProcessData(result?.data?.filter((item)=>!item.isFinalSubmission))
        setData(result?.data);
      }
      
    }catch(error){
      console.log(error,"error");
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
console.log(onBoardedData,"data");
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
            title={inProcessData.length}
            subtitle="In Process"
            progress="0.75"
            increase="+14%"
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
            increase="+21%"
            icon={
              <HandshakeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Ticket Raised"
            progress="0.30"
            increase="+5%"
            icon={
              <BookOnlineSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Ticket Closed"
            progress="0.80"
            increase="+43%"
            icon={
              <HandshakeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 4"
          // gridRow="span 2"
          // backgroundColor={colors.primary[400]}
          // overflow="hidden"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Notifications
            </Typography>
          </Box>
          {Notifications.map((notification, i) => (
            <Box
              key={`${notification.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {notification.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {notification.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{notification.date}</Box>
              
            </Box>
          ))}
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
            <PieActiveArc size="175" />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
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
          {newMerchant.map((newItem, index) => (
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
                  {newItem.merchant}
                </Typography>
                <Box display="flex" marginTop="25px">
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{
                        fontSize: "26px",
                        color: colors.greenAccent[500],
                      }}
                    />
                  </IconButton>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: colors.greenAccent[500],
                    }}
                  >
                    approve
                  </Button>
                </Box>
              </Box>
            </>
          ))}
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
