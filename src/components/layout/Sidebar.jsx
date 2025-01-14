import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import logo from "../../../public/logo.png";

const drawerWidth = 280;

export default function Sidebar({ mobileOpen, onDrawerToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { path: "/dashboard", icon: <DashboardIcon />, text: "Dashboard" },
    {
      path: "/dashboard/paper-setters",
      icon: <SchoolIcon />,
      text: "Paper Setters",
    },
    { path: "/dashboard/guardians", icon: <SecurityIcon />, text: "Guardians" },
    {
      path: "/dashboard/exam-centers",
      icon: <LocationCityIcon />,
      text: "Exam Centers",
    },
  ];

  const drawer = (
    <>
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #dedcff",
          display: "flex",
          borderTop: { xs: 70, md: "none" }, // borderTop only for phone
          height: { xs: "auto", md: 70 }, // height only for phone
          zIndex: 1000,
        }}
        className="flex items-center justify-center"
      >
        <img src={logo} alt="SafePaper Logo" className="w-10 h-10 object-contain" />{" "}
        <p className="text-xl md:text-2xl font-space-grotesk text-accent font-bold">
          SafePaper
        </p>
      </Box>
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: "8px",
              mb: 1,
              backgroundColor:
                location.pathname === item.path ? "#f8f8ff" : "transparent",
              color: location.pathname === item.path ? "#2f27ce" : "#666",
              "&:hover": {
                backgroundColor: "#f8f8ff",
                color: "#2f27ce",
                cursor: "pointer",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontFamily: "Poppins",
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fff",
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fff",
              border: "none",
              borderRight: "1px solid #dedcff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
}
