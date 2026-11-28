import { Link, useNavigate, useSearchParams } from "react-router"
import './AreaPage.css'
import Button from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import arrow_right_up from "@assets/icon/arrow-up-right.svg"
import { useState } from "react";
import { useTag } from "@/features/forum/tag/tag";
import LoadingPage from "@/pages/loading/LoadingPage";
import type { TagResponse } from "@/features/forum/tag/type";

const COLORS = [
    "#6BCD77",
    "#FF6B6B",
    "#4D96FF",
    "#B983FF",
    "#FFD93D"
] as const;

const contributorList: Contributor[] = [
    {
        displayname: "Maya Chen",
        post: 186
    },
    {
        displayname: "Alex Rivera",
        post: 142,
    },
    {
        displayname: "Sam Patel",
        post: 98,
    },
    {
        displayname: "Sam Patel",
        post: 98,
    },
    {
        displayname: "Sam Patel",
        post: 98,
    },
    {
        displayname: "Sam Patel",
        post: 98,
    }
]

const comment_list: Comment[] = [
    {
        id: "1",
        displayname: "Minh Nguyen",
        comment: "Try using a hash map to bring the lookup time down from O(n²) to O(n).",
        upvote: 42,
        downvote: 2,
    },
    {
        id: "2",
        displayname: "Sarah Jenkins",
        comment: "Great explanation! The recursive tree diagram really helped me understand how backtracking works here.",
        upvote: 28,
        downvote: 0,
    },
    {
        id: "3",
        displayname: "Tuan",
        comment: "Has anyone tested this solution against the edge case where the input array is empty?",
        upvote: 15,
        downvote: 1,
    },
    {
        id: "4",
        displayname: "Alex Rivera",
        comment: "You can also solve this with dynamic programming by storing the subproblem results in a 1D array to save memory.",
        upvote: 34,
        downvote: 3,
    },
    {
        id: "5",
        displayname: "Nguyen Hoang Long",
        comment: "Check out chapter 4 of the CLRS textbook—there is a full proof for why this greedy approach always finds the optimal path.",
        upvote: 19,
        downvote: 0,
    },
];

type Comment = {
    id: string,
    displayname: string,
    comment: string,
    upvote: number,
    downvote: number
}

type Contributor = {
    displayname: string,
    post: number
}

function getColor(id: number): string {
    return COLORS[id % COLORS.length];
}

function stand_for(name: string) {
    const word = name.split(" ")
    if (word.length === 1 && word[0] == "")
        return "AN"
    else if (word.length === 1 && word[0] != "")
        return name.slice(0,2).toUpperCase()
    return (word[0][0] + word[1][0]).toUpperCase()
}

function SubjectCard(data: TagResponse & {index: number, onClick: () => void}) {
    return <Button className="subject_card" variant="secondary" onClick={data.onClick}>
        <div className="subject_title" style={{ backgroundColor: getColor(data.index) }}>
            <div className="subject_name">
                {data.icon && <img src={data.icon}/>}
                {data.name}
            </div>
            <img src={arrow_right_up}/>
        </div>
        <div className="subject_summary">
            <div className="description">
                {data.description}
            </div>
            <div className="subject_activity">
                <p className="metadata">{data.num_post} POSTS</p>
                {/* {(true) ? <div className="subject_hot">HOT</div> : <p className="metadata">{formatTime(lastActivity)} ago</p>} */}
            </div>
            {/* {(data.hot > 2) && <p className="description">Last activity {formatTime(lastActivity)} ago</p>} */}
        </div>
    </Button>
}

function ContributorCard(data: {
    index: number,
    displayname: string,
    post: number
}) {
    return <div className="contributor">
        <p className="ranking">{data.index+1}.</p>
        <div className="avatar" style={{backgroundColor: getColor(data.index)}}>{stand_for(data.displayname)}</div>
        <div className="user_info">
            <p className="displayname">{data.displayname}</p>
            <p className="metadata">{data.post} posts</p>
        </div>
    </div>
}

function CommentCard(
data: {
    displayname: string,
    comment: string,
    upvote: number, 
    downvote: number,
    id: string,
    index: number
}) {      
    return <div className="comment_card">
        <div className="comment_title">
            <div className="comment_identity">
                <div className="avatar" style={{backgroundColor: getColor(data.index)}}>{stand_for(data.displayname)}</div>
                <p className="displayname">{data.displayname}</p>
            </div>
            <div className="updown_vote">
                <p className="upvote">{data.upvote} ▲</p>
                <p className="downvote">{data.downvote} ▼</p> 
            </div>
        </div>
        <p className="comment">{data.comment}</p>
    </div>
}

function AreaPage() {
    const [searchParams, setParams] = useSearchParams();
    const [searchSubject, setSearchSubject] = useState("");
    const area = searchParams.get("area");
    const id = searchParams.get("id")!
    const { data: subjects, isLoading } = useTag(id, "subject")
    const navigate = useNavigate()
    const goOutSide = () => {
        searchParams.delete('area')
        searchParams.delete('id')
        setParams(searchParams)
    }

    const filteredSubjects = subjects?.filter((item) =>
        item.name.toLowerCase().includes(searchSubject.toLowerCase())
    );

    if (isLoading) return <LoadingPage/>


    return <div className="area_page page">
        <div className="breadcrumb">
            <div onClick={() => goOutSide()}>Forum</div> {'>'} <div>{area}</div>
        </div>
        <div className="header_card">
            <div className="major_identity">
                <div className="title">
                    <img/>
                    <div className="header">
                        <p className="metadata">THE BUILDERS, DEBUGGERS & BIG THINKERS</p>
                        <p className="heading">{area?.toUpperCase()}</p>
                    </div>
                </div>
                <Button variant="secondary" className="follow">+ Follow</Button>
            </div>
            <p className="description">
                Stuck on a problem? You’re in good company. Share the logic, question the assumptions and build something brilliant together.
            </p>
        </div>
        <div className="subject_community">
            <div className="subject">
                <div className="search_heading">
                    <p className="search_title">
                        FIND YOUR SUBJECT
                    </p>
                    <p className="metadata">
                        {filteredSubjects?.length} OF 12 SUBJECTS
                    </p>
                </div>
                <Input type="search" placeholder={`Search ${area} subjects`} value={searchSubject} onChange={(e) => {setSearchSubject(e.target.value.trimStart())}}/>
                <div className='overflow-wrap'>
                    <div className="subject_grid">
                        {filteredSubjects?.map((item, index) => (
                            <SubjectCard
                                key={`${index}`}
                                index={index}
                                {...item}
                                onClick={() => {
                                    navigate(`/forum?page=browse&page=subject&subject=${item.name}&id=${item.id}`)
                                }}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
            <div className="community">
                <div className="contribution">
                    <div className="header">
                        TOP CONTRIBUTORS
                    </div>
                    <div className="contribution_list">
                        {contributorList.map((item, index) => (
                            <ContributorCard
                                key={item.displayname}
                                displayname={item.displayname}
                                post={item.post}
                                index={index}
                            />
                        ))}
                    </div>
                    <Link to='/community'>
                        MEET THE COMMUNITY ↗
                    </Link>
                </div>
                <div className="weekly_comment">
                    <div className="header">
                        COMMENTS OF WEEK
                    </div>
                    <div className="comment_list">
                        {comment_list.map((item, index) => (
                            <CommentCard
                                key={item.id}
                                displayname={item.displayname}
                                comment={item.comment}
                                upvote={item.upvote}
                                downvote={item.downvote}
                                id={item.id}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AreaPage