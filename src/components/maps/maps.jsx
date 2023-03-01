import { Box, CircularProgress,  Paper, } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import { useQuery } from "react-query";
import { endpoints } from "../../utils/endpoints";
import { parseExistFilter } from "../../utils/parse-exist-filter";
import qs from "query-string";
import bbox from "@turf/bbox";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoicml6YWxhbGZhbmRpIiwiYSI6ImNsZHoxMjEwMzB3engzb3BobzRkMDFpNDAifQ.cHzLqL-jp4bxjHf7UB9cCQ";

export const dataLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#16a34a",

    "fill-opacity": 0.5,
  },
};

const generateEndpointGeoJson = () => {
  const existFilter = parseExistFilter();

  if (existFilter["kecamatan"]) {
    return endpoints.polygon_kec(existFilter.kecamatan.id);
  }

  if (existFilter["kabupaten"]) {
    return endpoints.polygon_kab(existFilter.kabupaten.id);
  }

  if (existFilter["provinsi"]) {
    return endpoints.polygon_prov(existFilter.provinsi.id);
  }

  return endpoints.indo;
};

export const Maps = () => {
  const [map, setMap] = useState(null);

  const geoJsonEndpoint = generateEndpointGeoJson();

  const { data: geoJson, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(geoJsonEndpoint);

      return res.data.data;
    },

    queryKey: ["MAPS", geoJsonEndpoint],

    cacheTime: Infinity,

    staleTime: Infinity,
  });

  useEffect(() => {
    if (geoJson && map) {
      const box = bbox(geoJson);
      if (box && box.length > 3) {
        const [minLng, minLat, maxLng, maxLat] = box;
        console.log({ box });

        map.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 28, duration: 1000 }
        );
      }
    }
  }, [geoJson, map]);

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
        <Map
          ref={(map) => {
            setMap(map);
          }}
          initialViewState={{
            latitude: -3.337954,
            longitude: 116.596456,
            zoom: 5,
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ height: "100%", borderRadius: "8px" }}
          interactive
          interactiveLayerIds={["data"]}
        >
          <Source type="geojson" data={geoJson} id="data">
            <Layer {...dataLayer} interactive />
          </Source>
          {isLoading && (
            <Box
              sx={{
                height: "100%",
                backgroundColor: "transparent",
                width: "100%",
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size="2.8rem" />
            </Box>
          )}
        </Map>
      </Paper>
    </>
  );
};
