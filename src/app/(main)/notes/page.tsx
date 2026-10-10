import { createClient } from '@/lib/supabase/server';
import NotesClient from './NotesClient';

export const metadata = {
  title: 'Notes | CampusOne',
  description: 'Browse and download study materials shared by your campus community',
};

export default async function NotesPage() {
  const supabase = await createClient();

  const [notesRes, subjectsRes] = await Promise.all([
    supabase
      .from('notes')
      .select('*, uploader:profiles!uploaded_by(user_id, full_name, avatar_url), subject:subjects(id, name, code, semester)')
      .order('created_at', { ascending: false })
      .limit(60),
    supabase
      .from('subjects')
      .select('id, name, code, semester')
      .order('name'),
  ]);

  return <NotesClient initialNotes={(notesRes.data || []) as any} subjects={(subjectsRes.data || []) as any} />;
}

