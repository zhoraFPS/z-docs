# Installation

## Prerequisites

Before installing Z-Core, make sure the following are in place:

- A running FiveM server
- MariaDB or MySQL database
- [`oxmysql`](https://github.com/overextended/oxmysql) installed and started **before** Z-Core
- At least one of: ESX, QBCore, ox_core — or none (Standalone mode)

---

## Step 1 — Place the resource

Copy the `z-core` folder into your resources directory:

```
server/resources/[standalone]/z-core/
```

The folder name must be exactly `z-core`. Any rename will break exports from other scripts.

---

## Step 2 — Add to server.cfg

Open your `server.cfg` and add Z-Core **after** your framework and `oxmysql`, but **before** any script that depends on it:

```cfg
# Database
ensure oxmysql

# Framework (use whichever you run)
ensure es_extended
# ensure qb-core
# ensure ox_core

# Z-Core — must come after framework
ensure z-core
```

::: warning Start order matters
Z-Core reads your framework's global objects on startup. If your framework hasn't started yet, Z-Core will fall back to Standalone mode unexpectedly.
:::

---

## Step 3 — Import the SQL

Z-Core creates its own tables automatically on first start via `DatabaseManager`. You do **not** need to run a SQL file manually.

Tables created automatically:

| Table | Purpose |
|---|---|
| `z_users` | Player storage in Standalone mode |
| `z_bans` | Ban records (all frameworks) |
| `z_tickets` | Support tickets |
| `z_ticket_messages` | Ticket messages |
| `z_staff` | Staff members and their permissions |
| `zcore_warns` | Warn records |
| `z_logs` | Admin and system logs |

::: tip First boot
On first start you may see `[Z-Core] Creating table: z_bans` style messages in the console — this is normal.
:::

---

## Step 4 — Configure Z-Core

Open `config/config.ts` (or the compiled equivalent in your build) and set at minimum:

- Discord webhook URLs (optional but recommended)
- Warn auto-escalation thresholds
- Permission role mappings

See the [Configuration](/core/configuration) page for the complete reference.

---

## Step 5 — Assign yourself as admin

Z-Core uses the `z_staff` database table to grant admin panel access. You have two options:

### Option A — Via the `/zseed` console command

Start the server, then in the **server console** run:

```
zseed
```

This seeds the database with mock staff entries for testing. You can then edit the `z_staff` table directly to replace them with your real identifier.

### Option B — Direct database insert

Insert your player identifier into `z_staff`:

```sql
INSERT INTO z_staff (identifier, name, role, permissions)
VALUES ('steam:110000112345678', 'YourName', 'god', '["*"]');
```

Replace `steam:110000112345678` with your actual identifier (visible in F8 console as `license:` or `steam:`).

---

## Step 6 — Start the server and verify

Start your server and check the console for:

```
[Z-Core] Starting Z-Core Server...
[Z-Core] Framework detected: ESX    ← or QBCore / ox_core / Standalone
[Z-Core] Inventory detected: OxInventory
```

If you see `Standalone`, Z-Core didn't detect your framework — check start order in `server.cfg`.

---

## Opening the admin panel

Once you're in-game as a staff member, run:

```
/zpanel
```

or the alias:

```
/admin
```

Both commands check the `z_staff` table. If your identifier is listed, the panel opens.

---

## Inventory systems

Z-Core auto-detects the active inventory system in this priority order:

1. `ox_inventory`
2. `qs-inventory`
3. `codem-inventory`
4. `core_inventory`
5. `qb-inventory` / `lj-inventory`
6. ESX Legacy (es_extended fallback)

You do not need any extra config — just ensure the inventory resource before Z-Core in `server.cfg`.

```cfg
ensure ox_inventory   # ← before z-core
ensure z-core
```
