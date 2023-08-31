import { Box } from "@mui/material";
import Header from "../../components/Header";
import background from '../../assets/imgs/revback.webp';
const backgroundStyle = {
  padding: "0 16px",
  display: "flex",
  minHeight: "100vh",
  minWidth: '100vw',
  backgroundImage: `url(${background})`,
  // height: "100vh",
  backgroundSize: "cover",
};

interface IViewBase {
  children: React.ReactNode;
}

function ViewBase({ children }: IViewBase) {
  return (
    <Box style={backgroundStyle}>
      <Header/>
      <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
        {children}
      </Box>
    </Box>
  );
}

export default ViewBase;
