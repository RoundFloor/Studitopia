# 13/11, Sprint 3 - Meeting Report

## 1. Team members present

- Nguyen Thanh An
- Nguyen Chi Bao
- Tran Nguyen Khanh Binh
- Nguyen Le Quoc Huy
- Tran Canh Anh Tuan

No member is absent.

## 2. Status reports

| Member | Completed Tasks | Issues | To-do Tasks |
|:---|:---|:---|:---|
| **Nguyen Thanh An** | - Render the OTP Verification Page and Password Recovery UI.<br>- Integrate the Login and Register APIs into the Frontend. | - Need to restrict access to authenticated pages when users have not logged in or verified their email.<br>- Login and Register pages need to allow users to retry after API errors that are not caused by incorrect credentials. | - Fix Login and Register Page errors.<br>- Build redirect mechanisms when login, registration, or email verification succeeds.<br>- Create guards to protect authenticated pages from unauthorized access.<br>- Write weekly report.<br>- Write use case specifications for UC-01 Register Account and Verify University Email and UC-07 Join or Create a Study Room.<br>- Review UC-05 Comment and Answer. |
| **Nguyen Chi Bao** | N/A | - The recommendation AI model cannot handle multiple requests simultaneously and needs optimization. | - Revise Organizational Structure – Software Project Plan.<br>- Continue researching AI models for post recommendation.<br>- Write the use case specification for UC-03 Browse and Search the University Forum.<br>- Review UC-01 Register Account and Verify University Email and UC-06 Share Learning Resource. |
| **Tran Nguyen Khanh Binh** | - Design OTP Verification and Password Recovery Page UI.<br>- Design Loading Page. | N/A | - Design Home Page.<br>- Design Major Selection Page.<br>- Design Course Selection Page.<br>- Design Top Trending UI.<br>- Design Post and Comments UI.<br>- Design Post Search UI.<br>- Write use case specifications for UC-05 Comment and Answer and UC-06 Share Learning Resource.<br>- Review UC-04 Create Discussion Post.<br>- Add authentication-related NFRs and environmental constraints to the Vision Document. |
| **Nguyen Le Quoc Huy** | - Fix OTP verification API.<br>- Deploy the Backend to the server. | - Login API does not set cookies for the refresh token, preventing the application from properly handling refresh token revocation.<br>- Backend blocks requests from the Frontend when additional headers are included. | - Fix Login API errors.<br>- Allow the Frontend to send specified headers.<br>- Deploy the Frontend server.<br>- Render Forum Home Page UI.<br>- Update the PA3 Vision Document to reflect the forum-first direction and restore the middle-level meeting rooms.<br>- Write the use case specification for UC-02 Log In.<br>- Review UC-03 Browse and Search the University Forum.<br>- Compile and refine the use case specifications. |
| **Tran Canh Anh Tuan** | N/A | N/A | - Revise the EER model and relational schema for Sprint 3 features.<br>- Update the Software Development Plan for Sprint 3.<br>- Design schemas for forums, posts, comments, and courses. |

## 3. Summary of the meeting

### 3.1 Evaluate completed tasks

- Frontend:
    - Implemented shared design components but did not implement tests
    - Rendered Login and Register pages but did not integrate the corresponding API
- Database: Forum-related schema needs to be designed
- Backend: Fix errors for the Login API and additional headers

### 3.2 To-do task

- PA3:
    - Finalize and revise the Use Case Specification
    - Continue documenting PA3 changes in the Vision Document and Software Development Plan

- Project:
    - Fix Login and Register Page errors and add route guard
    - Optimize the AI recommendation model
    - Design forum-related schema
    - Design remaining forum and post UI pages

### 3.3 The tasks assigned after the meeting (screenshot)

![Jira task screenshot](./images/week2_jira_task.jpeg)
