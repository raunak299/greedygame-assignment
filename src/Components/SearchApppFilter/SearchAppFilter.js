import "./SearchAppFilter.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../Store/Data-Slice";

function SearchAppFilter(props) {
  const activeFilter = props.filterActive;
  const dispatch = useDispatch();

  const currValue = useSelector(
    (state) => state.dataSlice.filterValue[activeFilter]
  );

  const analyticsData = useSelector((state) => state.dataSlice.analyticsData);

  const inputRef = useRef();

  const filterApply = () => {
    dispatch(
      dataSliceActions.setFilter({
        columnName: activeFilter,
        filterValue: inputRef.current.value,
      })
    );

    dispatch(
      dataSliceActions.filterHandler({
        analyticsData,
      })
    );

    props.setSearchAppFilterVisisbility(false);
  };

  const resetSearchFilter = () => {
    dispatch(
      dataSliceActions.setFilter({
        columnName: activeFilter,
        filterValue: "",
      })
    );

    dispatch(
      dataSliceActions.filterHandler({
        analyticsData,
      })
    );

    props.setSearchAppFilterVisisbility(false);
  };

  return (
    <div className="search-app-filter">
      <label>{props.filterActive.toUpperCase()}</label>
      <input type="input" ref={inputRef} placeholder={currValue} />
      <div className="btn-sec">
        <Button variant="contained" onClick={filterApply}>
          Apply
        </Button>
        <Button variant="outlined" onClick={resetSearchFilter}>
          RESET
        </Button>
      </div>
    </div>
  );
}

export default SearchAppFilter;
