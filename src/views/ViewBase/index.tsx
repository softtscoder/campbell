import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const backgroundStyle = {
  flexGrow: 1,
  padding: "0 16px",
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#9747FF",
  // height: "100vh",
  backgroundSize: "cover",
};

interface IViewBase {
  children: React.ReactNode;
}

function ViewBase({ children }: IViewBase) {
  const [mobileOpen, setMobileOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box style={backgroundStyle}>
      <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* <Box>
        {!isSmallerScreen && <Drawer mobileOpen={mobileOpen} />}
        {isSmallerScreen && (
          <MobileDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            isSmallerScreen={isSmallerScreen}
          />
        )}
      </Box>
      <div
        className={`${classes.content} ${!mobileOpen && classes.contentShift} ${
          isSmallerScreen && classes.contentMobile
        }`}
      >
        {children}
      </div> */}
    </Box>
  );
}

export default ViewBase;
