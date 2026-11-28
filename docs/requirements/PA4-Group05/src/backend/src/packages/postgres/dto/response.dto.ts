export interface RegisterResponse {
  session_id: number;
  user_id: number;
  role: string;
  status: string;
}

export interface SessionResponse {
  session_id: number;
  user_id: number;
  role: string;
  status: string;
}

export interface TagResponse {
  id: number;
  name: string;
  num_tag: number;
  num_post: number;
  icon: number | null;
  hot: number,
  description: string;
}

export interface TagDetailResponse extends TagResponse {
  category: string;
  created_time: Date;
}

export interface RelevantTagResponse {
  id: number;
  name: string;
  num_post: number;
}

export interface TagsByIdResponse {
  id: number;
  name: string;
  category: string;
}

export interface PostResponse {
  id: number;
  title: string;
  account_id: number;
  displayname: string;
  avatar_id: number;
  comment_id: number;
  content: string,
  upvote: number,
  downvote: number,
  num_comment: number,
  true_response: boolean;
  created_time: Date;
  tags: number[];
}

export interface CommentResponse {
  id: number;
  content: string;
  account_id: number;
  upvote: number;
  downvote: number;
  num_comment: number;
  created_time: Date;
}

export interface CreatedFileResponse {
  id: number;
  src: string;
}

export interface FileResponse {
  id: number;
  name: string;
  src: string;
  account_id: number;
  updated_time: Date;
  created_time: Date;
}

export interface AccountResponse {
  displayname: string;
  username: string;
  university_name: string | null;
  university_id: number | null;
  faculty_name: string | null;
  faculty_id: number | null;
  major_name: string | null;
  major_id: number | null;
  avatar_id: number | null;
  role: string;
  status: string;
  create_time: Date;
}
