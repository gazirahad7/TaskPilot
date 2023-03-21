import InfoIcon from "@mui/icons-material/Info";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { Button, Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteTask, updateTaskValue } from "./taskSlice";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { dateFormat } from "../../helper/formater";

export default function TaskDetails({ taskId }) {
  const tasks = useSelector((state) => state.taskReducer);
  const singleTask = tasks.filter((el) => el.id === taskId);
  const dispatch = useDispatch();
  const [updateTask, setTask] = useState(singleTask[0]?.task);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setTask(value);
    setIsBtnDisabled(value === "");
  };

  const taskUpdateHandler = () => {
    const obj = {
      id: singleTask[0]?.id,
      name: updateTask,
    };

    dispatch(updateTaskValue(obj));
    toast.success("Update Successfully");
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask(singleTask[0]?.id));

    toast.success("Delete Successfully");
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Container maxWidth="sm">
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
        role="presentation"
        onClick={toggleDrawer(anchor, true)}
        onKeyDown={toggleDrawer(anchor, true)}
        marginTop={4}
      >
        <form>
          <TextField
            fullWidth
            label="Task Title"
            id="fullWidth"
            onChange={handleInputChange}
            value={updateTask}
            autoFocus
          />
        </form>

        <p>{updateTask}</p>

        <h4>Created: {dateFormat(singleTask[0]?.created)} </h4>

        <div className="item-end">
          <Divider />

          <div className="flex-between">
            <div>
              <Button
                variant="outlined"
                className={"update-btn-" + singleTask[0]?.id}
                color="success"
                type="button"
                onClick={() => {
                  taskUpdateHandler();
                }}
                disabled={isBtnDisabled}
                endIcon={<ModeEditOutlineRoundedIcon />}
              >
                Update
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteTaskHandler();
                }}
                endIcon={<DeleteRoundedIcon />}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <span onClick={toggleDrawer(anchor, true)}>
            <InfoIcon />
          </span>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
