## 🔒 Security Features

This repository adheres to the IBM Hackathon security guidelines:

*   `.gitignore` — Prevents committing credentials and live session files
*   `.bobignore` — Prevents AI assistants from reading and logging credentials
*   `.env.example` — Standardized template for environment variables

## 📋 Before Every Commit

Team checklist executed prior to merges:

- [x] Reviewed `git diff` for sensitive data
- [x] No hardcoded API keys or passwords
- [x] `.env` file is NOT in staged changes
- [x] No files with "credential" or "secret" in name
- [x] Used environment variables for all credentials
