'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Loader2, Save, CheckCircle, Mail, Hash, User, Building2, BookOpen, MapPin } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import toast from 'react-hot-toast';
import { DEPARTMENTS, SEMESTERS, getInitials } from '@/lib/utils';
import type { Profile } from '@/types/database';

export default function EditProfilePage() {
  const router = useRouter();
  const { refreshProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    department: '',
    semester: 1,
    college: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const loadProfile = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    setAuthEmail(user.email || '');

    const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
    if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name,
        department: data.department,
        semester: data.semester,
        college: data.college || '',
        bio: data.bio || '',
      });
      if (data.avatar_url) setAvatarPreview(data.avatar_url);
    } else {
      // Profile row doesn't exist yet — pre-fill from auth metadata
      const meta = user.user_metadata ?? {};
      setFormData({
        full_name: meta.full_name || user.email?.split('@')[0] || '',
        department: meta.department || '',
        semester: meta.semester || 1,
        college: meta.college || '',
        bio: '',
      });
    }
    setFetching(false);
  }, [router]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB'); return; }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setAvatarPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name.trim()) { toast.error('Full name is required'); return; }
    setLoading(true);
    setSaved(false);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Not authenticated'); return; }

      let avatarUrl = profile?.avatar_url ?? null;

      // Upload avatar if changed
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop();
        const fileName = `${user.id}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, { upsert: true });

        if (uploadError) {
          // Non-fatal: avatar upload might fail if bucket doesn't exist
          console.warn('Avatar upload failed:', uploadError.message);
          toast.error('Avatar upload failed — profile info will still be saved');
        } else {
          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
          avatarUrl = publicUrl;
        }
      }

      const updates = {
        user_id: user.id,
        full_name: formData.full_name.trim(),
        email: user.email || '',
        department: formData.department,
        semester: formData.semester,
        college: formData.college,
        bio: formData.bio.trim() || null,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      let dbError: Error | null = null;

      if (profile?.id) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('user_id', user.id);
        if (error) dbError = error;
      } else {
        // Insert profile row (first time setup)
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (existingProfile) {
          const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('user_id', user.id);
          if (error) dbError = error;
        } else {
          const { error } = await supabase
            .from('profiles')
            .insert({ ...updates, usn: user.user_metadata?.usn || '' });
          if (error) dbError = error;
        }
      }

      if (dbError) {
        toast.error(`Failed to save: ${dbError.message}`);
        return;
      }

      // Refresh the AuthProvider's profile cache so the Header updates immediately
      await refreshProfile();

      setSaved(true);
      toast.success('Profile updated!');

      // Navigate back after a brief moment so user sees the success state
      setTimeout(() => {
        router.push('/profile');
        router.refresh();
      }, 800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-campus-purple" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-sm text-campus-text-secondary hover:text-campus-purple mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Profile
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-campus-text mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-campus-purple flex items-center justify-center overflow-hidden shadow-button">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {getInitials(formData.full_name || 'U')}
                  </span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-9 h-9 bg-campus-purple rounded-full flex items-center justify-center cursor-pointer shadow-button hover:bg-campus-purple-accent transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Email — read-only, from Supabase auth */}
          <div>
            <label className="label flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-campus-purple" /> Email Address
            </label>
            <input
              type="email"
              value={authEmail}
              disabled
              className="input-field bg-campus-bg cursor-not-allowed opacity-70"
            />
            <p className="text-xs text-campus-text-secondary mt-1">
              Email is linked to your account and cannot be changed here.
            </p>
          </div>

          {/* USN — read-only */}
          <div>
            <label className="label flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-campus-purple" /> USN
            </label>
            <input
              type="text"
              value={profile?.usn || ''}
              disabled
              className="input-field bg-campus-bg cursor-not-allowed opacity-70"
            />
            {!profile?.usn && (
              <p className="text-xs text-amber-600 mt-1">
                USN not set. It is assigned during signup and cannot be changed.
              </p>
            )}
            {profile?.usn && (
              <p className="text-xs text-campus-text-secondary mt-1">USN cannot be changed.</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="label flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-campus-purple" /> Full Name <span className="text-campus-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={e => setFormData(p => ({ ...p, full_name: e.target.value }))}
              className="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* College */}
          <div>
            <label className="label flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-campus-purple" /> College
            </label>
            <input
              type="text"
              value={formData.college}
              onChange={e => setFormData(p => ({ ...p, college: e.target.value }))}
              className="input-field"
              placeholder="e.g., RV College of Engineering"
            />
          </div>

          {/* Department + Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-campus-purple" /> Department
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData(p => ({ ...p, department: e.target.value }))}
                className="input-field appearance-none cursor-pointer"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="label flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-campus-purple" /> Semester
              </label>
              <select
                value={formData.semester}
                onChange={e => setFormData(p => ({ ...p, semester: parseInt(e.target.value) }))}
                className="input-field appearance-none cursor-pointer"
              >
                {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="label">Bio</label>
            <textarea
              placeholder="Tell your campus about yourself..."
              value={formData.bio}
              onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))}
              className="input-field min-h-[100px] resize-y"
              maxLength={300}
            />
            <p className="text-xs text-campus-text-secondary mt-1 text-right">{formData.bio.length}/300</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || saved}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
