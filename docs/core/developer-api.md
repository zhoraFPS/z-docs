# Exports & Methods

All Z-Core exports are server-side only. Call them from any server script using:

```ts
exports['z-core'].ExportName(arg1, arg2, ...)
```

For Lua:

```lua
exports['z-core']:ExportName(arg1, arg2, ...)
```

---

## Player

### GetPlayer

Returns the `ZPlayer` object for an online player. Returns `null` if the player is not online or not found.

```ts
GetPlayer(source: number): ZPlayer | null
```

**Example:**

```ts
const player = exports['z-core'].GetPlayer(source)

if (!player) return

console.log(player.name)        // "John_Doe"
console.log(player.identifier)  // "steam:110000112345678"
console.log(player.job)         // { name: "police", grade: 2, label: "Officer" }
console.log(player.money)       // { cash: 5000, bank: 20000 }
```

**Lua:**

```lua
local player = exports['z-core']:GetPlayer(source)

if not player then return end

print(player.name)
print(player.job.name)
print(player.money.cash)
```

---

### ZPlayer methods

Once you have a `ZPlayer` object, you can call methods directly on it:

#### getMoney

```ts
player.getMoney(type: 'cash' | 'bank'): number
```

```ts
const cash = player.getMoney('cash')   // 5000
const bank = player.getMoney('bank')   // 20000
```

#### addMoney

Adds money to the player's account. Persists to the framework immediately.

```ts
player.addMoney(type: 'cash' | 'bank', amount: number): void
```

```ts
player.addMoney('cash', 500)
player.addMoney('bank', 10000)
```

#### removeMoney

Removes money from the player's account. Returns `false` if the player doesn't have enough.

```ts
player.removeMoney(type: 'cash' | 'bank', amount: number): boolean
```

```ts
const success = player.removeMoney('cash', 1000)
if (!success) {
    // Player didn't have enough cash
}
```

#### hasPermission

Checks if the player has a specific Z-Core permission. Uses the same RBAC chain as `HasPermission` export.

```ts
player.hasPermission(perm: string): boolean
```

```ts
if (player.hasPermission('bans')) {
    // Allow ban action
}
```

#### notify

Sends a notification to the player using the framework's native notification system.

```ts
player.notify(msg: string, type?: 'success' | 'error' | 'info'): void
```

```ts
player.notify('You have been healed.', 'success')
player.notify('Insufficient funds.', 'error')
player.notify('Server restarting in 5 minutes.', 'info')
```

---

### GetCoreObject

Returns the internal core object. Useful for advanced integrations.

```ts
GetCoreObject(): { Bridge: BridgeManager, Inventory: InventoryInterface }
```

```ts
const core = exports['z-core'].GetCoreObject()
const player = core.Bridge.getPlayer(source)
```

::: warning Advanced use only
Prefer the named exports over `GetCoreObject` for normal usage. The internal objects may change between versions.
:::

---

### GetFramework

Returns the active framework adapter instance. Use this to access framework-specific methods not exposed through the standard API.

```ts
GetFramework(): FrameworkInterface
```

---

### GetInventoryAdapter

Returns the active inventory adapter instance.

```ts
GetInventoryAdapter(): InventoryInterface
```

---

## Inventory

### AddItem

Adds items to a player's inventory. Returns `true` on success.

```ts
AddItem(source: number, item: string, count: number, metadata?: any): boolean
```

```ts
exports['z-core'].AddItem(source, 'bread', 3)
exports['z-core'].AddItem(source, 'weapon_pistol', 1, { ammo: 30 })
```

**Lua:**

```lua
exports['z-core']:AddItem(source, 'bread', 3)
```

---

### RemoveItem

Removes items from a player's inventory. Returns `true` on success.

```ts
RemoveItem(source: number, item: string, count: number): boolean
```

```ts
exports['z-core'].RemoveItem(source, 'lockpick', 1)
```

---

### GetItemCount

Returns how many of an item the player currently carries.

```ts
GetItemCount(source: number, item: string): number
```

```ts
const count = exports['z-core'].GetItemCount(source, 'phone')
// → 1
```

---

### CanCarryItem

Returns `true` if the player has enough inventory space to carry the specified item and count.

```ts
CanCarryItem(source: number, item: string, count: number): boolean
```

```ts
const canCarry = exports['z-core'].CanCarryItem(source, 'weapon_rifle', 1)
if (!canCarry) {
    player.notify('Your inventory is full.', 'error')
    return
}
```

::: info QBCore note
On QBCore with the legacy inventory, `CanCarryItem` always returns `true` — QBCore handles weight limits internally.
:::

---

## Warns

### WarnPlayer

Issues a warn to a player. Logs to database, fires Discord webhook, and triggers auto-escalation if configured.

```ts
WarnPlayer(adminName: string, target: number, reason: string): Promise<void>
```

| Param | Type | Description |
|---|---|---|
| `adminName` | `string` | Display name of the admin issuing the warn |
| `target` | `number` | Server source ID of the player being warned |
| `reason` | `string` | Warn reason shown to the player |

