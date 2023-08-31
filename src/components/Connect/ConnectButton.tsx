import { ConnectButton } from "@rainbow-me/rainbowkit";
import AddressTmp from "../../assets/imgs/address-tmp.png";
import goerliIcon from "../../assets/icons/eth.png";
import PillButton, { PillButtonFace, PillIcon } from "../Button/PillButton";
import css from "./ConnectButton.module.scss";
import { vendingAbi } from "../../abi/vending";
import { walletClient } from "../../hooks/useContract";
import { getAccount } from "viem";

const Connect = () => {
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
                  <PillButton
                    className={css.accountBtn}
                    face={PillButtonFace.SECONDARY}
                    icon={PillIcon.DOWN}
                    href='https://app.uniswap.org/#/swap?outputCurrency=0x587bfc5ad0d8737117bc3a5354bad0f8c475bcdc'
                    target='_blank'
                  >
                    <div className="address">Buy</div>
                  </PillButton>
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
