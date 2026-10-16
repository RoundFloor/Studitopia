# CS300 PA1 — Existing App Survey

## Group information

- Group number: 5

- Team member:
    - Nguyễn Thanh An - 24125024
    - Nguyễn Chi Bao - 24125025
    - Trần Nguyễn Khánh Bình - 24135026
    - Trần Cảnh Anh Tuấn - 24125048
    - Nguyễn Lê Quốc Huy - 24125100

## Project description

- Name: Studitopia

- Purpose: Collaborative and study platform where users can learn with other people in meeting, share material, chat and ask question about learning.

- Feature:  
    - Learn with strange people
    - Find friends who will study together with us
    - Share documents, material with community
    - Ask and answer question for studying problems
    - Create group to learn with users' friends

To understand more about the project we want to build, we investigated two following similar applications below:

## Focusmate
    
**Performed by:** [Bao] | **Reviewed by:** [An] | **Edited by:** [An]

- Focusmate is a virtual coworking platform that allows users to work alongside another person in real time, helping you stay focused, motivated, and accountable while improving your productivity.

- Link web: https://www.focusmate.com/

- Focusmate is organized around sessions with the following features:
    - **24/7 availability:** Sessions are available around the clock, with new sessions starting every 15 minutes
    - **Flexible durations:** Each session can last 25, 50, or 75 minutes
    - **Video calls and quiet mode:** Each session takes place over a video call, with the option to communicate via text and enable quiet mode
    - **Advance booking:** Users can schedule sessions in advance by specifying the time, duration, task, and quiet mode preference
    - **Calendar-based scheduling:** Users can select their preferred date and time directly from a calendar
    - **Favorite users:** Users can mark other participants as favorites and prioritize matching with them when booking future sessions

### Booking session

![Session booking panel](./image/Focusmate/book_session.png)

- To book a session, users follow these steps:
    1. Choose the session duration
    2. Specify the task they intend to work on
    3. Choose whether to enable quiet mode
    4. Choose whether to prioritize matching with favorite users
    5. Select a session date using the date bar or calendar
    6. Confirm the booking

- Users can also select a specific date and time directly from the calendar.
    - **Note:** When booking through the calendar, all other session settings remain consistent with the selections made in the session booking panel.

![Calendar](./image/Focusmate/calendar.png)

### Joining session:

- Once a session is ready, users can join it:

![Session joining](./image/Focusmate/join_session.png)

- Before joining the video call, users can configure their camera, microphone, speakers, and background effects.
    - They can also turn off their camera or mute their microphone as needed.

![Pre-session setup](./image/Focusmate/pre_session_setup.png)

- After setup, users can join the video call:

![Session](./image/Focusmate/session.png)

## Lifeat

**Performed by:** [An] | **Reviewed by:** [Bao] | **Edited by:** [An]

- Lifeat is a platform that focuses on self-studying that allows user to customize their learning space, create, manage and schedule tasks as well as take notes. Besides, it also support learning with friends and study in large meeting with strangers

- Link web: https://lifeat.io/

- Lifeat has three modes:
    - Focus mode
    - Explore mode
    - Plan mode

### Focus mode

![Focus mode screen](./image/Lifeat/focus_mode_screen.png)

In this mode, each user enters their own virtual space (as the picture above). In this space, the platform provides following features:


- Customize the background:

    ![Space button](./image/Lifeat/space_button.png)

    - First, click on the spaces icon in the left bar in the focus screen

    ![Space Window](./image/Lifeat/space_window.png)

    - There are two kinds of background: Videos background include ambient musics while images do not 

    ![Search spaces](./image/Lifeat/space_search.png)

    - We can search the name of spaces that we want

    ![Add favorite spaces](./image/Lifeat/space_favorite.png)

    ![Watch favorite space](./image/Lifeat/space_favorite_list.png)

    - Besides, if users want to store their favorite background later, they can click the heart icon on the top of background, then it will appear in the Favorites tab 

- Customize the sound:

    ![Sound button](./image/Lifeat/sound_button.png)

    - First, click on the sounds icon in the left bar in the focus screen

    ![Sound window](./image/Lifeat/sound_window.png)

    - Then in the sound window, we can:

        - Adjust the total volume (master volume)

        - Adjust the space volume 

        - Insert Youtube music video link and adjust its volume

        - Choose from the available ambiance sounds and adjust their volumes 

- Integrate media:

    ![Media button](./image/Lifeat/media_button.png)

    - First, click on the media icon in the left bar in the focus screen 

    ![Media window](./image/Lifeat/media_window.png)

    ![Media video](./image/Lifeat/media_video.png)

    - Then the media window appears

    - Insert link Youtube, Spotify or Apple Music to display users' video or playlist

- Manage task:

    ![Task button](./image/Lifeat/task_button.png)

    - First, click on the task icon in the left bar in the focus screen

    ![Task window](./image/Lifeat/task_window.png)

    - The task window then appears

    ![Create a task](./image/Lifeat/task_create.png)

    - To create a task, click on add task button. A new task appears and users give it a name

    ![Edit a task](./image/Lifeat/task_edit.png)

    ![Provide further information for a task 1](./image/Lifeat/task_info1.png)

    ![Provide further information for a task 2](./image/Lifeat/task_info2.png)

    - To provide additional information for a task, we can do following steps:
        - Right-click the task to display the option 
        - Choose edit option 
        - Provide the necessary information for the task

    ![Calendar button](./image/Lifeat/calendar_button.png)

    ![Schedule a task](./image/Lifeat/task_schedule.png)

    - Beside, setting time information for a task, users can schedule it by drag the task into the Calendar window after clicking calendar button

