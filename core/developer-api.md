# Developer API

Z-Core is designed to be the ultimate foundation for all scripts in your server infrastructure. If you are developing a custom script (e.g. a robbery script, a job system), you can integrate it directly with Z-Core.

By using Z-Core's exports instead of QBCore/ESX exports, your script becomes **100% framework agnostic**. It will work on any server running Z-Core, regardless of their underlying framework!

## Global Exports

You can access Z-Core's powerful manager systems from any other server resource using standard FiveM exports.

### 🧑‍💻 Player & Framework
```lua
-- Fetch the universal ZPlayer object
local player = exports['z-core']:GetPlayer(source)

-- Get the raw adapter (if you need to run framework-specific raw code)
local framework = exports['z-core']:GetFramework()

-- Get the entire Core object (contains Bridge and Inventory)
local core = exports['z-core']:GetCoreObject()
```

### 🎒 Inventory Wrapper
Use these exports to manage items. Z-Core automatically translates these into `ox_inventory`, `qb-inventory`, or whichever inventory adapter is active.

```lua
-- Add an item (returns boolean)
local success = exports['z-core']:AddItem(source, "water", 1, {customMetadata = true})

-- Remove an item (returns boolean)
local success = exports['z-core']:RemoveItem(source, "water", 1)

-- Check item count (returns number)
local amount = exports['z-core']:GetItemCount(source, "water")

-- Check if player has space (returns boolean)
local canCarry = exports['z-core']:CanCarryItem(source, "water", 1)
```

### 👮 Moderation & Security
```lua
-- Warn a player
exports['z-core']:WarnPlayer("AdminName", targetSource, "RDM in safezone")
local warnCount = exports['z-core']:GetWarnCount(citizenId)

-- Ban a player (duration in hours, 0 = permanent)
exports['z-core']:BanPlayer("System", targetSource, "Exploiting", 0)

-- Check Z-Dashboard Discord Role level
local roleTier = exports['z-core']:GetRole(source) -- returns 0, 1, or 2
```

### 📝 Logging & Webhooks
Route all your script logs through Z-Core to have them appear live on the Z-Dashboard!

```lua
-- Log to Dashboard Security Feed (types: 'admin', 'security', 'error', 'info')
exports['z-core']:Log("info", "Robbery started at Pacific Standard")

-- Send a Discord Webhook (configured via z-core config.json)
-- webhookType: 'admin', 'action', or 'security'
exports['z-core']:SendDiscord("action", "Robbery", "orange", {
    { name = "Player", value = "ID: " .. source },
    { name = "Location", value = "Bank" }
})
```

---

## The `ZPlayer` Class

When you call `GetPlayer(source)`, Z-Core returns a standardized `ZPlayer` object. This object behaves exactly the same whether the server runs QBCore, ESX, or Standalone.

### ZPlayer Properties
```typescript
{
    source: number;          // The player's server ID
    identifier: string;      // CitizenID (QB) or Steam/License (ESX/Standalone)
    name: string;            // Full RP Name
    job: {
        name: string;
        grade: number;
        label: string;
    };
    money: {
        cash: number;
        bank: number;
    }
}
```

### ZPlayer Methods
You can call these methods directly on the returned player object:

```lua
local player = exports['z-core']:GetPlayer(source)

if player then
    -- Check balances
    local cash = player.getMoney('cash')
    
    -- Add / Remove money
    player.addMoney('bank', 5000)
    local paid = player.removeMoney('cash', 100) -- returns false if they can't afford it
    
    -- Send a notification (routes to the framework's native notify)
    player.notify("You successfully robbed the bank!", "success")
end
```

## Creating a Plug-and-Play Script
By relying **only** on Z-Core exports, you never need to write `if QBCore then ... elseif ESX then ...` spaghetti code again. 

Just assume `z-core` is running, and your script is instantly compatible with every major FiveM framework!
