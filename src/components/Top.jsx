import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import SettingMenu from "./Menu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Top() {
  return (
    <Box sx={{ flexGrow: 1, my: 2, mx: 1 }} position="start" marginTop={4}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          🏠 Tasks
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} align="right">
          <span>
            <SettingMenu />
          </span>
        </Grid>
      </Grid>
    </Box>
  );
}
