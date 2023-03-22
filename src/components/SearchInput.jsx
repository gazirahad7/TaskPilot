import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../features/tasks/searchSlice";

export default function SearchInput() {
  const [value, setValue] = React.useState("");
  const tasks = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();
  const handleAutocompleteChange = (event, newValue) => {
    setValue(event.target.value);
  };
  React.useEffect(() => {
    dispatch(setSearchTerm(value));
  }, [value]);
  return (
    <div style={{ marginLeft: "15px", marginBottom: "15px" }}>
      <Stack spacing={2} sx={{ width: 240 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={tasks.map((el) => el.task.substring(0, 25))}
          // value={value}
          // onChange={handleAutocompleteChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Searching task..."
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              value={value}
              onChange={handleAutocompleteChange}
            />
          )}
        />
      </Stack>
    </div>
  );
}
