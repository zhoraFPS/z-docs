# Live Map Widget

The Z-Dashboard comes with a high-performance, real-time interactive Live Map. It allows administrators to visualize the entire server population on a highly detailed Los Santos map.

## Overview

Access the Live Map directly on the Dashboard landing page.
- **Blip Clustering:** When players are close together, they collapse into performance-friendly clusters showing the number of condensed players.
- **Color Coding:** Player blips are dynamically color-coded based on their current active job (e.g., Police = Blue, EMS = Red).
- **Interactive Details:** Clicking on any player blip (or cluster) immediately opens a quick-action drawer revealing their name, job, and ping.

## Map Features

### 1. Follow / Focus Mode
Clicking on a player on the map centers the camera on them and "locks" the view. As the player drives or flies across Los Santos, the Z-Dashboard map will seamlessly pan to follow their exact location in real-time.

### 2. Player Search
Use the integrated search bar to instantly find any player by Name or ID. Selecting a result will immediately fly the map camera to their location.

### 3. Quick Actions
From the map popup, you can instantly:
- **Bring:** Teleport the player to your in-game location.
- **Go To:** Teleport yourself to the player.
- **Spectate:** Enter invisible spectate mode to watch them.

## Technical Details
The map relies on a direct WebSocket connection via the Z-Core backend (port 3000), meaning entity coordinates are streamed at 60Hz without placing any load on the main FiveM thread or causing hitching in the client!
