import { Chain } from '@rainbow-me/rainbowkit'
import { chain } from 'wagmi'
import ImageOptimism from '../assets/imgs/optimism.png'
import { SupportedChainId } from './enums'

export const ALCHEMY_ID = process.env.VITE_ALCHEMY_ID

export const MODE = process.env.MODE

export const IS_LOCAL_CHAIN = MODE === 'LOCAL_CHAIN'

export const LOCAL: Chain = {
    id: SupportedChainId.LOCAL,
    name: 'Local Chain',
    network: 'Local Chain',
    iconUrl: ImageOptimism,
    nativeCurrency: {
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: 'http://localhost:8545',
    },
    // Note: This will work for contracts and existing addresses, but transaction verifications on local chain will not be reflected on etherscan live data.
    blockExplorers: {
        default: {
            name: 'EtherScan',
            url: 'https://optimistic.etherscan.io/',
        },
    },
    testnet: true,
}

export const OPTIMISM_CHAIN = IS_LOCAL_CHAIN ? LOCAL : chain.optimism
export const GOERLI_CHAIN = IS_LOCAL_CHAIN ? LOCAL : chain.goerli

