import { useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Radio,
  RadioGroup,
  Card,
  Button,
  Typography,
} from "@mui/joy";

import {
  useFungibleTokenWrapperGetTokens,
  useFungibleTokenWrapperBalanceOf,
} from "../generated";
import { formatEther, parseEther } from "viem";
export default function UnwrapToken() {
  const { address } = useAccount();
  const [amount, setAmount] = useState<bigint>(0n);
  const [token, setToken] = useState<`0x${string}`>(
    "0x0000000000000000000000000000000000"
  );

  const {
    data: tokens,
    error: getTokensError,
    isError: isGetTokensError,
    isLoading: isGetTokensLoading,
  } = useFungibleTokenWrapperGetTokens();

  const {
    data: userBalance,
    error: balanceError,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useFungibleTokenWrapperBalanceOf({
    args: address ? [address] : undefined,
  });

  return (
    <Card>
      {isGetTokensLoading && <div>Loading tokens...</div>}
      {tokens && (
        <FormControl>
          <FormLabel>Select Token</FormLabel>
          <RadioGroup defaultValue="outlined" name="tokens">
            {tokens?.map((x) => (
              <Radio
                key={x}
                checked={token === x}
                onChange={() => setToken(x)}
                value={x}
                label={x}
                name="tokens"
                slotProps={{ input: { "aria-label": "A" } }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {isBalanceLoading && <div>Loading balance...</div>}
      {userBalance !== undefined && (
        <FormControl>
          <FormLabel>Balance</FormLabel>
          <Typography>{formatEther(userBalance)}</Typography>
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <Input placeholder="100" />
        <FormHelperText>Enter the amount to unwrap.</FormHelperText>
      </FormControl>
    </Card>
  );
}
