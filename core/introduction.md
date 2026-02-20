# Introduction to Z-Core

**Z-Core** is a high-performance, universal bridge and backend foundation designed for modern FiveM servers. It acts as the intelligent middle-layer between your server's framework (QBCore, ESX, Ox, or Standalone) and advanced, modern user interfaces like the **Z-Dashboard**.

## Why Z-Core?

Traditionally, scripts are hardcoded to a specific framework (e.g., a script only works for QBCore). If a server switches frameworks, the script breaks.

Z-Core solves this by using an advanced **Adapter Pattern**. 
When Z-Core starts, it automatically detects your active framework and initializes the correct adapter behind the scenes.

This means you can drop Z-Core (and any script built on top of it, like Z-Dashboard) into **any** server, and it will work out of the box without requiring you to change a single line of code.

## Key Features

- 🔌 **Universal Framework Support:** Built-in adapters for QBCore, ESX Legacy, and Ox Core.
- 🎒 **Inventory Agnostic:** Automatically handles metadata, item wiping, and currency operations across ox_inventory, qb-inventory, and more.
- ⚡ **Zero-Dependency Core:** For servers running entirely custom or standalone setups, Z-Core falls back to its own high-speed SQL schemas.
- 🛡️ **Built-in Security:** Integrated permission systems, Discord OAuth support, and Master Password fail-safes.
- 🚀 **Pre-Compiled for Performance:** Z-Core is shipped as a pre-built Node.js bundle (`dist/server.js`). It requires **no NPM installations, no building, and no Node.js setup on your host machine**. Just start the resource.
