

import React, { useState, useEffect } from 'react';


const BlogAdmin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Blog post state
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [postLoading, setPostLoading] = useState(false);



  // Fetch posts from Firestore


  // const fetchPosts = async () => {
  //   setPostLoading(true);
  //   const querySnapshot = await getDocs(collection(db, 'posts'));
    setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setPostLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <h1>Blog Admin</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout} style={{ marginTop: 16 }}>Logout</button>
          <hr style={{ margin: '2rem 0' }} />
          <h2>{editId ? 'Edit Post' : 'Create New Post'}</h2>
          <form
            onSubmit={async e => {
              e.preventDefault();
              setPostLoading(true);
              if (editId) {
                // Update post
                await updateDoc(doc(db, 'posts', editId), { title, content });
                setEditId(null);
              } else {
                // Create post
                await addDoc(collection(db, 'posts'), { title, content, created: new Date().toISOString() });
              }
              setTitle('');
              setContent('');
              fetchPosts();
              setPostLoading(false);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              required
            />
            <button type="submit" disabled={postLoading}>
              {postLoading ? (editId ? 'Saving...' : 'Creating...') : (editId ? 'Save Changes' : 'Create Post')}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setTitle(''); setContent(''); }}>
                Cancel Edit
              </button>
            )}
          </form>
          <hr style={{ margin: '2rem 0' }} />
          <h2>All Posts</h2>
          {postLoading ? (
            <p>Loading...</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {posts.map(post => (
                <li key={post.id} style={{ border: '1px solid #ccc', borderRadius: 8, margin: '1rem 0', padding: 16, textAlign: 'left' }}>
                  <strong>{post.title}</strong>
                  <div style={{ whiteSpace: 'pre-wrap', margin: '0.5rem 0' }}>{post.content}</div>
                  <button onClick={() => { setEditId(post.id); setTitle(post.title); setContent(post.content); }}>Edit</button>
                  <button onClick={async () => { setPostLoading(true); await deleteDoc(doc(db, 'posts', post.id)); fetchPosts(); setPostLoading(false); }} style={{ marginLeft: 8, color: 'red' }}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default BlogAdmin;
