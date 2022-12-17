import { Button } from "@mui/material";
import "./SliderFilter.css";

function SliderFilter(props) {
  return (
    <div className="slider-filter">
      <input type="range" />
      <Button
        variant="contained"
        onClick={() => props.setSliderVisibility(false)}
      >
        Apply
      </Button>
    </div>
  );
}

export default SliderFilter;
