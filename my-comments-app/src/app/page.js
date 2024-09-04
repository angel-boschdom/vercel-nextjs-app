"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';

export default function CommentsPage() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch('/api/comments');
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });

    setComment('');
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
        />
        <button type="submit">Send</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id}>
              <td>{c.comment}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}