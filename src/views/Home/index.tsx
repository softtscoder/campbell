import {publicClient, walletClient} from "../../hooks/useContract";
import {vendingAbi} from "../../abi/vending";
import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";

function Home() {
  const [pendingClaim, setPendingClaim] = useState('');
  const [totalClaim, setTotalClaim] = useState('');
  const [sharePoolBalance, setSharePoolBalance] = useState('');
  const [totalPayout, setTotalPayout] = useState('');
  async function getData() {
    const [address] = await walletClient.getAddresses();
    const pendingClaim = await publicClient.readContract({
      address: "0xEF86E35589cF81A09b8ecfCCC94312e38d2CE1F6",
      abi: vendingAbi,
      functionName: "getRevPendingClaim",
      args: [address],
    });

    const totalClaim = await publicClient.readContract({
      address: "0xEF86E35589cF81A09b8ecfCCC94312e38d2CE1F6",
      abi: vendingAbi,
      functionName: "getRevTotalClaimed",
      args: [address],
    });

    const sharePoolBalance = await publicClient.readContract({
      address: "0xEF86E35589cF81A09b8ecfCCC94312e38d2CE1F6",
      abi: vendingAbi,
      functionName: "getRevSharePoolBalance",
    });

    const totalPayout = await publicClient.readContract({
      address: "0xEF86E35589cF81A09b8ecfCCC94312e38d2CE1F6",
      abi: vendingAbi,
      functionName: "revTotalPayouts",
    });

    let sharedPoolStr = sharePoolBalance.toString();
    let totalPayStr = totalPayout.toString();
    let pendingStr = pendingClaim.toString();
    let totalClaimStr = totalClaim.toString();

    let quotient = sharedPoolStr.slice(0, -18);
    let remainder = sharedPoolStr.slice(-18);
    let quotient1 = totalPayStr.slice(0, -18);
    let remainder1 = totalPayStr.slice(-18);
    let quotient2 = pendingStr.slice(0, -18);
    let remainder2 = pendingStr.slice(-18);
    let quotient3 = totalClaimStr.slice(0, -18);
    let remainder3 = totalClaimStr.slice(-18);

    let sharePoolRlt = (quotient.length === 0 ? '0' : quotient) + '.' + (remainder.length === 0 ? '00' : (remainder.length === 1 ? `${remainder.slice(0, 1)}0` : remainder.slice(0, 2)) );
    let totalPayRlt = (quotient1.length === 0 ? '0' : quotient1) + '.' + (remainder1.length === 0 ? '00' : (remainder1.length === 1 ? `${remainder1.slice(0, 1)}0` : remainder1.slice(0, 2)) );
    let pendingRlt = (quotient2.length === 0 ? '0' : quotient2) + '.' + (remainder2.length === 0 ? '00' : (remainder2.length === 1 ? `${remainder2.slice(0, 1)}0` : remainder2.slice(0, 2)) );
    let totalClaimRlt = (quotient3.length === 0 ? '0' : quotient3) + '.' + (remainder3.length === 0 ? '00' : (remainder3.length === 1 ? `${remainder3.slice(0, 1)}0` : remainder3.slice(0, 2)) );

    setPendingClaim(pendingRlt);
    setTotalClaim(totalClaimRlt);
    setSharePoolBalance(sharePoolRlt);
    setTotalPayout(totalPayRlt);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      display="flex"
      gap={10}
      py={8}
      px={6}
      width="100%"
      bgcolor="#000"
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius='8px'
        bgcolor="#242625"
        mt={2}
        p={1.5}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontSize={24}
          fontFamily="Montserrat Medium"
          color='white'
        >
          Total Pool Balance:
        </Typography>
        <Typography variant="h6" fontWeight={400} fontSize={20} color='white' ml={1.5}>
          {sharePoolBalance} ETH
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius='8px'
        bgcolor="#242625"
        mt={2}
        p={1.5}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontSize={24}
          fontFamily="Montserrat Medium"
          color='white'
        >
          Total Payout:
        </Typography>
        <Typography variant="h6" fontWeight={400} fontSize={20} color='white' ml={1.5}>
          {totalPayout} ETH
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius='8px'
        bgcolor="#242625"
        mt={2}
        p={1.5}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontSize={24}
          fontFamily="Montserrat Medium"
          color='white'
        >
          Total Claim:
        </Typography>
        <Typography variant="h6" fontWeight={400} fontSize={20} color='white' ml={1.5}>
          {totalClaim}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius='8px'
        bgcolor="#242625"
        mt={2}
        p={1.5}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          fontSize={24}
          fontFamily="Montserrat Medium"
          color='white'
        >
          Pending Claim:
        </Typography>
        <Typography variant="h6" fontWeight={400} fontSize={20} color='white' ml={1.5}>
          {pendingClaim}
        </Typography>
      </Box>
    </Box>
  )
}

export default Home;
