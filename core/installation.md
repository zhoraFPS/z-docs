# Installing Z-Core

Z-Core is designed to be as "plug-and-play" as possible. Because the TypeScript source is pre-compiled into a highly optimized Javascript bundle before releasing, **you do not need Node.js or NPM installed on your server**.

## Prerequisites

1.  A standard FiveM Server (Windows or Linux).
2.  **oxmysql** (Required for database operations).

## Step-by-Step Installation

1.  **Download** the latest release of `z-core` from your Keymaster/Store.
2.  **Extract** the `[z-core]` folder into your server's `resources` directory.
3.  Ensure the folder name remains exactly `z-core`.
4.  Open your `server.cfg` and add the following line anywhere **after** your framework and database resources have started:

```cfg
ensure oxmysql
ensure qb-core # (oder es_extended)

# Start Z-Core
ensure z-core
```

## First Boot
When you start the server for the first time, Z-Core will automatically:
1. Detect your current framework (e.g., `Initialized QBCore Adapter`).
2. Generate necessary internal database tables (like `z_bans`, `z_tickets`) if they do not exist.
3. Start the internal Express.js web server used for bridging UI dashboards.

You should see something like this in your server console:
```text
[Z-Core] ServerManager Initialized
[Z-Core] Initialized QBCore Adapter
[Z-Core] Database Manager Initialized
[Z-Core] WebServer Listening on port 3000
```

If you see those messages, Z-Core is successfully installed and ready to be used by front-end modules like Z-Dashboard!
