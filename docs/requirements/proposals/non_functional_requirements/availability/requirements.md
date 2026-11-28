# Availability Requirements

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

[Back to non-functional requirements index](../../non_functional_requirement.md)

| ID | Adapted requirement | Current code status |
| --- | --- | --- |
| NFR-AVAIL-1 | The system shall provide at least 99.9% monthly availability, excluding planned maintenance. | **Complete (user-tested).** The monthly availability objective is accepted based on user-performed testing; built-in health checks and monitoring remain outside the current source. |
| NFR-AVAIL-2 | Read-only forum availability during non-critical maintenance should be added when a maintenance mode is implemented. | **Planned (not implemented).** The compiled frontend and API share the NestJS process, and no read-only maintenance mode exists. |
