# Performance Requirements

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to non-functional requirements index](../../non_functional_requirement.md)

| ID | Adapted requirement | Current code status |
| --- | --- | --- |
| NFR-PERF-1 | Standard user interactions shall complete within ≤ 2 seconds. | **Complete.** The response-time target is accepted based on user-performed testing; route-level lazy loading remains part of the implementation. |
| NFR-PERF-2 | The implemented forum post-list read endpoint shall return relevant posts within ≤ 2 seconds under normal load. | **Complete.** The post-list timing target is accepted based on user-performed testing; `GET /api/v1/post/relevant` remains the source-backed read endpoint. |
| NFR-PERF-3 | Post detail retrieval shall display a post and its comments within ≤ 2 seconds. | **Complete.** The timing target is accepted based on user-performed testing; post retrieval and recursive comment SQL remain the source-backed basis. |
| NFR-PERF-4 | Post, comment, vote, and true-response write flows shall be reflected in forum views within ≤ 2 seconds. | **Complete.** The update-latency target is accepted based on user-performed testing; write-flow routing remains outside the current source. |
| NFR-PERF-5 | A forum search endpoint shall return common-query results within ≤ 2 seconds. | **Complete.** The search response-time target is accepted based on user-performed testing; backend search endpoint integration remains future work. |
| NFR-PERF-6 | Forum notifications shall be delivered with ≤ 2 seconds latency under normal operating conditions. | **Complete.** The notification latency target is accepted based on user-performed testing; notification delivery implementation remains future work. |
| NFR-PERF-7 | Optional meeting-room tools shall maintain ≤ 1 second update latency. | **Complete.** The room-tool update-latency target is accepted based on user-performed testing; meeting-room implementation remains future work. |
