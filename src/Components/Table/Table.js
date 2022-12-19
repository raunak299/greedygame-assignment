import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchAppFilter from "../SearchApppFilter/SearchAppFilter";
import SliderFilter from "../SliderFilter/SliderFilter";
import "./Table.css";

function Table() {
  const [sliderFilterVisible, setSliderVisibility] = useState(false);
  const [SearchAppFilterVisible, setSearchAppFilterVisisbility] =
    useState(false);

  const tableColumnsList = useSelector((state) => state.dataSlice.tableColumns);
  const analyticsData = useSelector(
    (state) => state.dataSlice.filteredAnalyticsData
  );
  const maxValue = useSelector((state) => state.dataSlice.maxValue);
  const filterValue = useSelector((state) => state.dataSlice.filterValue);

  const [filterActive, setFilterActive] = useState("");
  const filterHandler = (column) => {
    setFilterActive(column);
    (column === "app" || column === "date") &&
      setSearchAppFilterVisisbility(true);
    column !== "app" && column !== "date" && setSliderVisibility(true);
  };

  return (
    <>
      {!analyticsData.length && (
        <h1>
          Hey Something OFF !! Change your filter or Choose different Date range
        </h1>
      )}

      <div className={`table-sec ${analyticsData.length > 0 ? "scroll" : ""}`}>
        {sliderFilterVisible && (
          <div className={`slider-filter-cont`}>
            <SliderFilter
              setSliderVisibility={setSliderVisibility}
              filterActive={filterActive}
            />
          </div>
        )}
        {SearchAppFilterVisible && (
          <div className="slider-filter-cont">
            <SearchAppFilter
              setSearchAppFilterVisisbility={setSearchAppFilterVisisbility}
              filterActive={filterActive}
            />
          </div>
        )}

        <table>
          <thead>
            <tr>
              {tableColumnsList.map((item, index) => {
                return (
                  item.visible && (
                    <th key={index}>
                      <FilterAltIcon
                        color={`${
                          maxValue[item.column] === filterValue[item.column]
                            ? ""
                            : "primary"
                        }`}
                        onClick={() => filterHandler(item.column)}
                      />
                      <h3>{item.column.toUpperCase()}</h3>
                    </th>
                  )
                );
              })}
            </tr>
          </thead>

          <tbody>
            {analyticsData.length > 0 &&
              analyticsData.map((item, indexrow) => (
                <tr key={indexrow}>
                  {tableColumnsList.map((col, indexcol) => {
                    let column = col.column;
                    return (
                      col.visible && <td key={indexcol}>{item[column]}</td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
