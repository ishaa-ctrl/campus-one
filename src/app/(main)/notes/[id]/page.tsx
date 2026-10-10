import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import NoteDetailClient from './NoteDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: note } = await supabase.from('notes').select('title, description').eq('id', id).single();
  return {
    title: note ? `${note.title} | CampusOne Notes` : 'Note Not Found',
    description: note?.description || 'View note details on CampusOne',
  };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [userRes, noteRes] = await Promise.all([
    supabase.auth.getUser().catch(() => ({ data: { user: null } })),
    supabase
      .from('notes')
      .select('*, uploader:profiles!uploaded_by(user_id, full_name, avatar_url), subject:subjects(id, name, code, semester)')
      .eq('id', id)
      .single(),
  ]);

  const note = noteRes.data;
  if (!note) notFound();

  const user = userRes.data?.user;
  let isSaved = false;

  if (user?.id) {
    const { data: savedItem } = await supabase
      .from('saved_items')
      .select('id')
      .eq('user_id', user.id)
      .eq('item_type', 'note')
      .eq('item_id', id)
      .single();
    isSaved = !!savedItem;
  }

  return <NoteDetailClient note={note as any} isSaved={isSaved} isOwner={user?.id === note.uploaded_by} />;
}

