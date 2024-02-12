

import { Box, CircularProgress, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../apiConfig";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { Popover } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MerchantForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useContext(SidebarContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [app, setApp] = useState("");
  const storedUserId = sessionStorage.getItem("userId");
  const [rowData, setRowData] = useState('');
  const [reviewComments, setReviewComments] = useState('');


  const handlePopoverOpen = (event, row, disc) => {
    setAnchorEl(event.currentTarget);
    setRowData(row);
    setApp(disc);
    
  };
  console.log("app",app)
  console.log("row", rowData.formID);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleApprove = async (e) => {
    e.preventDefault();

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
          value: app === "approve" ? "Approved" : reviewComments,

        }
      ];
      const response = await axios.patch(`${BASE_URL}UpdateMerchantFormSubmissions?FormId=${rowData.formID}&MerchantId=${rowData.merchantID}`, patchData);
      console.log("reponse", response.data.message);
      toast.success(response.data.message, {
        position: 'top-center'
      });


    } catch (error) {
      toast.error("somethings wrong please try again");
      console.log("error", error);
    }

    console.log("Approved:");

    handlePopoverClose();
  };

  const handleDisapprove = () => {
    console.log("Disapproved:", selectedItem);

    // Close popover
    handlePopoverClose();
  };

  const handlePdf = async (row) => {
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

  const columns = [
    { field: "submissionID", headerName: "Submission Id", flex: 2 },
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
      field:"reviewComments",
      headerName:'Review Comments',
      flex:2,

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
      field: "action",
      headerame: "Action",
      flex: 4,
      renderCell: (params) => {

        return (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={(e) => handlePopoverOpen(e, params.row, "approve")}
            >
              Approve
            </Button>
            &nbsp;{" "}
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={(e) => handlePopoverOpen(e, params.row, "disapprove")}
            >
              Disapprove
            </Button>
            &nbsp;&nbsp;
            <Button size="small" variant="contained" onClick={() => handlePdf(params.row)}> <DownloadIcon /></Button>
          </div>
        );
      },
      // renderCell: (params) => (
      //   <div
      //     style={{
      //       cursor: "pointer",
      //       display: "flex",
      //       justifyContent: "center",
      //       textAlign: "center",
      //     }}

      //   >
      //     <Button
      //       size="small"
      //       variant="contained"
      //       color="success"
      //       onClick={(e) => handlePopoverOpen(e, "approve")}
      //     >
      //       Approve
      //     </Button>
      //     &nbsp;{" "}
      //     <Button
      //       size="small"
      //       variant="contained"
      //       color="error"
      //       onClick={(e) => handlePopoverOpen(e, "disapprove")}
      //     >
      //       Disapprove
      //     </Button>
      //     &nbsp;&nbsp;
      //     <Button size="small" variant="contained"> <DownloadIcon /></Button>

      //   </div>
      // ),
    },


  ];
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetallMerchantFormSubmissions`);
      const result = await response.json();
      const rowsWithIds = result?.data.map((row) => ({ ...row, id: uuidv4() }));
      setData(rowsWithIds);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
            Are you sure do you want to{" "}
            {selectedItem ? `${selectedItem}` : `${app}`}?
          </Typography>
          {app == "disapprove" && (
            <textarea placeholder="Reason for disapprove" required onChange={(e) => setReviewComments(e.target.value)} />
          )}
          <br />
          <Button
            size="small"
            variant="contained"
            onClick={(e) => handleApprove(e)}
            color="success"
          >
            {app == "disapprove" ? "Disapprove" : "Approve"}
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
      <ToastContainer />
    </Box>
  );
};

export default MerchantForm;
