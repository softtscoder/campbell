import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { goerli } from 'viem/chains'

declare let window: any;

export const walletClient = createWalletClient({
  chain: goerli,
  transport: custom(window.ethereum)
})

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
})
