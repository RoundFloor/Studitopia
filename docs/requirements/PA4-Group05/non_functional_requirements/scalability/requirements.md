# Scalability Requirements

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

[Back to non-functional requirements index](../../non_functional_requirement.md)

| ID | Adapted requirement | Current code status |
| --- | --- | --- |
| NFR-SCAL-1 | The account schema should be capacity-tested against a 10,000-user target. | **Target (unverified).** Accounts use integer IDs and unique email/username indexes, but no capacity test proves the target. |
| NFR-SCAL-2 | The post schema should be capacity-tested against a 100,000-post target. | **Target (unverified).** Post/tag tables and indexes exist, but there is no volume test or partitioning evidence. |
| NFR-SCAL-3 | The comment/vote schema should be capacity-tested against a 1,000,000-record target. | **Target (unverified).** Comment/vote tables and denormalized counter triggers exist, but no scale test is present. |
| NFR-SCAL-4 | Uploaded-file capacity should be validated when document/resource upload exists. | **Target (unverified).** The file table and 5 MiB storage limit exist, but current upload behavior is avatar-oriented and there is no document/library upload API. |
| NFR-SCAL-5 | A 500-concurrent-forum-user target requires load testing against the current backend and bounded database pool. | **Target (unverified).** The backend uses a 20-connection PostgreSQL pool with timeouts; no concurrency results are available. |
| NFR-SCAL-6 | A 100-concurrent-meeting-room target should apply only when meeting rooms are implemented. | **Planned (not implemented).** No meeting-room capability exists in the current source. |
