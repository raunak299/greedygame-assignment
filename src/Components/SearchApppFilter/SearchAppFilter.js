import "./SearchAppFilter.css";
import { Button } from "@mui/material";

function SearchAppFilter(props) {
  return (
    <div className="search-app-filter">
      <input type="input" />
      <Button
        variant="contained"
        onClick={() => props.setSearchAppFilterVisisbility(false)}
      >
        Apply
      </Button>
    </div>
  );
}

export default SearchAppFilter;
