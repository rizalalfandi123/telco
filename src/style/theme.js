import { createTheme, alpha } from "@mui/material/styles";

export const theme = () => {
  const primaryColor = "#3b82f6";
  const borderRadius = 8;
  const fontColor = "#1e293b"

  return createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      text: {
        primary: fontColor
      }
    },

    typography: {
      fontFamily: `"Poppins", sans-serif`,
      fontSize: 12,
      fontWeightRegular: 500,
      allVariants: {
        color: fontColor
      }
    },

    shape: { borderRadius },

    components: {
      MuiListItemButton: {
        // defaultProps,
        styleOverrides: {
          root: {
            margin: "0 4px",
            "&.Mui-selected": {
              borderRadius: borderRadius + "px",

              backgroundColor: alpha(primaryColor, 0.1),

              "& .MuiTypography-root": {
                color: primaryColor,
              },

              "& .MuiSvgIcon-root": {
                color: primaryColor,
              },
            },

            ":hover": {
              borderRadius: borderRadius + "px",

            }
          },
        },
      },
    },
  });
};
