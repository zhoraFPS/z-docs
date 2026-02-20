# Permissions & Access Control

Z-Core uses a **layered, granular permission system** that works across all FiveM frameworks (ESX, QBCore, ox_core) and can be managed entirely from the dashboard — no `server.cfg` editing required.

## Permission Stack

Z-Core evaluates permissions through three layers, merged at runtime:

| Priority | Source | Description |
| :--- | :--- | :--- |
| **1** | **ACE Principals** | Native FiveM permissions from `server.cfg` (e.g., `add_ace identifier.license:abc zcore.admin allow`) |
| **2** | **Config Mapping** | Roles mapped to granular permissions in `config.ts` (e.g., `group.admin → ['*']`) |
| **3** | **Staff Database** | Staff added via the Dashboard UI — stored in the `z_staff` MySQL table |

All three layers are merged into a single `permissions[]` array per player. If a player has permissions from **any** source, they are granted access.

## Granular Permissions

Instead of broad tiers (Admin / Mod), Z-Core uses specific permission strings:

| Permission | Feature |
| :--- | :--- |
| `zcore.admin.dashboard` | Dashboard Overview |
| `zcore.admin.players` | Player Management (kick, ban, heal, teleport, inventory, vehicles) |
| `zcore.admin.assets` | Asset Browser & Spawning |
| `zcore.admin.support` | Support Tickets |
| `zcore.admin.economy` | Economy Data |
| `zcore.admin.jobs` | Job Management |
| `zcore.admin.server` | Server Actions (weather, time, restart, theme) |
| `zcore.admin.logs` | Live Console |
| `zcore.admin.bans` | Ban List (view, ban, unban) |
| `zcore.admin.resources` | Resource Manager |
| `zcore.admin.security` | Security Shield |
| `zcore.admin.settings` | System Settings & Staff Management |

### Special Permissions

| Permission | Effect |
| :--- | :--- |
| `*` | Wildcard — grants access to **everything** |
| `zcore.god` | Root bypass — skips all permission checks |
| `zcore.admin.*` | Category wildcard — grants all `zcore.admin.*` sub-permissions |

## Config-Based Mapping (`config.ts`)

Map framework groups or ACE roles to granular permissions:

```typescript
permissions: {
    // QBCore
    'god': ['*'],
    'admin': ['*'],
    'mod': ['zcore.admin.dashboard', 'zcore.admin.players', 'zcore.admin.support'],

    // ESX
    'group.superadmin': ['*'],
    'group.admin': ['*'],
    'group.mod': ['zcore.admin.dashboard', 'zcore.admin.players'],

    // Custom ACE roles
    'zcore.admin': ['*'],
    'zcore.mod': ['zcore.admin.dashboard', 'zcore.admin.players', 'zcore.admin.bans'],
}
```

This works because QBCore and ESX automatically sync their groups into FiveM ACE principals — Z-Core reads them via `IsPlayerAceAllowed`.

## In-Dashboard Staff Management

Server owners can add staff **directly from the Settings UI** without touching any config file:

1. Open **System Settings → Staff Management**
2. Click **"Add Staff"**
3. Enter any FiveM identifier (e.g., `license:abc123`, `steam:110000112345678`, `discord:123456789`)
4. Choose a display name and role label
5. Toggle specific permissions using the checkbox grid

These entries are saved to the `z_staff` database table and are checked at runtime alongside ACE/Config permissions.

> [!TIP]
> This means you can onboard a new moderator in seconds — just paste their Steam or License identifier, toggle the permissions they need, and they instantly have dashboard access.

## Namespace Matching

Z-Core uses intelligent namespace resolution:

- **Downward:** Having `zcore.admin.*` automatically grants `zcore.admin.players`, `zcore.admin.bans`, etc.
- **Upward:** Having `zcore.admin.players` satisfies a check for `zcore.admin` (because you hold a sub-permission of that namespace)

This means backend endpoint guards work correctly regardless of whether permissions were assigned via ACE, Config, or the Database.

## Endpoint Guard Map

Every backend action is protected by a specific permission:

| Action | Required Permission |
| :--- | :--- |
| Open Panel (`/zpanel`, `/admin`) | Any permission (`isStaff`) |
| Kick, Ban, Heal, Teleport Players | `zcore.admin.players` |
| Search & Edit Offline Players | `zcore.admin.players` |
| View/Clear Inventory | `zcore.admin.players` |
| Manage Vehicles | `zcore.admin.players` |
| View Economy Data | `zcore.admin.economy` |
| Browse & Spawn Assets | `zcore.admin.assets` |
| View/Issue/Revoke Bans | `zcore.admin.bans` |
| Weather, Time, Restart | `zcore.admin.server` |
| Save Theme | `zcore.admin.server` |
| Manage Staff Members | `zcore.admin.settings` |
