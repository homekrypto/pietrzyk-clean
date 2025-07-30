

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface BlogPostMeta {
  id: string;
  title: string;
  date: string;
  description?: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const querySnapshot = await getDocs(collection(db, 'posts'));
  //     const loadedPosts: BlogPostMeta[] = querySnapshot.docs.map(doc => {
  //       const data = doc.data();
  //       return {
  //         id: doc.id,
  //         title: data.title || doc.id,
  //         date: data.created ? data.created.split('T')[0] : '',
  //         description: data.description || '',
  //       };
  //     });
  //     loadedPosts.sort((a, b) => b.date.localeCompare(a.date));
  //     setPosts(loadedPosts);
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
      {loading ? (
        <p className="text-center text-slate-500">Ładowanie...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-slate-500">Brak wpisów na blogu.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.id} className="border-b pb-4">
              <Link to={`/blog/${post.id}`} className="text-xl font-semibold text-accent hover:underline">
                {post.title}
              </Link>
              <div className="text-xs text-slate-400 mt-1">{post.date}</div>
              {post.description && <div className="mt-2 text-slate-600">{post.description}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPage;
