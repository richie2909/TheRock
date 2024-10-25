import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  sepolia,
} from "wagmi/chains";
import { http } from 'wagmi';


export const config = getDefaultConfig({
  appName: 'RockPaperScissors',
  projectId: '6ff8eb59587cd5a38c24cc85d30763ea',
  chains: [
    sepolia,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
  transports: {
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/WMmps_DkVlTuVN6aJa06C1ACG1Zpiyfz'
    ),
  },
});
