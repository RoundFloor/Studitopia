export interface SimpleTag {
  id: string,
  name: string,
  category: string
}

export function SimpleTag(id: string, name: string, category: string): SimpleTag {
  return {id, name, category}
}

export interface TagResponse {
  id: string;
  name: string;
  num_tag: number;
  num_post: number;
  icon: number | null;
  hot: number;
  description: string;
}

export function TagResponse(id: string, name: string, num_tag: number, num_post: number, icon: number | null, hot: number, description: string): TagResponse {
  return {id, name, num_tag, num_post, icon, hot, description}
}

export interface TagDetailResponse extends TagResponse {
  category: string;
  created_time: Date;
}

export function TagDetailResponse(id: string, name: string, num_tag: number, num_post: number, category: string, created_time: Date, icon: number | null, hot: number, description: string): TagDetailResponse {
  return {id, name, num_tag, num_post, category, created_time, icon, hot, description}
}

export interface RelevantTagResponse {
  id: string;
  name: string;
  num_post: number;
}

export function RelevantTagResponse(id: string, name: string, num_post: number): RelevantTagResponse {
  return {id, name, num_post}
}

export interface TagsByIdResponse {
  id: string;
  name: string;
  category: string;
}

export function TagsByIdResponse(id: string, name: string, category: string): TagsByIdResponse {
  return {id, name, category}
}
