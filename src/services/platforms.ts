
export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  { 
    id: 'twitter',
    name: 'Twitter',
    icon: '/platforms/twitter.svg',
    color: 'bg-blue-500'
  },
  { 
    id: 'facebook',
    name: 'Facebook',
    icon: '/platforms/facebook.svg',
    color: 'bg-blue-600'
  },
  { 
    id: 'instagram',
    name: 'Instagram',
    icon: '/platforms/instagram.svg',
    color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500'
  },
  { 
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/platforms/linkedin.svg',
    color: 'bg-blue-700'
  },
  { 
    id: 'youtube',
    name: 'YouTube',
    icon: '/platforms/youtube.svg',
    color: 'bg-red-600'
  },
  { 
    id: 'tiktok',
    name: 'TikTok',
    icon: '/platforms/tiktok.svg',
    color: 'bg-black'
  },
  { 
    id: 'pinterest',
    name: 'Pinterest',
    icon: '/platforms/pinterest.svg',
    color: 'bg-red-700'
  },
  { 
    id: 'reddit',
    name: 'Reddit',
    icon: '/platforms/reddit.svg',
    color: 'bg-orange-600'
  }
];
