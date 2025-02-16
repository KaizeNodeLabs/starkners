import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import { useModel } from "@dojoengine/sdk/react";

import { useSystemCalls } from "../../hooks/useSystemCalls";
import { ModelsMapping } from "../../typescript/models.gen";

export const GameInfo = () => {
  const { spawn } = useSystemCalls();
  const { account } = useAccount();

  const entityId = useMemo(() => {
      if (account) {
          return getEntityIdFromKeys([BigInt(account.address)]);
      }
      return BigInt(0);
  }, [account]);

  const moves = useModel(entityId as string, ModelsMapping.Moves);
  const position = useModel(entityId as string, ModelsMapping.Position);

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
      <div className="grid grid-cols-3 gap-2 w-full h-48">
        <div className="col-start-2">
          <button
            className="h-12 w-12 bg-gray-600 rounded-full shadow-md active:shadow-inner active:bg-gray-500 focus:outline-none text-2xl font-bold text-gray-200"
            onClick={async () => await spawn()}
          >
            +
          </button>
        </div>
        <div className="col-span-3 text-center text-base text-white">
          Moves Left:{" "}
          {moves ? `${moves.remaining}` : "Need to Spawn"}
        </div>
        <div className="col-span-3 text-center text-base text-white">
          {position
            ? `x: ${position?.vec?.x}, y: ${position?.vec?.y}`
            : "Need to Spawn"}
        </div>
        <div className="col-span-3 text-center text-base text-white">
          {moves && moves.last_direction.isSome()
            ? moves.last_direction.unwrap()
            : ""}
        </div>
      </div>
    </div>
  )
}
