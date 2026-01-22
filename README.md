# JobMap - Job Search Tool with Interactive US Map

A comprehensive job searching web application that leverages the Serply.io API to aggregate job listings from multiple job boards across the United States. Features an interactive US map allowing users to explore jobs by state, view detailed job descriptions, and access direct application links.

![JobMap](https://img.shields.io/badge/React-18+-blue)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8)

## Features

- **Interactive US Map**: Click on any state to search for jobs in that location
- **Advanced Search**: Search by job title, keywords, location with powerful filters
- **Job Filters**: Filter by job type, salary range, date posted, and experience level
- **Real-time Results**: Aggregates jobs from Indeed, LinkedIn, and other major job boards via Serply.io API
- **Job Details**: View comprehensive job descriptions, company information, and requirements
- **Save Jobs**: Bookmark jobs for later review
- **Search History**: Quick access to recent searches
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **State Management**: Powered by Zustand for efficient global state
- **Client-side Caching**: 15-minute cache for faster responses

## Technology Stack

### Frontend
- **React 18+** with TypeScript
- **Next.js 14** for server-side rendering and API routes
- **Tailwind CSS** for styling
- **React Simple Maps** for interactive US map visualization
- **Zustand** for global state management
- **TanStack Query (React Query)** for API state management
- **Axios** for HTTP requests
- **date-fns** for date formatting
- **DOMPurify** for HTML sanitization

### Backend
- **Next.js API Routes** for serverless functions
- **Serply.io API** for job search aggregation
- **In-memory caching** for improved performance

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Serply.io API Key** (get one at [https://serply.io](https://serply.io))

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-search-map-tool.git
cd job-search-map-tool
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Serply.io API key:

```env
SERPLY_API_KEY=your_serply_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

To get a Serply.io API key:
1. Visit [https://serply.io](https://serply.io)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
job-search-map-tool/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable UI components
│   │   ├── layout/       # Layout components
│   │   ├── map/          # US Map components
│   │   ├── search/       # Search-related components
│   │   └── jobs/         # Job listing components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── data/             # Static data (US states)
│   ├── styles/           # Global CSS styles
│   └── pages/            # Next.js pages
│       ├── api/          # API routes
│       │   └── jobs/     # Job-related API endpoints
│       ├── index.tsx     # Home page
│       └── saved.tsx     # Saved jobs page
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Usage Guide

### Searching for Jobs

1. **Using the Search Bar**:
   - Enter a job title or keywords (e.g., "Software Engineer", "Data Analyst")
   - Optionally specify a location or use the map
   - Click "Search Jobs"

2. **Using the Interactive Map**:
   - Click on any US state to automatically populate the location field
   - The map provides visual feedback on hover
   - Selected states are highlighted in blue

3. **Using Filters**:
   - Click "Show Filters" to reveal advanced options
   - Filter by job type (full-time, part-time, contract, remote)
   - Filter by date posted (24 hours, 7 days, 30 days)
   - Filter by experience level (entry, mid, senior)
   - Set minimum and maximum salary ranges

### Viewing Job Details

1. Click on any job card in the results list
2. The job details panel displays:
   - Full job description
   - Company information
   - Salary (if available)
   - Posted date
   - Application link

### Saving Jobs

1. Click the "Save" button in the job details panel
2. Access saved jobs from the "Saved Jobs" link in the header
3. Remove saved jobs by clicking the X button when hovering over a job card

### Search History

- Recent searches are automatically saved
- Click on a history item to repeat that search
- Clear all history with the "Clear All" button

## API Endpoints

### GET `/api/jobs/search`

Search for jobs by query and location.

**Query Parameters:**
- `q` (required): Job title or keywords
- `location` (required): Location (city, state, or "United States")
- `num` (optional): Number of results (default: 20, max: 100)

**Example:**
```
GET /api/jobs/search?q=software+engineer&location=California&num=20
```

### GET `/api/jobs/state/:stateCode`

Search for jobs in a specific state.

**Path Parameters:**
- `stateCode` (required): Two-letter state code (e.g., "CA", "NY")

**Query Parameters:**
- `q` (optional): Job title or keywords
- `num` (optional): Number of results

**Example:**
```
GET /api/jobs/state/CA?q=developer&num=50
```

## Building for Production

### Create Production Build

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm start
# or
yarn start
```

### Type Checking

```bash
npm run type-check
# or
yarn type-check
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**
- **Heroku**

Make sure to set the `SERPLY_API_KEY` environment variable on your hosting platform.

## Performance Optimizations

- **API Response Caching**: 15-minute cache for Serply API responses
- **Debounced Search**: 300ms debounce on search input
- **Code Splitting**: Dynamic imports for the map component
- **Image Optimization**: Next.js Image component for company logos
- **Lazy Loading**: Components load on demand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility Features

- Keyboard navigation support
- ARIA labels on interactive elements
- Screen reader announcements for search results
- Color contrast ratio meets WCAG 2.1 AA standards
- Focus management for modals and panels

## Troubleshooting

### API Key Issues

If you see "API key not configured" errors:
1. Verify `.env.local` exists in the root directory
2. Ensure `SERPLY_API_KEY` is set correctly
3. Restart the development server after changing environment variables

### Map Not Displaying

If the interactive map doesn't appear:
1. Check browser console for errors
2. Ensure JavaScript is enabled
3. Try a different browser
4. Clear browser cache

### No Search Results

If searches return no results:
1. Verify your Serply.io API key is valid
2. Check if you've exceeded your API quota
3. Try different search terms
4. Check browser network tab for API errors

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Serply.io** for providing the job search API
- **React Simple Maps** for the interactive map component
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for Next.js and hosting platform

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@jobmap.com
- Documentation: [https://jobmap.com/docs](https://jobmap.com/docs)

## Roadmap

Future enhancements planned:
- [ ] Email alerts for new job postings
- [ ] Resume upload and job matching
- [ ] Salary insights and trends
- [ ] Company reviews integration
- [ ] Application tracking system
- [ ] LinkedIn integration
- [ ] Mobile app (React Native)

---

Made with ❤️ by the JobMap Team
