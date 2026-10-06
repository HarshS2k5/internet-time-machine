import { SpeedPreset } from '../types/timeline';

export interface SpeedTestPayload {
  id: string;
  name: string;
  sizeBytes: number;
  sizeLabel: string;
  icon: string;
  description: string;
}

export const SPEED_PRESETS: SpeedPreset[] = [
  {
    era: '1995',
    year: 1995,
    name: '28.8 kbps Dial-up Modem (V.34)',
    speedKbps: 28.8,
    speedLabel: '28.8 kbps (3.6 KB/s)',
    latencyMs: 180,
    description: 'You are connected through a standard landline telephone copper wire. If anyone in the house picks up the phone receiver, your connection drops!',
  },
  {
    era: '1998',
    year: 1998,
    name: '56k V.90 Dial-up Modem',
    speedKbps: 56,
    speedLabel: '56.0 kbps (7.0 KB/s)',
    latencyMs: 140,
    description: 'The golden age of dial-up. Screeching handshakes, Netscape Navigator, and praying the connection holds for your MP3 download.',
  },
  {
    era: '2004',
    year: 2004,
    name: '1.5 Mbps Broadband ADSL',
    speedKbps: 1500,
    speedLabel: '1.5 Mbps (187.5 KB/s)',
    latencyMs: 65,
    description: 'Always-on broadband! No more dial-up sounds and no busy phone lines. Flash games, iTunes, and early World of Warcraft.',
  },
  {
    era: '2010',
    year: 2010,
    name: '15 Mbps Cable / 3G Mobile',
    speedKbps: 15000,
    speedLabel: '15.0 Mbps (1.87 MB/s)',
    latencyMs: 40,
    description: 'YouTube 720p HD video buffers smoothly. Wi-Fi routers in every home and early smartphone apps downloading on the go.',
  },
  {
    era: '2016',
    year: 2016,
    name: '50 Mbps 4G LTE & Fiber',
    speedKbps: 50000,
    speedLabel: '50.0 Mbps (6.25 MB/s)',
    latencyMs: 25,
    description: 'Full 1080p streaming, Steam cloud games, and instant Instagram photo uploads anywhere in the city.',
  },
  {
    era: '2020',
    year: 2020,
    name: '200 Mbps High-Speed Fiber',
    speedKbps: 200000,
    speedLabel: '200 Mbps (25.0 MB/s)',
    latencyMs: 12,
    description: 'Work from home era. Multiple 4K video streams, simultaneous Zoom video calls, and zero buffering.',
  },
  {
    era: '2026',
    year: 2026,
    name: '1,000 Mbps Gigabit Fiber & 5G SA',
    speedKbps: 1000000,
    speedLabel: '1.0 Gbps (125.0 MB/s)',
    latencyMs: 4,
    description: 'Gigabit speeds and sub-5ms latency. Instant AI multi-gigabyte models streaming in real-time alongside spatial video.',
  },
];

export const SPEED_PAYLOADS: SpeedTestPayload[] = [
  {
    id: 'webpage',
    name: 'Retro Web Page (1996)',
    sizeBytes: 50 * 1024, // 50 KB
    sizeLabel: '50 KB',
    icon: '🌐',
    description: 'A classic 1996 HTML document with two small animated GIF images and a visitor counter.',
  },
  {
    id: 'photo',
    name: 'High-Res Digital Photo',
    sizeBytes: 2.5 * 1024 * 1024, // 2.5 MB
    sizeLabel: '2.5 MB',
    icon: '📷',
    description: 'A 12-megapixel JPEG photograph taken with a digital camera.',
  },
  {
    id: 'mp3',
    name: 'MP3 Music Track (128 kbps)',
    sizeBytes: 4.5 * 1024 * 1024, // 4.5 MB
    sizeLabel: '4.5 MB',
    icon: '🎵',
    description: 'A single 4-minute compressed MP3 song downloaded from Napster or LimeWire.',
  },
  {
    id: 'video',
    name: '10-Minute Video Clip',
    sizeBytes: 85 * 1024 * 1024, // 85 MB
    sizeLabel: '85 MB',
    icon: '🎬',
    description: 'A 720p HD YouTube video clip with AAC stereo audio.',
  },
  {
    id: 'game',
    name: 'Full Video Game Download',
    sizeBytes: 45 * 1024 * 1024 * 1024, // 45 GB
    sizeLabel: '45 GB',
    icon: '🎮',
    description: 'A complete modern AAA game download from Steam.',
  },
];

// Helper to format simulated download time nicely
export function formatDownloadTime(seconds: number): string {
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)} ms (Instant!)`;
  }
  if (seconds < 60) {
    return `${seconds.toFixed(1)} seconds`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSecs = Math.round(seconds % 60);
  if (minutes < 60) {
    return `${minutes} min ${remainingSecs} sec`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (hours < 24) {
    return `${hours} hr ${remainingMins} min`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days} days ${remainingHours} hrs`;
}
