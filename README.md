# 🎲 STARKNERS  

**Starkners** is an **on-chain Checkers game** built on **Starknet**, powered by **Dojo Engine**.  

## 🚀 Getting Started  

### 📦 Install Dependencies  

- **Dojo v1.1.1** → [Installation Guide](https://www.dojoengine.org/getting-started)  
- **Scarb v2.9.2** → Install using the following command:  

```bash
curl -s https://raw.githubusercontent.com/KaizeNodeLabs/starkiro/main/cli/install_dev_suit.sh -o install_dev_suit.sh
bash install_dev_suit.sh --scarb 2.9.2 
```

### 🏗️ Running the Project  

#### 1️⃣ Start **Dojo**  

Run **Katana** in development mode:  
```bash
katana --dev --dev.no-fee --http.cors_origins '*'
```

#### 2️⃣ Build the Project  
```bash
sozo build
```

#### 3️⃣ Deploy the Contracts  
```bash
sozo migrate
```

#### 4️⃣ Start **Torii** (for event indexing)  
```bash
torii -w {world_address-output of previous command} --http.cors_origins '*'
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

Now you’re ready to play! 🚀


### 🤝 Contributing  

We welcome contributions from the community! Whether it's bug fixes, new features, or improvements, your help is appreciated.  

🔹 **Check out our Contribution Guidelines:** [Contribution Guidelines](https://github.com/KaizeNodeLabs/starkners/issues)  
🔹 **Report Issues & Suggest Features:** Open an issue on GitHub  
🔹 **Fork & Submit a PR:** Follow best practices and submit your pull request  

Let's build together! 🚀♟️
