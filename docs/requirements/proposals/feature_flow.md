# Feature flow

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]
> The Forum is the primary feature group of Studitopia. Meeting-room features are supporting capabilities and are shown last.

## Authentication Group

```mermaid
flowchart LR
			1Auth["Authentication"]
			1Auth --> 1Login(["Login"])
			1Auth --> 1Register(["Register"])
			1Auth --> 1Recover(["Recover Password"])
			1Register --> 1OTP(["OTP Verification"])
			1OTP --> 1Preference(["Preference Settings"])
			1Preference --> 1Home(["Home"])
			1Login --> 1Home
```

## Forum Group (Primary)

```mermaid
flowchart LR
			2Forum["University Forum"]
			2Forum --> 2Scope["Academic Scope"]
			2Scope --> 2University(["University"])
			2University --> 2Major(["Major"])
			2Major --> 2Course(["Course"])

			2Forum --> 2CreatePost["Create Post"]
			2Forum --> |Recommended| 2ListPost(["List Post"])
			2Forum --> 2Search(["Search"])

			2CreatePost --> 2DiscussionPost[["Discussion Post"]]
			2CreatePost --> 2MaterialPost[["Material Post"]]
			2CreatePost --> 2FunctionalPost[["Functional Post"]]

			2DiscussionPost --> 2Text(["Text / Latex"])
			2DiscussionPost --> 2Image(["Image"])
			2DiscussionPost --> 2Interactive(["Interactive Box"])
			2MaterialPost --> 2Files(["Files"])
			2FunctionalPost --> 2Quiz(["Immediate Quiz"])
			2FunctionalPost --> 2Prereq(["Prerequisite Tree"])
			2FunctionalPost --> 2Compute(["Dynamic Computation"])

			2ListPost --> 2Filter(["Filter"])
			2ListPost --> 2Post[["Post"]]
			2ListPost --> |Solved / Good| 2Comment(["Comment / Answer"])

			2Filter --> 2MyPost(["My Post"])
			2Filter --> 2Area(["Area"])
			2Filter --> 2UniversityFilter(["University"])
			2Filter --> 2MajorFilter(["Major"])
			2Filter --> 2CourseFilter(["Course"])
			2Filter --> 2Tags(["Tags"])

			2Post --> 2Comment
			2Post --> 2Solved(["Mark True Response"])
			2Post --> 2React(["Upvote / Downvote"])
			2Post --> 2Save(["Save"])
			2Post --> 2Report(["Report / Moderate"])
			2Comment --> 2React
```

## Post Management

```mermaid
flowchart TD
			Posts[["Post"]]
			Posts --> Delete(["Delete / Hide"])
			Posts --> Upvote(["Upvote"])
			Posts --> Downvote(["Downvote"])
			Posts --> Save(["Save"])
			Posts --> Owner(["Owner"])
			Posts --> Time(["Time"])
			Posts --> Comment(["Comment"]) --> |See / Make| TrueResponse(["True Response"])

			Posts --> DiscussPost[["Discussion Post"]]
			Posts --> MaterialPost[["Material Post"]]
			Posts --> FunctionalPost[["Functional Post"]]

			FunctionalPost --> Quiz(["Quiz"]) --> DoQuiz(["Do"])
			FunctionalPost --> PrerequisiteTree(["Prerequisite Tree"])
			PrerequisiteTree --> AutoApply(["Auto apply"])
			PrerequisiteTree --> Simulate(["Simulate by click"])

			CreatePost(["Create Post"]) --> CDiscussPost[["Discussion Post"]]
			CDiscussPost --> CText(["Text"]) --> CLatex(["Latex"])
			CDiscussPost --> CImage(["Image"])
			CDiscussPost --> CTitle(["Title"])
			CDiscussPost --> InteractiveBox(["Interactive Box"])

			CreatePost --> CMaterial[["Material Post"]]
			CMaterial --> CFiles(["Files"])
			CMaterial --> CMTitle(["Title"])
			CMaterial --> Description(["Description"])

			CreatePost --> CFunctional[["Functional Post"]]
			CFunctional --> FTitle(["Title"])
			CFunctional --> CQuiz(["Quiz"])
			CFunctional --> CPrerequisiteTree(["Prerequisite Tree"])

			CDiscussPost & CMaterial & CFunctional ==> SubmitButton(["Submit"])
```

## Library Group

```mermaid
flowchart TD
		Library["Learning Resource Library"]
		Library --> Search["Search"]
		Search --> LibTag(("Tag"))
		Search --> LibTitle(("Title"))
		Library --> Recommend["Recommend"]
		Recommend --> LibTrend(("Top reading"))
		Recommend --> LibUserInfo(("User relevance"))
		Library --> Materials["Material"]
		Materials --> Upload(("Upload"))
		Materials --> Download(("Download"))
```

## Friend Group

```mermaid
flowchart LR
		  3Friend["Friend"]
		  3FriendItem(["Friend"])

		  3Friend --> 3MyGroup(["My Group"])
		  3Friend --> 3MyFriend(["My Friend"]) --> 3FriendItem
		  3Friend --> 3RecommendFriend(["Recommended"]) --> 3FriendItem
		  3Friend --> 3FindFriend(["Find friend"]) --> 3FriendItem
		  3Friend --> 3FriendRequest(["Friend Request"]) --> 3FriendItem
		  3Friend --> 3CreateGroup["Create Group"]

		  3MyGroup --> 3Group[["Group"]]
		  3MyGroup --> 3Leave(["Leave"])
		  3MyGroup --> 3Join(["Join"])

		  3Group --> 3Message(["Message"])
		  3Group --> 3Document(["Document"])
		  3Group --> 3Member(["List member"])
		  3Group --> 3Leave

		  3Member --> 3Invite(["Invite"])
		  3Member .-> |Superuser| 3Kick(["Kick"])

		  3CreateGroup --> 3Privacy(["Privacy"])
		  3CreateGroup --> 3BeginningMembers(["Beginning member"])
		  3CreateGroup --> 3GroupName(["Name"])

		  3FriendItem --> 3FriendName(["Friend Name"])
		  3FriendItem --> 3FriendHobby(["Friend Public Hobby"])
		  3FriendItem .-> |Stranger| 3MakeFriend(["Make Friend"])
```

# Lobby Group (Supporting)

> Meeting rooms are optional and support the forum. They are not the primary feature group.

```mermaid
flowchart TD
			Lobby --> |Trending| HallRoom[["Hall Room"]]
			Lobby --> |For you| HallRoom
			Lobby --> |Detail| Halls --> HallRoom

			Lobby --> |Trending| StudyRoom[["Study Room"]]
			Lobby --> |For you| StudyRoom
			Lobby --> |Detail| Hub --> StudyRoom
			Lobby --> Create

			Create --> HallCreate(("Hall"))
			Create --> StudyCreate(("Study\nRoom"))
```
