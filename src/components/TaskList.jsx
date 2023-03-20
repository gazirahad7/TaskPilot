import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 0.5,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function GridTemplateRows() {
  const data = [
    {
      id: 1,
      task: "This my 1st task",
      complete: false,
      star: false,
    },
    {
      id: 3,
      task: "This my 2st task",
      complete: true,
      star: false,
    },
    {
      id: 2,
      task: "This my 3st task",
      complete: false,
      star: true,
    },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
      {data.map((el) => (
        <Item className="list-cont">
          <div>
            {el.complete === true ? (
              <FormControlLabel control={<Checkbox defaultChecked />} />
            ) : (
              <FormControlLabel control={<Checkbox />} />
            )}

            {el.complete === true ? <del>{el.task}</del> : el.task}
          </div>
          <div>
            {el.star !== true ? (
              <StarOutlineRoundedIcon />
            ) : (
              <StarRoundedIcon />
            )}
          </div>
        </Item>
      ))}
    </Box>
  );
}
