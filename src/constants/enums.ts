import { chainId } from 'wagmi'

// Enums
export enum SupportedChainId {
    OPTIMISM = chainId.optimism,
    OPTIMISM_GOERLI = chainId.optimismGoerli,
    LOCAL = 31337,
}
