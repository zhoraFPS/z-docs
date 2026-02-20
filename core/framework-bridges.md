# Framework Bridges

The defining feature of Z-Core is its ability to seamlessly translate raw FiveM data into standardized structures, regardless of whether you're using QBCore, ESX, Ox, or no framework at all.

## How the Bridge works
When Z-Core starts, the `BridgeManager` (`src/server/controllers/BridgeManager.ts`) scans the server's running resources to detect the active framework.

```typescript
if (GetResourceState('es_extended') === 'started') {
    return new ESXAdapter();
} else if (GetResourceState('qb-core') === 'started') {
    return new QBAdapter();
} else if (GetResourceState('ox_core') === 'started') {
    return new OxAdapter();
} else {
    return new StandaloneAdapter();
}
```

Once detected, the `BridgeManager` loads the corresponding **Adapter**. Every adapter is forced to follow a strict `FrameworkInterface`.

## What does this mean for Server Owners?
You never have to rewrite database structures or UI calls. If you decide to switch your server from `qb-core` to `ox_core` tomorrow, the Z-Dashboard will continue working perfectly without any configuration changes.

### 1. Data Standardization (ZPlayer)
Each framework returns player data differently.
- QBCore: `Player.PlayerData.citizenid`, `Player.PlayerData.money.cash`
- ESX: `xPlayer.identifier`, `xPlayer.getMoney()`

Z-Core's adapters intercept this and convert it into a unified **`ZPlayer`** object before sending it to the Dashboard:
```typescript
interface ZPlayer {
    source: number;
    identifier: string;
    name: string;
    money: number;
    bank: number;
    job: string;
    job_grade: number;
}
```

### 2. Standalone Fallback
If NO framework is detected, Z-Core activates the `StandaloneAdapter`. This adapter utilizes the custom SQL tables (`z_users`) created during the initial boot. This allows servers (like pure Freeroam/Deathmatch/Drift servers) to still track player money, jobs, and stats via Z-Core without needing a heavy RP framework!
