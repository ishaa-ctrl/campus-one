import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'Dashboard | CampusOne',
  description: 'Your CampusOne dashboard',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Run user fetch and all independent list queries in parallel
  const [
    userRes,
    notesCountRes,
    marketplaceCountRes,
    lostFoundCountRes,
    latestNotesRes,
    marketplaceItemsRes,
    lostFoundPostsRes,
    announcementsRes,
  ] = await Promise.all([
    supabase.auth.getUser().catch(() => ({ data: { user: null } })),
    supabase.from('notes').select('id', { count: 'exact', head: true }),
    supabase.from('marketplace_items').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('lost_found_posts').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase
      .from('notes')
      .select('*, uploader:profiles!uploaded_by(user_id, full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('marketplace_items')
      .select('*, seller:profiles!seller_id(user_id, full_name, avatar_url), images:marketplace_images(id, image_url, display_order)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('lost_found_posts')
      .select('*, poster:profiles!posted_by(user_id, full_name, avatar_url)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('announcements')
      .select('*, creator:profiles!created_by(user_id, full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(3),
  ]);

  const user = userRes.data?.user;
  let profile = null;

  if (user?.id) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    profile = data;
  }

  return (
    <DashboardClient
      profile={profile}
      stats={{
        totalNotes: notesCountRes.count || 0,
        totalListings: marketplaceCountRes.count || 0,
        totalLostFound: lostFoundCountRes.count || 0,
      }}
      latestNotes={(latestNotesRes.data || []) as any}
      marketplaceItems={(marketplaceItemsRes.data || []) as any}
      lostFoundPosts={(lostFoundPostsRes.data || []) as any}
      announcements={(announcementsRes.data || []) as any}
    />
  );
}

