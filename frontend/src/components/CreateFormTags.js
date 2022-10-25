import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// inspired from https://blog.theashishmaurya.me/how-to-create-a-tag-input-feature-in-reactjs-and-material-ui

const Tags = () => {
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
        <Typography>Tags</Typography>
        <Cancel/>
        />
      </Stack>
    </Box>
  );
};

export default function InputTags (){

return (
    <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          variant='standard'
          size='small'
          sx={{ margin: "1rem 0" }}
          margin='none'
          placeholder="Enter Tags here"
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>## 
                    <Tags />
                  );
                })}
              </Box>
            ),
          }}
        />
    </Box>
)

}
