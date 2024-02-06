
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

const Dashboard = () => {
  console.log(process.env.REACT_APP_BASE_URL, "d");
  const [data, setData] = useState([]);
  const [onBoardedData, setOnBoardedData] = useState([]);
  const [inProcessData, setInProcessData] = useState([]);
  const [getAllMerchantFromSub, setGetAllMerchantFromSub] = useState([]);
  const [notMatchingData, setNotMatchingData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetallMerchantFormSubmissions`);

      const result = await response.json();
      if (result?.statusCode === 200) {
        setGetAllMerchantFromSub(result?.data);

        setOnBoardedData(
          result?.data?.filter((item) => item.isFinalSubmission)
        );
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
  console.log("inprocess", inProcessData);
  useEffect(() => {
    fetchData();
    getAllMerchant();
  }, []);

  const complex = getAllMerchantFromSub.some(
    (item1) =>
      !inProcessData.some((item2) => item1.merchantId === item2.merchantId)
  );

  console.log("not matching", complex);

  // useEffect(() => {
  //   const filteredData = getAllMerchantFromSub.filter(
  //     (item1) => !inProcessData.some((item2) => item1.merchantId === item2.merchantId)
  //   );
  //   setNotMatchingData(...notMatchingData,filteredData);
  // }, [getAllMerchantFromSub, inProcessData]);
  console.log("not match", notMatchingData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ... other code

  const handlePopoverOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleApprove = () => {
    // Handle approval logic here
    console.log("Approved:", selectedItem);

    // Close popover
    handlePopoverClose();
  };

  const handleDisapprove = () => {
    // Handle disapproval logic here
    console.log("Disapproved:", selectedItem);

    // Close popover
    handlePopoverClose();
  };

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
            title={complex.length}
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
              top: "100px", // Adjust the top position as needed
              right: "0", // Adjust the left position as needed
              height: "350px",
              // border: "2px solid grey",
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
                // backgroundColor: "white",
              }}
            >
              Admin log
            </h6>
            <br />
            <br />
            <div>
              {Notifications.map((not, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                  key={index}
                >
                  <div>
                    <p>{not.user}</p>
                    <p style={{ color: "#3da58a" }}>{not.txId}</p>
                  </div>

                  <p>{not.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              position: "fixed",
              top: "470px", // Adjust the top position as needed
              right: "0", // Adjust the left position as needed
              height: "350px",
              // border: "2px solid grey",
              width: "400px",
              overflowY: "scroll",
            }}
          >
            <h6
              style={{
                textAlign: "center",
                color: "#3da58a",
                fontSize: "26px",
                margin: "0",
                right: "140px",
                position: "fixed",
                // backgroundColor: "white",
              }}
            >
              Merchant log
            </h6>
            <br />
            <br />
            {Notifications.map((not, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
                key={index}
              >
                <p>{not.user}</p>
                <p style={{ color: "#3da58a" }}>{not.date}</p>
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
                    onClick={(e) => handlePopoverOpen(e, newItem)}
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
                    onClick={(e) => handlePopoverOpen(e, newItem)}
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
            <PieActiveArc size="175" />
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
            Are you sure you want to{" "}
            {selectedItem ? `approve ${selectedItem.merchant}` : ""}?
          </Typography>
          <textarea placeholder="Reason for disapprove" required />
          <br />
          <Button
            size="small"
            variant="contained"
            onClick={handleApprove}
            color="success"
          >
            Approve
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
    </Box>
  );
};

export default Dashboard;