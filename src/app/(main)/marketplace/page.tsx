import { createClient } from '@/lib/supabase/server';
import MarketplaceClient from './MarketplaceClient';

export const metadata = {
  title: 'Marketplace | CampusOne',
  description: 'Buy and sell items within your campus community',
};

export default async function MarketplacePage() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from('marketplace_items')
    .select('*, seller:profiles!seller_id(user_id, full_name, avatar_url), images:marketplace_images(id, image_url, display_order)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(60);

  return <MarketplaceClient initialItems={(items || []) as any} />;
}

