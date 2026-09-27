export type GoodieType = 'barter' | 'give' | 'both';

export type GoodieCategory =
  | 'T-Shirt'
  | 'Hoodie'
  | 'Jacket'
  | 'Sticker'
  | 'Mug'
  | 'Bottle'
  | 'Cap'
  | 'Bag'
  | 'Notebook'
  | 'Pin'
  | 'Badge'
  | 'Tech Accessory'
  | 'Other';

export type GoodieCondition =
  | 'Mint / Brand New'
  | 'Brand New in Box'
  | 'Like New (Unworn)'
  | 'Gently Used';

export type ApparelSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | 'Universal' | 'N/A';

export type ExchangeMode = 'Shipping' | 'Local Meetup' | 'Both';

export type GoodieStatus = 'active' | 'in_negotiation' | 'paused' | 'completed' | 'draft';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  city: string;
  country: string;
  karma: number;
  goodiesListedCount: number;
  successfulBartersCount: number;
  goodiesGivenCount: number;
  rating: number;
  reviewCount: number;
  isVerifiedAttendee: boolean;
  fulfillmentRate: number; // e.g. 99.4%
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorUsername: string;
  rating: number;
  comment: string;
  date: string;
  goodieName: string;
  tradeType: 'barter' | 'give';
}

export interface Goodie {
  id: string;
  title: string;
  description: string;
  type: GoodieType;
  category: GoodieCategory;
  event: string;
  organization: string;
  year: number;
  condition: GoodieCondition;
  size?: ApparelSize;
  dimensions?: string;
  images: string[];
  exchangeMode: ExchangeMode;
  city: string;
  ownerId: string;
  owner: User;
  status: GoodieStatus;
  createdAt: string;
  viewsCount: number;
  // For Barter listings
  wishlist?: string;
  targetCategories?: GoodieCategory[];
  targetEvents?: string[];
  // For Give listings
  giverNote?: string;
  requestsCount?: number;
  offersCount?: number;
}

export type BarterStatus =
  | 'pending'
  | 'countered'
  | 'accepted_escrow'
  | 'in_transit'
  | 'completed'
  | 'declined'
  | 'cancelled';

export interface BarterOffer {
  id: string;
  goodieRequestedId: string;
  goodieRequested: Goodie;
  proposerId: string;
  proposer: User;
  ownerId: string;
  owner: User;
  offeredGoodieIds: string[];
  offeredGoodies: Goodie[];
  message: string;
  exchangeMode: 'Shipping' | 'Local Meetup';
  status: BarterStatus;
  createdAt: string;
  expiresInHours: number;
  trackingNumber?: string;
  shippingCarrier?: string;
  escrowStep?: 1 | 2 | 3 | 4; // 1: Terms agreed, 2: Label generated, 3: In Transit, 4: Mutual Release
}

export interface GiveawayRequest {
  id: string;
  goodieId: string;
  goodie: Goodie;
  requesterId: string;
  requester: User;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  deliveryPreference: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachmentImage?: string;
  attachmentMeta?: string;
  isSystemNotice?: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  goodieId: string;
  goodieTitle: string;
  type: 'barter' | 'giveaway';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  statusText: string;
  barterOffer?: BarterOffer;
  giveawayRequest?: GiveawayRequest;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'offer_received' | 'offer_accepted' | 'request_received' | 'request_accepted' | 'item_shipped' | 'karma_earned';
  linkTarget?: {
    view: AppView;
    id?: string;
  };
}

export type AppView =
  | 'landing'
  | 'explore'
  | 'goodie-detail'
  | 'my-goodies'
  | 'my-barters'
  | 'my-giveaways'
  | 'messages'
  | 'profile'
  | 'settings'
  | 'how-it-works';
