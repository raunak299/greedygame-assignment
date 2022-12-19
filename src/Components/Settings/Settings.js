import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../../Store/Data-Slice";
import "./Settings.css";

function Settings(props) {
  const tableColumnsList = useSelector((state) => state.dataSlice.tableColumns);
  const dispatch = useDispatch();

  const columnVisibilityHandler = (position) => {
    if (
      tableColumnsList[position].column === "app" ||
      tableColumnsList[position].column === "date"
    ) {
      return;
    }
    dispatch(dataSliceActions.columnVisibilityHandler({ position }));
  };

  let draggedItemPosition = -1;
  let dragOverItemPosition = -1;
  const dragStart = (e, position) => {
    draggedItemPosition = position;
    // console.log(e.target.innerText);
  };
  const dragEnter = (e, position) => {
    dragOverItemPosition = position;
    // console.log(e.target.innerText);
  };
  const drop = () => {
    dispatch(
      dataSliceActions.rearrangeColumns({
        draggedItemPosition,
        dragOverItemPosition,
      })
    );
  };

  return (
    <div className="settings-component">
      <h4>Dimension and Metrics</h4>
      <div className="column-heading">
        {tableColumnsList.map((item, index) => (
          <Button
            variant="outlined"
            key={index}
            draggable
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            onClick={() => columnVisibilityHandler(index)}
            color={item.visible === false ? "error" : "success"}
          >
            {item.column}
          </Button>
        ))}
      </div>
      <div className="settings-btn">
        <Button
          variant="outlined"
          onClick={() => props.setSettingsModalVisibility(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default Settings;
