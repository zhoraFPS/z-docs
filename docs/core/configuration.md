# Configuration

Z-Core is configured through `config/config.ts`. All options are typed — your editor will autocomplete and catch mistakes.

## Full config reference

```ts
export const Config = {

    // ─── Discord ───────────────────────────────────────────────────────────
    discord: {
        // Set to false to disable all Discord webhook notifications
        enabled: true,

        // Displayed in embed footers
        serverName: 'My RP Server',

        webhooks: {
            // Fired when a player is banned
            bans: 'https://discord.com/api/webhooks/...',

            // Fired when a player is warned
            warns: 'https://discord.com/api/webhooks/...',

            // Fired on any admin action (kick, heal, etc.)
            adminActions: 'https://discord.com/api/webhooks/...',

            // Fired on server events (restart scheduled, mass actions, etc.)
            serverEvents: 'https://discord.com/api/webhooks/...',
        },
    },

    // ─── Warn System ───────────────────────────────────────────────────────
    warns: {
        // Enable automatic escalation from warns to bans
        autoEscalationEnabled: true,

        thresholds: {
            // Number of warns before a 1-hour temp ban is applied
            ban1h: 3,

            // Number of warns before a 24-hour temp ban is applied
            ban24h: 5,

            // Number of warns before a permanent ban is applied
            permBan: 10,
        },
    },

    // ─── Restart Schedule ──────────────────────────────────────────────────
    restartSchedule: {
        // Set to true to enable automatic restarts at fixed times
        enabled: false,

        // Times in 24h "HH:MM" format (server time)
        times: ['06:00', '12:00', '18:00', '00:00'],
    },

    // ─── Storage ───────────────────────────────────────────────────────────
    storage: {
        // 'oxmysql' for database storage (recommended)
        // 'json'    for file-based storage (development only)
        mode: 'oxmysql' as 'oxmysql' | 'json',

        // Only used when mode is 'json'
        jsonPath: './data',
    },

    // ─── Permissions ───────────────────────────────────────────────────────
    // Maps role names to arrays of permissions.
    // Use '*' to grant all permissions to a role.
    // See the Permissions page for the full permission key list.
    permissions: {
        // Z-Core native roles
        'zcore.god':        ['*'],
        'zcore.superadmin': ['*'],
        'zcore.admin': [
            'dashboard', 'players', 'assets', 'support',
            'bans', 'warns', 'staff', 'economy', 'server',
        ],
        'zcore.mod': [
            'dashboard', 'players', 'assets', 'support', 'bans',
        ],

        // ESX group compatibility
        'group.superadmin': ['*'],
        'group.admin': [
            'dashboard', 'players', 'assets', 'support',
            'bans', 'warns',
        ],
        'group.mod': [
            'dashboard', 'players', 'support',
        ],

        // QBCore group compatibility
        'god':   ['*'],
        'admin': [
            'dashboard', 'players', 'assets', 'support',
            'bans', 'warns',
        ],
        'mod': [
            'dashboard', 'players', 'support',
        ],
    },
}
```

---

## Discord

### Setting up webhooks

1. Open a Discord channel → **Edit Channel** → **Integrations** → **Webhooks** → **New Webhook**
2. Copy the URL and paste it into the relevant key in `config.ts`
3. Set `discord.enabled` to `true`

Each webhook type sends different embed colors:

| Type | Color | Trigger |
|---|---|---|
| `bans` | Red | `BanPlayer()` export called |
| `warns` | Yellow | `WarnPlayer()` export called |
| `adminActions` | Blue | Any admin panel action |
| `serverEvents` | Cyan | Restart schedule, mass actions |
| Unban | Green | `UnbanPlayer()` export called |

You can use the **same webhook URL** for all types if you want everything in one channel.

---

## Warn thresholds

When `autoEscalationEnabled` is `true`, Z-Core automatically issues a ban when a player reaches the configured warn count:

```
3 warns  → 1-hour temporary ban
5 warns  → 24-hour temporary ban
10 warns → Permanent ban
```

Each escalation fires a Discord webhook to `warns`. The ban is created in `z_bans` with the reason `"Auto-ban: X warnings reached"`.

To disable auto-escalation entirely, set:

```ts
warns: {
    autoEscalationEnabled: false,
    // thresholds are ignored when disabled
}
```

---

## Restart schedule

When enabled, Z-Core broadcasts a countdown warning to all players 5 minutes before each scheduled restart:

```ts
restartSchedule: {
    enabled: true,
    times: ['06:00', '18:00'],
}
```

Times are in **server local time** in 24h format. A Discord notification fires to `serverEvents` at restart time.

You can also trigger a manual restart countdown from the admin panel or with the `Log` export:

```ts
// Schedule a restart in 10 minutes (from another resource)
// (requires admin panel or server console)
```

---

## Storage mode

| Mode | Use case |
|---|---|
| `oxmysql` | Production — all data in MySQL |
| `json` | Local dev without a database |

::: warning
`json` mode writes to disk and loses data on resource restart. Never use it in production.
:::

---

## Permissions

The `permissions` block is the heart of Z-Core's RBAC system. See the full [Permissions](/core/permissions) page for how roles are resolved, wildcard matching, and how to add custom roles.
