import { Maps } from "../../components/maps/maps";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FilterListOutlined } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import qs from "query-string";
import { parseExistFilter } from "../../utils/parse-exist-filter";

export const DemandAnalysisPage = () => {
  let location = useLocation();

  const navigate = useNavigate();

  const params = useParams();

  const handleClickModalFilter = () => {
    let modalLocation = "/modal";

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
              <Typography variant="h5">Kalimantan</Typography>

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
      </Grid>
    </>
  );
};
