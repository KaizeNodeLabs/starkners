import { useEffect } from "react";
import { ParsedEntity, QueryBuilder } from "@dojoengine/sdk";
import { AccountInterface, addAddressPadding } from "starknet";
import { useAccount } from "@starknet-react/core";
import { useDojoSDK } from "@dojoengine/sdk/react";

import { SchemaType } from "../typescript/models.gen";

/**
 * Custom hook to handle game data subscriptions and fetch initial entities.
 */
export const useGameData = () => {
    const { useDojoStore, sdk } = useDojoSDK();
    const { account } = useAccount();
    const state = useDojoStore((state) => state);

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const subscribe = async (account: AccountInterface) => {
            const subscription = await sdk.subscribeEntityQuery({
                query: new QueryBuilder<SchemaType>()
                    .namespace("dojo_starter", (n) =>
                        n
                            .entity("Moves", (e) =>
                                e.eq(
                                    "player",
                                    addAddressPadding(account.address)
                                )
                            )
                            .entity("Position", (e) =>
                                e.is(
                                    "player",
                                    addAddressPadding(account.address)
                                )
                            )
                    )
                    .build(),
                callback: ({ error, data }) => {
                    if (error) {
                        console.error("Error setting up entity sync:", error);
                    } else if (
                        data &&
                        (data[0] as ParsedEntity<SchemaType>).entityId !== "0x0"
                    ) {
                        state.updateEntity(data[0] as ParsedEntity<SchemaType>);
                    }
                },
            });

            unsubscribe = () => subscription.cancel();
        };

        if (account) {
            subscribe(account);
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [sdk, account]);

    useEffect(() => {
        const fetchEntities = async (account: AccountInterface) => {
            try {
                await sdk.getEntities({
                    query: new QueryBuilder<SchemaType>()
                        .namespace("dojo_starter", (n) =>
                            n.entity("Moves", (e) =>
                                e.eq(
                                    "player",
                                    addAddressPadding(account.address)
                                )
                            )
                        )
                        .build(),
                    callback: (resp) => {
                        if (resp.error) {
                            console.error(
                                "resp.error.message:",
                                resp.error.message
                            );
                            return;
                        }
                        if (resp.data) {
                            state.setEntities(
                                resp.data as ParsedEntity<SchemaType>[]
                            );
                        }
                    },
                });
            } catch (error) {
                console.error("Error querying entities:", error);
            }
        };

        if (account) {
            fetchEntities(account);
        }
    }, [sdk, account]);
};
