import React from 'react';
import Image from 'next/image';

interface CommentAuthor {
  name: string;
  email: string;
  isRestricted: boolean;
  avatar?: {
    url: string;
  };
}

interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    node: CommentAuthor;
  };
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-4 p-4 bg-gray-100 rounded">
              <div className="flex items-center mb-2">
                <Image
                  src={comment.author.node.isRestricted ? (comment.author.node.avatar?.url || '/default-avatar.png') : '/default-avatar.png'}
                  alt={`${comment.author.node.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold">{comment.author.node.name}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(comment.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;