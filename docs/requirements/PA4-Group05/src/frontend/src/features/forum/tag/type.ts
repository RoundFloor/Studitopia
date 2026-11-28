interface TagResponse {
  id: string;
  name: string;
  num_tag: number;
  num_post: number;
  hot: number;
  icon: string | null;
  description: string;
}

export interface TagDetailResponse extends TagResponse {
  category: string;
  created_time: Date;
}
export {type TagResponse}