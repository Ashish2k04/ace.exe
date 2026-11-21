export interface Project {
  id: string; // URL slug, e.g. 'qevro-ai'
  title: string;
  category: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'qevro-ai',
    title: 'Qevro AI',
    category: 'AI-Powered Search & Conversation',
    description:
      'Qevro AI is an AI-powered search platform that delivers intelligent answers to your queries with relevant information from the web. Built with modern web technologies and AI integrations, it makes research faster and information easier to explore.',
    technologies: ['Next.js', 'Tailwind', 'Langchain', 'Vercel', 'Render'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://qevro-ai.vercel.app',
    githubUrl: 'https://github.com/Ashish2k04/qevro-ai',
  },
  {
    id: 'ace-exe',
    title: 'ace.exe',
    category: 'Portfolio & Admin CMS',
    description:
      'Minimalist monochrome developer portfolio dashboard featuring interactive black hole particle physics, an AI-powered Echo RAG chatbot, and custom shell architecture.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://ashishtiwari.dev',
    githubUrl: 'https://github.com/Ashish2k04/ace.exe',
  },
  {
    id: 'duelaris-ai-arena',
    title: 'Duelaris AI Arena',
    category: 'Multi-Model AI Comparison',
    description:
      'Side-by-side LLM benchmark and arena playground comparing speed, accuracy, and output tone across different leading AI language models in real time.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://duelaris.vercel.app',
    githubUrl: 'https://github.com/Ashish2k04/duelaris-ai-arena',
  },
  {
    id: 'fabruna',
    title: 'Fabruna',
    category: 'Clothing E-Commerce',
    description:
      'Modern lifestyle and apparel e-commerce storefront featuring curated collections, responsive catalog filtering, smooth micro-interactions, and secure checkout.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://fabruna.com',
    githubUrl: 'https://github.com/Ashish2k04/fabruna',
  },
  {
    id: 'hari-naman-greens',
    title: 'Hari Naman Greens',
    category: 'Client Real Estate Website',
    description:
      'Production web application designed and deployed for Hari Naman Greens, highlighting premium property landscapes, architectural amenities, and dynamic client inquiry scheduling.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://harinamangreens.com',
    githubUrl: 'https://github.com/Ashish2k04/hari-naman-greens',
  },
  {
    id: 'cloudvault',
    title: 'CloudVault',
    category: 'Distributed Object Storage',
    description:
      'High-availability S3-compatible blob storage with automated chunking, parallel multi-part streaming, and AES-256 client-side encryption for secure data persistence.',
    technologies: ['TypeScript', 'Node.js', 'AWS S3', 'Docker', 'Express'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://cloudvault.ashishtiwari.dev',
    githubUrl: 'https://github.com/Ashish2k04/cloudvault',
  },
  {
    id: 'flowstate',
    title: 'FlowState',
    category: 'Developer Workflow Engine',
    description:
      'Real-time collaborative task runner, git commit hooks analyzer, and sprint velocity tracker built to streamline modern software engineering workflows.',
    technologies: ['React', 'WebSockets', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://flowstate.ashishtiwari.dev',
    githubUrl: 'https://github.com/Ashish2k04/flowstate',
  },
  {
    id: 'hyperion',
    title: 'Hyperion',
    category: 'Telemetry & Observability',
    description:
      'Sub-millisecond metrics aggregator streaming time-series telemetry data into low-latency visual dashboards with anomaly detection and automated incident alerts.',
    technologies: ['Go', 'React', 'TimescaleDB', 'Docker', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://hyperion.ashishtiwari.dev',
    githubUrl: 'https://github.com/Ashish2k04/hyperion',
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'Realtime Audio & Chat',
    description:
      'Peer-to-peer encrypted messaging and crystal-clear voice rooms powered by WebRTC mesh networks and distributed low-latency socket clusters.',
    technologies: ['WebRTC', 'React', 'Socket.io', 'Node.js', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://pulse.ashishtiwari.dev',
    githubUrl: 'https://github.com/Ashish2k04/pulse',
  },
  {
    id: 'synthetix',
    title: 'Synthetix',
    category: 'AI Code Intelligence',
    description:
      'Local vector search and static analysis agent providing deep multi-repo architectural insights, intelligent documentation generation, and automated refactoring recommendations.',
    technologies: ['Python', 'LangChain', 'FastAPI', 'React', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://synthetix.ashishtiwari.dev',
    githubUrl: 'https://github.com/Ashish2k04/synthetix',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return PROJECTS.find((p) => p.id.toLowerCase() === normalized);
};
