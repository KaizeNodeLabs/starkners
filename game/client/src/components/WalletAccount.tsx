import {
    Connector,
    useAccount,
    useConnect,
    useDisconnect,
} from "@starknet-react/core";
import { useCallback, useState } from "react";

export function WalletAccount() {
    const { connectAsync, connectors } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const [pendingConnectorId& cd 
