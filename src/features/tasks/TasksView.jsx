import AddIcon from "@mui/icons-material/Add";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch } from "react-redux";
import TaskDetails from "./TaskDetails";
import { isComplete, isNotStare, isStare, unChecked } from "./taskSlice";

import AddTaskInput from "../../components/AddTask";

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
        px: 2,
        py: 0.5,

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

export default function TasksView({ taskList }) {
  const completeAudio = new Audio("/complete.wav");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openInput, setOpenInput] = React.useState(false);
  const [itemPerPage] = React.useState(6);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = taskList.slice(indexOfFirstItem, indexOfLastItem);

  const inputHandler = () => {
    setOpenInput(!openInput);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const dispatch = useDispatch();

  const handleCheck = (id) => {
    dispatch(isComplete(id));
  };
  const handleUnCheck = (id) => {
    dispatch(unChecked(id));
  };

  const handleStare = (id) => {
    dispatch(isStare(id));
  };
  const handleNotStare = (id) => {
    dispatch(isNotStare(id));
  };
  return (
    <Box
      sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}
      className="mt-8 "
    >
      <div className="task-view">
        {taskList.length === 0 && (
          <div className="empty-list">
            <h2>Task list empty !</h2>
            <img src="/empty-box.gif" alt="LIST EMPTY" />
          </div>
        )}
        {currentItems &&
          currentItems.map((el) => (
            <Item className="list-cont" key={el.id}>
              <div>
                {el.complete === true ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        onClick={() => {
                          handleUnCheck(el.id);
                        }}
                      />
                    }
                  />
                ) : (
                  <FormControlLabel
                    onClick={() => {
                      handleCheck(el.id), completeAudio.play();
                    }}
                    control={<Checkbox />}
                  />
                )}

                {el.complete === true ? (
                  <del>{el.task}</del>
                ) : el.task.length > 30 ? (
                  el.task.substring(0, 30).concat("...")
                ) : (
                  el.task
                )}
              </div>
              <div>
                {el.star !== true ? (
                  <StarOutlineRoundedIcon
                    onClick={() => {
                      handleStare(el.id);
                    }}
                  />
                ) : (
                  <StarRoundedIcon
                    onClick={() => {
                      handleNotStare(el.id);
                    }}
                  />
                )}

                <span>
                  <TaskDetails taskId={el.id} />
                </span>
              </div>
            </Item>
          ))}

        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={inputHandler}
        >
          <AddIcon />
        </Fab>

        <div className="add-container">{openInput && <AddTaskInput />}</div>
        {taskList.length > 5 && (
          <div className="pagination">
            <Pagination
              count={Math.round(taskList.length / 5)}
              variant="outlined"
              color="primary"
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </Box>
  );
}
