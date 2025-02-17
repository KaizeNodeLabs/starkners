import { useDojoSDK } from "@dojoengine/sdk/react";
import { useAccount } from "@starknet-react/core";
import { CairoCustomEnum } from "starknet";

const directions = [
    { key: "Up", label: "↑", col: "col-start-2" },
    { key: "Left", label: "←", col: "col-start-1" },
    { key: "Right", label: "→", col: "col-start-3" },
    { key: "Down", label: "↓", col: "col-start-2" },
];

export const GameControls = () => {
    const { client } = useDojoSDK();
    const { account } = useAccount();

    const handleMove = async (directionKey: string) => {
        await client.actions.move(account!, new CairoCustomEnum({ [directionKey]: "()" }));
    };

    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
            <div className="grid grid-cols-3 gap-2 w-full h-48">
                {directions.map(({ key, label, col }) => (
                    <button
                        key={key}
                        className={`${col} h-12 w-12 bg-gray-600 rounded-full shadow-md active:shadow-inner active:bg-gray-500 focus:outline-none text-2xl font-bold text-gray-200`}
                        onClick={() => handleMove(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
