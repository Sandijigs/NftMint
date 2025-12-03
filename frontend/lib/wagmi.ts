import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, walletConnect, injected } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [base, baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: 'Mint of the Day',
        preference: 'smartWalletOnly',
      }),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
        metadata: {
          name: 'Mint of the Day',
          description: 'Daily NFT minting on Base',
          url: process.env.NEXT_PUBLIC_APP_URL || 'https://mint-of-the-day.app',
          icons: ['https://mint-of-the-day.app/icon.png'],
        },
        showQrModal: true,
      }),
      injected({
        target: 'metaMask',
      }),
    ],
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  })
}

export const config = getConfig()

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
