import { useAccount } from "wagmi";
import { Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";

import Account from "./components/Account";
import Connect from "./components/Connect";
import NetworkSwitcher from "./components/NetworkSwitcher";
import WrapToken from "./components/WrapToken";
import UnwrapToken from "./components/UnwrapToken";

export function App() {
  const { isConnected } = useAccount();

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <h1>Wrapp</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <hr />
          <NetworkSwitcher />
          <hr />
          <Tabs defaultValue={1}>
            <TabList>
              <Tab value={1}>Wrap</Tab>
              <Tab value={2}>Unwrap</Tab>
            </TabList>
            <TabPanel value={1} sx={{ p: 2 }}>
              <WrapToken />
            </TabPanel>
            <TabPanel value={2} sx={{ p: 2 }}>
              <UnwrapToken />
            </TabPanel>
          </Tabs>
        </>
      )}
    </Stack>
  );
}
