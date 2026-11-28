# Usability Requirements

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

[Back to non-functional requirements index](../../non_functional_requirement.md)

| ID | Adapted requirement | Current code status |
| --- | --- | --- |
| NFR-USE-1 | The registration and OTP flow shall be completable within 5 minutes. | **Complete (user-tested).** The completion-time target is accepted based on user-performed testing; registration/OTP flows remain implemented. |
| NFR-USE-2 | Responsive support from 320 px to 1920 px should be validated with browser testing and additional breakpoints. | **Partial / Target (unverified).** A responsive viewport and some fluid widths exist, but only one media query is present and some pages have fixed minimum widths. |
| NFR-USE-3 | University, area, and subject browsing should preserve consistent navigation once all labeled navigation destinations are routed. | **Partial.** Browsing shares the forum shell and navigation, but several sidebar links point to unregistered routes or fallback views. |
| NFR-USE-4 | Primary actions should keep clear labels and shared controls, with accessibility testing for non-native controls. | **Partial.** Shared labeled buttons/inputs exist, but some controls are `div`-based and no usability/accessibility test evidence is present. |
| NFR-USE-5 | Usability at 320 px should be verified after fixed minimum-width layouts are addressed. | **Partial / Target (unverified).** A mobile viewport is declared, but some pages use 700 px/300 px minimum widths and no 320 px test exists. |
| NFR-USE-6 | Report and moderation actions should be reachable within 2 interactions when those actions are implemented. | **Planned (not implemented).** No report or moderation UI/routes exist. |
