import React from 'react'
import { Card,  Paper, CardContent, Typography, Box } from "@mui/material";

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
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Audiences
                </Typography>
                <hr/>
                <Box>

                </Box>
            </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Audiences