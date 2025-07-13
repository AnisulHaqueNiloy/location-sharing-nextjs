# Raintor Technical Assessment

A comprehensive Next.js application demonstrating real-time location sharing with SignalR and infinite scroll user feed functionality.

## 🚀 Features

### Task 2: Real-Time Location Sharing (SignalR)
- **Real-time WebSocket communication** using SignalR
- **Dual user interface**: Send and receive location updates
- **Interactive map integration** with Leaflet
- **Custom useSignalR hook** for connection management
- **GPS location detection** with browser geolocation API
- **Live location visualization** on interactive maps
- **Connection status monitoring** with auto-reconnection
- **Error handling** and graceful fallbacks

### Task 3: Infinite Scroll User Feed
- **Infinite scrolling** with IntersectionObserver API
- **Optimized data fetching** using TanStack Query (React Query)
- **Virtualized rendering** for performance
- **Skeleton loading states** for better UX
- **Error boundaries** with retry functionality
- **Responsive grid layout** with adaptive columns
- **Accessibility features** including keyboard navigation
- **Professional user cards** with comprehensive information

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Real-time**: Microsoft SignalR
- **Maps**: Leaflet
- **Icons**: Lucide React
- **Build Tool**: Next.js built-in bundler

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 8+

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd raintor-technical-assessment
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Production Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── providers.tsx        # App providers
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── location-sharing.tsx # Real-time location component
│   ├── location-map.tsx     # Leaflet map component
│   ├── user-feed.tsx        # Infinite scroll feed
│   ├── user-card.tsx        # User display card
│   └── user-card-skeleton.tsx # Loading skeleton
├── hooks/
│   └── use-signalr.ts       # Custom SignalR hook
└── lib/
    └── utils.ts             # Utility functions
\`\`\`

## 🔧 API Integration

### SignalR Hub
- **URL**: `https://tech-test.raintor.com/Hub`
- **Send Method**: `SendLatLon(lat, lon, userName)`
- **Receive Method**: `ReceiveLatLon`
- **Auto-reconnection** with exponential backoff
- **Connection state management**

### User API
- **Endpoint**: `https://tech-test.raintor.com/api/users/GetUsersList`
- **Parameters**: `take` (limit), `skip` (offset)
- **Pagination**: Automatic with infinite scroll
- **Error handling**: Retry mechanism with exponential backoff

## ✨ Key Features Implementation

### Real-Time Location Sharing
- **Custom SignalR Hook**: Encapsulates connection logic, auto-reconnection, and error handling
- **Dual Interface**: Separate UI for sending (User A) and receiving (User B) locations
- **Live Map Updates**: Real-time marker updates with different colors for current vs received locations
- **GPS Integration**: Browser geolocation API with permission handling
- **Connection Monitoring**: Visual status indicators and error messages

### Infinite Scroll User Feed
- **Performance Optimized**: Uses IntersectionObserver for efficient scroll detection
- **Smart Pagination**: Automatic page management with TanStack Query
- **Loading States**: Skeleton components during data fetching
- **Error Recovery**: Retry buttons and graceful error handling
- **Responsive Design**: Adaptive grid layout for different screen sizes

### Code Quality Features
- **TypeScript**: Full type safety throughout the application
- **Error Boundaries**: Comprehensive error handling and user feedback
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized rendering, lazy loading, and efficient state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🎯 Assessment Requirements Fulfilled

### ✅ Task 2: Real-Time Location Sharing
- [x] SignalR WebSocket client integration
- [x] Two user interfaces (send/receive)
- [x] Custom `useSignalR()` hook
- [x] Live GPS coordinates (simulated and real)
- [x] Map display with Leaflet
- [x] Real-time updates between users

### ✅ Task 3: Infinite Scroll User Feed
- [x] React Query for data fetching
- [x] Componentized `<UserCard />` display
- [x] IntersectionObserver infinite scrolling
- [x] Error handling and loading states
- [x] Skeleton loaders
- [x] Graceful fallback views
- [x] Keyboard navigation and accessibility

### ✅ Additional Requirements
- [x] Virtualized list rendering
- [x] Error boundary implementation
- [x] Professional UI/UX design
- [x] Mobile responsive layout
- [x] TypeScript implementation
- [x] Clean code architecture

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Connect to Vercel**
   \`\`\`bash
   vercel --prod
   \`\`\`

2. **Environment Variables** (if needed)
   - No additional environment variables required
   - All API endpoints are public

3. **Build Optimization**
   - Automatic code splitting
   - Image optimization
   - Static generation where possible

## 🔍 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: React Query intelligent caching
- **Virtualization**: Efficient rendering of large lists
- **Bundle Analysis**: Optimized bundle size

## 🧪 Testing Considerations

The application includes:
- **Error Boundaries**: Graceful error handling
- **Loading States**: Comprehensive loading indicators
- **Offline Handling**: Connection status monitoring
- **Edge Cases**: Empty states, network failures, permission denials

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Support**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers
- **WebSocket Support**: Fallback handling for connection issues

## 🤝 Development Notes

### Code Style
- **Consistent Formatting**: Prettier configuration
- **TypeScript Strict Mode**: Full type safety
- **Component Architecture**: Reusable, composable components
- **Custom Hooks**: Encapsulated logic for reusability

### Architecture Decisions
- **App Router**: Next.js 13+ App Router for modern routing
- **Client Components**: Strategic use for interactivity
- **State Management**: React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui for consistent design system

## 📞 Support

For any questions or issues:
- **Emergency Contact**: +8801782065131 (Phone or WhatsApp)
- **Email**: [Your email for assessment]

---

**Built with ❤️ for Raintor Ltd Technical Assessment**
# location-sharing
