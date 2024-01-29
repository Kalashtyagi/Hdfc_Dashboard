import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BASE_URL } from "../apiConfig";

const MonthlyLineChart = () => {
  const [monthlyData, setMonthlyData] = useState({ uData: [], pData: [], xLabels: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetallMerchantFormSubmissions`);
      const result = await response.json();

      if (result.statusCode === 200) {
        const dataFromApi = result.data;
        extractChartData(dataFromApi);
      } else {
        console.error("API Error:", result.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const extractChartData = (dataFromApi) => {
    const monthlyCounts = dataFromApi.reduce((acc, item) => {
      const month = new Date(item.submissionDate).toLocaleString("en-US", { month: "short" });

      if (!acc[month]) {
        acc[month] = { uCount: 0, pCount: 0, details: [] };
      }

      if (item.isFinalSubmission) {
        acc[month].pCount += 1;
        acc[month].details.push({
          type: "Final Submission",
          date: new Date(item.submissionDate).toLocaleDateString(),
          reviewedBy: item.reviewedBy,
          reviewComments: item.reviewComments,
        });
      } else {
        acc[month].uCount += 1;
        acc[month].details.push({
          type: "Unfinal Submission",
          date: new Date(item.submissionDate).toLocaleDateString(),
        });
      }

      return acc;
    }, {});

    const xLabels = Object.keys(monthlyCounts);
    const uData = xLabels.map((month) => monthlyCounts[month].uCount);
    const pData = xLabels.map((month) => monthlyCounts[month].pCount);

    setMonthlyData({ uData, pData, xLabels });
  };

  return (
    <LineChart
      width={800}
      height={250}
      series={[
        { data: monthlyData.pData, label: "This Year", id: "thisYearId" },
        { data: monthlyData.uData, label: "Last Year", id: "lastYearId" },
      ]}
      xAxis={[{ scaleType: "point", data: monthlyData.xLabels }]}
      tooltip={(props) => {
        const { active, payload } = props;

        if (active && payload && payload.length) {
          const data = payload[0].payload.details.map((detail) => (
            <div key={detail.date}>
              <strong>{detail.type}</strong>
              <br />
              Date: {detail.date}
              <br />
              Reviewed By: {detail.reviewedBy}
              <br />
              Review Comments: {detail.reviewComments}
            </div>
          ));

          return <div className="custom-tooltip">{data}</div>;
        }

        return null;
      }}
    />
  );
};

export default MonthlyLineChart;
