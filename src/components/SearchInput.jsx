import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";

export default function SearchInput() {
  const tasks = useSelector((state) => state.taskReducer);
  return (
    <div style={{ marginLeft: "15px", marginBottom: "15px" }}>
      <Stack spacing={2} sx={{ width: 240 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={tasks.map((el) => el.task)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Searching task..."
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}
