'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, MapPin } from 'lucide-react';
import type { MarketplaceItem } from '@/types/database';
import { formatPrice, getConditionLabel, getCategoryLabel } from '@/lib/utils';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  index?: number;
}

const conditionColors: Record<string, string> = {
  new: 'bg-emerald-50 text-emerald-600',
  like_new: 'bg-blue-50 text-blue-600',
  good: 'bg-amber-50 text-amber-600',
  fair: 'bg-orange-50 text-orange-600',
  poor: 'bg-red-50 text-red-600',
};

function MarketplaceCardComponent({ item, index = 0 }: MarketplaceCardProps) {
  const imageUrl = item.images?.[0]?.image_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link href={`/marketplace/${item.id}`} className="block">
        <div className="card card-hover overflow-hidden h-full">
          {/* Image */}
          <div className="relative h-44 bg-campus-bg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Tag className="w-12 h-12 text-campus-text-secondary/30" />
              </div>
            )}
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${conditionColors[item.condition] || 'bg-gray-100 text-gray-600'}`}>
              {getConditionLabel(item.condition)}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-campus-text text-sm line-clamp-2 flex-1">{item.title}</h3>
              <span className="text-campus-purple font-bold text-base whitespace-nowrap">
                {formatPrice(item.price)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-campus-text-secondary">
              <span className="badge-gray">{getCategoryLabel(item.category)}</span>
              {item.location && (
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </span>
              )}
            </div>

            {/* Seller */}
            {item.seller && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-campus-border">
                <div className="w-5 h-5 rounded-full bg-campus-purple flex items-center justify-center shrink-0">
                  <span className="text-[8px] font-semibold text-white">
                    {item.seller.full_name?.charAt(0)}
                  </span>
                </div>
                <span className="text-[11px] text-campus-text-secondary truncate">
                  {item.seller.full_name}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default memo(MarketplaceCardComponent);

