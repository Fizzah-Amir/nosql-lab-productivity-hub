# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** — Stores registered user accounts with hashed credentials. Every other collection references users by `userId`.
- **projects** — Represents a user's projects; each project belongs to one user via a `userId` reference. Projects can be archived but are never deleted, preserving task history.
- **tasks** — Stores individual tasks belonging to a project, with subtasks and tags embedded directly inside. Tasks are queried independently by project, status, and priority.
- **notes** — Standalone text notes owned by a user, optionally linked to a project via a nullable `projectId`. Tags are embedded as an array and searched with `$in`.

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
{
_id: ObjectId,
email: string (required, unique),
passwordHash: string (required),
name: string (required),
createdAt: Date (required)
}
### projects
{
_id: ObjectId,
userId: ObjectId (required, ref: users),
name: string (required),
description: string (optional),
archived: boolean (required, default: false),
color: string (optional),
createdAt: Date (required)
}
### tasks
{
_id: ObjectId,
projectId: ObjectId (required, ref: projects),
userId: ObjectId (required, ref: users),
title: string (required),
status: string (required, enum: "todo" | "in-progress" | "done"),
priority: number (required, 1 = highest),
tags: [string] (required, default: []),
subtasks: [{ title: string (required), done: boolean (required, default: false) }] (required, default: []),
createdAt: Date (required),
dueDate: Date (optional)
}
### notes
{
_id: ObjectId,
userId: ObjectId (required, ref: users),
projectId: ObjectId|null (optional, ref: projects),
title: string (required),
content: string (required),
tags: [string] (required, default: []),
createdAt: Date (required)
}
---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                  | Embed or Reference? | Why? |
|-------------------------------|---------------------|------|
| Subtasks inside a task        | Embed               | Subtasks are exclusively owned by their parent task, always fetched with it, and never queried independently. |
| Tags on a task                | Embed               | Tags are a simple string array tightly coupled to the task and filtered using `$in` directly on the document. |
| Project → Task ownership      | Reference           | Tasks are queried independently (filtered by status, sorted by priority), so a `projectId` reference is appropriate. |
| Note → optional Project link  | Reference           | The project link is optional (null for standalone notes) and projects are large, independently-managed documents. |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> The `color` field on the `projects` collection  exists only on projects where the user has chosen a display color. MongoDB enforces no schema constraint, so documents without it simply omit the field. This is acceptable because the application reads it with a fallback default, avoiding unnecessary null values on documents that have no use for the field.

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> The `color` field on the `projects` collection  exists only on projects where the user has chosen a display color. MongoDB enforces no schema constraint, so documents without it simply omit the field. This is acceptable because the application reads it with a fallback default, avoiding unnecessary null values on documents that have no use for the field.