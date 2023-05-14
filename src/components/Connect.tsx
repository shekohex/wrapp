import { Alert, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import { BaseError } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <Stack spacing={3}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {isConnected && (
          <Button color="danger" onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </Button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <Button
              key={x.id}
              loading={isLoading && x.id === pendingConnector?.id}
              onClick={() => connect({ connector: x })}
            >
              {x.name}
            </Button>
          ))}
      </Stack>

      {error && (
        <Alert color="danger"> {(error as BaseError).shortMessage} </Alert>
      )}
    </Stack>
  );
}
