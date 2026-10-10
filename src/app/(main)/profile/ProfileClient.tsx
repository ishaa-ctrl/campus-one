'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, FileText, ShoppingBag, Search, MapPin, Building2, BookOpen, Hash, Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import NoteCard from '@/components/cards/NoteCard';
import MarketplaceCard from '@/components/cards/MarketplaceCard';
import LostFoundCard from '@/components/cards/LostFoundCard';
import EmptyState from '@/components/ui/EmptyState';
import { getInitials } from '@/lib/utils';
import type { Profile, ProfileStats, Note, MarketplaceItem, LostFoundPost } from '@/types/database';

interface Props {
  profile: Profile;
  authEmail: string;
  stats: ProfileStats;
  myNotes: Note[];
  myListings: MarketplaceItem[];
  myPosts: LostFoundPost[];
  isOwnProfile: boolean;
  profileMissing?: boolean;
}

const tabs = [
  { key: 'notes', label: 'My Notes', icon: FileText },
  { key: 'listings', label: 'My Listings', icon: ShoppingBag },
  { key: 'lost-found', label: 'Lost & Found', icon: Search },
];

export default function ProfileClient({ profile, authEmail, stats, myNotes, myListings, myPosts, isOwnProfile, profileMissing }: Props) {
  const [activeTab, setActiveTab] = useState('notes');

  // Use the authoritative email from the Supabase auth user
  const displayEmail = authEmail || profile.email;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Missing Warning */}
      {profileMissing && isOwnProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Profile setup incomplete</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Your profile record is missing. Please{' '}
              <Link href="/profile/edit" className="underline font-medium">complete your profile</Link>{' '}
              to display your information correctly.
            </p>
          </div>
        </motion.div>
      )}

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 lg:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-campus-purple flex items-center justify-center flex-shrink-0 shadow-button">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-white">{getInitials(profile.full_name)}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-campus-text">{profile.full_name}</h1>
                {/* Always show the verified auth email */}
                <p className="flex items-center gap-1.5 text-campus-text-secondary text-sm mt-1">
                  <Mail className="w-3.5 h-3.5 text-campus-purple flex-shrink-0" />
                  <span className="truncate">{displayEmail}</span>
                </p>
              </div>
              {isOwnProfile && (
                <Link
                  href="/profile/edit"
                  className="btn-secondary flex items-center gap-2 text-sm flex-shrink-0"
                >
                  <Edit className="w-4 h-4" /> Edit Profile
                </Link>
              )}
            </div>

            {profile.bio && <p className="text-campus-text-secondary text-sm mt-3 leading-relaxed">{profile.bio}</p>}

            {/* Metadata chips */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
              {profile.usn && (
                <span className="flex items-center gap-1.5 text-sm text-campus-text-secondary">
                  <Hash className="w-4 h-4 text-campus-purple flex-shrink-0" />
                  {profile.usn}
                </span>
              )}
              {profile.department && (
                <span className="flex items-center gap-1.5 text-sm text-campus-text-secondary">
                  <Building2 className="w-4 h-4 text-campus-purple flex-shrink-0" />
                  {profile.department}
                </span>
              )}
              {profile.semester > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-campus-text-secondary">
                  <BookOpen className="w-4 h-4 text-campus-purple flex-shrink-0" />
                  Semester {profile.semester}
                </span>
              )}
              {profile.college && (
                <span className="flex items-center gap-1.5 text-sm text-campus-text-secondary">
                  <MapPin className="w-4 h-4 text-campus-purple flex-shrink-0" />
                  <span className="truncate max-w-[200px]">{profile.college}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-campus-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-campus-purple">{stats.notesUploaded}</p>
            <p className="text-xs text-campus-text-secondary mt-0.5">Notes Uploaded</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-campus-success">{stats.itemsSold}</p>
            <p className="text-xs text-campus-text-secondary mt-0.5">Items Sold</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-500">{stats.foundItems}</p>
            <p className="text-xs text-campus-text-secondary mt-0.5">Found Items</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto custom-scrollbar pb-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-campus-purple text-white shadow-button'
                  : 'bg-white text-campus-text-secondary hover:bg-campus-purple-light hover:text-campus-purple shadow-card'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'notes' && (
        myNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myNotes.map((n, i) => <NoteCard key={n.id} note={n} index={i} />)}
          </div>
        ) : (
          <EmptyState icon={FileText} title="No notes uploaded" description="Share study materials with your campus!" actionLabel="Upload Notes" actionHref="/notes/upload" />
        )
      )}
      {activeTab === 'listings' && (
        myListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myListings.map((item, i) => <MarketplaceCard key={item.id} item={item} index={i} />)}
          </div>
        ) : (
          <EmptyState icon={ShoppingBag} title="No listings" description="Start selling items on campus!" actionLabel="Create Listing" actionHref="/marketplace/create" />
        )
      )}
      {activeTab === 'lost-found' && (
        myPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myPosts.map((p, i) => <LostFoundCard key={p.id} post={p} index={i} />)}
          </div>
        ) : (
          <EmptyState icon={Search} title="No posts" description="Report lost or found items" actionLabel="Create Post" actionHref="/lost-found/create" />
        )
      )}
    </div>
  );
}
