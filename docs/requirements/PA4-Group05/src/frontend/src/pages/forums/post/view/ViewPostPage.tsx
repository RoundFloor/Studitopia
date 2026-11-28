import { useEffect, useRef, useState } from 'react'
import './ViewPostPage.css'
import Button from '@/shared/ui/button'
import attach from '../../../../shared/assets/icon/attach.svg'

const COLORS = [
    "#6BCD77",
    "#FF6B6B",
    "#4D96FF",
    "#B983FF",
    "#FFD93D"
] as const;

const post_list: Post[] = [
    {
        displayname: "Minh Nguyen",
        title: "Using hash map for optimization",
        upvote: 42,
        downvote: 2,
    },
    {
        displayname: "Minh Nguyen",
        title: "Using hash map for optimization",
        upvote: 42,
        downvote: 2,
    },
    {
        displayname: "Minh Nguyen",
        title: "Using hash map for optimization",
        upvote: 42,
        downvote: 2,
    },
    {
        displayname: "Minh Nguyen",
        title: "Using hash map for optimization",
        upvote: 42,
        downvote: 2,
    },
    {
        displayname: "Minh Nguyen",
        title: "Using hash map for optimization",
        upvote: 42,
        downvote: 2,
    },
];

type Post = {
    displayname: string,
    title: string,
    upvote: number,
    downvote: number
}

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

function ExpandableText(data: {text: string, maxLines: number}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [data.text, data.maxLines]);

  return (
    <div>
      <p
        ref={textRef}
        style={{
          margin: 0,
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: 400,
          whiteSpace: "pre-line",
          ...(!isExpanded && {
            display: "-webkit-box",
            WebkitLineClamp: data.maxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }),
        }}
      >
        {data.text}
      </p>

      {(isOverflowing || isExpanded) && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: "none",
            border: "none",
            color: "#4D96FF",
            fontWeight: 600,
            padding: "4px 0",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}


function PostCard(data: {
    id: number,
    displayname: string,
    title: string,
    upvote: number, 
    downvote: number,
}) {      
    return <div className="post_card">
        <div className="post_header">
            <div className="post_identity">
                <div className="avatar" style={{backgroundColor: getColor(data.id)}}>{stand_for(data.displayname)}</div>
                <p className="displayname">{data.displayname}</p>
            </div>
            <div className="updown_vote">
                <p className="upvote">{data.upvote} ▲</p>
                <p className="downvote">{data.downvote} ▼</p> 
            </div>
        </div>
        <p className="post_title">{data.title}</p>
    </div>
}

function CommentPost(
    data: {
        comment: string
        onChange: (comment: string) => void
    }
) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        data.onChange(e.target.value);

        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
        }
    };

    return <div className="comment_post">
        <textarea onChange={handleChange}>
            {data.comment}
        </textarea>
        <div className="post_button">
            <div className="attach_material">
                <img src={attach}></img>
                Attach materials
            </div>
            <Button variant="primary">
                Post Response
            </Button>
        </div>
    </div>
}

function CommentCard(
    data: {
        id: number,
        displayname: string,
        updateTime: number,
        comment: string,
        depth: number
        // onReply: () => void
    }
) {

    return <div className="tree_comment"
        style={{paddingLeft: data.depth*24 + 'px', ...(data.depth > 0 && {borderLeft: "3px solid #4D96FF"})}}>
        <div className="comment_card">
            <div className='comment_author'>
                <div className='avatar' style={{backgroundColor: getColor(data.id)}}>{stand_for("Jamie Morgan")}</div>
                <div className='displayname'>{data.displayname}</div>
                <div className='update_time'>{formatTime(data.updateTime)}</div>
            </div>
            <ExpandableText text={data.comment} maxLines={3}/>
            <p className='reply'>Reply</p>
        </div>    
    </div>
        
}

