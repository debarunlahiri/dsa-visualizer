# DSA Animations & Learning Platform

A comprehensive, interactive platform for learning Data Structures and Algorithms through visualizations, hands-on practice, and coding challenges. Built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Features

### 🎯 Core Learning Features
- **50+ Interactive Algorithm Visualizations** - Step-by-step animations for sorting, searching, graph algorithms, and more
- **Multi-Language Code Execution** - Support for JavaScript, Python, Java, and C++ with real-time compilation
- **Interactive Problem Solving** - 1000+ coding problems with test cases and instant feedback
- **Comprehensive Learning Paths** - Structured curriculum from basics to advanced topics
- **Pattern Recognition Guide** - Master common algorithmic patterns for technical interviews

### 🛠️ Technical Features
- **Modern UI/UX** - Beautiful dark theme with responsive design
- **Code Editor Integration** - Monaco Editor with syntax highlighting and IntelliSense
- **Document Viewer** - Support for PDF, DOCX, and text files
- **Progress Tracking** - User analytics and learning progress via Supabase
- **SEO Optimized** - Complete with sitemaps, structured data, and meta tags
- **Real-time Execution** - Instant code compilation and execution results

### 📚 Content Coverage
- **Algorithms**: Sorting, Searching, Graph traversal, Dynamic Programming, Greedy algorithms
- **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Hash Tables
- **Techniques**: Two Pointers, Sliding Window, Backtracking, Recursion, Bit Manipulation
- **Interview Prep**: Common patterns, complexity analysis, and problem-solving strategies

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Monaco Editor** - VS Code-powered code editor

### Backend & Database
- **Supabase** - PostgreSQL database with real-time features
- **Next.js API Routes** - Server-side functionality
- **Python Execution API** - Multi-language code compilation

### Tools & Libraries
- **React Hook Form** - Form handling and validation
- **React PDF** - PDF document viewing
- **Mammoth.js** - DOCX document processing
- **KaTeX** - Mathematical notation rendering
- **Recharts** - Data visualization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dsa-animations-site.git
   cd dsa-animations-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dsa-animations-site/
├── app/                          # Next.js App Router
│   ├── api/                      # API endpoints
│   │   ├── execute/             # Code execution
│   │   ├── problems/            # Problem management
│   │   └── analytics/           # User analytics
│   ├── compiler/                # Multi-language compiler
│   ├── documents/               # Document viewer
│   ├── patterns/                # Algorithm patterns guide
│   ├── practice/                # Coding practice
│   ├── problems/                # Problem browser
│   ├── problem/[slug]/          # Individual problem pages
│   └── visualizer/              # Algorithm visualizations
├── components/                   # Reusable components
│   ├── dsa/                     # DSA-specific components
│   │   ├── *-visualizer.tsx     # Algorithm visualizers
│   │   └── algorithm-*.tsx      # Algorithm UI components
│   ├── ui/                      # UI components
│   └── *.tsx                    # Core components
├── lib/                         # Utilities and data
│   ├── algorithms/              # Algorithm implementations
│   │   ├── sorting/             # Sorting algorithms
│   │   ├── searching/           # Search algorithms
│   │   ├── graphs/              # Graph algorithms
│   │   ├── dynamic-programming/ # DP algorithms
│   │   └── *.ts                 # Algorithm logic
│   ├── problems.ts              # Problem definitions
│   ├── supabase.ts              # Database client
│   └── utils.ts                 # Utility functions
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
└── styles/                      # Global styles
```

## 🎨 Key Components

### Algorithm Visualizers
- **Sorting**: Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Radix
- **Searching**: Linear Search, Binary Search
- **Trees**: Binary Search Trees, Tree Traversals, Tries
- **Graphs**: BFS, DFS, Dijkstra's Algorithm
- **Dynamic Programming**: Fibonacci, Knapsack, Longest Common Subsequence
- **Advanced**: Backtracking, Union-Find, String Algorithms

### Interactive Features
- **Code Editor**: Monaco Editor with multi-language support
- **Problem Solver**: Interactive coding environment with test cases
- **Progress Tracking**: User analytics and learning progress
- **Document Viewer**: PDF and DOCX file support

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Database Setup
The project uses Supabase for data persistence. Import the schema files:
- `supabase-schema.sql` - Main database schema
- `supabase-problems-schema.sql` - Problems and analytics tables

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Railway**: Full Docker support for all language execution
- **Render**: Custom buildpacks for Java/C++ support
- **DigitalOcean**: App Platform with custom environments

### Important Notes
- **Language Support**: JavaScript works everywhere, Python/Java/C++ have platform limitations
- **Serverless Limitations**: Some languages may not work in serverless environments
- **See DEPLOYMENT.md** for detailed deployment instructions

## 📚 Learning Paths

### Beginner Path
1. **Foundations** - Big O notation, recursion basics
2. **Arrays & Strings** - Two pointers, sliding window
3. **Basic Sorting** - Bubble, selection, insertion sort
4. **Linear Data Structures** - Stacks, queues, linked lists

### Intermediate Path
1. **Advanced Sorting** - Merge sort, quicksort, heap sort
2. **Tree Algorithms** - Binary trees, BST operations
3. **Graph Basics** - BFS, DFS traversals
4. **Dynamic Programming** - Fibonacci, knapsack problems

### Advanced Path
1. **Complex Algorithms** - Dijkstra, A* search
2. **Advanced DP** - Longest common subsequence, edit distance
3. **String Algorithms** - KMP, Rabin-Karp
4. **System Design** - Hash tables, tries, union-find

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Add proper error handling
- Include comprehensive comments
- Test your visualizers thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Supabase** - For the backend infrastructure
- **Radix UI** - For accessible component primitives
- **Monaco Editor** - For the code editing experience
- **Tailwind CSS** - For the utility-first CSS framework

## 🐛 Known Issues

- Java/C++ compilation may not work in serverless environments
- Large file uploads may timeout on some platforms
- Mobile visualizations may have performance limitations

## 🔄 Changelog

### Version 1.0.0
- Initial release with 50+ algorithm visualizations
- Multi-language code execution
- Interactive problem solving
- Progress tracking system
- SEO optimization
- Modern UI/UX design

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/dsa-animations-site/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/dsa-animations-site/discussions)
- **Email**: your-email@example.com

---

**Made with ❤️ for the coding community** 