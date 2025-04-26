
export type Platform = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  monetizable: boolean;
  minRequirementsForMonetization: string;
  apiAvailable: boolean;
  features: string[];
};

export const platforms: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    icon: "/platforms/youtube.svg",
    color: "bg-red-500",
    description: "Share videos and gain subscribers",
    monetizable: true,
    minRequirementsForMonetization: "1,000 subscribers and 4,000 watch hours in the past 12 months",
    apiAvailable: true,
    features: ["Subscribers", "Views", "Watch Time", "Comments", "Likes", "Shares"]
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/platforms/instagram.svg",
    color: "bg-pink-500",
    description: "Boost followers and engagement",
    monetizable: true,
    minRequirementsForMonetization: "10,000 followers and at least 30 days of activity",
    apiAvailable: true,
    features: ["Followers", "Likes", "Comments", "Saves", "Shares", "Profile Visits"]
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: "/platforms/twitter.svg",
    color: "bg-blue-400",
    description: "Increase followers and interactions",
    monetizable: true,
    minRequirementsForMonetization: "500+ followers and 3 months of platform activity",
    apiAvailable: true,
    features: ["Followers", "Likes", "Retweets", "Replies", "Impressions", "Profile Visits"]
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "/platforms/tiktok.svg",
    color: "bg-black",
    description: "Grow your audience and views",
    monetizable: true,
    minRequirementsForMonetization: "10,000 followers and 100,000 video views in 30 days",
    apiAvailable: true,
    features: ["Followers", "Views", "Likes", "Comments", "Shares", "Live Stream"]
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/platforms/facebook.svg",
    color: "bg-blue-600",
    description: "Build your community and page likes",
    monetizable: true,
    minRequirementsForMonetization: "10,000 page followers and 600,000 total minutes viewed",
    apiAvailable: true,
    features: ["Page Likes", "Post Reach", "Engagement", "Video Views", "Group Members", "Events"]
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "/platforms/linkedin.svg",
    color: "bg-blue-700",
    description: "Expand your professional network",
    monetizable: true,
    minRequirementsForMonetization: "1,000+ followers and regular content posting",
    apiAvailable: true,
    features: ["Connections", "Followers", "Post Views", "Engagement Rate", "Profile Visits", "Endorsements"]
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: "/platforms/twitch.svg",
    color: "bg-purple-600",
    description: "Build your streaming audience",
    monetizable: true,
    minRequirementsForMonetization: "Affiliate: 50 followers, 500 minutes broadcast, 7 unique broadcast days, avg 3+ viewers",
    apiAvailable: true,
    features: ["Followers", "Subscribers", "Viewers", "Bits", "Donations", "Channel Points"]
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "/platforms/pinterest.svg",
    color: "bg-red-600",
    description: "Grow your visual discovery audience",
    monetizable: true,
    minRequirementsForMonetization: "Business account and approved for monetization",
    apiAvailable: true,
    features: ["Followers", "Pin Saves", "Link Clicks", "Impressions", "Engagement", "Video Views"]
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "/platforms/snapchat.svg",
    color: "bg-yellow-400",
    description: "Expand your snap followers",
    monetizable: true,
    minRequirementsForMonetization: "Spotlight program requirements vary by region",
    apiAvailable: true,
    features: ["Subscribers", "Views", "Screenshots", "Shares", "Story Completions", "Discover Views"]
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "/platforms/reddit.svg",
    color: "bg-orange-600",
    description: "Build karma and community engagement",
    monetizable: true,
    minRequirementsForMonetization: "Varies by program, typically high karma and active communities",
    apiAvailable: true,
    features: ["Karma", "Post Upvotes", "Comments", "Awards", "Community Members", "Post Reach"]
  }
];

export const getPlatform = (id: string): Platform | undefined => {
  return platforms.find(platform => platform.id === id);
};

export const getMonetizablePlatforms = (): Platform[] => {
  return platforms.filter(platform => platform.monetizable === true);
};

export const getAllPlatforms = (): Platform[] => {
  return platforms;
};
