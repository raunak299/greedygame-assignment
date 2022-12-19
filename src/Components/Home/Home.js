import Layout from "../Layout/Layout";

import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Settings from "../Settings/Settings";
import Table from "../Table/Table";
import "./Home.css";
import { useEffect, useState } from "react";
import useHTTP from "../../custom-hooks/custom-hooks";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../Store/Data-Slice";

function Home() {
  const [settingsModalVisible, setSettingsModalVisibility] = useState(false);
  const { isLoading, sendRequest } = useHTTP();
  const [dateLabel, setDateLabel] = useState("Select Start Date");
  const dispatch = useDispatch();

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const selectDate = (e) => {
    // console.log(e.target.value);
    if (!fromDate) {
      setFromDate(e.target.value);
      setDateLabel("Select From Date");
    }
    fromDate && setToDate(e.target.value);
  };

  //   const [appData, setAppData] = useState(new Map([]));
  useEffect(() => {
    sendRequest(
      { url: "https://go-dev.greedygame.com/v3/dummy/apps" },
      (apiResponse) => {
        dispatch(
          dataSliceActions.setAppDataHandler({ responseData: apiResponse.data })
        );
      }
    );
  }, [sendRequest, dispatch]);

  useEffect(() => {
    toDate &&
      sendRequest(
        {
          url: `https://go-dev.greedygame.com/v3/dummy/report?startDate=${fromDate}&endDate=${toDate}`,
        },
        (responseData) => {
          let analyticsData = responseData.data;
          //   console.log(analyticsData);
          dispatch(dataSliceActions.setAnalyticsData({ analyticsData }));
          setDateLabel(`${fromDate}  To  ${toDate}`);
          setToDate("");
          setFromDate("");
        }
      );
  }, [toDate, fromDate, sendRequest, dispatch]);

  return (
    <Layout>
      {isLoading && <h1>Loading !!</h1>}
      {!isLoading && (
        <div className="home-page">
          <h2>Analytics</h2>
          <div className="date-setting">
            <div className="date-sec">
              <label>{dateLabel}</label>
              <input type="date" onChange={selectDate} min={fromDate} />
            </div>
            {!settingsModalVisible && (
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => setSettingsModalVisibility(true)}
              >
                Settings
              </Button>
            )}
          </div>
          {settingsModalVisible && (
            <Settings setSettingsModalVisibility={setSettingsModalVisibility} />
          )}
          <Table />
        </div>
      )}
    </Layout>
  );
}

export default Home;
