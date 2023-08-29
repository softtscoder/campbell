import {useEffect, useState} from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AddressTmp from "../../assets/imgs/address-tmp.png";
import goerliIcon from "../../assets/icons/eth.png";
import PillButton, { PillButtonFace, PillIcon } from "../Button/PillButton";
import css from "./ConnectButton.module.scss";
import { vendingAbi } from "../../abi/vending";
import { walletClient, publicClient } from "../../hooks/useContract";
import { getAccount } from "viem";

const Connect = () => {
  const [pendingClaim, setPendingClaim] = useState('');
  const [totalClaim, setTotalClaim] = useState('');
  async function handleClaim() {
    const [address] = await walletClient.getAddresses();
    const account = getAccount(address);

    await walletClient.writeContract({
      address: "0xEF86E35589cF81A09b8ecfCCC94312e38d2CE1F6",
      abi: vendingAbi,
      functionName: "_claimRevShare",
      args: [address],
      account,
    });
  }

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
  }, [])

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <PillButton
                    isFullWidth
                    disabled={!mounted}
                    onClick={openConnectModal}
                    className={css.connetWallet}
                  >
                    Connect Wallet
                  </PillButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <PillButton
                    isFullWidth
                    face={PillButtonFace.WARNING}
                    onClick={openChainModal}
                    className={css.connetWallet}
                  >
                    Wrong network
                  </PillButton>
                );
              }

              return (
                <div className={css.accountOptions} style={{ alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', marginRight: '12px' }}>
                    Pending Claim: {pendingClaim}
                  </div>
                  <div style={{ fontSize: '24px', marginRight: '12px' }}>
                    Total Claim: {totalClaim}
                  </div>
                  <PillButton
                    className={css.accountBtn}
                    face={PillButtonFace.SECONDARY}
                    icon={PillIcon.DOWN}
                    onClick={handleClaim}
                  >
                    <div className="address">Claim</div>
                  </PillButton>
                  <PillButton
                    className={css.accountBtn}
                    face={PillButtonFace.SECONDARY}
                    icon={PillIcon.DOWN}
                    onClick={openAccountModal}
                  >
                    <img
                      className={css.profileImage}
                      alt="profileImage"
                      src={AddressTmp}
                    />
                    <div className="address">{account.displayName}</div>
                  </PillButton>
                  <PillButton
                    className={css.networkIcon}
                    face={PillButtonFace.SECONDARY}
                    icon={PillIcon.DOWN}
                    onClick={openChainModal}
                  >
                    <img alt="ethereum network" src={goerliIcon} />
                  </PillButton>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Connect;
