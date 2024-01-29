// import * as React from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { useState,useEffect } from "react";
// import { BASE_URL } from "../apiConfig";

// const data = [
//   { id: 0, value: 10, label: "UttarPradesh" },
//   { id: 1, value: 15, label: "Delhi" },
//   { id: 2, value: 20, label: "Pune" },
//   { id: 3, value: 6, label: "other" },
// ];

// export default function PieActiveArc() {  
//   const [pieData,setPieData]=useState([]);
//   const[filterData,setFilterData]=useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}GetallMerchantFormParts`);
//       if (response?.status === 200) {
//         const result = await response.json();
      
//         setPieData(result?.data);
        
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(()=>{
//     fetchData();
//   },[])
//   useEffect(() => {
//     const updatedData = pieData.filter((item) => item.partName === "City");
//     setFilterData(updatedData);
//   }, [pieData]);


  
//   console.log("piedtaa",pieData)
//   console.log("data",filterData);

  


//   return (
//     <PieChart
//       colors={["#00d1b0", "#266888", "#3aceff", "#2888"]}
//       series={[
//         {
//           data,
//           highlightScope: { faded: "global", highlighted: "item" },
//           faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
//         },
//       ]}
//       height={200}
//     />
//   );
// }
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import { BASE_URL } from "../apiConfig";

const data = [
  { id: 0, value: 10, label: "UttarPradesh" },
  { id: 1, value: 15, label: "Delhi" },
  { id: 2, value: 20, label: "Pune" },
  { id: 3, value: 6, label: "other" },
];

export default function PieActiveArc() {
  const [pieData, setPieData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [frequencyMap, setFrequencyMap] = useState(new Map());

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetallMerchantFormParts`);
      if (response?.status === 200) {
        const result = await response.json();
        setPieData(result?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data when pieData changes
    const updatedData = pieData.filter((item) => item.partName === "City");
    setFilterData(updatedData);

    // Update frequency map based on partResponse
    const newFrequencyMap = new Map();
    updatedData.forEach((item) => {
      const partResponse = item.partResponse;
      newFrequencyMap.set(
        partResponse,
        (newFrequencyMap.get(partResponse) || 0) + 1
      );
    });
    setFrequencyMap(newFrequencyMap);
  }, [pieData]);

  console.log("piedtaa", pieData);
  console.log("data", filterData);
  console.log("frequencyMap", frequencyMap);

  // Convert frequencyMap to PieChart data format
  const pieChartData = Array.from(frequencyMap).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <PieChart
      colors={["#00d1b0", "#266888", "#3aceff", "#2888"]}
      series={[
        {
          data: pieChartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
}

