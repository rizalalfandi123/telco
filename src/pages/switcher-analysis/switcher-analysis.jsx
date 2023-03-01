import { Maps } from "../../components/maps/maps";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FilterListOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Sankey } from "../../components/sankey/sankey";
import { generateFilterTitle } from "../../utils/generate-filter-title";

export const SwitcherAnalysisPage = () => {
  let location = useLocation();

  const navigate = useNavigate();

  const filterTitle = generateFilterTitle();

  const handleClickModalFilter = () => {
    let modalLocation = "/place-filter";

    if (location.search) {
      modalLocation = modalLocation + location.search;
    }

    navigate(modalLocation, {
      state: { backgroundLocation: location, fallback: location.pathname },
    });
  };

  return (
    <>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                ":last-child": { paddingBottom: 2 },
              }}
            >
              <Typography variant="h5">{filterTitle}</Typography>

              <Button
                variant="outlined"
                sx={{ paddingLeft: "10px" }}
                onClick={handleClickModalFilter}
              >
                <FilterListOutlined sx={{ marginRight: "0.8rem" }} />
                Filter
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
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
            <Maps />
          </Paper>
        </Grid>

        <Grid item>
          <Sankey />
        </Grid>
      </Grid>
    </>
  );
};
