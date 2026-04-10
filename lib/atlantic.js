const ATLANTIC_URL = 'https://atlantich2h.com';

async function fetchAtlantic(endpoint, body = {}) {
  const params = new URLSearchParams();
  params.append('api_key', process.env.ATLANTIC_API_KEY);
  for (const key in body) params.append(key, body[key]);

  const res = await fetch(`${ATLANTIC_URL}/api/v1${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  return res.json();
}

export const atlantic = {
  getProfile: () => fetchAtlantic('/get_profile'),
  createDeposit: (data) => fetchAtlantic('/deposit/create', data),
  instantSettlement: (id) => fetchAtlantic('/deposit/instant', { id, action: 'true' }),
  checkStatus: (id) => fetchAtlantic('/deposit/status', { id }),
};
