import { Sankey as AntSankey } from "@ant-design/plots";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import qs from "query-string";
import { endpoints } from "../../utils/endpoints";
import axios from "axios";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { parseExistFilter } from "../../utils/parse-exist-filter";

const generateEndpointSwitcher = () => {
  const existFilter = parseExistFilter();

  const query = {};

  if (existFilter["kecamatan"]) {
    query["kec_id"] = existFilter.kecamatan.id;
  }

  if (existFilter["kabupaten"]) {
    query["kab_id"] = existFilter.kabupaten.id;
  }

  if (existFilter["provinsi"]) {
    query["prov_id"] = existFilter.provinsi.id;
  }

  return qs.stringifyUrl({
    url: endpoints.switcher,
    query,
  });
};

export const Sankey = () => {
  const swictherEndpoint = generateEndpointSwitcher();

  const { data: sankeyData = { links: [] }, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(swictherEndpoint);

        return res.data.data;
      } catch (error) {
        return { links: [] };
      }
    },

    queryKey: ["SWITCHER", swictherEndpoint],

    cacheTime: Infinity,

    staleTime: Infinity,
  });

  if (sankeyData.links.length < 1) {
    return null;
  }

  return (
    <Card>
      <CardHeader title="Sankey" />
      <Divider />

      <CardContent sx={{ position: "relative" }}>
        <CardContent sx={{ height: `${sankeyData.links.length + 12}rem` }}>
          <AntSankey
            data={sankeyData.links}
            sourceField="source"
            targetField="target"
            weightField="value"
            nodeStyle={{ fontFamily: "Poppins" }}
            nodeDraggable
            animation
            autoFit
            loading={isLoading}
            loadingTemplate={<CircularProgress />}
            // color={data => {
            //   const node = sankeyData.nodes.find(node => node.id === data.name)
            //   console.log({node});

            //   return node.nodeColor
            // }}
            color={[
              "#34d399",
              "#22c55e",
              "#fbbf24",
              "#fb923c",
              "#ef4444",
              "#60a5fa",
              "#818cf8",
              "#38bdf8",
            ]}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
};
