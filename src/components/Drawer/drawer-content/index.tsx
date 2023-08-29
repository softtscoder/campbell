import { useCallback, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, Button, Box } from "@mui/material";
import classnames from "classnames";
import "./drawer-content.scss";
import DrawerClaimIcon from "../../../assets/icons/drawerclaim.png";
import DrawerVotingIcon from "../../../assets/icons/drawervoting.png";
import DrawerMissionsIcon from "../../../assets/icons/drawermissions.png";
import DrawerInformationIcon from "../../../assets/icons/drawerinformation.png";
import DrawerProposalsIcon from "../../../assets/icons/drawerproposals.png";
import DrawerContributionsIcon from "../../../assets/icons/drawercontributions.png";
import DrawerVotingBlackIcon from "../../../assets/icons/drawervotingblack.png";
import DrawerMissionsBlackIcon from "../../../assets/icons/drawermissionblack.png";
import DrawerInformationBlackIcon from "../../../assets/icons/drawerinformationblack.png";
import DrawerProposalsBlackIcon from "../../../assets/icons/drawerproposalsblack.png";
import DrawerContributionsBlackIcon from "../../../assets/icons/drawercontributionsblack.png";

import HoverableLinkButton from "./HoverableLinkButton";

import DrawerLogoutIcon from "../../../assets/icons/drawerlogout.png";
import DrawerTelegramIcon from "../../../assets/icons/drawertelegram.png";

const LinkButtonData = [
  {
    link: "/voting",
    whiteIcon: DrawerVotingIcon,
    darkIcon: DrawerVotingBlackIcon,
    text: "Voting",
  },
  {
    link: "/missions",
    whiteIcon: DrawerMissionsIcon,
    darkIcon: DrawerMissionsBlackIcon,
    text: "Missions",
  },
  {
    link: "/information",
    whiteIcon: DrawerInformationIcon,
    darkIcon: DrawerInformationBlackIcon,
    text: "Information",
  },
  {
    link: "/proposals",
    whiteIcon: DrawerProposalsIcon,
    darkIcon: DrawerProposalsBlackIcon,
    text: "Proposals",
  },
  {
    link: "/contributions",
    whiteIcon: DrawerContributionsIcon,
    darkIcon: DrawerContributionsBlackIcon,
    text: "Contributions",
  },
  {
    link: "/joinrequests",
    whiteIcon: DrawerProposalsIcon,
    darkIcon: DrawerProposalsBlackIcon,
    text: "Application",
  },
];

interface INavContent {
  mobileOpen: boolean;
  isSmallerScreen?: boolean;
}

function NavContent({ mobileOpen, isSmallerScreen }: INavContent) {
  const [isActive] = useState();  
  
  return (
    <div
      className="dapp-sidebar"
      style={{
        minWidth: mobileOpen ? 240 : 60,
        paddingTop: isSmallerScreen ? 20 : 100,
      }}
    >
      <div className="dapp-menu-links">
        <div className="dapp-nav">         

          {LinkButtonData.map((value, index) => {
            const { link, whiteIcon, darkIcon, text } = value;
            return (
              <HoverableLinkButton
                key={index}
                link={link}
                mobileOpen={mobileOpen}
                whiteIcon={whiteIcon}
                darkIcon={darkIcon}
                text={text}
              />
            );
          })}

          <Link
            component={NavLink}
            to="/"
            marginTop="48px"
            // isActive={(match, location) => {
            //     return checkPage(location, "home");
            // }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div
              className={classnames(
                "logout-menu-item",
                mobileOpen ? "logout-menu-item-desktop" : ""
              )}
            >
              <img
                alt=""
                src={DrawerLogoutIcon}
                style={{
                  marginRight: mobileOpen ? 10 : 0,
                  marginLeft: mobileOpen ? 50 : 10,
                }}
              />
              {mobileOpen && <p>Logout</p>}
            </div>
          </Link>
          <Link
            component={NavLink}
            to="/telegram"
            // isActive={(match, location) => {
            //     return checkPage(location, "home");
            // }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div
              className={classnames(
                "telegram-menu-item",
                mobileOpen ? "telegram-menu-item-desktop" : ""
              )}
            >
              <img
                alt=""
                src={DrawerTelegramIcon}
                style={{
                  marginRight: mobileOpen ? 10 : 0,
                  marginLeft: mobileOpen ? 50 : 10,
                }}
              />
              {mobileOpen && <p>Telegram</p>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavContent;
