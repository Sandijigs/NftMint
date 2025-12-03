export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "uint256", "name": "_mintPrice", "type": "uint256" },
      { "internalType": "uint256", "name": "_restorePrice", "type": "uint256" },
      { "internalType": "string", "name": "baseURI", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AlreadyMintedToday",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidMintPrice",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoBrokenStreak",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StreakCannotBeRestored",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "minter", "type": "address" },
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "dayNumber", "type": "uint256" },
      { "indexed": false, "internalType": "uint16", "name": "currentStreak", "type": "uint16" },
      { "indexed": false, "internalType": "uint16", "name": "longestStreak", "type": "uint16" }
    ],
    "name": "DailyMint",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint16", "name": "newStreak", "type": "uint16" }
    ],
    "name": "StreakRestored",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "dayNumber", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "themeURI", "type": "string" }
    ],
    "name": "ThemeUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "mintDaily",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "restoreStreak",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "canMintToday",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentDay",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserStats",
    "outputs": [
      { "internalType": "uint256", "name": "lastMintDay", "type": "uint256" },
      { "internalType": "uint16", "name": "currentStreak", "type": "uint16" },
      { "internalType": "uint16", "name": "longestStreak", "type": "uint16" },
      { "internalType": "uint16", "name": "totalMints", "type": "uint16" },
      { "internalType": "bool", "name": "canMint", "type": "bool" },
      { "internalType": "bool", "name": "canRestore", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "restorePrice",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deploymentDay",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "dailyThemes",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "minters",
    "outputs": [
      { "internalType": "uint128", "name": "lastMintDay", "type": "uint128" },
      { "internalType": "uint16", "name": "currentStreak", "type": "uint16" },
      { "internalType": "uint16", "name": "longestStreak", "type": "uint16" },
      { "internalType": "uint16", "name": "totalMints", "type": "uint16" },
      { "internalType": "uint16", "name": "lastBrokenStreak", "type": "uint16" },
      { "internalType": "uint128", "name": "streakBrokenDay", "type": "uint128" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
