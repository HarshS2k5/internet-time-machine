import { TechExplainer } from '../types/timeline';

export const TECH_EXPLAINERS: TechExplainer[] = [
  {
    id: 'dialup-modem',
    title: 'How 56k Dial-Up Modems Worked',
    category: 'Networking & Hardware',
    summary: 'Before fiber and broadband, modems translated computer digital binary bits into screeching audible sound waves over standard copper telephone lines.',
    icon: 'PhoneCall',
    steps: [
      {
        stepNumber: 1,
        title: 'Lifting the Receiver (Off-Hook)',
        description: 'Your PC commanded the modem via Hayes AT commands (ATDT 555-1234) to open the analog telephone circuit and dial the ISP access node.',
        technicalDetail: 'Commands sent over RS-232 serial interface at speeds like 115,200 baud to local modem hardware controller.'
      },
      {
        stepNumber: 2,
        title: 'The Screeching Handshake (V.90 Protocol)',
        description: 'Both modems exchanged high-pitched tones to probe the analog line quality, measure line noise, and negotiate maximum transmission rates.',
        technicalDetail: 'V.90 exploited the fact that telephone central offices digitized voice at 8 kHz x 8 bits = 64 kbps (DS0 channels), allowing 56 kbps downstream using Pulse Code Modulation (PCM).'
      },
      {
        stepNumber: 3,
        title: 'Trellis Modulation & Echo Cancellation',
        description: 'Modulating digital 1s and 0s into changes in frequency, amplitude, and phase angle (QAM) while canceling out the modem’s own transmitted echo.',
        technicalDetail: 'Upstream was capped at 33.6 kbps due to analog-to-digital quantization noise introduced by telco codecs.'
      },
      {
        stepNumber: 4,
        title: 'PPP Packet Encapsulation',
        description: 'Once synchronized, the Point-to-Point Protocol (PPP) layer negotiated an IP address with the ISP server, opening the gateway to the global internet.',
        technicalDetail: 'TCP/IP packets flowed over PPP frames with an MTU typically configured to 576 or 1500 bytes.'
      }
    ]
  },
  {
    id: 'search-pagerank',
    title: 'How Search Engines & PageRank Work',
    category: 'Web Architecture',
    summary: 'How Google revolutionized the web by turning hyperlinks into democratic votes of authority, moving beyond simple keyword frequency.',
    icon: 'Search',
    steps: [
      {
        stepNumber: 1,
        title: 'Web Crawling (Spiders & Bots)',
        description: 'Automated crawlers like Googlebot traverse the public web, downloading HTML pages and following every hyperlink to discover new and updated pages.',
        technicalDetail: 'Crawlers respect robots.txt protocols, parse sitemaps, and store raw documents in huge distributed storage clusters.'
      },
      {
        stepNumber: 2,
        title: 'Tokenization & Inverted Indexing',
        description: 'The search engine breaks web page text into individual tokens, removes stop words, stems verbs, and compiles a massive inverted index.',
        technicalDetail: 'Instead of searching document by document, the inverted index maps each word directly to a sorted list of page IDs containing that word (posting lists).'
      },
      {
        stepNumber: 3,
        title: 'PageRank Link Analysis',
        description: 'Invented by Larry Page and Sergey Brin at Stanford in 1998, PageRank models a random web surfer navigating links indefinitely.',
        technicalDetail: 'A page’s score equals the sum of PageRanks of pages pointing to it, divided by their outbound link counts, solved via the principal eigenvector of the web hyperlink matrix.'
      },
      {
        stepNumber: 4,
        title: 'Query Scoring & Ranking',
        description: 'When a user enters a search, the engine combines BM25 keyword relevance, PageRank authority, user geography, freshness, and neural rank embeddings in under 200ms.',
        technicalDetail: 'Hundreds of ranking signals and vector similarity projections score billions of candidate documents in milliseconds.'
      }
    ]
  },
  {
    id: 'dns-resolution',
    title: 'How DNS Resolves Domain Names in Milliseconds',
    category: 'Internet Infrastructure',
    summary: 'The phonebook of the internet that seamlessly translates human-friendly domain names like google.com into machine-routable IP addresses like 142.250.190.46.',
    icon: 'Globe',
    steps: [
      {
        stepNumber: 1,
        title: 'Browser & OS Cache Check',
        description: 'When you type a URL, your browser first checks its local cache and the operating system hosts cache. If found, resolution takes 0 milliseconds.',
        technicalDetail: 'Records are stored with a Time-To-Live (TTL) header set in seconds by the domain owner.'
      },
      {
        stepNumber: 2,
        title: 'Recursive DNS Resolver',
        description: 'If uncached, your operating system asks your ISP or public DNS provider (e.g., 8.8.8.8 or 1.1.1.1) to find the address recursively.',
        technicalDetail: 'The recursive resolver initiates an iterative query chain across global authoritative name servers.'
      },
      {
        stepNumber: 3,
        title: 'Root & TLD Servers',
        description: 'The resolver asks one of the 13 global root server clusters for the .com Top-Level Domain (TLD) server IP address.',
        technicalDetail: 'The TLD server (managed by Verisign for .com) responds with the authoritative nameservers for the specific domain.'
      },
      {
        stepNumber: 4,
        title: 'Authoritative Nameserver Return',
        description: 'The authoritative nameserver looks up its zone file, returns the IPv4 "A" or IPv6 "AAAA" record to the resolver, which caches it and returns it to your browser.',
        technicalDetail: 'Your browser immediately opens a TCP/TLS handshake with the resolved IP address.'
      }
    ]
  },
  {
    id: 'video-streaming',
    title: 'How Modern Video Streaming (HLS/DASH) Works',
    category: 'Media & Web',
    summary: 'How YouTube, Netflix, and Twitch deliver 4K video seamlessly without buffering, even on unpredictable mobile cellular connections.',
    icon: 'PlayCircle',
    steps: [
      {
        stepNumber: 1,
        title: 'Encoding & Transmuxing',
        description: 'Uploaded master videos are compressed into multiple bitrate ladders and resolutions (1080p, 720p, 480p, 360p) using codecs like H.264, VP9, or AV1.',
        technicalDetail: 'Audio and video tracks are separated and encoded independently with keyframe intervals aligned precisely.'
      },
      {
        stepNumber: 2,
        title: 'Chunking into 2-6 Second Segments',
        description: 'The video is sliced into hundreds of tiny individual MPEG-TS or fragmented MP4 (fMP4) chunks, each lasting 2 to 6 seconds.',
        technicalDetail: 'A master manifest file (.m3u8 for HLS or .mpd for MPEG-DASH) lists the URLs and bitrates of every segment.'
      },
      {
        stepNumber: 3,
        title: 'CDN Edge Caching',
        description: 'These video segments are distributed to thousands of Content Delivery Network (CDN) edge servers located geographically close to users.',
        technicalDetail: 'Edge nodes cache segments in RAM or fast NVMe storage, drastically reducing latency and backbone transit load.'
      },
      {
        stepNumber: 4,
        title: 'Adaptive Bitrate Switching (ABR)',
        description: 'The video player monitors buffer health and download speed per segment. If bandwidth drops, it switches seamlessly to a lower bitrate chunk on the fly without stopping playback.',
        technicalDetail: 'Transitions happen on keyframe boundaries (IDR frames) so viewers notice resolution changes but never experience buffering spinners.'
      }
    ]
  },
  {
    id: 'large-language-models',
    title: 'How AI & Large Language Models Predict Text',
    category: 'Artificial Intelligence',
    summary: 'How transformer neural networks process prompt tokens in parallel and generate coherent human reasoning through attention mechanisms.',
    icon: 'Cpu',
    steps: [
      {
        stepNumber: 1,
        title: 'Tokenization & Vector Embedding',
        description: 'Input words and code are broken into numeric subword tokens (Byte-Pair Encoding) and projected into high-dimensional vector space (e.g. 4096+ dimensions).',
        technicalDetail: 'Each vector encapsulates semantic concepts, positional encodings, and relational meanings.'
      },
      {
        stepNumber: 2,
        title: 'Multi-Head Self-Attention',
        description: 'The core Transformer mechanism calculates Query, Key, and Value matrices, allowing every token to evaluate its mathematical relationship to every other token in the prompt.',
        technicalDetail: 'Attention scores are computed as softmax((Q * K^T) / sqrt(d_k)) * V across dozens of attention heads in parallel.'
      },
      {
        stepNumber: 3,
        title: 'Deep Feedforward & Layer Norm',
        description: 'Tokens pass through tens or hundreds of neural transformer layers, refining abstract representations and activating parametric knowledge stored during pre-training.',
        technicalDetail: 'Residual skip connections and RMSNorm stabilize gradients and facilitate training across trillions of parameters.'
      },
      {
        stepNumber: 4,
        title: 'Next-Token Probability & Sampling',
        description: 'The final layer outputs logits over a vocabulary of ~100,000 tokens. A softmax function converts logits into probabilities, and the model selects the next token.',
        technicalDetail: 'Temperature and top-p sampling tune creativity versus determinism. The chosen token is appended to the input and the loop repeats (autoregression).'
      }
    ]
  }
];
