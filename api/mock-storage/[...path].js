// Mock Supabase Storage API endpoint  
export default function handler(req, res) {
  console.log('🚨 MOCK STORAGE API CALLED:', req.method, req.url, req.query);
  
  // Default storage response
  return res.status(200).json({
    data: [],
    error: null
  });
}
