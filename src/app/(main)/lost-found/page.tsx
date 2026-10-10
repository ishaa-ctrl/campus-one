import { createClient } from '@/lib/supabase/server';
import LostFoundClient from './LostFoundClient';

export const metadata = {
  title: 'Lost & Found | CampusOne',
  description: 'Report and find lost items on campus',
};

export default async function LostFoundPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('lost_found_posts')
    .select('*, poster:profiles!posted_by(user_id, full_name, avatar_url)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(60);

  return <LostFoundClient initialPosts={(posts || []) as any} />;
}

