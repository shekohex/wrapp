import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import * as chains from "wagmi/chains";

import { FungibleTokenWrapperAbi } from "./abis/FungibleTokenWrapper";

export default defineConfig(() => {
  return {
    out: "src/generated.ts",
    contracts: [
      {
        abi: FungibleTokenWrapperAbi,
        name: "FungibleTokenWrapper",
        address: {
          [chains.goerli.id]: "0x01eb50a7c42b525fa7c3bd340ab1f6f81257fe01",
          [chains.sepolia.id]: "0x01eb50a7c42b525fa7c3bd340ab1f6f81257fe01",
        },
      },
    ],
    plugins: [react()],
  };
});
