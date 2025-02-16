# 🎨 Client Starkners

## 📂 Project Structure
```
📂 src
 ┣ 📂 components
 ┃ ┣ 📂 game             # Components related to the game
 ┃ ┣ 📂 home             # Components specific to the landing page
 ┃ ┣ 📂 shared           # Reusable components across the app
 ┃ ┃ ┣ 📜 HistoricalEvents.tsx  # Displays historical game events
 ┃ ┃ ┣ 📜 WalletAccount.tsx     # Handles wallet connection
 ┣ 📂 contexts           # Global contexts for app state management
 ┃ ┣ 📜 DojoContext.tsx        # Dojo context for handling blockchain data
 ┃ ┣ 📜 StarknetProvider.tsx   # Starknet provider configuration
 ┣ 📂 hooks              # Custom hooks for logic management
 ┃ ┣ 📜 useGameData.ts         # Hook for handling game data
 ┃ ┣ 📜 useSystemCalls.ts      # Hook for system and blockchain calls
 ┣ 📂 pages              # Main application pages
 ┃ ┣ 📜 Game.tsx              # Game page
 ┃ ┣ 📜 Home.tsx              # Home (landing page)
 ┣ 📂 typescript         # Generated models and contract configurations
 ┃ ┣ 📜 contracts.gen.ts       # Functions to interact with smart contracts
 ┃ ┣ 📜 models.gen.ts          # Game data models
 ┣ 📜 Router.tsx         # React Router configuration
 ┣ 📜 index.css          # Global styles
 ┣ 📜 main.tsx           # Main entry point of the application
 ┣ 📜 vite-env.d.ts      # TypeScript environment definitions
```

---

### 🎮 Running the Client  

#### 1️⃣ Install Dependencies  
```bash
pnpm install
```

#### 2️⃣ Start the Client  
```bash
pnpm dev
```

---

## 🛠 **Technologies Used**
- **React** + **Vite** ⚛️
- **TypeScript** 🟦
- **Tailwind CSS** 🎨
- **Starknet** 🌐
- **Dojo Engine** 🏗️
- **Zustand** ⚡
- **ESLint** 🛠️
