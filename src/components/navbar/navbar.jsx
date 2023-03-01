import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useMemo, useState } from "react";

import {
  AssessmentOutlined,
  LayersOutlined,
  Menu,
  SupportAgentOutlined,
  TrendingUpOutlined,
  TroubleshootOutlined,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useApplicationSettings } from "../../services";
import { DrawerItem } from "./drawer-item";
import UserMenu from "../menu/user-menu";

const normalWidthSidebar = 275;
const miniWidthSidebar = 70;

const navigationBar = [
  {
    title: "Demand Analysis",
    pathname: "/demand-analysis",
    icon: <TrendingUpOutlined />,
  },
  {
    title: "Competitive Mapping",
    pathname: "/competitive-mapping",
    icon: <LayersOutlined />,
    children: [
      {
        title: "Competition Analysis",
        pathname: "/competition-analysis",
        icon: <AssessmentOutlined />,
      },
      {
        title: "Switcher Analysis",
        pathname: "/switcher-analysis",
        icon: <TroubleshootOutlined />,
      },
    ],
  },
  {
    title: "Decision Support System",
    pathname: "/decision-support-system",
    icon: <SupportAgentOutlined />,
  },
];

export const Navbar = ({ children }) => {
  const theme = useTheme();

  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const isExpandSidebar = useApplicationSettings(
    (state) => state.value.expandSidebar
  );

  const toogleExpandSidebar = useApplicationSettings(
    (state) => state.toggleExpandSidebar
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerWidth = useMemo(() => {
    if (isExpandSidebar) {
      return normalWidthSidebar;
    }

    return miniWidthSidebar;
  }, [isExpandSidebar]);

  const handleButtonMenu = useCallback(() => {
    if (isMobileScreen) {
      return handleDrawerToggle();
    }

    return toogleExpandSidebar();
  }, [isMobileScreen]);

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: "64px !important" }} />
      <List>
        {navigationBar.map((nav, index) => (
          <DrawerItem {...nav} key={index} />
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <AppBar
        position="fixed"
        sx={({ zIndex, palette }) => ({
          zIndex: zIndex.drawer + 1,
          boxShadow: "none",
          backgroundColor: palette.background.default,
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            minHeight: "64px !important",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display:"flex" }}>
            <IconButton
              edge="start"
              onClick={handleButtonMenu}
              sx={{ marginRight: 1 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ marginTop:"5px" }}>
              LOGO DISINI
            </Typography>
          </Box>
          <Box>
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={() => ({
            display: { xs: "block", md: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "80%",
            },
          })}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: ({ transitions }) => ({
              transition: transitions.create("width", {
                easing: transitions.easing.sharp,
                duration: transitions.duration.enteringScreen,
              }),

              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: 0,
            }),
          }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={({ shape, breakpoints }) => ({
          flexGrow: 1,
          padding: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "rgb(238, 242, 246)",
          height: "calc(100vh - 64px)",
          marginTop: "64px",
          marginRight: 0,
          borderTopRightRadius: shape.borderRadius + "px",
          borderTopLeftRadius: shape.borderRadius + "px",
          overflowY: "auto",
          [breakpoints.up("md")]: {
            marginRight: "18px",
            padding: 3,
          },
        })}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
