# 🏛️ Protocol Archaeologist

> **Code doesn't lie. Documentation does.**

**Team Varishta** | Built for the IBM Bob 2.0 Hackathon

---

## 🚨 The Problem: "Bus Factor Zero"
Enterprise organizations run on legacy systems that nobody fully understands. When original developers leave, the documentation slowly drifts away from the actual codebase. Engineers become terrified to touch the system because **what the documentation says it does is no longer what the system actually does in production.** 

This fear costs enterprises millions in stalled modernization, hidden security vulnerabilities, and broken integrations.

## 💡 The Solution
**Protocol Archaeologist** is an autonomous DevSecOps intelligence platform. Instead of blindly trusting outdated API documentation, our system uses **IBM Bob 2.0** to interrogate the actual system artifacts. 

It autonomously cross-references source code, runtime logs, and Git history to prove exactly how the system behaves, highlighting critical discrepancies and generating a new, evidence-backed ground-truth specification.

---

## 🤖 IBM Bob 2.0 Integration (The Engine)
This project is not a simple LLM wrapper. It natively utilizes IBM Bob 2.0's most advanced enterprise agent capabilities:

* **Massive Repository Context:** Bob ingests the entire `/legacy-system` directory to understand complex architectural dependencies rather than just isolated code snippets.
* **Parallel Subagents:** Using the Model Context Protocol (MCP), Bob 2.0 acts as an orchestrator, spinning up specialized subagents to independently analyze `transaction.log`, `PaymentService.js`, and the Git commit history simultaneously.
* **Autonomous Remediation (Edit Permissions):** Bob doesn't just flag the errors. Using its `Edit` permissions, Bob autonomously writes regression tests (`payment-validation.test.js`) and rewrites the documentation to reflect reality.

---

## 🗺️ System Architecture

```mermaid
flowchart TD
    USER[User / UI] --> ORCHESTRATOR[Node.js Engine]
    ORCHESTRATOR --> BOB[IBM Bob 2.0 Agent]
    
    subgraph Evidence Layer
        CODE[Source Code]
        LOGS[Runtime Logs]
        GIT[Git History]
    end
    
    BOB -->|Reads Context| Evidence Layer
    BOB -->|Spawns Subagents| AGENTS[Parallel Investigation Subagents]
    
    AGENTS --> FINDINGS[Discrepancy Matrix]
    FINDINGS --> UI[Next.js Dashboard]
    
    FINDINGS -->|Edit Permission| REWRITE[Autonomously Refactored Docs & Tests]
