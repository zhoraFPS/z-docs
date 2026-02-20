# Dashboard Developer API

If you wish to create custom pages, widgets, or tools for the Z-Dashboard, you need to understand how the React frontend communicates with the FiveM server backend.

Z-Core uses a strict **NUI Callback** system for HTTP requests, and **WebSockets** for high-frequency real-time data streaming (like the Live Map).

## NUI Endpoints (HTTP)

The Z-Dashboard uses standard FiveM NUI callbacks. You can trigger these using the frontend `fetchNui` wrapper. All endpoints require the player triggering them to have proper Staff/Admin roles, which is strictly validated on the server-side.

### 👥 Player & State Management
- `z-core:nui:getZCoreState`: Returns the master state object containing server max players, online players, active resources, and the raw array of all connected `ZPlayer` objects.
- `z-core:nui:searchOfflinePlayers`: Searches the database for offline characters.
- `z-core:nui:saveOfflinePlayer`: Submits edited economy/job data directly to the SQL database.

### 🛡️ Moderation Actions
Trigger `z-core:adminAction` with the following payloads to execute instant moderation commands:
```typescript
fetchNui('z-core:adminAction', { type: 'kick', target: 12, reason: 'RDM' })
fetchNui('z-core:adminAction', { type: 'ban', target: 5 })
fetchNui('z-core:adminAction', { type: 'revive', target: 1 })
fetchNui('z-core:adminAction', { type: 'freeze', target: 3 })
fetchNui('z-core:adminAction', { type: 'spectate', target: 8 })
```

### 🚗 Vehicle & Asset Management
- `z-core:nui:getPlayerVehicles`: Returns all owned vehicles for a specific CitizenID.
- `z-core:nui:deleteVehicle`: Wipes a vehicle from the database by license plate.
- `z-core:nui:updateVehicle`: Transfers vehicle ownership or changes garage location.
- `z-core:nui:giftVehicle`: Spawns and registers a new vehicle to an online player.

### 🌐 Server Actions
Trigger `z-core:nui:serverAction` to execute global commands:
```typescript
fetchNui('z-core:nui:serverAction', { action: 'weather', value: 'CLEAR' })
fetchNui('z-core:nui:serverAction', { action: 'time', value: { hour: 12, minute: 0 } })
fetchNui('z-core:nui:serverAction', { action: 'announce', value: 'Server restart in 5 mins!' })
fetchNui('z-core:nui:serverAction', { action: 'revive_all' })
```

---

## 📡 Action Streaming (WebSockets)

Unlike traditional NUI where the client constantly polls the server for updates (which kills performance), Z-Core utilizes WebSockets. 

When you start the Dashboard in your browser, it connects to Z-Core's internal Express.js server on port 3000. 

### WebSocket Events Received
Your React components can listen to these WebSocket broadcasts seamlessly using the `useNuiEvent` hook (which bridges WS to NUI seamlessly in dev mode):

- `z-core:newLog`: Triggers whenever a script calls the `exports['z-core']:Log()` function.
- `z-core:securityStatus`: Streams realtime antivirus/exploit scan results.
- `z-core:mapUpdate`: Streams a 60Hz array of `{ source, coords, heading }` for the Live Map widget, bypassing the FiveM main thread entirely for zero lag.
