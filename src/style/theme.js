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
      MuiTextField: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
        defaultProps: {
          fullWidth: true,
        },
      },

      MuiInputAdornment: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              color: alpha("#000000", 0.87),
            },
          },
        },
      },

      MuiSelect: {
        defaultProps: {
          fullWidth: true,
          size: "small",
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            textTransform: "none",
            ":hover": {
              boxShadow: "none",
            },
          },
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "38px",
          },
        },
      },

      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius + "px",
          },
        },
      },

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

      MuiStepLabel: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              width: "1.25em",
              height: "1.25em",
            },
          },
          label: {
            fontSize: "0.85rem",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            backgroundImage: "none",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
          },
        },
      },

      MuiTooltip: {
        defaultProps: {
          placement: "top",
          sx: {
            fontSize: "0.8rem"
          }
        },
      },

      MuiButtonGroup: {
        styleOverrides: {
          root: {
            boxShadow: "none"
          }
        }
      }
    },
  });
};
