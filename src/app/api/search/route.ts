import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ notes: [], marketplace: [], lostFound: [] });
  }

  const searchPattern = `%${query}%`;

  const [notesRes, marketplaceRes, lostFoundRes] = await Promise.all([
    supabase
      .from('notes')
      .select('id, title, semester, subject_name')
      .or(`title.ilike.${searchPattern},description.ilike.${searchPattern},subject_name.ilike.${searchPattern}`)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('marketplace_items')
      .select('id, title, price, category')
      .eq('status', 'active')
      .or(`title.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('lost_found_posts')
      .select('id, item_name, type, location')
      .eq('status', 'active')
      .or(`item_name.ilike.${searchPattern},description.ilike.${searchPattern},location.ilike.${searchPattern}`)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return NextResponse.json({
    notes: notesRes.data || [],
    marketplace: marketplaceRes.data || [],
    lostFound: lostFoundRes.data || [],
  });
}
