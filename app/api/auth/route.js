import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${username}@mixpay.com`, // Trick jika ingin login via username di Supabase Auth
    password: password,
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 401 });
  return NextResponse.json({ message: 'Login Success', user: data.user });
}
