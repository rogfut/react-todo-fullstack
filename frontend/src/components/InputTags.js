// copied code from here https://blog.theashishmaurya.me/how-to-create-a-tag-input-feature-in-reactjs-and-material-ui
import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState, KeyboardEvent } from "react";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction='row' gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export default function InputTags({tags, handleTagsDelete, handleTagsKeyPress}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
        <TextField
          // inputRef={tagRef}
          fullWidth
          variant='outlined'
          size='small'
          sx={{ margin: "1rem 0" }}
          margin='none'
          // placeholder={taskTags.length < 5 ? "Enter tags" : ""}
          multiline
          placeholder="Tags are space delimited"
          onKeyDown={handleTagsKeyPress}
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleTagsDelete} key={index} />
                  );
                })}
              </Box>
            ),
          }}
        />
    </Box>
  );
}
