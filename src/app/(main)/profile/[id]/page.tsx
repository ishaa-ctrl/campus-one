import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProfileClient from '../ProfileClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('full_name').eq('user_id', id).single();
  return { title: data ? `${data.full_name} | CampusOne` : 'User Not Found' };
}

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [userRes, profileRes, notesRes, listingsRes, foundRes, userNotes, userListings, userPosts] = await Promise.all([
    supabase.auth.getUser().catch(() => ({ data: { user: null } })),
    supabase.from('profiles').select('*').eq('user_id', id).single(),
    supabase.from('notes').select('id', { count: 'exact', head: true }).eq('uploaded_by', id),
    supabase.from('marketplace_items').select('id', { count: 'exact', head: true }).eq('seller_id', id).eq('status', 'sold'),
    supabase.from('lost_found_posts').select('id', { count: 'exact', head: true }).eq('posted_by', id).eq('type', 'found'),
    supabase.from('notes').select('*, uploader:profiles!uploaded_by(user_id, full_name, avatar_url)').eq('uploaded_by', id).order('created_at', { ascending: false }).limit(12),
    supabase.from('marketplace_items').select('*, seller:profiles!seller_id(user_id, full_name, avatar_url), images:marketplace_images(id, image_url, display_order)').eq('seller_id', id).eq('status', 'active').order('created_at', { ascending: false }).limit(12),
    supabase.from('lost_found_posts').select('*, poster:profiles!posted_by(user_id, full_name, avatar_url)').eq('posted_by', id).eq('status', 'active').order('created_at', { ascending: false }).limit(12),
  ]);

  if (!profileRes.data) notFound();

  const currentUser = userRes.data?.user;

  return (
    <ProfileClient
      profile={profileRes.data}
      stats={{ notesUploaded: notesRes.count || 0, itemsSold: listingsRes.count || 0, foundItems: foundRes.count || 0 }}
      myNotes={(userNotes.data || []) as any}
      myListings={(userListings.data || []) as any}
      myPosts={(userPosts.data || []) as any}
      isOwnProfile={currentUser?.id === id}
    />
  );
}

