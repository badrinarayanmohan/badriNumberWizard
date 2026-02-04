# White Glove Strategy

An interactive digital book web application for visualizing RH (Restoration Hardware) delivery optimization analysis. The app presents delivery route data through an elegant book-style interface with page-turning animations, interactive maps, and strategic recommendations.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38BDF8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white)

## Overview

**White Glove Strategy** transforms delivery optimization data into an engaging, executive-ready presentation. The application simulates a digital book experience where stakeholders can explore:

- **11 customers** across the San Francisco Bay Area
- **324 items** scheduled for delivery
- **Two optimization strategies** (Speed vs Space)
- **Interactive route maps** with real-time simulation
- **Cost analysis** and profitability recommendations

## Features

### Book-Style Navigation
- Smooth page-turn animations using Framer Motion
- Keyboard navigation (Arrow keys, Home, End)
- Progress indicators and page dots
- Responsive design for desktop, tablet, and mobile

### Interactive Maps
- Leaflet-based maps with OpenStreetMap tiles
- Customer location markers with region color-coding
- Route visualization for both optimization strategies
- Animated truck movement simulation
- Day-by-day route selection

### Data Visualization
- Animated counters for key statistics
- Comparison charts (Recharts)
- Utilization gauges
- Waterfall charts for profitability analysis
- Progress bars and visual indicators

### Route Simulation
- Play/Pause/Reset controls
- Speed control (1x, 2x, 5x, 10x)
- Live dashboard with real-time metrics
- Route progress tracking

## Pages

| Page | Title | Description |
|------|-------|-------------|
| 1 | Cover | Elegant cover with project overview |
| 2 | The Challenge | Scale of delivery problem visualization |
| 3 | Our Customers | Interactive map and customer data |
| 4 | Two Strategies | Speed vs Space optimization intro |
| 5 | Speed-Optimized | Route map for speed optimization |
| 6 | Space-Optimized | Route map with utilization focus |
| 7 | The Verdict | Head-to-head comparison |
| 8 | The Hidden Loss | Profitability analysis |
| 9 | Route Simulation | Interactive delivery simulation |
| 10 | Recommendations | Strategic action items |
| 11 | Thank You | Summary and navigation |

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: React-Leaflet with Leaflet
- **State Management**: Zustand
- **Fonts**: Playfair Display, Inter, Roboto Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd white-glove-strategy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
white-glove-strategy/
├── src/
│   ├── components/
│   │   ├── Book/           # Book navigation components
│   │   │   ├── Book.tsx
│   │   │   ├── Page.tsx
│   │   │   └── Navigation.tsx
│   │   ├── Charts/         # Data visualization components
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   ├── WaterfallChart.tsx
│   │   │   ├── UtilizationGauge.tsx
│   │   │   └── CustomerChart.tsx
│   │   ├── Maps/           # Map components
│   │   │   └── DeliveryMap.tsx
│   │   └── Pages/          # Individual page components
│   │       ├── CoverPage.tsx
│   │       ├── ChallengePage.tsx
│   │       ├── CustomerOverview.tsx
│   │       ├── StrategiesIntro.tsx
│   │       ├── SpeedOptimizedMap.tsx
│   │       ├── SpaceOptimizedMap.tsx
│   │       ├── ComparisonPage.tsx
│   │       ├── ProfitabilityPage.tsx
│   │       ├── SimulationPage.tsx
│   │       ├── RecommendationsPage.tsx
│   │       └── BackCover.tsx
│   ├── data/               # Static data files
│   │   ├── customers.ts
│   │   ├── schedules.ts
│   │   └── metrics.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── usePageNavigation.ts
│   │   ├── useCounterAnimation.ts
│   │   └── useRouteAnimation.ts
│   ├── store/              # Zustand state management
│   │   └── bookStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Tailwind + custom styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Data Model

### Customers
11 customers across 4 regions:
- San Francisco (3 customers)
- Oakland (3 customers)
- East Bay - Berkeley, Alameda, San Leandro (4 customers)
- North Bay - Sausalito (1 customer)

### Optimization Strategies

**Speed-Optimized** (Recommended)
- Total Cost: $3,591.57
- Total Miles: 154
- Total Hours: 32.75
- Truck Trips: 18
- Avg Volume Utilization: 62.3%

**Space-Optimized**
- Total Cost: $4,097.94
- Total Miles: 229
- Total Hours: 36.75
- Truck Trips: 14
- Avg Volume Utilization: 74.4%

### Key Findings
- Speed optimization saves **$506 (12.4%)** per batch
- Labor accounts for **94%** of total delivery costs
- Current $299 fee results in **-$28 loss** per customer
- Recommended fee increase to **$349** (+$50)

## Design System

### Colors
```css
--rh-navy: #1a365d      /* Primary brand color */
--rh-gold: #c9a227      /* Accent color */
--rh-cream: #faf8f5     /* Background */
--rh-charcoal: #2d3748  /* Text color */
--speed-green: #48bb78  /* Speed optimization */
--space-blue: #4299e1   /* Space optimization */
--loss-red: #fc8181     /* Loss indicators */
--profit-green: #68d391 /* Profit indicators */
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Numbers**: Roboto Mono (monospace)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `↓` or `Space` | Next page |
| `←` or `↑` | Previous page |
| `Home` | First page |
| `End` | Last page |
| `1-9` | Jump to page |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The application is optimized for:
- 60fps animations
- Lazy-loaded map tiles
- Efficient re-renders with React state management
- Production bundle ~900KB (gzipped ~274KB)

## Deployment

The built application can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Configure for `dist/` directory

## License

MIT

## Acknowledgments

- **RH** for the delivery optimization challenge
- **OpenStreetMap** for map tiles
- **CARTO** for basemap styling
- Built with modern React ecosystem tools

---

*Analysis prepared for RH Operations Management*
