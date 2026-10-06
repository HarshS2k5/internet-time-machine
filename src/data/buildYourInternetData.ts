import { BuildComponentItem } from '../types/timeline';

export const BUILD_COMPONENTS: BuildComponentItem[] = [
  // OS
  {
    id: 'os-dos',
    name: 'MS-DOS 6.22',
    year: 1994,
    category: 'OS',
    icon: 'Terminal',
    description: 'Black-and-green command line prompt with autoexec.bat and config.sys memory tuning.',
    vibe: 'Hardcore Hacker'
  },
  {
    id: 'os-win95',
    name: 'Windows 95',
    year: 1995,
    category: 'OS',
    icon: 'Monitor',
    description: 'The iconic Start button, rolling cloudy sky startup chime, and Taskbar revolution.',
    vibe: '90s Mainstream Trailblazer'
  },
  {
    id: 'os-winxp',
    name: 'Windows XP (Luna Blue)',
    year: 2001,
    category: 'OS',
    icon: 'Layout',
    description: 'Rolling green Bliss hillside, Fisher-Price royal blue taskbar, and rock-solid NT kernel.',
    vibe: 'Golden Age Nostalgia'
  },
  {
    id: 'os-mactiger',
    name: 'Mac OS X Tiger (Aqua UI)',
    year: 2005,
    category: 'OS',
    icon: 'Laptop',
    description: 'Brushed metal windows, pulsating blue jelly buttons, and Spotlight search drop-downs.',
    vibe: 'Creative Aesthetic Purist'
  },
  {
    id: 'os-ubuntu',
    name: 'Ubuntu 8.04 Hardy Heron',
    year: 2008,
    category: 'OS',
    icon: 'Cpu',
    description: 'Aubergine and human brown GNOME 2 desktop with Compiz wobbly windows and 3D cube effects.',
    vibe: 'Open Source Rebel'
  },

  // Browser
  {
    id: 'browser-netscape',
    name: 'Netscape Navigator 3.0',
    year: 1996,
    category: 'Browser',
    icon: 'Compass',
    description: 'Pulsing nautical steering wheel, textured silver toolbar buttons, and the thrill of the wild web.',
    vibe: 'Original Cyber Navigator'
  },
  {
    id: 'browser-ie6',
    name: 'Internet Explorer 6',
    year: 2001,
    category: 'Browser',
    icon: 'Globe',
    description: 'The browser that ruled 95% of the world with ActiveX controls and yellow script error dialogs.',
    vibe: 'Y2K Dominator'
  },
  {
    id: 'browser-firefox',
    name: 'Firefox 3.5 (The Fox Fire)',
    year: 2008,
    category: 'Browser',
    icon: 'Flame',
    description: 'Custom tab themes, Adblock Plus extensions, and the fiery fox that broke Microsoft’s monopoly.',
    vibe: 'Web Standards Champion'
  },
  {
    id: 'browser-opera',
    name: 'Opera 9 (M2 Speed Dial)',
    year: 2006,
    category: 'Browser',
    icon: 'Zap',
    description: 'Pioneered browser tabs, mouse gestures, speed dial bookmarks, and integrated BitTorrent.',
    vibe: 'Avant-Garde Power User'
  },
  {
    id: 'browser-chrome',
    name: 'Google Chrome 1.0',
    year: 2008,
    category: 'Browser',
    icon: 'Chrome',
    description: 'Minimal Omnibox URL bar, sandboxed V8 multi-process tabs, and blazingly fast JavaScript execution.',
    vibe: 'Speed & Simplicity'
  },

  // Search Engine
  {
    id: 'search-yahoo',
    name: 'Yahoo! Directory 1996',
    year: 1996,
    category: 'Search',
    icon: 'FolderTree',
    description: 'Hand-curated human web directory organized into Computers, Entertainment, and Society categories.',
    vibe: 'Human Curator'
  },
  {
    id: 'search-askjeeves',
    name: 'Ask Jeeves',
    year: 1999,
    category: 'Search',
    icon: 'HelpCircle',
    description: 'Asking the dignified butler in plain English: "Where can I find free MP3s?".',
    vibe: 'Inquisitive Dreamer'
  },
  {
    id: 'search-altavista',
    name: 'AltaVista',
    year: 1997,
    category: 'Search',
    icon: 'Search',
    description: 'DEC supercomputer crawler with boolean operators AND, OR, NEAR, and multilingual Babelfish.',
    vibe: 'Deep Web Researcher'
  },
  {
    id: 'search-google2004',
    name: 'Google (Classic Clean)',
    year: 2004,
    category: 'Search',
    icon: 'Sparkles',
    description: 'Pure white page, primary color serif logo, and "I\'m Feeling Lucky" button.',
    vibe: 'Modern Minimalist'
  },

  // Messenger
  {
    id: 'msg-icq',
    name: 'ICQ (Uh-Oh!)',
    year: 1998,
    category: 'Messenger',
    icon: 'Bell',
    description: '9-digit UIN numbers, green flower icon, and that unforgettable horn honk "Uh-Oh!" ping.',
    vibe: 'Pioneer Chatter'
  },
  {
    id: 'msg-aim',
    name: 'AOL Instant Messenger (AIM)',
    year: 2001,
    category: 'Messenger',
    icon: 'MessageSquare',
    description: 'Subtle door-creak arrivals, slam departures, and cryptic Dashboard Confessional away messages.',
    vibe: 'Social Butterfly'
  },
  {
    id: 'msg-msn',
    name: 'MSN Messenger',
    year: 2004,
    category: 'Messenger',
    icon: 'Users',
    description: 'Winks, nudge vibration screen shakes, and setting your status to the Winamp track currently playing.',
    vibe: 'Teen Culture Icon'
  },
  {
    id: 'msg-discord',
    name: 'Discord',
    year: 2017,
    category: 'Messenger',
    icon: 'Radio',
    description: 'Low-latency Opus voice rooms, bot integrations, animated custom emojis, and community servers.',
    vibe: 'Connected Gamer'
  },

  // Social / Community
  {
    id: 'social-geocities',
    name: 'GeoCities Homepage',
    year: 1997,
    category: 'Social',
    icon: 'Home',
    description: 'Your own personal corner in Heartland, blinking animated GIFs, and Webrings.',
    vibe: 'DIY Web Artisan'
  },
  {
    id: 'social-myspace',
    name: 'MySpace (Profile Songs & Top 8)',
    year: 2006,
    category: 'Social',
    icon: 'Music',
    description: 'Tom as friend #1, raw HTML/CSS custom wallpaper skins, and autoplay emo rock anthems.',
    vibe: 'HTML Scene Kid'
  },
  {
    id: 'social-reddit',
    name: 'Classic Reddit / Digg',
    year: 2007,
    category: 'Social',
    icon: 'Share2',
    description: 'Upvotes, comment nested trees, and community self-moderation of the front page of the internet.',
    vibe: 'Curious Redditor'
  },
  {
    id: 'social-tumblr',
    name: 'Tumblr Golden Age',
    year: 2012,
    category: 'Social',
    icon: 'Feather',
    description: 'Microblogging, GIF sets, reblogs, fandom discourse, and bespoke dark aesthetic themes.',
    vibe: 'Creative Soul'
  },

  // Music Player
  {
    id: 'music-winamp',
    name: 'Winamp 2.91 ("Whips the Llama")',
    year: 1999,
    category: 'MusicPlayer',
    icon: 'Music2',
    description: 'Equalizer visualizer oscilloscope, custom skins, and local 128 kbps MP3 playlists.',
    vibe: 'Audiophile Purist'
  },
  {
    id: 'music-ipod',
    name: 'Apple iPod (Click Wheel)',
    year: 2004,
    category: 'MusicPlayer',
    icon: 'Disc',
    description: '1,000 songs in your pocket, tactile mechanical scroll wheel, and signature white earbuds.',
    vibe: 'Stylist Trendsetter'
  },
  {
    id: 'music-limewire',
    name: 'LimeWire (Gnutella P2P)',
    year: 2003,
    category: 'MusicPlayer',
    icon: 'Download',
    description: 'Lime-slice loading bar, 4-star peer ratings, and hoping the track wasn’t an audio trick.',
    vibe: 'Digital Adventurer'
  },
  {
    id: 'music-spotify',
    name: 'Spotify Streaming Cloud',
    year: 2015,
    category: 'MusicPlayer',
    icon: 'Headphones',
    description: 'Instant access to 100 million tracks on demand with Discover Weekly algorithm recommendations.',
    vibe: 'Modern Streamer'
  },

  // Hardware Device
  {
    id: 'dev-crt-tower',
    name: 'Beige CRT Tower PC',
    year: 1996,
    category: 'Device',
    icon: 'Monitor',
    description: 'Heavy 15-inch curved glass CRT monitor, ball mouse, 56k external modem, and Turbo button.',
    vibe: '90s Battle Station'
  },
  {
    id: 'dev-imac-g3',
    name: 'iMac G3 (Bondi Blue)',
    year: 1998,
    category: 'Device',
    icon: 'Sparkle',
    description: 'Translucent turquoise plastic, integrated stereo speakers, and the absence of a floppy drive.',
    vibe: 'Design Revolutionary'
  },
  {
    id: 'dev-thinkpad',
    name: 'IBM ThinkPad T42',
    year: 2004,
    category: 'Device',
    icon: 'Laptop',
    description: 'Indestructible matte black clamshell, red TrackPoint rubber nub, and ThinkLight keyboard illumination.',
    vibe: 'Professional Road Warrior'
  },
  {
    id: 'dev-iphone4',
    name: 'iPhone 4 (Retina Display)',
    year: 2010,
    category: 'Device',
    icon: 'Smartphone',
    description: 'Glass sandwich body, steel antenna band, and pixels so dense your eye couldn’t distinguish them.',
    vibe: 'Mobile Pioneer'
  }
];
