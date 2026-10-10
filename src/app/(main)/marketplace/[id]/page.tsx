import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import MarketplaceDetailClient from './MarketplaceDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('marketplace_items').select('title, description').eq('id', id).single();
  return {
    title: data ? `${data.title} | CampusOne Marketplace` : 'Item Not Found',
    description: data?.description || 'View item details',
  };
}

export default async function MarketplaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [userRes, itemRes] = await Promise.all([
    supabase.auth.getUser().catch(() => ({ data: { user: null } })),
    supabase
      .from('marketplace_items')
      .select('*, seller:profiles!seller_id(user_id, full_name, avatar_url), images:marketplace_images(id, image_url, display_order)')
      .eq('id', id)
      .single(),
  ]);

  const item = itemRes.data;
  if (!item) notFound();

  const user = userRes.data?.user;
  let isSaved = false;

  if (user?.id) {
    const { data: savedItem } = await supabase
      .from('saved_items')
      .select('id')
      .eq('user_id', user.id)
      .eq('item_type', 'marketplace_item')
      .eq('item_id', id)
      .single();
    isSaved = !!savedItem;
  }

  return <MarketplaceDetailClient item={item as any} isSaved={isSaved} isOwner={user?.id === item.seller_id} />;
}

