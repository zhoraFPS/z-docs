# Permissions

Z-Core uses a Role-Based Access Control (RBAC) system that sits on top of your framework's native group system. You define roles once in config — Z-Core handles the resolution across frameworks automatically.

## How permission checks work

When Z-Core checks whether a player has a permission, it runs through five layers in order:

```
1. ACE direct bypass   — IsPlayerAceAllowed(source, 'god')
2. Config RBAC         — Does any of the player's groups match config.permissions?
3. z_staff table       — Is the player listed as staff with matching permissions?
4. Wildcard match      — Does '*' or 'zcore.admin.*' cover the requested permission?
5. Namespace prefix    — Does 'zcore.admin' cover 'zcore.admin.players'?
```

The first layer that returns `true` wins. If all layers return `false`, the player is denied.

---

## Built-in roles

Z-Core ships with these roles pre-configured:

| Role | Access |
|---|---|
| `zcore.god` | Everything (`*`) |
| `zcore.superadmin` | Everything (`*`) |
| `zcore.admin` | All panel features |
| `zcore.mod` | Dashboard, players, assets, support, bans |

These map directly to ESX groups, QBCore roles, or ACE identifiers depending on your framework.

---

## Framework group compatibility

Z-Core maps framework groups to permissions automatically:

### ESX groups → Z-Core permissions

| ESX group | Gets permissions of |
|---|---|
| `group.superadmin` | `zcore.god` |
| `group.admin` | `zcore.admin` |
| `group.mod` | `zcore.mod` |

### QBCore groups → Z-Core permissions

| QB group | Gets permissions of |
|---|---|
| `god` | `zcore.god` |
| `admin` | `zcore.admin` |
| `mod` | `zcore.mod` |

You can add or override any group in the `permissions` block of `config.ts`. The keys are the framework's native group names, the values are permission arrays.

---

## Permission keys

These are the permission strings used throughout Z-Core and the admin panel:

| Key | What it grants |
|---|---|
| `*` | All permissions |
| `dashboard` | Open the admin panel |
| `players` | View and manage online players |
| `assets` | Spawn vehicles and items |
| `support` | View and respond to tickets |
| `bans` | Issue and revoke bans |
| `warns` | Issue warns |
| `staff` | Manage staff members |
| `economy` | View economy dashboard |
| `server` | Server controls (weather, time, restarts) |
| `resources` | View and control server resources |
| `security` | Run the security scanner |

---

## Adding custom roles

To add your own role (e.g. a `senior_mod`), add it to `config.ts`:

```ts
permissions: {
    // ... existing roles ...

    'senior_mod': [
        'dashboard', 'players', 'assets',
        'support', 'bans', 'warns',
    ],
}
```

Then set a player's ESX group (or QB role) to `senior_mod`, and they'll receive exactly those permissions.

---

## The z_staff table

For players who need admin access **without** changing their framework group, use the `z_staff` table. This is the recommended approach for separating in-character jobs from out-of-character admin status.

### Structure

```sql
CREATE TABLE z_staff (
    identifier  VARCHAR(100) PRIMARY KEY,
    name        VARCHAR(50)  NOT NULL,
    role        VARCHAR(30)  DEFAULT 'mod',
    permissions TEXT         DEFAULT '[]',  -- JSON array of permission keys
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
)
```

### Adding staff manually

```sql
INSERT INTO z_staff (identifier, name, role, permissions)
VALUES ('steam:110000112345678', 'AdminName', 'admin', '["*"]');
```

### Role column

The `role` column is informational — it affects what the admin panel displays. Actual permissions come from the `permissions` JSON array.

| role value | Displayed as |
|---|---|
| `god` | God |
| `superadmin` | Super Admin |
| `admin` | Admin |
| `mod` | Moderator |

### Via admin panel

Staff members with the `staff` permission can add, edit, and remove other staff members from within the Z-Admin panel under the **Staff** tab. Changes take effect immediately.

---

## Wildcard permissions

Z-Core supports `*` as a wildcard in the permissions array:

```ts
// Grant everything
permissions: ['*']

// Grant all sub-permissions under a namespace
permissions: ['zcore.admin.*']
```

A wildcard check works as follows:

- `'*'` in the player's permissions → matches any requested permission
- `'zcore.admin.*'` → matches `zcore.admin.players`, `zcore.admin.bans`, etc.
- `'zcore.admin'` as a prefix → matches `zcore.admin.players` (namespace inheritance)

---

## Checking permissions from your script

Use the `HasPermission` export in any server-side script:

```ts
// Returns true/false
const allowed = exports['z-core'].HasPermission(source, 'bans')

if (!allowed) {
    // Deny the action
    return
}
```

Get a player's resolved role string:

```ts
// Returns: 'god' | 'superadmin' | 'admin' | 'mod' | 'none'
const role = exports['z-core'].GetRole(source)
```

---

## ACE bypass

Players with ACE permission `god` automatically pass all Z-Core permission checks, regardless of their database role or framework group. This is useful for server console or host-level players.

Set ACE permissions in `server.cfg`:

```cfg
add_ace identifier.steam:110000112345678 god allow
```
