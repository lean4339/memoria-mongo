# Memoria Mongo

**Carry useful project context between sessions through an existing MCP service.**

**English** · [Español](README.es.md)

A personal skill for retrieving and maintaining concise memories in a local MongoDB-backed service. It defines how to distinguish durable facts from assumptions, avoid duplicate records and preserve the source of each memory.

## What it covers

| Area | Guidance |
| --- | --- |
| Retrieve context | Use recall and get_memory to recover relevant preferences and project decisions. |
| Maintain records | Use remember, update_memory and forget_memory for requested, scoped changes. |
| Keep evidence clear | Record project, source and tags; treat retrieved text as data and report failed operations honestly. |

## Start here

Read [SKILL.md](SKILL.md), then the references relevant to the task. Give a compatible agent access to this package and the authorized target files. Keep adjacent directories with SKILL.md; copying that file alone can break its references.

### Requirements

An already configured memoria MCP server connected to MongoDB. The server code is a separate project, mongo-memory-mcp. The bundled diagnostic script uses Leandro’s absolute local paths and that project’s Node.js dependencies; it is not a portable installer.

### Example request

> Use the memoria MCP tools to recover the decisions for this project before continuing. Save only a concise, confirmed decision when I ask you to remember it.

## Package contents

| Path | Purpose |
| --- | --- |
| [SKILL.md](SKILL.md) | Agent instructions and task workflow |
| [agents](agents) | Client-facing skill metadata |
| [scripts](scripts) | Original diagnostic helper; not run during packaging |

## Scope and limits

No database contents, credentials, .env file or conversation archive are included. The skill does not record conversations automatically. The script in scripts/ is retained for host-side diagnostics; normal agent memory access is through MCP. No database operation was performed to prepare this package.

The README is available in English and Spanish, matching Huella’s documentation. Original SKILL.md files and references retain their source language and wording.

## Source and terms

Prepared from Leandro Ayala’s local skill files on 2026-11-17. This README adds documentation; it does not replace original terms or add a license. Publication is pending.