const test = "Hôm nay là một ngày tuyệt vời để bắt đầu dự án mới. Chúng ta sẽ cùng nhau xây dựng một giao diện người dùng thật mượt mà, tối ưu hóa trải nghiệm đọc và đảm bảo mọi chi tiết nhỏ nhất đều hoạt động hoàn hảo trên cả máy tính lẫn điện thoại di động. Trong quá trình phát triển giao diện web hiện đại, việc xử lý các đoạn văn bản dài luôn là một bài toán thú vị. Nếu hiển thị toàn bộ nội dung ngay từ đầu, trang web có thể trở nên rối mắt và chiếm quá nhiều diện tích màn hình. Ngược lại, nếu cắt bớt nội dung bằng dấu ba chấm kết hợp với nút, người dùng sẽ dễ dàng lướt qua các thông tin chính trước khi quyết định có muốn đọc sâu hơn hay không. Đặc biệt, khi kết hợp thuộc tính white-space: pre-line với -webkit-line-clamp, trình duyệt sẽ giữ nguyên các khoảng ngắt đoạn tự nhiên do người dùng nhập vào, đồng thời vẫn giới hạn đúng số dòng tối đa cho phép. Đây là một kỹ thuật cực kỳ hữu ích cho các ứng dụng mạng xã hội, phần bình luận sản phẩm, hoặc mô tả chi tiết bài viết. Hãy thử kiểm tra xem đoạn văn bản mẫu này có hiển thị đúng số dòng bạn mong muốn hay chưa, và đừng quên thử bấm mở rộng rồi thu gọn lại để xem hiệu ứng chuyển đổi có mượt mà không nhé!"

function ViewPostPage() {

    const [comment, setComment] = useState("")

    return <div className='view_post'>
        <div className='post_comment'>
            <div className="post_group">
                <div className='post'>
                    <div className='header'>
                        <div className='tag'>
                            {true && <div className="special_tag question">QUESTION</div>}
                            {true && <div className="special_tag solved">✓ SOLVED</div>}
                            {true && <div className="special_tag note">NOTES</div>}
                            {true && <div className="special_tag discussion">DISCUSSION</div>}
                            {true && <div className="special_tag resource">RESOURCE</div>}
                            <p>#graphs</p>
                            <p>#shortest-path</p>
                        </div>
                        <div className='title'>
                            Why does Dijkstra fail with negative edges?
                        </div>
                        <div className='post_author'>
                            <div className='avatar'>{stand_for("Jamie Morgan")}</div>
                            <div className='displayname'>Jamie Morgan</div>
                            <div className='update_time'>2H AGO. EDITED 1H AGO</div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='post_content'>
                        <p>I’m implementing Dijkstra for a directed graph. With non-negative weights it works, but the example below returns 2 for B even though A → C → B has a total cost of 1.</p> 

                        <p> I mark a node as visited when it leaves the priority queue. Why can’t I just update its distance later? Here’s the part of my Python implementation I’m unsure about: </p>
                    </div>
                </div>
                <div className="post_location">
                    <div className='heading'>POSTED IN</div>
                    <div className='special_tag area'>COMPUTER SCIENCE</div>
                    <div className='special_tag subject'>ALGORITHM</div>
                </div>
                <div className="post_related">
                    <div className="heading">
                        RELATED POSTS 
                    </div>
                    <div className="post_list">
                        {post_list.map((item, index) => (
                            <PostCard
                                key={index}
                                id={index}
                                displayname={item.displayname}
                                title={item.title}
                                upvote={item.upvote}
                                downvote={item.downvote}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='comment_group'>
                <div className="heading">
                    Comments ({24})
                </div>
                <CommentPost comment={comment} onChange={(comment: string) => {setComment(comment)}}/>
                <div className="comment_list">
                    <CommentCard id={1} displayname='An' updateTime={Date.now()} comment={test} depth={0}/>
                    <CommentCard id={2} displayname='An' updateTime={Date.now()} comment={'Comment nay chi mang tinh chat minh hoa'} depth={1}/>
                    <CommentCard id={3} displayname='An' updateTime={Date.now()} comment={'Comment nay chi mang tinh chat minh hoa'} depth={2}/>
                    <CommentCard id={4} displayname='An' updateTime={Date.now()} comment={'Comment nay chi mang tinh chat minh hoa'} depth={0}/>
                    <CommentCard id={5} displayname='An' updateTime={Date.now()} comment={'Comment nay chi mang tinh chat minh hoa'} depth={1}/>
                    <CommentCard id={6} displayname='An' updateTime={Date.now()} comment={'Comment nay chi mang tinh chat minh hoa'} depth={2}/>
                    <CommentCard id={7} displayname='An' updateTime={Date.now()} comment={'Comment nay chi mang tinh chat minh hoa'} depth={0}/>
                </div>
            </div>
        </div>
    </div>
}

export default ViewPostPage