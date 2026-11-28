export interface PostResponse {
  id: string;
  title: string;
  account_id: string;
  displayname: string;
  avatar_id: string;
  comment_id: string;
  content: string;
  upvote: number,
  downvote: number,
  num_comment: number,
  true_response: boolean;
  created_time: Date;
  tags: string[];
}

export function PostResponse(id: string, title: string, account_id: string, displayname: string, avatar_id: string, comment_id: string, content: string, upvote: number, downvote: number, num_comment: number, true_response: boolean, created_time: Date, tags: string[]): PostResponse {
  return {id, title, account_id, displayname, avatar_id, comment_id, content, upvote, downvote, num_comment, true_response, created_time, tags}
}
