// Mock Supabase API endpoint - blocks all Supabase calls
export default function handler(req, res) {
  console.log('🚨 MOCK SUPABASE API CALLED:', req.method, req.url, req.query);
  
  // Log the request for debugging
  console.log('Request params:', req.query);
  console.log('Request body:', req.body);
  
  // Return appropriate mock data based on the endpoint
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;
  
  if (endpoint === 'get_accounts') {
    return res.status(200).json([
      {
        id: 'mock-account-1',
        name: 'Mock Account',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);
  }
  
  if (endpoint === 'get_account_members') {
    return res.status(200).json([
      {
        id: 'mock-member-1',
        name: 'Mock Member',
        role: 'owner',
        account_id: 'mock-account-1'
      }
    ]);
  }
  
  if (endpoint === 'get_personal_account') {
    return res.status(200).json([
      {
        id: 'mock-personal-account',
        name: 'Personal Account',
        is_personal: true,
        created_at: new Date().toISOString()
      }
    ]);
  }
  
  // Default response for any other RPC calls
  return res.status(200).json({
    data: [],
    count: 0,
    error: null
  });
}
