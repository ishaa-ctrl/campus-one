import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export const metadata = { title: 'My Profile | CampusOne' };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user || authError) redirect('/login');

  const [profileRes, notesRes, listingsRes, foundRes, myNotes, myListings, myPosts] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('notes').select('id', { count: 'exact', head: true }).eq('uploaded_by', user.id),
    supabase.from('marketplace_items').select('id', { count: 'exact', head: true }).eq('seller_id', user.id).eq('status', 'sold'),
    supabase.from('lost_found_posts').select('id', { count: 'exact', head: true }).eq('posted_by', user.id).eq('type', 'found'),
    supabase.from('notes').select('*, uploader:profiles!uploaded_by(user_id, full_name, avatar_url)').eq('uploaded_by', user.id).order('created_at', { ascending: false }).limit(12),
    supabase.from('marketplace_items').select('*, seller:profiles!seller_id(user_id, full_name, avatar_url), images:marketplace_images(id, image_url, display_order)').eq('seller_id', user.id).neq('status', 'deleted').order('created_at', { ascending: false }).limit(12),
    supabase.from('lost_found_posts').select('*, poster:profiles!posted_by(user_id, full_name, avatar_url)').eq('posted_by', user.id).order('created_at', { ascending: false }).limit(12),
  ]);

  // If profile row is missing (e.g. first login or DB issue), show an empty-state page
  // rather than redirecting to login — the user IS authenticated.
  const profile = profileRes.data ?? {
    id: '',
    user_id: user.id,
    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Unknown',
    email: user.email || '',
    usn: user.user_metadata?.usn || '',
    department: user.user_metadata?.department || '',
    semester: user.user_metadata?.semester || 1,
    college: user.user_metadata?.college || '',
    avatar_url: null,
    bio: null,
    role: 'student' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <ProfileClient
      profile={profile}
      authEmail={user.email || ''}
      stats={{ notesUploaded: notesRes.count || 0, itemsSold: listingsRes.count || 0, foundItems: foundRes.count || 0 }}
      myNotes={(myNotes.data || []) as any}
      myListings={(myListings.data || []) as any}
      myPosts={(myPosts.data || []) as any}
      isOwnProfile={true}
      profileMissing={!profileRes.data}
    />
  );
}
