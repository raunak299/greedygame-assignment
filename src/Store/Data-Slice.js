import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    tableColumns: [
      { column: "Date", visible: true },
      { column: "App", visible: true },
      { column: "Ad Requeest", visible: true },
      { column: "Ad Response", visible: true },
      { column: "Impresssion", visible: true },
      { column: "Clicks", visible: true },
      { column: "Revenue", visible: true },
      { column: "Fill Rate", visible: true },
      { column: "CTR", visible: true },
    ],
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
  },
});

export const dataSliceActions = dataSlice.actions;
export default dataSlice.reducer;
