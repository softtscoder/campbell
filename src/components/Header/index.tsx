import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { NavLink } from "react-router-dom";

import LeftIndentIcon from "../../assets/icons/leftindent.svg";
import RightIndentIcon from "../../assets/icons/rightindent.svg";

import { useNavigate } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import Connect from "../Connect/ConnectButton";

const useStyles = makeStyles({
  appBar: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "16px",
    paddingRight: "16px",
    background:
      "#222222 !important",
    backdropFilter: "none",
    zIndex: "1300!important",
  },
  dappTopbar: {
    width: "100%",
    height: "80px",
  },
  addressText: {
    color: "white",
    paddingLeft: "8px",
  },
  titleText: {
    fontFamily: "Montserrat Bold",
    color: "white",
    paddingRight: "8px",
  },
  brandinglogo: {
    marginLeft: "10px",
    display: "flex",
    flexGrow: "1",
    justifyContent: "space-between",
  },
  Iconpanel: {
    display: "flex",
    justifyContent: "space-between",
  },
});

interface IHeader {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface IMenuBoard {
  icon: string;
  menuTitle: string;
  menuText: string;
  width: string;
  color: string;
}


function Header({ mobileOpen, handleDrawerToggle }: IHeader) { 
  const isDesktop = useResponsive("up", "md");
  const classes = useStyles();
  let navigate = useNavigate();   

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className={classes.dappTopbar}>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Connect />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
