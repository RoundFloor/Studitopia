import { useMemo, useState, type WheelEvent } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import "./SubjectPage.css";
import Button from "../../../../shared/ui/button";
import arrow_up from "@assets/icon/arrow-up.svg";
import arrow_down from "@assets/icon/arrow-down.svg";
import pin from "@assets/icon/pin.svg";
import chat from "@assets/icon/chat.svg";
import tick from "@assets/icon/tick.svg";
import remove from "@assets/icon/x.svg";
import type { ForumOutletContextType } from "@/app/layouts/forum/ForumLayout";
import type { TagResponse } from "@/features/forum/tag/type";
import type { Post } from "@/features/forum/post/type";
import { apiRequest } from "@/shared/api";

const COLORS = [
    "#6BCD77",
    "#FF6B6B",
    "#4D96FF",
    "#B983FF",
    "#FFD93D"
] as const;

const TAG_STATUS_CLASS = {
    0: "is-rejected",
    1: "is-available",
    2: "is-accepted",
    3: "is-current"
} as const;

type ApiPost = {
    id: string;
    title: string;
    account_id: string;
    displayname: string;
    avatar_id: string;
    comment_id: string;
    content: string;
    upvote: number;
    downvote: number;
    num_comment: number;
    true_response: boolean;
    created_time: string | Date;
    tags: string[];
};

type TagStatus = keyof typeof TAG_STATUS_CLASS;

type TagItem = {
    id: string;
    name: string;
    status: TagStatus;
    order: number;
    disabled: boolean;
};

type TagSelection = {
    status: TagStatus;
    order: number;
};

function getColor(id: number): string {
    return COLORS[id % COLORS.length];
}

