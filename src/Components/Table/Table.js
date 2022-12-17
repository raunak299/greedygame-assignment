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

  return (
    <div className="table-sec">
      {sliderFilterVisible && (
        <div className="slider-filter-cont">
          <SliderFilter setSliderVisibility={setSliderVisibility} />
        </div>
      )}
      {SearchAppFilterVisible && (
        <div className="slider-filter-cont">
          <SearchAppFilter
            setSearchAppFilterVisisbility={setSearchAppFilterVisisbility}
          />
        </div>
      )}

      <table>
        <thead>
          <tr>
            {tableColumnsList.map(
              (item, index) =>
                item.visible && (
                  <th key={index}>
                    <FilterAltIcon
                      onClick={() => setSearchAppFilterVisisbility(true)}
                    />
                    <h3>{item.column}</h3>
                  </th>
                )
            )}

            {/* <th>
              <FilterAltIcon onClick={() => setSliderVisibility(true)} />
              <h3>column h</h3>
              <h4>566</h4>
            </th>
            <th>
              <FilterAltIcon />
              <h3>column h</h3>
              <h4>566</h4>
            </th>
            <th>
              <FilterAltIcon />
              <h3>column h</h3>
              <h4>566</h4>
            </th>
            <th>
              <FilterAltIcon />
              <h3>column h</h3>
              <h4>566</h4>
            </th>
            <th>
              <FilterAltIcon />
              <h3>column h</h3>
              <h4>566</h4>
            </th> */}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
