import { Card, Typography } from "@mui/joy";
import { useAccount } from "wagmi";

export default function Account() {
  const { address } = useAccount();

  return (
    <Card variant="outlined">
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        Connected with {address}
      </Typography>
    </Card>
  );
}
