type Post = {
    id: string;
    title: string;
    description: string;
    displayname: string;
    isPinned: boolean;
    updateTime: number;
    commentCount: number;
    upvote: number;
    downvote: number;
};

export type {Post}