const API_KEY = process.env.ATLANTIC_API_KEY;
const BASE_URL = 'https://atlantich2h.com';

export const atlantic = {
  // Ambil profil & saldo pusat
  getProfile: async () => {
    const res = await fetch(`${BASE_URL}/get_profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ api_key: API_KEY })
    });
    return res.json();
  },

  // Buat QRIS Deposit (Payment)
  createQRIS: async (reff_id, nominal) => {
    const res = await fetch(`${BASE_URL}/deposit/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: API_KEY,
        reff_id: reff_id,
        nominal: nominal,
        type: 'ewallet',
        metode: 'qris'
      })
    });
    return res.json();
  },

  // Cek Nama Rekening untuk Withdraw
  cekRekening: async (bank_code, acc_number) => {
    const res = await fetch(`${BASE_URL}/transfer/cek_rekening`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: API_KEY,
        bank_code: bank_code,
        account_number: acc_number
      })
    });
    return res.json();
  }
};
