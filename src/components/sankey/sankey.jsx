import { Sankey as AntSankey } from "@ant-design/plots";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import qs from "query-string";
import { endpoints } from "../../utils/endpoints";
import axios from "axios";
import { CardContent } from "@mui/material";

export const Sankey = () => {
  const swictherEndpoint = qs.stringifyUrl({
    url: endpoints.switcher,
    query: {
      prov_id: 33,
    },
  });

  const { data: sankeyData = { links: [] }, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(swictherEndpoint);

      return res.data.data;
    },

    queryKey: ["SWITCHER"],

    cacheTime: Infinity,

    staleTime: Infinity,
  });

  console.log({ sankeyData });

  return (
    <CardContent sx={{height: `${sankeyData.links.length}rem`}}>
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
      />
    </CardContent>
  );
};
