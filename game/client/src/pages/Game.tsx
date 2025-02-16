import { WalletAccount } from "../components/WalletAccount.tsx";
import { HistoricalEvents } from "../components/HistoricalEvents.tsx";
import { useGameData } from "../hooks/useGameData.ts";
import { GameStats } from "../components/game/GameStats.tsx";
import { GameControls } from "../components/game/GameControls.tsx";
import { GameInfo } from "../components/game/GameInfo.tsx";

export const Game = () => {
    useGameData();

    return (
        <div className="bg-black min-h-screen w-full p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <WalletAccount />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <GameInfo />
                    <GameControls />
                </div>
                <GameStats />
                <HistoricalEvents />
            </div>
        </div>
    );
};
