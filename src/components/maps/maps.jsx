import axios from "axios";
import { useState } from "react";
import Map from "react-map-gl";
import { useQuery } from "react-query";
import { endpoints } from "../../utils/endpoints";

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

export const Maps = () => {
  const [map, setMap] = useState(null);

  const { data: geoJson, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(endpoints.indo);

      return res.data.data;
    },

    queryKey: ["MAPS"],
  });

  return (
    <>
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
        {/* <Source type="geojson" data={geoJson} id="data">
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
        )} */}
      </Map>
    </>
  );
};
