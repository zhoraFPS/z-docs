# Staff Management

The **Staff Management** panel allows server owners to add, edit, and remove dashboard staff members directly from the UI — no `server.cfg` or config file editing required.

## Accessing Staff Management

Navigate to **System Settings** in the sidebar. The Staff Management section is located between Appearance and Discord Integration.

> [!IMPORTANT]
> Only users with the `zcore.admin.settings` permission can access the Staff Management panel.

## Adding a Staff Member

1. Click the **"Add Staff"** button
2. Fill in the following fields:

| Field | Description | Example |
| :--- | :--- | :--- |
| **Identifier** | Any FiveM identifier | `license:abc123`, `steam:110000112345678`, `discord:123456789` |
| **Display Name** | A human-readable name | `ModeratorMax` |
| **Role** | Cosmetic label | `god`, `admin`, `mod`, `supporter` |

3. Toggle the permissions the staff member should have using the **checkbox grid**
4. Optionally enable **"Grant All (*)"** for full access
5. Click **"Add Staff"** to save

## Supported Identifiers

All standard FiveM identifier types are supported:

- `license:` — Rockstar License
- `steam:` — Steam Hex ID
- `discord:` — Discord User ID
- `fivem:` — FiveM Account ID
- `ip:` — IP Address

The system loops through **all** of a player's identifiers at runtime. If **any** identifier matches a `z_staff` entry, the associated permissions are granted.

## Managing Existing Staff

Each staff member row shows:
- **Avatar initials** — Auto-generated from their display name
- **Role badge** — Color-coded by role (gold for God, red for Admin, blue for Mod, green for Supporter)
- **Permission count** — Shows "All Perms" or the number of assigned permissions

### Actions
- **Expand (▼)** — Click to reveal all assigned permissions as badges
- **Edit (✏️)** — Opens the form pre-filled with the member's current data
- **Delete (🗑️)** — Removes the staff member from the database

## How Permissions Merge at Runtime

When a player opens the dashboard, Z-Core evaluates permissions from three sources:

```
1. ACE Principals (server.cfg)     → checked via IsPlayerAceAllowed()
2. Config Mappings (config.ts)     → checked via IsPlayerAceAllowed()
3. Staff Database (z_staff table)  → checked via getPlayerIdentifiers()
```

All three are **merged** into a single `permissions[]` array. This means:
- A player can have ACE permissions AND database permissions — they stack
- Removing a `z_staff` entry only removes database-granted permissions
- ACE/Config permissions remain unaffected

## Available Permissions

| Permission | Controls |
| :--- | :--- |
| `zcore.admin.dashboard` | Dashboard Overview tab |
| `zcore.admin.players` | Player management, kick, ban, heal, teleport, inventory, vehicles |
| `zcore.admin.assets` | Asset browser and item/vehicle spawning |
| `zcore.admin.support` | Support ticket system |
| `zcore.admin.economy` | Economy data viewing |
| `zcore.admin.jobs` | Job management |
| `zcore.admin.server` | Server actions (weather, time, restart, theme) |
| `zcore.admin.logs` | Live console log viewer |
| `zcore.admin.bans` | Ban list management (view, ban, unban) |
| `zcore.admin.resources` | Resource manager |
| `zcore.admin.security` | Security shield scanner |
| `zcore.admin.settings` | System settings and staff management |
