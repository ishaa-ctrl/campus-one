import { createClient } from '@/lib/supabase/server';
import AnnouncementsClient from './AnnouncementsClient';

export const metadata = { title: 'Announcements | CampusOne' };

export default async function AnnouncementsPage() {
  const supabase = await createClient();

  const [userRes, announcementsRes] = await Promise.all([
    supabase.auth.getUser().catch(() => ({ data: { user: null } })),
    supabase
      .from('announcements')
      .select('*, creator:profiles!created_by(user_id, full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  const user = userRes.data?.user;
  let isAdmin = false;

  if (user?.id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();
    isAdmin = profile?.role === 'admin';
  }

  return <AnnouncementsClient announcements={(announcementsRes.data || []) as any} isAdmin={isAdmin} />;
}

