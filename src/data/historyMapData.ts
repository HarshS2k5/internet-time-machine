import { HistoryMapNode } from '../types/timeline';

export const HISTORY_MAP_NODES: HistoryMapNode[] = [
  {
    id: 'arpanet',
    label: 'ARPANET Packet Switching',
    year: 1969,
    category: 'tech',
    summary: 'The original military/academic network using decentralized packet switching instead of dedicated telephone circuit lines.',
    connections: ['tcp-ip', 'email']
  },
  {
    id: 'email',
    label: 'Ray Tomlinson & Email (@)',
    year: 1971,
    category: 'social',
    summary: 'First network email message sent across ARPANET, introducing the @ symbol to designate remote hosts.',
    connections: ['usenet', 'aim']
  },
  {
    id: 'tcp-ip',
    label: 'TCP/IP Standardized',
    year: 1983,
    category: 'tech',
    summary: 'Vint Cerf and Bob Kahn\'s universal networking protocol adopted on January 1, 1983 — the official birthday of the Internet.',
    connections: ['dns', 'www']
  },
  {
    id: 'dns',
    label: 'Domain Name System (DNS)',
    year: 1984,
    category: 'tech',
    summary: 'Paul Mockapetris replaces numeric IP memorization with hierarchical domain names like .com, .org, and .gov.',
    connections: ['www', 'search-engine']
  },
  {
    id: 'usenet',
    label: 'Usenet Newsgroups',
    year: 1980,
    category: 'social',
    summary: 'Pre-web worldwide distributed discussion system that birthed online flame wars, FAQs, and internet abbreviations.',
    connections: ['web-forums', 'irc']
  },
  {
    id: 'irc',
    label: 'Internet Relay Chat (IRC)',
    year: 1988,
    category: 'social',
    summary: 'Jarkko Oikarinen invents real-time global text channels, spawning online subcultures, bot scripts, and chat rooms.',
    connections: ['aim', 'discord']
  },
  {
    id: 'www',
    label: 'World Wide Web (WWW)',
    year: 1989,
    category: 'websites',
    summary: 'Tim Berners-Lee invents HTML, HTTP, and URLs at CERN, creating the hypertext web for sharing documents globally.',
    connections: ['mosaic', 'geocities', 'search-engine']
  },
  {
    id: 'mosaic',
    label: 'NCSA Mosaic Browser',
    year: 1993,
    category: 'websites',
    summary: 'Marc Andreessen and Eric Bina create the first graphical browser displaying inline images alongside text.',
    connections: ['netscape', 'javascript']
  },
  {
    id: 'netscape',
    label: 'Netscape Navigator',
    year: 1994,
    category: 'websites',
    summary: 'The commercial browser that ignited the 1990s dot-com boom and established web navigation for the masses.',
    connections: ['ie', 'javascript', 'firefox']
  },
  {
    id: 'javascript',
    label: 'JavaScript Created',
    year: 1995,
    category: 'tech',
    summary: 'Brendan Eich creates Mocha (JavaScript) at Netscape in 10 days, bringing interactive scripts and dynamic behavior to web pages.',
    connections: ['ajax', 'web20']
  },
  {
    id: 'geocities',
    label: 'GeoCities Homepages',
    year: 1994,
    category: 'social',
    summary: 'User-created homepages organized into themed neighborhoods (SiliconValley, Hollywood), proving users wanted to create, not just consume.',
    connections: ['myspace', 'web-forums']
  },
  {
    id: 'search-engine',
    label: 'Search Engines & Google',
    year: 1998,
    category: 'websites',
    summary: 'Google\'s PageRank algorithm indexes billions of interconnected web pages, transforming discovery and knowledge retrieval.',
    connections: ['wikipedia', 'web20']
  },
  {
    id: 'aim',
    label: 'AOL Instant Messenger (AIM)',
    year: 1997,
    category: 'social',
    summary: 'Buddy lists, door-slam sound effects, away messages, and buddy icons that shaped teenage social life for a decade.',
    connections: ['myspace', 'whatsapp']
  },
  {
    id: 'p2p-napster',
    label: 'Napster & P2P Revolution',
    year: 1999,
    category: 'tech',
    summary: 'Shawn Fanning enables direct peer-to-peer MP3 file sharing, forcing the entertainment industry into digital distribution.',
    connections: ['bittorrent', 'itunes']
  },
  {
    id: 'wikipedia',
    label: 'Wikipedia Free Encyclopedia',
    year: 2001,
    category: 'websites',
    summary: 'Crowdsourced open-knowledge collaboration that replaced multi-volume paper encyclopedias with real-time global consensus.',
    connections: ['web20', 'llm-data']
  },
  {
    id: 'ajax',
    label: 'AJAX & Dynamic Web Apps',
    year: 2005,
    category: 'tech',
    summary: 'Asynchronous JavaScript and XML allows web pages to fetch background data without reloading the screen (GMail, Google Maps).',
    connections: ['web20', 'single-page-apps']
  },
  {
    id: 'web20',
    label: 'Web 2.0 & User-Generated Content',
    year: 2004,
    category: 'eras',
    summary: 'The shift from static read-only websites to interactive participatory networks where users create the content.',
    connections: ['youtube', 'facebook', 'reddit']
  },
  {
    id: 'youtube',
    label: 'YouTube & Online Video',
    year: 2005,
    category: 'websites',
    summary: 'Democratized video broadcasting and video content creation globally, ushering in the vlogger and influencer economy.',
    connections: ['tiktok', 'streaming-era']
  },
  {
    id: 'facebook',
    label: 'Facebook & Modern Social Graph',
    year: 2004,
    category: 'social',
    summary: 'Connected real-world identities and friendship graphs, replacing anonymous handles with pervasive social timelines.',
    connections: ['instagram', 'mobile-revolution']
  },
  {
    id: 'iphone-mobile',
    label: 'iPhone & The Smartphone Era',
    year: 2007,
    category: 'tech',
    summary: 'Capacitive multi-touch, full Safari web browsing, and the App Store transformed the internet into a pocket-sized constant companion.',
    connections: ['mobile-revolution', 'app-stores', 'cloud-computing']
  },
  {
    id: 'mobile-revolution',
    label: 'Mobile-First Internet',
    year: 2010,
    category: 'eras',
    summary: 'Mobile web traffic surpasses desktop browsing worldwide, giving rise to responsive design and native app ecosystems.',
    connections: ['instagram', 'tiktok', 'uber-gig']
  },
  {
    id: 'cloud-computing',
    label: 'AWS & Modern Cloud Architecture',
    year: 2006,
    category: 'tech',
    summary: 'Amazon Web Services commoditizes compute and storage, allowing startups to scale globally with zero on-premise hardware.',
    connections: ['single-page-apps', 'ai-compute']
  },
  {
    id: 'deeplearning',
    label: 'Deep Learning & ImageNet Breakthrough',
    year: 2012,
    category: 'ai',
    summary: 'AlexNet runs convolutional neural networks on GPUs, proving deep learning vastly outperforms handcrafted computer vision algorithms.',
    connections: ['transformers', 'ai-compute']
  },
  {
    id: 'transformers',
    label: 'Transformers: Attention is All You Need',
    year: 2017,
    category: 'ai',
    summary: 'Google researchers introduce the Transformer architecture, replacing recurrent networks and enabling massive parallel self-attention training.',
    connections: ['chatgpt', 'generative-ai']
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT & Consumer Generative AI',
    year: 2022,
    category: 'ai',
    summary: 'OpenAI releases ChatGPT, reaching 100 million monthly active users in 2 months and inaugurating conversational generative AI.',
    connections: ['generative-ai', 'agentic-ai']
  },
  {
    id: 'agentic-ai',
    label: 'Autonomous Agentic Systems & Multi-Modal AI',
    year: 2026,
    category: 'ai',
    summary: 'Modern AI evolves from prompt-and-response chatbots into multimodal autonomous agents that code, browse, and execute complex workflows.',
    connections: []
  }
];
