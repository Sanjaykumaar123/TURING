import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig, createStorage, noopStorage } from "@wagmi/core";
import { fallback, http } from "viem";
import { arbitrumSepolia } from "wagmi/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Browser Wallet",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "AEGIS AI",
    projectId: "injected-only",
  },
);

const rpcUrls: string[] = [];
if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_RPC_URL) {
  rpcUrls.push(process.env.NEXT_PUBLIC_RPC_URL);
}
rpcUrls.push("https://sepolia-rollup.arbitrum.io/rpc");
rpcUrls.push("https://arbitrum-sepolia-rpc.publicnode.com");
rpcUrls.push("https://arbitrum-sepolia.drpc.org");

export const wagmiConfig = createConfig({
  chains: [arbitrumSepolia],
  connectors,
  storage: createStorage({ storage: noopStorage }),
  transports: {
    [arbitrumSepolia.id]: fallback(rpcUrls.map((url) => http(url))),
  },
  ssr: true,
});
