import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";

import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import AddTask from "./AddTask";
import SearchInput from "./SearchInput";
import Top from "./Top";

import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useSelector } from "react-redux";
import NavItem from "./NavItem";
const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    backgroundColor: "",

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  overflowY: "hidden",
}));

export default function Layout({ children }) {
  const bgImgCSS = {
    backgroundImage: 'url("/public/bg-one.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: " 105vh ",
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // count list
  const tasks = useSelector((state) => state.taskReducer);
  const completeTasks = tasks.filter((task) => task.complete === true);
  const importantTasks = tasks.filter((task) => task.star === true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Top />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <h3>TaskPilot</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <SearchInput />

          <NavItem
            name="Tasks List"
            path="/"
            icon={<FormatListBulletedRoundedIcon />}
            countList={tasks?.length}
          />
          <NavItem
            name="Complete"
            path="complete-list"
            icon={<TaskAltIcon />}
            countList={completeTasks?.length}
          />
          <NavItem
            name="Important"
            path="important"
            icon={<StarRoundedIcon />}
            countList={importantTasks?.length}
          />

          <AddTask />
        </List>
      </Drawer>
      <Main open={open} style={bgImgCSS}>
        {children}
      </Main>
    </Box>
  );
}