```ts
await exports['z-core'].WarnPlayer('AdminName', source, 'Exploiting game mechanics')
```

---

### GetWarns

Returns the full warn history for a player by identifier.

```ts
GetWarns(identifier: string): Promise<Warn[]>
```

```ts
const player = exports['z-core'].GetPlayer(source)
const warns = await exports['z-core'].GetWarns(player.identifier)
// → [{ id, identifier, player_name, admin_name, reason, created_at }, ...]
```

---

### GetWarnCount

Returns the total number of warns for a player.

```ts
GetWarnCount(identifier: string): Promise<number>
```

```ts
const count = await exports['z-core'].GetWarnCount(player.identifier)
if (count >= 3) {
    // Player has 3 or more warns
}
```

---

## Bans

### BanPlayer

Bans a player. Issues both an identifier ban and a hardware token ban.

```ts
BanPlayer(
    adminName: string,
    target: number,
    reason: string,
    duration: number
): Promise<void>
```

| Param | Type | Description |
|---|---|---|
| `adminName` | `string` | Display name of the admin |
| `target` | `number` | Server source ID of the player |
| `reason` | `string` | Ban reason |
| `duration` | `number` | Duration in **minutes**. Use `0` for permanent |

```ts
// Permanent ban
await exports['z-core'].BanPlayer('AdminName', source, 'Cheating', 0)

// 24-hour ban (1440 minutes)
await exports['z-core'].BanPlayer('AdminName', source, 'Trolling', 1440)
```

The player is kicked immediately. Future connection attempts are blocked at `playerConnecting`.

---

### UnbanPlayer

Removes an active ban by identifier.

```ts
UnbanPlayer(identifier: string): Promise<boolean>
```

```ts
const success = await exports['z-core'].UnbanPlayer('steam:110000112345678')
```

Returns `true` if a ban was found and deactivated, `false` if no active ban exists for that identifier.

---

## Permissions

### HasPermission

Returns `true` if the player has the specified Z-Core permission. Runs the full RBAC chain (ACE → config → z_staff → wildcards).

```ts
HasPermission(source: number, permission: string): Promise<boolean>
```

```ts
const canBan = await exports['z-core'].HasPermission(source, 'bans')
if (!canBan) return
```

---

### GetRole

Returns the player's highest resolved role as a string.

```ts
GetRole(source: number): Promise<'god' | 'superadmin' | 'admin' | 'mod' | 'none'>
```

```ts
const role = await exports['z-core'].GetRole(source)

if (role === 'none') {
    // Not a staff member
}
```

---

## Logging

### Log

Writes a structured log entry to `z_logs`. Optionally broadcasts to online admin panel users.

```ts
Log(type: string, message: string, metadata?: any): void
```

| `type` | Description |
|---|---|
| `'admin'` | Admin actions — shown in admin panel log view |
| `'security'` | Security events |
| `'error'` | Server errors |
| `'info'` | General information |
| `'console'` | Console output capture |

```ts
exports['z-core'].Log('admin', `${adminName} kicked ${playerName}`, {
    admin: adminIdentifier,
    target: playerIdentifier,
    reason: 'RDM',
})
```

---

## Discord

### SendDiscord

Sends a Discord embed to a configured webhook.

```ts
SendDiscord(
    webhookType: string,
    title: string,
    colorKey: string,
    fields: { name: string, value: string, inline?: boolean }[]
): void
```

| `webhookType` | Webhook used |
|---|---|
| `'bans'` | `config.discord.webhooks.bans` |
| `'warns'` | `config.discord.webhooks.warns` |
| `'adminActions'` | `config.discord.webhooks.adminActions` |
| `'serverEvents'` | `config.discord.webhooks.serverEvents` |

| `colorKey` | Color |
|---|---|
| `'ban'` | Red |
| `'warn'` | Yellow |
| `'unban'` | Green |
| `'adminAction'` | Blue |
| `'serverEvent'` | Cyan |

```ts
exports['z-core'].SendDiscord(
    'adminActions',
    'Player Kicked',
    'adminAction',
    [
        { name: 'Admin',  value: adminName,  inline: true },
        { name: 'Player', value: playerName, inline: true },
        { name: 'Reason', value: reason,     inline: false },
    ]
)
```

---

## TypeScript types

If you're writing TypeScript, you can import Z-Core's shared interfaces directly:

```ts
// In your resource's tsconfig, add a path alias to z-core's shared folder
// or copy the interfaces you need:

interface ZPlayer {
    source: number
    identifier: string
    name: string
    job:   { name: string; grade: number; label: string }
    money: { cash: number; bank: number }
    getMoney(type: 'cash' | 'bank'): number
    addMoney(type: 'cash' | 'bank', amount: number): void
    removeMoney(type: 'cash' | 'bank', amount: number): boolean
    hasPermission(perm: string): boolean
    notify(msg: string, type?: 'success' | 'error' | 'info'): void
}
```
