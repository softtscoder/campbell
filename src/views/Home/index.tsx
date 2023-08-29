import {publicClient, walletClient} from "../../hooks/useContract";
import {vendingAbi} from "../../abi/vending";
import {useEffect, useState} from "react";

function Home() {
  const [pendingClaim, setPendingClaim] = useState('');
  const [totalClaim, setTotalClaim] = useState('');
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

    setPendingClaim(pendingClaim.toString());
    setTotalClaim(totalClaim.toString());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ fontSize: '24px', marginRight: '12px' }}>
        Pending Claim: {pendingClaim}
      </div>
      <div style={{ fontSize: '24px', marginRight: '12px' }}>
        Total Claim: {totalClaim}
      </div>
    </div>
  )
}

export default Home;
