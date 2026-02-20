# Configuration

The core settings for the bridge and the backend web-server are defined in the `config.json` file inside the root directory of the `z-core` resource.

## Example `config.json`
By default, your configuration file looks like this:

```json
{
  "server": {
    "port": 3000,
    "host": "0.0.0.0"
  },
  "database": {
    "uri": "mysql://root:@localhost/qx?charset=utf8mb4"
  },
  "discord": {
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "callbackUrl": "http://localhost:3000/api/auth/discord/callback",
    "botToken": "YOUR_BOT_TOKEN",
    "guildId": "YOUR_GUILD_ID",
    "adminRoles": ["YOUR_ADMIN_ROLE_ID"],
    "modRoles": ["YOUR_MOD_ROLE_ID"]
  },
  "masterPassword": "super_secret_fallback_password"
}
```

## Settings Explained

### Web Server (`server.port`)
Z-Core includes an internal Express backend that interfaces directly with FiveM Native events. This requires a unique port to run on your host machine.
- **Port 3000:** The default port. If you run multiple web servers or another dashboard, you may need to change this.
- **Host 0.0.0.0:** Allows external connections (which is required if you access the dashboard from outside your root server machine).

> [!WARNING]
> Please ensure that the port you define here is open/forwarded in your server's Firewall, otherwise the Z-Dashboard will not load remotely!

### Master Password
The `masterPassword` acts as a fail-safe login method for the dashboard. If Discord OAuth is down, or you are testing locally, you can log in to the UI using this password. It guarantees full administrative access to all systems.