- Countdown timer

    ![Timer button](./image/Lifeat/timer_button.png)

    - First, click on the timer icon in the left bar in the focus screen. users have three types of countdown timers: Pomodoro (20 min), Short break(5 min), Long break (15 min) and three mode: Personal, Group, Task 

    ![Personal timer](./image/Lifeat/timer_personal.png)

    - The personal timer is designed for individual use without being associated with a specific task. This mode is suitable for users who want to apply the Pomodoro Technique.

    ![Group timer](./image/Lifeat/timer_group.png)

    - This mode is used when users learn with other people. When it is created, all people in the room can see this timer

    ![Task timer play](./image/Lifeat/timer_task_play.png) 

    ![Task timer countdown](./image/Lifeat/timer_task.png)

    - To start a timer for a specific task, users can click the play button on the task in the calendar window.
    - The task-specific countdown timer then appears.

- Take notes

    ![Notes button](./image/Lifeat/notes_button.png)

    - First, click on the notes icon in the left bar in the focus screen.

    ![Notes window](./image/Lifeat/notes_window.png)

    - Then the Notes window appears, users can write note and apply formatting the note such as bold, underline, ... by the function bar on the top

    ![Create a new note](./image/Lifeat/notes_create.png)

    - Users can create a new note by clicking in the top-left corner of the Notes window then, it will display a panel which has New Note button 

- Learning with friends

    ![Invite button](./image/Lifeat/invite_button.png)

    - First, click the invite button on the top right corner of the focus screen button

    ![Link to invite](./image/Lifeat/invite_friend.png)

    - After that, an invitation window appears, users can send this link to their friend to invite them to join their virtual space

    ![Video call with friends](./image/Lifeat/video_call.png)

    - When their friend join the room, users can make video call by click on the camera icon on the invite bar. The platform also allows users to share their screens

    ![Chat with friends](./image/Lifeat/chat.png)

    - Users can send text messages to other participants in the room

### Explore mode

![Explore mode screen](./image/Lifeat/explore_mode_screen.png)

In this mode, instead of self-studying or with friends, users can study with strangers

The platform provides communities that offer shared virtual study spaces similar to those in Focus mode.

### Plan mode

![Plan mode screen](./image/Lifeat/plan_mode_screen.png)

In this mode, users can create and manage tasks, similar to the functionality available in Focus mode. Moreover, they can create and manage task in a project.

- Create a project:

    ![Project tab](./image/Lifeat/plan_project.png)

    - Click on the project tab on the Plan mode to see the Project tab

    ![Create a project](./image/Lifeat/project_create.png)

    - Click create project button to add a new one

    ![Edit a project](./image/Lifeat/project_edit.png)

    ![Project manager tab](./image/Lifeat/project_manager.png)

    - To add tasks, edit the description, or perform other actions, users can right-click the project then press edit to display the project manager tab

    - Then they can adjust the information, manage task similar to focus mode

## Summary

Focusmate and Lifeat are productivity platforms that help users maintain focus and improve their productivity through different approaches. Focusmate emphasizes virtual coworking and personal accountability, whereas Lifeat provides a customizable study environment with task management, scheduling, and collaborative learning features.

Although Focusmate and Lifeat take different approaches to productivity, they share several important characteristics:

- Focus-oriented experiences: Both platforms help users concentrate on their work or study activities

- Collaborative learning and working: Both support interaction with other people. Focusmate matches users for scheduled coworking sessions, while Lifeat enables users to study with friends or participate in shared study spaces

- Flexible work sessions: Both support structured periods of focused work, although their implementations differ. Focusmate uses predefined session durations, while Lifeat provides configurable countdown timers and different timer modes

- User-controlled experiences: Both allow users to configure aspects of their experience. Focusmate provides session preferences, while Lifeat offers customizable backgrounds, sounds, and media.

- Support for productivity routines: Both provide mechanisms that help users organize their time and maintain focus, although Lifeat offers more extensive task planning and scheduling functionality.
### What Our Proposed App Will Do Differently or Better

Based on the available features of Focusmate and Lifeat, we observe and adapt the following features to our application:

- **Quiet Mode and Communication:**
  - Enhance Quiet Mode by allowing students to send hand-wave requests to initiate conversations without unnecessarily interrupting others.
  - Require recipients to accept interaction requests before communication begins, giving students greater control over their focus and availability.

- **Learning Room Structure:**
  - Enhance existing virtual study spaces by supporting multiple tables within a shared room, allowing students to study independently or alongside others.
  - Allow students to create dynamic groups with customizable sizes, each with independent voice communication, text chat, and collaboration tools.

- **Friend System:**
  - Extend the existing favorite-user and friend-invitation features into a persistent friend system that supports sending, accepting, and managing friend requests.
  - Allow students to create messaging groups and share learning documents, supporting long-term collaboration beyond individual study sessions.

- **Task Planning and Scheduling:**
  - Extend existing task management and scheduling features by integrating study plans with learning room creation and organization.
  - Allow students to create rooms around specific subjects, tasks, or schedules, helping them coordinate collaborative learning activities more effectively.

Moreover, we propose the following new features to better support our application's purpose:

- **University-based Communities:**
  - Organize students into university-specific communities, restricting public learning rooms to eligible students from participating universities.
  - Allow students to create private rooms for their own study groups, providing greater control over room access.

- **Learning Assistance:**
  - Introduce voice-based help requests so students can seek assistance from other learners when encountering difficult concepts.
  - Provide a discussion forum where students can post questions, share problems, and receive answers asynchronously, supporting peer-to-peer learning without requiring real-time interaction.

- **Study Partner Recommendations:**
  - Recommend potential study partners based on similar learning interests and study schedules.
  - Allow room owners to review and approve participation requests from recommended learners, providing greater control over group composition.
