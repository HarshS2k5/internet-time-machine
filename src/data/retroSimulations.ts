export interface RetroSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export const GOOGLE_1998_SAMPLE_RESULTS: Record<string, RetroSearchResult[]> = {
  default: [
    {
      title: "Stanford University - Home Page",
      url: "http://www.stanford.edu/",
      snippet: "Welcome to Stanford University, located in Silicon Valley, California. Research in engineering, computer science, and humanities."
    },
    {
      title: "Netscape Communications Corporation",
      url: "http://www.netscape.com/",
      snippet: "Download Netscape Communicator 4.5! Experience the premier web browser with Netcaster, Composer, and Messenger."
    },
    {
      title: "AltaVista: The Search Network",
      url: "http://www.altavista.digital.com/",
      snippet: "AltaVista provides the largest Web index with 140 million pages indexed by Digital Equipment Corp supercomputers."
    },
    {
      title: "Yahoo! - A Guide to WWW",
      url: "http://www.yahoo.com/",
      snippet: "The world's premier hierarchical web directory. Search news, stocks, sports, and Yellow Pages."
    }
  ],
  netscape: [
    {
      title: "Netscape Navigator 4.08 Download",
      url: "http://home.netscape.com/download/",
      snippet: "The world's leading client software for the open Web. Includes support for Dynamic HTML and JavaScript 1.2."
    },
    {
      title: "Mozilla.org: Freeing the Netscape Source Code",
      url: "http://www.mozilla.org/",
      snippet: "Netscape announces plans to make browser source code freely available on the Internet under open source license."
    }
  ],
  spacejam: [
    {
      title: "Space Jam: The Official Movie Site",
      url: "http://www.warnerbros.com/spacejam/movie/jam.htm",
      snippet: "Michael Jordan and the Looney Tunes take on the Monstars in outer space! Download QuickTime trailers and desktop wallpapers."
    }
  ],
  doom: [
    {
      title: "id Software: DOOM Shareware v1.9",
      url: "http://www.idsoftware.com/doom/",
      snippet: "The revolutionary 3D action game. Download the shareware episode Knee-Deep in the Dead for MS-DOS."
    }
  ],
  linux: [
    {
      title: "The Linux Home Page (Linus Torvalds)",
      url: "http://www.linux.org/",
      snippet: "Linux is a free Unix-like kernel originally created by Linus Torvalds with assistance from developers around the world."
    }
  ]
};

export const YAHOO_1996_DIRECTORIES = [
  {
    category: "Arts and Humanities",
    subcategories: ["Architecture", "Photography", "Literature", "Art History", "Design"],
  },
  {
    category: "Business and Economy",
    subcategories: ["Companies", "Investments", "Classifieds", "Taxes", "Real Estate"],
  },
  {
    category: "Computers and Internet",
    subcategories: ["Internet", "Software", "Hardware", "Multimedia", "World Wide Web"],
  },
  {
    category: "Education",
    subcategories: ["Universities", "K-12", "Distance Learning", "Financial Aid"],
  },
  {
    category: "Entertainment",
    subcategories: ["Movies & Films", "Humor & Jokes", "Music", "Video Games", "Television"],
  },
  {
    category: "Government",
    subcategories: ["Agencies", "Military", "Law & Courts", "Politics", "White House"],
  },
  {
    category: "Science",
    subcategories: ["Astronomy", "Biology", "Physics", "Computer Science", "Space"],
  },
  {
    category: "Social Science",
    subcategories: ["Anthropology", "Archaeology", "Economics", "Linguistics"],
  },
];
