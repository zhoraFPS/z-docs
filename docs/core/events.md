# Client Events

Z-Core exposes a set of server → client events that other resources can trigger. These handle in-game actions like notifications, spectating, healing, and spawning vehicles.

All events below are triggered **server-side** using `TriggerClientEvent`.

---

## Notification

### `z-core:client:notify`

Sends a chat-box notification to a player.

```ts
TriggerClientEvent('z-core:client:notify', source, message, type)
```

| Param | Type | Values |
|---|---|---|
| `message` | `string` | The notification text |
| `type` | `string` | `'success'` \| `'error'` \| `'info'` |

**Example:**

```ts
// From your server script
TriggerClientEvent('z-core:client:notify', source, 'You have been healed.', 'success')
TriggerClientEvent('z-core:client:notify', source, 'Action denied.', 'error')
```

::: tip Use player.notify() instead
If you already have a `ZPlayer` object, calling `player.notify(msg, type)` is equivalent and slightly cleaner.
:::

---

## Health & Status

### `z-core:client:heal`

Fully restores the player's health and armor.

```ts
TriggerClientEvent('z-core:client:heal', source)
```

No additional parameters.

**What it does client-side:**
- Sets health to maximum (`SetEntityHealth`)
- Sets armor to maximum (`SetPedArmour`)

---

### `z-core:client:revive`

Revives a downed player. Brings them back from a dead/downed state and restores full health and armor.

```ts
TriggerClientEvent('z-core:client:revive', source)
```

::: info Framework dependency
If your framework uses a custom death/injury system (e.g. esx_ambulancejob, ps-ambulance), you may need to hook into those events additionally. This event handles the raw GTA state only.
:::

---

## Admin Controls

### `z-core:client:freeze`

Toggles the player's frozen state. Calling it again unfreezes the player.

```ts
TriggerClientEvent('z-core:client:freeze', source)
```

No additional parameters. The freeze state is a toggle — send again to unfreeze.

---

### `z-core:client:spectate`

Puts the calling player into spectate mode on the target player, or exits spectate if already spectating.

```ts
TriggerClientEvent('z-core:client:spectate', source, targetSource)
```

| Param | Type | Description |
|---|---|---|
| `targetSource` | `number` | Server ID of the player to spectate |

**Example:**

```ts
// Admin (source = 1) spectates player (targetSource = 42)
TriggerClientEvent('z-core:client:spectate', 1, 42)
```

---

## Vehicles

### `z-core:client:spawnVehicle`

Spawns a vehicle at the player's current position and facing direction.

```ts
TriggerClientEvent('z-core:client:spawnVehicle', source, model)
```

| Param | Type | Description |
|---|---|---|
| `model` | `string` | Vehicle model name (e.g. `'adder'`, `'police'`, `'zentorno'`) |

**Example:**

```ts
TriggerClientEvent('z-core:client:spawnVehicle', source, 'adder')
```

Z-Core ships with a list of 900+ vanilla GTA vehicle models available through the admin panel's **Assets** tab. Any model string from that list works here.

---

## NUI events (admin panel)

These events control the Z-Admin UI. You generally don't call these directly — they're used internally by Z-Core's server → client bridge. They're documented here for completeness.

### `SET_VISIBLE`

Shows or hides the admin panel UI.

```ts
TriggerClientEvent('z-core:setVisible', source, visible: boolean)
```

### `OPEN_REPORT_MODAL`

Opens the in-game report/ticket creation modal for a player.

```ts
TriggerClientEvent('z-core:openReportModal', source)
```

### `OPEN_PLAYER_TICKETS`

Opens the player's own ticket view.

```ts
TriggerClientEvent('z-core:openPlayerTickets', source)
```

---

## Support tickets (player commands)

Z-Core registers two commands for players to interact with the support ticket system:

| Command | Description |
|---|---|
| `/report [message]` | Creates a new support ticket with the given message |
| `/ticket` | Opens the player's ticket history in the UI |

These commands are registered by `TicketManager` on resource start. No configuration needed.

---

## Server-side events (internal)

These events are listened to by Z-Core internally. You should not call them directly unless you're building deep integrations.

| Event | Triggered by | Purpose |
|---|---|---|
| `playerConnecting` | FiveM built-in | Ban check on connection |
| `z-core:nui:*` | Admin panel NUI callbacks | All admin panel actions |
| `z-core:getJobs` | Admin panel | Load job list |
| `z-core:requestTickets` | Admin panel | Load all tickets |
| `z-core:submitReport` | Player command | Create ticket |
| `z-core:enableMap` | Admin panel | Start live map stream |
| `z-core:disableMap` | Admin panel | Stop live map stream |
| `z-core:mapAction` | Admin panel | Teleport/kill/heal via map |

---

## Using events from Lua

All client events work identically from Lua:

```lua
-- Heal a player
TriggerClientEvent('z-core:client:heal', source)

-- Notify a player
TriggerClientEvent('z-core:client:notify', source, 'Busted!', 'error')

-- Spawn a vehicle for a player
TriggerClientEvent('z-core:client:spawnVehicle', source, 'police')
```
