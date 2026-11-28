# Screen flow

**Version:** `1.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]
flowchart TD
    Start(("Start"))
		IsLogin{"Is Login"}
		subgraph MainPages["Main Pages"]
			direction TD
			Profile(("Profile"))
			Preferences(("Prefe-\nrences"))
			Post[["Post"]]

			subgraph ForumGroup["Forum Group - Primary"]
				direction TD
				Forum --> University[["University"]]
				University --> Major[["Major"]]
				Major --> Course[["Course"]]
				Course --> Post
				Forum --> CreatePost(("Create \n Post"))
				CreatePost --> Post
			end

			subgraph TrendingGroup["Trending Group"]
				direction TD
				Trending --> |Trending| Post
				Trending --> |Related| Post
			end
	    
	    subgraph LibraryGroup["Library Group"]
				direction TD
				Library --> Exam["Exam"]
				Library --> Book["Book"]
			end

	    subgraph FriendGroup["Friend Group"]
		    direction TD
				Friend --> FindFriendByName(("Find \n friend"))
				Friend --> ReccommendFriend(("Reco-\nmmend"))
				Friend --> FriendRequest(("Friend \n Request"))
				Friend --> CreateGroup(("Create \n Group"))
			end

			subgraph SettingsGroup["Setting groups"]
				  direction TD
					Settings --> Profile
			    Settings --> Preferences
			 end

			subgraph MeetingGroup["Meeting Group - Supporting"]
				direction TD
				Meeting --> HallRoom(("Hall \n Room"))
				Meeting --> StudyRoom(("Study \n Room"))
			end
					
	    Home --> ForumGroup
	    Home --> TrendingGroup
	    Home --> LibraryGroup
	    Home --> FriendGroup
	    Home --> SettingsGroup
	    Home --> MeetingGroup
	    Home --> Logout(("Logout"))
		end

		subgraph Authentication
			direction TD
			Login["Login"]
			Register["Register"]
			Recover["Recover"]
			Login .-> Recover
			Login <--> Register
			Register --> OTP --> PreferenceSettings["Preference \n Settings"]
		end
	
    Start --> IsLogin
    IsLogin -->|True| MainPages
    IsLogin -->|False| Authentication
    
    classDef default font-size:30px;
```
