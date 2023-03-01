import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Collapse,
  List,
} from "@mui/material";
import { useApplicationSettings } from "../../services";
import { useTheme } from "@mui/material/styles";
import { useCallback, useMemo, useRef, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ControlledMenu,
} from "@szhsin/react-menu";
import { useLocation, useNavigate } from "react-router-dom";

export const DrawerItem = (props) => {
  const { pathname, title, icon, children = [] } = props;

  const currentPathname = useLocation().pathname;

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const [expand, setExpand] = useState(false);

  const theme = useTheme();

  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isExpandSidebar = useApplicationSettings(
    (state) => state.value.expandSidebar
  );

  const someChildrenActive = children.some(
    (child) => child.pathname === currentPathname
  );

  const selected = pathname === currentPathname || someChildrenActive;

  const isHaveChildren = children.length > 0;

  const expandIcon = useMemo(
    () => (!expand ? <ExpandMore /> : <ExpandLess />),
    [expand]
  );

  const handleClickItem = useCallback(() => {
    if (isHaveChildren) {
      if (isExpandSidebar) {
        return setExpand((prev) => !prev);
      }

      return setOpen((prev) => !prev);
    }

    return navigate(pathname);
  }, [isHaveChildren, isExpandSidebar]);

  const renderChildren = (
    <List sx={{ marginLeft: 2 }}>
      {children.map((child, index) => (
        <DrawerItem {...child} key={index} />
      ))}
    </List>
  );

  const menu = (
    <ControlledMenu
      transition
      direction="right"
      portal
      anchorRef={ref}
      offsetX={12}
      state={open ? "open" : "closed"}
      onClose={() => setOpen(false)}
      menuStyle={{ borderRadius: "8px" }}
    >
      <List>
        {children.map((child, index) => {
          const {
            icon: iconChild,
            title: titleChild,
            pathname: childPathname,
          } = child;

          const selected = childPathname === currentPathname;

          return (
            <ListItem disablePadding key={index}>
              <ListItemButton
                selected={selected}
                onClick={() => {
                  setOpen(false);
                  navigate(childPathname);
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: 0,
                    minWidth: "34px",
                  }}
                >
                  {iconChild}
                </ListItemIcon>
                <ListItemText primary={titleChild} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ControlledMenu>
  );

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          onClick={handleClickItem}
          selected={selected}
          ref={ref}
        >
          <ListItemIcon
            sx={{
              marginRight: 0,
              minWidth: isExpandSidebar || isMobileScreen ? "34px" : 0,
            }}
          >
            {icon}
          </ListItemIcon>

          {isExpandSidebar && <ListItemText primary={title} />}

          {isHaveChildren && isExpandSidebar && expandIcon}
        </ListItemButton>
      </ListItem>
      {isHaveChildren && isExpandSidebar && (
        <Collapse in={expand}>{renderChildren}</Collapse>
      )}

      {isHaveChildren && !isExpandSidebar && menu}
    </>
  );
};

export default DrawerItem;
