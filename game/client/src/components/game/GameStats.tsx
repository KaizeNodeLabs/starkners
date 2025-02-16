import { useDojoSDK } from "@dojoengine/sdk/react";
import { addAddressPadding } from "starknet";

const headers = ["Entity ID", "Player", "Position X", "Position Y", "Can Move", "Last Direction", "Remaining Moves"];

export const GameStats = () => {
  const { useDojoStore } = useDojoSDK();
  const entities = useDojoStore((state) => state.entities);

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-white">
            {headers.map((header) => (
              <th key={header} className="border border-gray-700 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(entities).map(
            ([entityId, entity]) => {
              const position =
                entity.models.dojo_starter.Position;
              const moves =
                entity.models.dojo_starter.Moves;
              const lastDirection =
                moves?.last_direction?.isSome()
                  ? moves.last_direction?.unwrap()
                  : "N/A";

              return (
                <tr
                  key={entityId}
                  className="text-gray-300"
                >
                  <td className="border border-gray-700 p-2">
                    {addAddressPadding(entityId)}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {position?.player ?? "N/A"}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {position?.vec?.x.toString() ??
                      "N/A"}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {position?.vec?.y.toString() ??
                      "N/A"}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {moves?.can_move?.toString() ??
                      "N/A"}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {lastDirection}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {moves?.remaining?.toString() ??
                      "N/A"}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  )
}
