import React from 'react'
import { Box, CircularProgress,  Paper, } from "@mui/material";

const Audiences = () => {
  return (
    <>
      <Paper
        sx={({ breakpoints, palette, shape }) => ({
          height: "80vh",
          backgroundColor: palette.background.paper,
          borderRadius: shape.borderRadius + "px",
          padding: 1,

          [breakpoints.up("md")]: {
            height: "65vh",
          },
        })}
      >
        OKE
      </Paper>
    </>
  )
}

export default Audiences