# Framework Bridges

Z-Core's bridge layer auto-detects your framework at startup and maps it to a single consistent interface. Every Z-script uses that interface — the underlying framework is invisible.

## Auto-detection order

Z-Core checks for active frameworks in this priority order:

```
1. ESX      — checks if es_extended resource is started
2. QBCore   — checks if qb-core resource is started
3. ox_core  — checks if ox_core resource is started
4. Standalone — fallback if none of the above are found
```

The detection happens once during `onResourceStart`. The result is logged to console:

```
[Z-Core] Framework detected: ESX
```

::: tip Only one framework runs
If somehow multiple framework resources are started (unusual but possible), Z-Core picks the first match in the order above.
:::

---

## The ZPlayer object

Regardless of which framework is running, `GetPlayer(source)` always returns a `ZPlayer` with the same shape:

```ts
interface ZPlayer {
    // Raw identifiers
    source:     number      // FiveM player server ID
    identifier: string      // "steam:110000112345678" (ESX/standalone)
                            // or CitizenID (QB)

    // Display data
    name:  string           // In-game character name

    // Job
    job: {
        name:  string       // "police"
        grade: number       // 2
        label: string       // "Officer"
    }

    // Money
    money: {
        cash: number        // 5000
        bank: number        // 20000
    }

    // Methods
    getMoney(type: 'cash' | 'bank'): number
    addMoney(type: 'cash' | 'bank', amount: number): void
    removeMoney(type: 'cash' | 'bank', amount: number): boolean
    hasPermission(perm: string): boolean
    notify(msg: string, type?: 'success' | 'error' | 'info'): void
}
```

`GetPlayer` returns `null` if the player is not online or not found by their framework.

---

## ESX

**Resource name detected:** `es_extended`

**Identifier:** Steam hex (`steam:1100001...`)

**Money mapping:**
- `money.cash` → ESX `cash` account
- `money.bank` → ESX `bank` account

**Job mapping:** Reads from ESX player's active job and grade.

**Database tables used:**
- `users` — player accounts
- `owned_vehicles` — vehicle ownership
- `jobs` / `job_grades` — job definitions

**Notes:**
- Online/offline detection uses `ESX.GetPlayerFromIdentifier()`
- `removeMoney` checks balance before removing — returns `false` if insufficient funds
- `notify` uses ESX's built-in notification system

---

## QBCore

**Resource name detected:** `qb-core`

**Identifier:** QB CitizenID (e.g. `GHK12345`)

**Money mapping:**
- `money.cash` → `Player.PlayerData.money.cash`
- `money.bank` → `Player.PlayerData.money.bank`

**Job mapping:** Reads from QB player data `job.name`, `job.grade.level`, `job.grade.name`.

**Database tables used:**
- `players` — all player data as JSON columns
- `player_vehicles` — vehicle ownership

**Notes:**
- All complex data is stored as JSON in the `players` table
- `createJob` and `updateGrade` are **not supported** at runtime — job changes require editing QB shared jobs directly
- `canCarryItem` always returns `true` — QB handles weight internally

---

## ox_core

**Resource name detected:** `ox_core`

**Identifier:** `charid` (character ID) or `userId`

**Name:** Concatenated from `firstName` and `lastName` fields

**Money mapping:**
- Uses ox_core's `player.getCurrency(type)` and `player.addCurrency(type, amount)`
- `type` must be `'cash'` or `'bank'`

**Job mapping:** Reads from the player's active group (skips the default `'user'` group).

**Database tables used:**
- `characters` — player/character data
- `vehicles` — vehicle ownership

**Notes:**
- ox_core uses a **groups** system instead of jobs — Z-Core maps the first non-`user` group to `job`
- `saveOfflinePlayer` returns `false` to avoid state desync with ox_core's own data layer
- `notify` uses `ox_lib:notify` event

---

## Standalone

**Activated when:** None of ESX, QBCore, or ox_core are started.

**Identifier:** Steam hex or license identifier

**Storage:** Z-Core's own `z_users` table

**Money mapping:** Stored and read from `z_users.money` (cash) and `z_users.bank` (bank)

**Permissions:** Uses FiveM's native ACE system (`IsPlayerAceAllowed`)

**Database table:**

```sql
CREATE TABLE z_users (
    identifier     VARCHAR(50) PRIMARY KEY,
    name           VARCHAR(50),
    money          INT DEFAULT 0,
    bank           INT DEFAULT 0,
    job            VARCHAR(50) DEFAULT 'unemployed',
    job_grade      INT DEFAULT 0,
    permission_level INT DEFAULT 0
)
```

**Notes:**
- Job management is limited — no job list or grade system
- Vehicle support is basic
- Use this mode for standalone admin tools or custom frameworks

---

## Inventory bridge

Independently from the framework bridge, Z-Core also auto-detects your inventory system:

| Priority | Resource name | Notes |
|---|---|---|
| 1 | `ox_inventory` | Full feature support |
| 2 | `qs-inventory` | Full feature support |
| 3 | `codem-inventory` | Full feature support |
| 4 | `core_inventory` | Full feature support |
| 5 | `qb-inventory` / `lj-inventory` | QB legacy |
| 6 | *(none of the above)* | ESX Legacy fallback |

The detected adapter is what powers `AddItem`, `RemoveItem`, `GetItemCount`, and `CanCarryItem` exports. See [Developer API](/core/developer-api) for usage.

---

## Compatibility matrix

| Feature | ESX | QBCore | ox_core | Standalone |
|---|---|---|---|---|
| GetPlayer | ✅ | ✅ | ✅ | ✅ |
| addMoney / removeMoney | ✅ | ✅ | ✅ | ✅ |
| notify | ✅ | ✅ | ✅ | ❌ |
| hasPermission | ✅ | ✅ | ✅ | ✅ (ACE) |
| searchOfflinePlayers | ✅ | ✅ | ✅ | ✅ |
| saveOfflinePlayer | ✅ | ✅ | ❌ | ✅ |
| getPlayerVehicles | ✅ | ✅ | ✅ | ⚠️ Limited |
| getJobs | ✅ | ✅ | ⚠️ Limited | ❌ |
| createJob (runtime) | ✅ | ❌ | ❌ | ❌ |
