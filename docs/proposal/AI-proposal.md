# AI Feature Proposal

> **Purpose:** Propose and discuss AI-powered features at a high level before deciding on implementation details.

## 1. Room Recommendation and Searching

### 1.1 Scenario

As a university undergraduate, each user has a major, target career path, subjects of interest, topics of interest and current course that he/she is enrolling at university. There needs to be a system to recommendation and search for user's desired rooms to support the respective learning purposes.

### 1.2 Recommendation and Searching Factors

| Factor | What it tells us | How to get it |
|---|---|---|
| Major | The overall field user is pursuing, which suggests possible courses that user may enroll  | User inputs at registration or from general information |
| Program | Program (like APCS) tells exactly the courses user can enroll at university |  User inputs at registration or from general information |
| Year | At a certain year of a program, users can only enroll in certain courses |  User inputs at registration or from general information |
| Subject of interest | At certain time of university years, user may study mainly courses of a certain subject like maths, physics, CS, ... Subject tells the courses user is currently enrolling | This is chosen as categorial based on course system of university database |
| Current courses | There could be many courses teaching the same contents. This helps direct user to rooms of his/her peers, which is helpfull for studying and information exchange | This can be stored as a list with items chosen from the universiyt database |
| Target career path | The target career tells a list of courses that the user must study to achieve his/her desired career | User input as a form of text in the general information |
| Preference | User can be interested in topics outside the studying program without knowing which courses cover the topics, so this help user search for rooms with obscure information | This could be input as general information or prompt on searching |
| History | Exploring user's room joining history, his/her interest can be drawn and this can be added to preference on searching |

### 1.3 Requirements

The feature requires:

- An information retrieval component that get information about the relevant courses and their respective information (like what they covers or syllabus) based on major, program, year, subject.
- A room searching component to get the room based on the input, which could be course name, course code, topic, descriptions,... that appears in rooms name, categories, or information
- A LLM to extract information on the target career path, preference and history to help suggest inputs for room searching
- (Optional) A web retrival system to retrieve information on the subject or career path

## 2. Library Searching
### 2.1 Scenario

The library is where people uploaded learning materials. To search for desired materials, user needs a search system. 

### 2.2 Searching factor

| Factor | What it tells us | How to get it | How is it useful |
|---|---|---|---|
| Program | The program that uses this material | User chooses as tag | Limit the range of materials to reduce the cost of deeper search |
| Subject | The subject that includes the contents and topics of the materials | User chooses as tag | Limit the range of materials to reduce the cost of deeper search |
| Course | The course that uses this material | User chooses as tag | Limit the range of materials to reduce the cost of deeper search |
| Target career path | This suggests the topic users may need to read about | Available in the general information | Help retrieve more requirements for content searching |
| Prompt | Description of what content user is trying to find material on | User inputs | Main source to generate query for content-specific searching |

### 2.3 Requirement

The fearture requires:

- A language encoder to encode book contents and query
- A library searching system that search book based on tags (even better if it can search using similarity of embeddings)
- An LLM to write language query based on the user prompt, suppported by using information from subject and target career path. 
- (Optional) A web retrival system to search for information on the topic from web