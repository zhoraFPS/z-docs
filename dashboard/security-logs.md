# Security logs & Exploits

Security is paramount. The Z-Dashboard features an integrated, real-time Security Audit flow.

## The Security Page
Access the **Security** tab from the main sidebar to view the `Security Shield`.

### Exploit Scanner
If you suspect you have downloaded a malicious script containing a backdoor, you can click "Start Full Scan".

Z-Core will aggressively scan the `resources/` directory for known malicious patterns:
- **Hex Obfuscation (Backdoors)**
- **Suspicious IP Requests** (e.g., sending webhook data to unauthorized IPs)
- **Dynamic Code Execution** (`load()`, `RunString`)
- **AC Killers** (Scripts attempting to stop the anticheat resource)

### Audit Feed
On the main Dashboard landing page, you have a continuous **Security Log Feed**.
This feed streams real-time events directly from the server:
- `ADMIN`: When an admin kicks, bans, or gives money.
- `SECURITY`: Failed logins, unexpected resource stops, or exploit attempts.
- `ERROR`: Script panics or severe database connection issues.

Instead of parsing through giant `.txt` log files, you see critical events visually categorized the moment they happen.
