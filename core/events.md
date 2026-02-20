# Server-to-Client Events

Z-Core comes pre-packaged with several highly optimized client events that handle core moderation and administrative duties. Instead of rewriting freeze or spectate logic in your own scripts, you can simply trigger Z-Core's native events.

## Triggering Events

You can trigger these from any server-side script using standard FiveM syntax:

```lua
-- Example: Triggering a revive on a specific player
TriggerClientEvent('z-core:client:revive', targetSource)
```

## Available Events

### `z-core:client:revive`
Instantly restores the player's health to maximum, clears all ped blood damage, and resurrects them if they were fully dead.
**Arguments:** None (targets the client it's sent to)

### `z-core:client:heal`
Restores the player's health to maximum and sets their armor to 100%. Does not resurrect dead players.
**Arguments:** None

### `z-core:client:freeze`
Toggles the player's frozen state. If they are moving, they will be frozen in place. If they are already frozen, they will be unfrozen.
**Arguments:** None

### `z-core:client:spectate`
Toggles spectator mode. Forces the local player's camera to attach to a different target player on the server.
**Arguments:** `targetSource` (number) - The Server ID of the player to spectate.
*Note: Send the event a second time without changing targets to exit spectator mode.*

### `z-core:client:spawnVehicle`
Forces the client to request a vehicle model, spawn it at their exact coordinates, and automatically place them into the driver's seat.
**Arguments:** `model` (string) - The spawn name/hash of the vehicle (e.g., `"adder"`).

### `z-core:client:notify`
Triggers a standardized chat notification on the client's screen. (Note: Depending on your active framework, this may be intercepted by the UI bridge to show a visually stylized toast notification instead).
**Arguments:** 
1. `message` (string) - The content to display.
2. `type` (string) - `"success"` or `"error"`.

## Emitting mass events
Because these are standard FiveM events, you can use the `-1` routing target to hit the entire server simultaneously.

```lua
-- Force every player on the server to spawn an Adder
TriggerClientEvent('z-core:client:spawnVehicle', -1, 'adder')
```
