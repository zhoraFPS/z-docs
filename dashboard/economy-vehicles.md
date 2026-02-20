# Economy & Vehicles

The Z-Dashboard centralizes all monetary and asset management into intuitive, searchable tables. It completely removes the need to log into PHPMyAdmin or HeidiSQL to manage player data.

## Offline Player Management
Unlike traditional admin menus that only work when a player is currently connected to the server, the Z-Dashboard bridges directly with your database. 

You can search for **any** character that has ever joined the server via the `Search Database` function in the Database tab.

1. **Search:** Enter a Citizen ID or Name.
2. **Edit:** Click on the result to open the offline `PlayerEditModal`.
3. **Save:** Update their Bank, Cash, or Job Grade. The changes are saved directly to MySQL and will apply the next time they log in.

## Live Economy Overview
The **Economy** tab provides a macro-view of your server's financial health.
- **Top Earners:** Instantly view the wealthiest players on the server, sorted by total net worth (Cash + Bank).
- **Red Flags:** Spot anomalies (e.g., a massive spike in cash) to investigate potential exploiters.

## Vehicle Management
From the **Vehicles** tab, you have full control over the server's asset database.
- View a master list of all owned vehicles, including their license plates, garage locations, and spawn states.
- **Transfer Ownership:** Instantly transfer a vehicle to a different Citizen ID.
- **Delete/Wipe:** Remove a corrupted or glitched vehicle from the database with a single click.
