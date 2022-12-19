import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./SliderFilter.css";
import { dataSliceActions } from "../../Store/Data-Slice";

function SliderFilter(props) {
  const activeFilter = props.filterActive;
  const maxValue = useSelector(
    (state) => state.dataSlice.maxValue[activeFilter]
  );
  const currValue = useSelector(
    (state) => state.dataSlice.filterValue[activeFilter]
  );

  const analyticsData = useSelector((state) => state.dataSlice.analyticsData);

  const setFilterValue = (e) => {
    dispatch(
      dataSliceActions.setFilter({
        columnName: activeFilter,
        filterValue: Number(e.target.value),
      })
    );
  };

  const dispatch = useDispatch();
  const filterApply = () => {
    dispatch(
      dataSliceActions.filterHandler({
        analyticsData,
      })
    );
    dispatch(dataSliceActions.setSliderVisibility());
  };

  return (
    <div className="slider-filter">
      <label>{activeFilter.toUpperCase()}</label>
      <div className="input-range">
        <div>0</div>
        <div>{currValue}</div>
      </div>
      <input
        type="range"
        max={maxValue}
        value={currValue}
        onChange={setFilterValue}
      />
      <Button variant="contained" onClick={filterApply}>
        Apply
      </Button>
    </div>
  );
}

export default SliderFilter;
