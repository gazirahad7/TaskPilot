import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const MyList = ({ icon, name }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default function TaskDetailsItem({ children }) {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
            This task status:
          </Typography>
          <Demo>
            <List>{children}</List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
