// Mock Supabase Auth API endpoint
export default function handler(req, res) {
  console.log('🚨 MOCK AUTH API CALLED:', req.method, req.url, req.query);
  
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;
  
  if (endpoint === 'user') {
    return res.status(200).json({
      user: null,
      session: null
    });
  }
  
  if (endpoint === 'session') {
    return res.status(200).json({
      session: null,
      user: null
    });
  }
  
  if (endpoint === 'signout') {
    return res.status(200).json({
      error: null
    });
  }
  
  // Default auth response
  return res.status(200).json({
    user: null,
    session: null,
    error: null
  });
}
