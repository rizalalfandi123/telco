import {
  Card,
  CardContent,
  Divider,
  CardHeader,
} from "@mui/material";

const Audiences = () => {
  return (
    <>
 
      <Card
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
        <CardHeader title="Audiences" />
        <Divider />
        <CardContent></CardContent>
      </Card>
    </>
  );
};

export default Audiences;
