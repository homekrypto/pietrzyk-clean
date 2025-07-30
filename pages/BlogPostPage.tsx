

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { marked } from 'marked';
  const { slug } = useParams<{ slug: string }>();  
  const [post, setPost] = useState<any | null>(null);  
  const [notFound, setNotFound] = useState(false);  
  const [loading, setLoading] = useState(true);  
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // const ref = doc(db, 'posts', slug);
  //   // const snap = await getDoc(ref);
  //   setLoading(true);
  //   const ref = doc(db, 'posts', slug);
  //   const snap = await getDoc(ref);
  //   if (!snap.exists()) {
  //     setNotFound(true);
  //     setLoading(false);
  //     return;
  //   }
  //   setPost(snap.data());
  //   setLoading(false);
  // };
  // fetchPost();
  // }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto py-8 px-4 text-center">Ładowanie...</div>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Nie znaleziono wpisu</h1>
          <Link to="/blog" className="text-accent hover:underline">Powrót do bloga</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <article className="max-w-2xl mx-auto py-12 px-4 prose dark:prose-invert">
        <Link to="/blog" className="text-accent hover:underline">← Powrót do bloga</Link>
        <h1 className="mt-4 mb-2 text-3xl font-bold">{post.meta.title}</h1>
        <div className="text-xs text-slate-400 mb-6">{post.meta.date}</div>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(post.content || '') }} />
      </article>
      <Footer />
    </>
  );
};

export default BlogPostPage;
