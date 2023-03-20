import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Button, Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTaskValue } from "./taskSlice";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { dateFormat } from "../../helper/formater";

export default function TaskDetails({ taskId }) {
  //console.log({ taskId });
  const tasks = useSelector((state) => state.taskReducer);
  const singleTask = tasks.filter((el) => el.id === taskId);
  const dispatch = useDispatch();
  //const { id, task, complete, stare } = singleTask[0];
  // console.log(singleTask[0]?.task);
  const [updateTask, setTask] = useState(singleTask[0]?.task);

  console.log({ singleTask });

  const taskUpdateHandler = () => {
    //alert("okd");
    const obj = {
      id: singleTask[0]?.id,
      name: updateTask,
    };
    dispatch(updateTaskValue(obj));
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask(singleTask[0]?.id));
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
            onChange={(e) => setTask(e.target.value)}
            value={updateTask}
            autoFocus
          />
        </form>

        <p>{updateTask}</p>
        <List>
          {["Inbox", "Starred", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <h4>Created: {dateFormat(singleTask[0]?.created)} </h4>

        <div className="item-end">
          <Divider />

          <div className="flex-between">
            <div>
              {/* <button
                type="submit"
                onClick={() => {
                  taskUpdateHandler();
                }}
              >
                {" "}
                Update
              </button> */}

              <Button
                variant="outlined"
                color="success"
                type="submit"
                onClick={() => {
                  taskUpdateHandler();
                }}
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
