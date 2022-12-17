import Layout from "../Layout/Layout";

import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Settings from "../Settings/Settings";
import Table from "../Table/Table";
import "./Home.css";
import { useEffect, useState } from "react";
import useHTTP from "../../custom-hooks/custom-hooks";

function Home() {
  const [settingsModalVisible, setSettingsModalVisibility] = useState(false);
  const { isLoading, sendRequest } = useHTTP();

  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const selectDate = (e) => {
    !fromDate && setFromDate(e.target.value);
    fromDate && setToDate(e.target.value);
  };

  const [analyticsData, setAnalyticsData] = useState([]);
  useEffect(() => {
    toDate &&
      sendRequest(
        {
          url: `http://go-dev.greedygame.com/v3/dummy/report?startDate=${fromDate}&endDate=${toDate}`,
        },
        (data) => setAnalyticsData(data)
      );
  }, [toDate, fromDate, sendRequest]);

  return (
    <Layout>
      <div className="home-page">
        <h2>Analytics</h2>
        <div
          className="date-setting"
          onClick={() => setSettingsModalVisibility(true)}
        >
          <input type="date" onChange={selectDate} />
          {!settingsModalVisible && (
            <Button variant="outlined" startIcon={<SettingsIcon />}>
              Settings
            </Button>
          )}
        </div>
        {settingsModalVisible && (
          <Settings setSettingsModalVisibility={setSettingsModalVisibility} />
        )}
        <Table />
      </div>
    </Layout>
  );
}

export default Home;
