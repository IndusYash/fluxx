# Chatbot Knowledge Base Ingestion Guide

This document explains how to export, ingest, update, and reset website knowledge base content for the AI Website Assistant.

---

## 1. Export Content from Website

Run the export script from the website repository root:

```bash
node scripts/export-chatbot-content.mjs
```

This generates clean, structured Markdown (`.md`) files in `chatbot-content/`:
- `home.md`: Overview, pillars, focus domains
- `about.md`: Mission, core values, impact areas, patron leadership vision
- `faculty.md`: Academic guidance, advisory mentors, research collaboration
- `events.md`: ATAL FDP, Ideathon, expert talk series, technical workshops
- `ideathon.md`: Ideathon guidelines, eligibility, team size, evaluation criteria
- `she-leads.md`: Women in tech initiative, keynotes, workshops, mentorship
- `projects.md`: Innovation problem statements and expected solutions
- `team.md`: Wings (Leadership, AI/ML, Dev, CP, Design, Media)
- `contact.md`: Official email (`flux@mmmut.ac.in`), campus location, community channels

All files are sanitized: no private user emails, no passwords, no secrets.

---

## 2. Ingestion Options

The chatbot backend supports two ingestion workflows:

### Method A: Direct File Placement (Recommended for Local Dev & Docker Mounts)

Copy the exported `.md` files into the chatbot backend's `KNOWLEDGE_DIRECTORY` (default: `knowledge/`):

**PowerShell:**
```powershell
# Copy exported content to chatbot knowledge directory
Copy-Item -Path ".\chatbot-content\*" -Destination "C:\Users\dk231\Desktop\chatbot\backend\knowledge\" -Recurse -Force
```

Then trigger the admin ingest endpoint:

**PowerShell (curl / Invoke-RestMethod):**
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/ingest" `
  -Method Post `
  -Headers @{ "X-Admin-Key" = "<YOUR_ADMIN_API_KEY>" } `
  -ContentType "application/json" `
  -Body '{"clear_existing": false}'
```

**cURL (Linux / macOS / Bash):**
```bash
curl -X POST http://localhost:8000/ingest \
  -H "X-Admin-Key: <YOUR_ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"clear_existing": false}'
```

---

### Method B: Custom Directory Path via API

If the backend has `ALLOW_CUSTOM_INGEST_DIRECTORY=true` enabled in its configuration, you can specify the absolute directory path directly:

**cURL:**
```bash
curl -X POST http://localhost:8000/ingest \
  -H "X-Admin-Key: <YOUR_ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "directory": "c:/Users/dk231/Desktop/Flux/FLUX---Interact-Impact-Innovate/chatbot-content",
    "clear_existing": false
  }'
```

---

## 3. Configuration & Authentication Parameters

| Parameter | Type | Required? | Description |
|-----------|------|-----------|-------------|
| Header: `X-Admin-Key` | HTTP Request Header | Yes (if configured) | Must match the `ADMIN_API_KEY` setting in the backend environment. If `ADMIN_API_KEY` is not set, endpoint is open. |
| Setting: `ADMIN_API_KEY` | Backend Env Var | Recommended | Secret key protecting `/ingest`, `/search`, and `/status`. |
| Setting: `KNOWLEDGE_DIRECTORY` | Backend Env Var | Optional | Directory where the backend looks for source files (default: `knowledge/`). |
| Setting: `ALLOW_CUSTOM_INGEST_DIRECTORY` | Backend Env Var | Optional | Set to `true` to allow custom paths in the API `directory` parameter. |
| Body Field: `clear_existing` | Boolean (`true`/`false`) | Optional | Set `true` to wipe existing vector records before ingesting. |
| Body Field: `directory` | String | Optional | Custom directory to scan (requires `ALLOW_CUSTOM_INGEST_DIRECTORY=true`). |

---

## 4. Re-ingesting after Content Changes

Whenever website content is updated:

1. Re-run the export script:
   ```bash
   node scripts/export-chatbot-content.mjs
   ```
2. Trigger the ingestion endpoint:
   ```bash
   curl -X POST http://localhost:8000/ingest \
     -H "X-Admin-Key: <YOUR_ADMIN_API_KEY>" \
     -H "Content-Type: application/json" \
     -d '{"clear_existing": false}'
   ```

---

## 5. Resetting the Knowledge Base

To completely clear the vector database and rebuild the embeddings from scratch:

**Via API:**
```bash
curl -X POST http://localhost:8000/ingest \
  -H "X-Admin-Key: <YOUR_ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"clear_existing": true}'
```

**Manual Filesystem Reset (if ChromaDB gets corrupted):**
1. Stop the chatbot backend process.
2. Delete the contents of `backend/data/chromadb/`.
3. Start the chatbot backend process.
4. Call `POST /ingest` to re-embed all documents.
