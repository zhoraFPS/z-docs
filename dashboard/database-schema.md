# Database Schema

Z-Core generates its own high-performance SQL schemas the first time it connects to your database via `oxmysql`.

If you are developing external tools (e.g. a Discord Bot, a PHP Website, or raw SQL queries), you can hook directly into these tables.

## `z_users`
Used primarily when Z-Core runs in Standalone mode (or as a fallback). It tracks core user data.

| Column | Type | Details |
| :--- | :--- | :--- |
| `identifier` | `VARCHAR(50)` | Primary Key. The user's License/Steam identifier. |
| `name` | `VARCHAR(50)` | RP Name or fallback display name. |
| `money` | `INT` | Default 0. Used for Cash. |
| `bank` | `INT` | Default 0. Used for Bank balance. |
| `job` | `VARCHAR(50)` | Default 'unemployed'. |
| `job_grade` | `INT` | Default 0. |

## `z_bans`
Z-Core's centralized ban management table. It uses an internal auto-increment ID to prevent identifier collision and allows for expiring bans.

| Column | Type | Details |
| :--- | :--- | :--- |
| `id` | `INT` | Primary Key, Auto Increment. |
| `identifier` | `VARCHAR(50)` | Target's primary identifier. |
| `name` | `VARCHAR(50)` | Target's last known name. |
| `reason` | `TEXT` | Ban Reason. |
| `admin` | `VARCHAR(50)` | Name of the staff who issued the ban. |
| `ban_date` | `TIMESTAMP` | When the ban occurred. |
| `expire_date` | `TIMESTAMP` | When the ban lifts (NULL = Permanent). |
| `active` | `BOOLEAN` | `TRUE` if the ban is enforced, `FALSE` if pardoned. |

## `z_tickets`
Used by the Dashboard for the Helpdesk/Support system.

| Column | Type | Details |
| :--- | :--- | :--- |
| `id` | `INT` | Primary Key, Auto Increment. |
| `identifier` | `VARCHAR(50)` | The creator's identifier. |
| `title` | `VARCHAR(100)` | The subject of the ticket. |
| `status` | `VARCHAR(20)` | `open`, `claimed`, or `closed`. |
| `claimed_by` | `VARCHAR(50)` | Name of the admin handling it. |

*Note: The actual chat messages within a ticket are linked via `ticket_id` in the secondary `z_ticket_messages` table.*
