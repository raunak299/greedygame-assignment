import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    tableColumns: [
      { column: "date", visible: true },
      { column: "app", visible: true },
      { column: "requests", visible: true },
      { column: "responses", visible: true },
      { column: "impressions", visible: true },
      { column: "clicks", visible: true },
      { column: "revenue", visible: true },
      { column: "fill_rate", visible: true },
      { column: "ctr", visible: true },
    ],
    analyticsData: [],
    filteredAnalyticsData: [],
    appData: [],
    maxValue: {
      app: "",
      date: "",
      requests: 0,
      responses: 0,
      impressions: 0,
      clicks: 0,
      revenue: 0,
      fill_rate: 0,
      ctr: 0,
    },
    filterValue: {
      app: "",
      date: "",
      requests: 0,
      responses: 0,
      impressions: 0,
      clicks: 0,
      revenue: 0,
      fill_rate: 0,
      ctr: 0,
    },
    sliderFilterVisible: false,
    SearchAppFilterVisible: false,
  },
  reducers: {
    rearrangeColumns(state, action) {
      const { draggedItemPosition, dragOverItemPosition } = action.payload;
      const newTableColumnsList = [...state.tableColumns];
      const draggedElement = newTableColumnsList[draggedItemPosition];
      // console.log(draggedElement);
      newTableColumnsList.splice(
        draggedItemPosition,
        1,
        state.tableColumns[dragOverItemPosition]
      );
      newTableColumnsList.splice(dragOverItemPosition, 1, draggedElement);
      state.tableColumns = newTableColumnsList;
    },

    columnVisibilityHandler(state, action) {
      let { position } = action.payload;
      let tableColumnsList = state.tableColumns;
      const newTableColumnsList = [...tableColumnsList];
      newTableColumnsList[position] = {
        column: tableColumnsList[position].column,
        visible: !tableColumnsList[position].visible,
      };
      state.tableColumns = newTableColumnsList;
    },

    setAnalyticsData(state, action) {
      let tempAnalyticsData = action.payload.analyticsData;
      let analyticsData = [];
      let appDataMap = new Map([]);
      state.appData.forEach((item) =>
        appDataMap.set(item.app_id, item.app_name)
      );

      tempAnalyticsData.forEach((item) => {
        let {
          app_id,
          date,
          revenue,
          requests,
          responses,
          clicks,
          impressions,
        } = item;
        const app = appDataMap.get(app_id);
        let fill_rate = requests / responses;
        let ctr = clicks / impressions;
        revenue = Math.round(revenue * 100) / 100;
        date = date.substr(0, 10);

        const tempData = {
          app: "",
          date: "",
          revenue: Math.max(state.maxValue.revenue, revenue),
          requests: Math.max(state.maxValue.requests, requests),
          responses: Math.max(state.maxValue.responses, responses),
          clicks: Math.max(state.maxValue.clicks, clicks),
          impressions: Math.max(state.maxValue.impressions, impressions),
          fill_rate: Math.max(state.maxValue.fill_rate, fill_rate),
          ctr: Math.max(state.maxValue.ctr, ctr),
        };

        state.maxValue = tempData;
        state.filterValue = tempData;

        analyticsData.push({
          app,
          date,
          revenue,
          requests,
          responses,
          clicks,
          impressions,
          fill_rate,
          ctr,
        });
      });

      state.analyticsData = analyticsData;
      state.filteredAnalyticsData = analyticsData;
    },

    setAppDataHandler(state, action) {
      state.appData = action.payload.responseData;
    },

    setFilter(state, action) {
      const { columnName, filterValue } = action.payload;
      state.filterValue[columnName] = filterValue;
    },

    setSliderVisibility(state) {
      state.sliderFilterVisible = !state.sliderFilterVisible;
    },

    setSearchAppFilterVisisbility(state) {
      state.SearchAppFilterVisible = !state.SearchAppFilterVisible;
    },

    filterBySearch(state, action) {
      const { input, analyticsData, activeFilter } = action.payload;
      const tempAnalyticsData = analyticsData.filter(
        (data) => input.toUpperCase() === data[activeFilter].toUpperCase()
      );
      if (!tempAnalyticsData.length) {
        activeFilter === "app" && alert("app not found");
        activeFilter === "date" && alert("date not found");
      } else {
        state.filterValue.app = "";
        state.filterValue.date = "";
        state.filteredAnalyticsData = state.analyticsData;
        state.filterValue[activeFilter] = input;
        state.filteredAnalyticsData = tempAnalyticsData;
      }
    },

    resetSearchFilter(state, action) {
      const { activeFilter } = action.payload;
      if (state.filterValue[activeFilter]) {
        state.filterValue[activeFilter] = "";
        state.filteredAnalyticsData = state.analyticsData;
      }
    },

    filterHandler(state, action) {
      const { analyticsData } = action.payload;

      let tempAnalyticsData = analyticsData;
      //filter-by-app
      if (state.filterValue.app.length > 0) {
        tempAnalyticsData = tempAnalyticsData.filter(
          (data) =>
            data.app.toUpperCase() === state.filterValue.app.toUpperCase()
        );
      }
      //filter by date
      if (state.filterValue.date.length > 0) {
        tempAnalyticsData = tempAnalyticsData.filter(
          (data) =>
            data.date.toUpperCase() === state.filterValue.date.toUpperCase()
        );
      }

      //filter by all other metrics
      tempAnalyticsData = tempAnalyticsData.filter(
        (data) =>
          data.requests <= state.filterValue.requests &&
          data.responses <= state.filterValue.responses &&
          data.revenue <= state.filterValue.revenue &&
          data.clicks <= state.filterValue.clicks &&
          data.fill_rate <= state.filterValue.fill_rate &&
          data.ctr <= state.filterValue.ctr &&
          data.impressions <= state.filterValue.impressions
      );
      state.filteredAnalyticsData = tempAnalyticsData;
    },
  },
});

export const dataSliceActions = dataSlice.actions;
export default dataSlice.reducer;
