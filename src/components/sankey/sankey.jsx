import { ResponsiveSankey } from "@nivo/sankey";
import axios from "axios";
import { useQuery } from "react-query";
import { endpoints } from "../../utils/endpoints";
import qs from "query-string";
import { CardContent } from "@mui/material";
import { useMemo } from "react";

export const Sankey = () => {
  const swictherEndpoint = qs.stringifyUrl({
    url: endpoints.switcher,
    query: {
      prov_id: 33,
    },
  });

  const { data: sankeyData, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(swictherEndpoint);

      return res.data.data;
    },

    queryKey: ["SWITCHER"],

    cacheTime: Infinity,

    staleTime: Infinity,
  });

  console.log({ sankeyData });

  if (!sankeyData || isLoading) {
    return null;
  }

  const size = sankeyData.links.length * 2;

  const diagram = useMemo(() => {
    return (
      <ResponsiveSankey
        data={sankeyData}
        align="justify"
        colors={(data) => data.nodeColor}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={13}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        nodeBorderRadius={3}
        linkOpacity={0.4}
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient
        labelPosition="inside"
        labelOrientation="horizontal"
        labelPadding={20}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1]],
        }}
      />
    );
  }, [size]);

  return (
    <CardContent
      sx={() => ({
        height: `${size}rem`,
      })}
    >
      {diagram}
    </CardContent>
  );
};
