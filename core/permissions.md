# Permissions & Authentication

Z-Core employs a highly robust permissions system that tightly integrates with Discord OAuth2 for effortless staff management. It completely bypasses clunky in-game group assignments out of the box.

## How Authentication Works
1. Staff members navigate to your Z-Dashboard URL.
2. They click "Login with Discord".
3. Z-Core verifies their Discord account through the Discord API.
4. Z-Core reads all the Roles that the user has in your configured Discord Server (`guildId`).
5. Based on the Role IDs defined in your `config.json`, Z-Core grants the user a specific access level token.

## Access Levels
The `PermissionManager.ts` maps Discord roles to one of three hardcoded access tiers:

| Tier | Name | Capabilities |
| :--- | :--- | :--- |
| **0** | **Unauthorized** | Rejects login. User has no mapped roles online. |
| **1** | **Moderator** | Can manage tickets, view logs, kick/warn players. Restricted from extreme danger zones. |
| **2** | **Administrator** | Master access. Can Ban, Edit Economy, trigger Mass Actions, Wipe Inventories, and perform Troll Actions. |

## Setting up Discord OAuth2
To enable staff logins, you need to configure a Discord Developer Application.

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a "New Application" (e.g., Z-Dashboard Auth).
3. Under **OAuth2**, copy your `CLIENT ID` and `CLIENT SECRET`.
4. Add an **OAuth2 Redirect URI** matching your dashboard's IP and port (e.g., `http://your-server-ip:3000/api/auth/discord/callback`).
5. Paste these details into your Z-Core `config.json`.
6. Lastly, under the **Bot** tab, generate a Bot Token and paste it into the config along with your Server `guildId`.

> [!TIP]
> If your administrative staff changes frequently, you no longer need to edit database groups or server.cfg files. Simply assign them the configured Discord role, and they instantly gain dashboard access!
