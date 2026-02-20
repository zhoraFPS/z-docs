# Getting Started with Z-Dashboard

Welcome to the official documentation for the **Z-Dashboard**.

This dashboard is a high-performance, modern React-based web interface designed to give server administrators full control over their FiveM servers. It features real-time live maps, player management, rich moderation tools, and analytics.

## Prerequisites

Before installing the dashboard, ensure you have the following requirements met:

- A running FiveM Server (Windows or Linux)
- Node.js v18+ installed on the host machine
- The `z-core` resource installed and running on your server

## Installation Steps

1. Download the latest release from the official repository or Keymaster.
2. Extract the `[z-dash]` folder into your FiveM `resources` directory.
3. Open your `server.cfg` and add:
```cfg
ensure z-core
ensure z-dash
```
4. Start your server. The dashboard UI will automatically build and become accessible via the designated port in your config.

## Accessing the Dashboard

By default, the dashboard runs on port `3000` (or whatever is defined in your `z-core` configuration). You can access it by opening a browser and navigating to:

`http://your-server-ip:3000`

Login using your Discord or Steam credentials (if OAuth is configured), or via the master admin password set in the config.
