import { useState } from "react";
import { useWaitForTransaction } from "wagmi";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Radio,
  RadioGroup,
  Card,
} from "@mui/joy";

import {
  useFungibleTokenWrapperWrap,
  usePrepareFungibleTokenWrapperWrap,
  useFungibleTokenWrapperGetTokens,
} from "../generated";
export default function WrapToken() {
  const [amount, setAmount] = useState<bigint>(0n);
  const [token, setToken] = useState<`0x${string}`>(
    "0x0000000000000000000000000000000000000000"
  );
  const {
    data: tokens,
    error: getTokensError,
    isError: isGetTokensError,
    isLoading: isGetTokensLoading,
  } = useFungibleTokenWrapperGetTokens();

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
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <Input placeholder="100" />
        <FormHelperText>Enter the amount to wrap.</FormHelperText>
      </FormControl>
    </Card>
  );
}
