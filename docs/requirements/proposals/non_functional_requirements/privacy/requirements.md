# Privacy Requirements

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

[Back to non-functional requirements index](../../non_functional_requirement.md)

| ID | Adapted requirement | Current code status |
| --- | --- | --- |
| NFR-PRIV-1 | Public/private profile visibility settings shall be added with account profile management. | **Planned (not implemented).** No visibility columns or settings UI exist; `PATCH /api/v1/account/me` returns `NOT_IMPLEMENTED`. |
| NFR-PRIV-2 | Friend-request permission controls shall be added with the friend feature. | **Planned (not implemented).** No friend module or routed friend settings exist. |
| NFR-PRIV-3 | University, faculty, and major fields are exposed by account read; per-field visibility and academic-year controls remain future work. | **Partial.** `GET /account/me` returns academic context derived from tags, but no visibility controls or academic-year field are implemented. |
| NFR-PRIV-4 | Online-status visibility controls shall be added when presence tracking exists. | **Planned (not implemented).** No online-status or last-active state is tracked. |
| NFR-PRIV-5 | Stored files are owner-bound; user-configurable document/resource sharing shall be added with the library feature. | **Complete.** |
| NFR-PRIV-6 | Message and room-invitation restrictions shall be added with messaging/room features. | **Planned (not implemented).** No messaging, meeting-room, or communication-settings modules exist. |
| NFR-PRIV-7 | Privacy settings shall be applied consistently across posts, comments, member lists, and search results once settings are implemented. | **Planned (not implemented).** No settings route exists; the Settings link falls back to the forum trending view, and profile update is unimplemented. |
