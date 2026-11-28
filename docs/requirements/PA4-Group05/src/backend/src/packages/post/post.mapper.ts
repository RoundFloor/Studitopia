import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { PostResponse as PostData } from '../postgres/dto/response.dto.js';
import { id, ids, IdType } from '../../common/dto/id.dto.js';
import { PostResponse } from './dto/post.dto.js';

export async function toPostResponse(
  post: PostData,
  security: SecurityGenerationService,
  session_id: number,
  account_id: number,
  postType: 'post' | 'post-retrieve',
): Promise<PostResponse> {
  const encrypt = async (value: number, type: IdType): Promise<string> =>
    await security.crypt(JSON.stringify(ids(session_id, account_id, [id(value, type)])));

  return PostResponse(
    await encrypt(post.id, postType),
    post.title,
    await encrypt(post.account_id, 'account'),
    post.displayname,
    await encrypt(post.avatar_id, 'image'),
    await encrypt(post.comment_id, 'comment'),
    post.content,
    post.upvote,
    post.downvote,
    post.num_comment,
    post.true_response,
    post.created_time,
    await Promise.all(post.tags.map(tag => encrypt(tag, 'other'))),
  );
}
