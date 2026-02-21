# Introduction

Z-Core is the central server resource for all Z-scripts. It acts as a universal bridge between your chosen FiveM framework and every Z-script you install — so you configure your server once and everything just works.

## What it does

Z-Core solves the problem of framework fragmentation. ESX, QBCore, ox_core, and Standalone each store player data differently, manage money differently, and structure jobs differently. Z-Core detects which framework you're running at startup and maps everything to one consistent API.

Any script that uses Z-Core gets:

- A unified `ZPlayer` object — same properties, regardless of whether you're on ESX or QBCore
- A unified inventory API — `AddItem`, `RemoveItem`, `GetItemCount` work across six inventory systems
- A built-in permission system that layers on top of your framework's groups
- A ban, warn, and logging system usable from any resource

## Features

### Framework Bridge
Automatically detects and adapts to ESX (Legacy), QBCore, ox_core, and Standalone mode. No per-framework code in your scripts.

### Inventory Bridge
Supports OxInventory, QS Inventory, Codem Inventory, Core Inventory, QB Legacy, and ESX Legacy through one unified API.

### Permission System
Role-Based Access Control (RBAC) layered on top of ACE permissions and framework groups. Define roles in config, assign them via database or ACE.

### Ban System
Hardware bans (token-based) and identifier bans. Supports temporary and permanent bans. Checks fire on `playerConnecting` before the player loads.

### Warn System
Warn players with automatic escalation — configurable thresholds trigger 1h, 24h, and permanent bans automatically.

### Admin Panel (Z-Admin)
The Z-Admin dashboard connects to Z-Core for all data. Player management, live map, economy stats, resource monitor, security scanner, and staff management are all powered by Z-Core's server-side controllers.

### Logging
Centralized log system with levels (`admin`, `security`, `error`, `info`). Logs are stored in the database and can be sent to Discord.

### Discord Webhooks
Built-in webhook integration for bans, warns, admin actions, and server events.

## Architecture overview

```
Your scripts
     │
     │  exports['z-core'].GetPlayer(source)
     │  exports['z-core'].AddItem(source, item, count)
     ▼
  Z-Core
     │
     ├── Framework Bridge ──► ESX / QBCore / ox_core / Standalone
     ├── Inventory Bridge ──► OxInventory / QS / Codem / ESX / QB / Core
     ├── Permission Manager ──► ACE + Config RBAC + DB staff table
     ├── Ban Manager ──► z_bans table + playerConnecting hook
     ├── Warn Manager ──► zcore_warns table + auto-escalation
     ├── Log Manager ──► z_logs table + Discord
     └── ... more controllers
```

## Who should read what

**Server owners (plug-and-play setup):**
1. [Installation](/core/installation) — requirements, file placement, SQL
2. [Configuration](/core/configuration) — Discord webhooks, warn thresholds, permissions
3. [Permissions](/core/permissions) — adding staff, assigning roles

**Script developers:**
1. [Framework Bridges](/core/framework-bridges) — understand the ZPlayer object
2. [Developer API](/core/developer-api) — all exports, signatures, return types
3. [Client Events](/core/events) — events you can trigger from client-side code

## Requirements

| Dependency | Required | Notes |
|---|---|---|
| `oxmysql` | **Yes** | All database operations |
| `es_extended` | No | Required for ESX framework mode |
| `qb-core` | No | Required for QBCore framework mode |
| `ox_core` | No | Required for ox_core framework mode |
| `ox_inventory` | No | Required for OxInventory support |
| MariaDB / MySQL | **Yes** | 5.7+ recommended |

At least one framework **or** Standalone mode must be available.
