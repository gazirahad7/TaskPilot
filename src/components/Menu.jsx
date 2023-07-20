import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
//import ThemeItem from "./ThemeItem";
import { Suspense } from "react";
import { lazy } from "react";

const ThemeItem = lazy(() => import("./ThemeItem"));
export default function SettingMenu() {
  const [theme, setTheme] = React.useState("/bg-1.jpg");

  const themeArray = [
    "bg-13",
    "bg-14",
    "bg-15",
    "bg-16",
    "bg-1",
    "bg-2",
    "bg-3",
    "bg-4",
    "bg-5",
    "bg-6",
    "bg-7",
    "bg-8",
    "bg-9",
    "bg-10",
    "bg-11",
    "bg-12",
  ];

  const getTheme = localStorage.getItem("theme");

  React.useEffect(() => {
    //console.log({ theme });

    if (getTheme) {
      document.querySelector(
        ".app-main"
      ).style.backgroundImage = `url('${getTheme}')`;
    }
  }, [theme, getTheme]);

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
        <p>Choose Theme</p>

        <Suspense fallback="Loading">
          <div className="theme-items">
            {themeArray &&
              themeArray.map((img, index) => (
                <div
                  className="theme-item"
                  key={index}
                  onClick={() => {
                    setTheme(`${img}.jpg`),
                      localStorage.setItem("theme", theme);
                  }}
                >
                  <ThemeItem img={`${img}.jpg`} />
                </div>
              ))}
          </div>
        </Suspense>
      </Box>
    </Container>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <span onClick={toggleDrawer(anchor, true)}>
            <MoreHorizIcon />
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
