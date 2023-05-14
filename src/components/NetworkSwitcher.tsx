import { Alert, Button, Stack, Typography } from "@mui/joy";
import { BaseError } from "viem";
import { useNetwork, useSwitchNetwork } from "wagmi";

export default function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  if (!chain) return null;

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center">
      <Typography>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && " (unsupported)"}
      </Typography>

      {switchNetwork && (
        <Stack spacing={1} direction="row">
          {chains.map((x) =>
            x.id === chain?.id ? (
              <Button key={x.id} onClick={() => switchNetwork(x.id)} disabled>
                {x.name}
              </Button>
            ) : (
              <Button
                key={x.id}
                onClick={() => switchNetwork(x.id)}
                loading={isLoading && x.id === pendingChainId}
              >
                {x.name}
              </Button>
            )
          )}
        </Stack>
      )}

      {error && (
        <Alert color="danger">
          {error && (error as BaseError).shortMessage}
        </Alert>
      )}
    </Stack>
  );
}
