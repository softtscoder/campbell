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
      <Box mt='100px'>
        {children}
      </Box>
    </Box>
  );
}

export default ViewBase;