function stand_for(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) {
        return "AN";
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function formatTime(updateTime: number): string {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - updateTime) / 1000);
    if (diffInSeconds < 60) {
      return "just now";
    }

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours${hours > 1 ? "s" : ""}`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} day${days > 1 ? "s" : ""}`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months > 1 ? "s" : ""}`;
    }

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
}

function toPost(data: ApiPost): Post {
    return {
        id: data.id,
        title: data.title,
        description: data.content,
        displayname: data.displayname,
        isPinned: data.true_response,
        updateTime: new Date(data.created_time).getTime(),
        commentCount: data.num_comment,
        upvote: data.upvote,
        downvote: data.downvote
    };
}

function PostCard({
    data,
    index,
    onClick
}: {
    data: Post;
    index: number;
    onClick: () => void;
}) {
    return <Button variant="secondary" className="post_card" onClick={onClick}>
        <div className="vote">
            <img src={arrow_up} alt="" />
            <span>{data.upvote - data.downvote}</span>
            <img src={arrow_down} alt="" />
        </div>
        <div className="post_content">
            <div className="tag_list">
                {data.isPinned && <img src={pin} alt="Pinned post" />}
                <span className="special_tag resource">RESOURCE</span>
            </div>
            <div className="heading">{data.title}</div>
            <div className="description">{data.description}</div>
            <div className="post_metadata">
                <div className="post_author">
                    <div
                        className="avatar"
                        style={{ backgroundColor: getColor(index) }}
                    >
                        {stand_for(data.displayname)}
                    </div>
                    <span className="displayname">{data.displayname}</span>
                    <span className="timestamp">{formatTime(data.updateTime)}</span>
                </div>
                <div className="comment_count">
                    <img src={chat} alt="" />
                    {data.commentCount}
                </div>
            </div>
        </div>
    </Button>;
}

function Tag({
    id,
    name,
    status,
    disabled,
    onSelect
}: TagItem & { onSelect: (id: string) => void }) {
    return (
        <button
            type="button"
            className={`tag ${TAG_STATUS_CLASS[status]} ${disabled ? "is-disabled" : ""}`}
            onClick={() => onSelect(id)}
            disabled={disabled}
            title={name}
            aria-label={name}
        >
            {status === 2 && <img src={tick} alt="" />}
            {status === 0 && <img src={remove} alt="" />}
            <span className="text">{name}</span>
        </button>
    );
}

function TagList({
    items,
    onSelect
}: {
    items: TagItem[];
    onSelect: (id: string) => void;
}) {
    return (
        <div className="overflow">
            {items.map((tag) => (
                <Tag key={tag.id} {...tag} onSelect={onSelect} />
            ))}
        </div>
    );
}

function SubjectPage() {
    const [searchParams] = useSearchParams();
    const area = searchParams.get("area") ?? "";
    const subject = searchParams.get("subject") ?? "";
    const { visibleTopBar } = useOutletContext<ForumOutletContextType>();
    const navigate = useNavigate();

    const { data: tagResponses = [] } = useQuery({
        queryKey: ["tags", "all"],
        queryFn: () => apiRequest<TagResponse[]>("/tag"),
        staleTime: 10 * 60_000
    });

    const baseTags = useMemo<TagItem[]>(() => tagResponses.map(({ id, name, num_post }) => ({
        id,
        name,
        status: 1 as TagStatus,
        order: 0,
        disabled: num_post === 0
    })), [tagResponses]);

    const [selections, setSelections] = useState<Record<string, TagSelection>>({});

    const tags = useMemo(
        () => baseTags
            .map((tag) => ({ ...tag, ...selections[tag.id] }))
            .sort((first, second) => Number(first.disabled) - Number(second.disabled)),
        [baseTags, selections]
    );

    const currentTags = useMemo(
        () => tags.filter((tag) => tag.status !== 1 && !tag.disabled),
        [tags]
    );

    function selectTag(id: string) {
        setSelections((previous) => {
            const baseTag = baseTags.find((tag) => tag.id === id);
            if (!baseTag || baseTag.disabled) {
                return previous;
            }

            const status = previous[id]?.status ?? baseTag.status;
            if (status === 3) {
                return previous;
            }

            const order = Object.values(previous).reduce(
                (max, selection) => Math.max(max, selection.order),
                0
            ) + 1;

            return {
                ...previous,
                [id]: {
                    status: ((status + 1) % 3) as TagStatus,
                    order
                }
            };
        });
    }

    const includes = tags.filter((tag) => tag.status === 2).map((tag) => tag.id);
    const excludes = tags.filter((tag) => tag.status === 0).map((tag) => tag.id);
    const relevantParams = [
        ...includes.map((id) => `include=${encodeURIComponent(id)}`),
        ...excludes.map((id) => `exclude=${encodeURIComponent(id)}`)
    ].join("&");

    const { data: apiPosts = [] } = useQuery({
        queryKey: ["posts", "relevant", includes.join(","), excludes.join(",")],
        queryFn: () => apiRequest<ApiPost[]>(`/post/relevant?${relevantParams}`),
        enabled: baseTags.length > 0,
        staleTime: 0,
        gcTime: 0
    });

    const posts = useMemo(
        () => apiPosts.map((post) => toPost(post)),
        [apiPosts]
    );

    const [scrollTop, setScrollTop] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const isHeaderExpanded = scrollTop < 50;

    function handleWheel(event: WheelEvent<HTMLDivElement>) {
        visibleTopBar(event.deltaY <= 0);
        setIsScrollingDown(event.deltaY > 0);
        setScrollTop(event.currentTarget.scrollTop);
    }

    return (
        <div className={`subject_page page ${isHeaderExpanded ? "is-expanded" : "is-collapsed"}`}>
            <div
                className={`scroll_indicator ${isScrollingDown ? "is-active" : ""}`}
                aria-hidden="true"
            />
            <div className={`breadcrumb ${isHeaderExpanded ? "" : "is-hidden"}`}>
                <div>Forum</div>
                <span>&gt;</span>
                <div>{area}</div>
                <span>&gt;</span>
                <div>{subject}</div>
            </div>
            <div className={`subject_introduction ${isHeaderExpanded ? "" : "is-collapsed"}`}>
                <div className={`introduction ${isHeaderExpanded ? "" : "is-collapsed"}`}>
                    <div className={`heading ${isHeaderExpanded ? "" : "is-collapsed"}`}>
                        {subject.toUpperCase()}
                    </div>
                    <div className={`description ${isHeaderExpanded ? "" : "is-collapsed"}`}>
                        Work through the tricky bits. One good question at a time.
                    </div>
                </div>
                <div className={`current-tag tag-box ${isHeaderExpanded ? "" : "is-collapsed"}`}>
                    <TagList items={currentTags} onSelect={selectTag} />
                </div>
            </div>
            <div className="post_info">
                <div className="post">
                    <div className="post_list" onWheel={handleWheel}>
                        {posts.map((post, index) => (
                            <PostCard
                                key={post.id}
                                data={post}
                                index={index}
                                onClick={() => navigate("/forum?page=post")}
                            />
                        ))}
                    </div>
                </div>
                <div className="tag-controller">
                    <section className="suggestion box">
                        <h3>SUGGESTION</h3>
                        <div className="tag-box">
                            <TagList items={tags} onSelect={selectTag} />
                        </div>
                    </section>
                    <section className="available box">
                        <h3>AVAILABLE</h3>
                        <div className="tag-box">
                            <TagList items={tags} onSelect={selectTag} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default SubjectPage;
