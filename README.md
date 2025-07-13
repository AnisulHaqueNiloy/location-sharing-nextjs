# Raintor Frontend Developer Assessment

A Next.js application demonstrating real-time location sharing and infinite scroll user.

## 🚀 Features

- **Real-time Location Sharing**: Live GPS coordinate sharing using SignalR WebSocket
- **Interactive Map**: Dynamic location display with Leaflet maps
- **Infinite Scroll**: Paginated user feed with smooth loading
- **Responsive Design**: Mobile-first approach with modern UI
- **Error Handling**: Comprehensive error boundaries and loading states

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Real-time**: SignalR for WebSocket communication
- **Maps**: Leaflet with React-Leaflet
- **State Management**: Custom hooks with React Query

## 📦 Installation & Setup

```bash
# Clone repository
git clone [https://github.com/AnisulHaqueNiloy/location-sharing-nextjs]
cd raintor-frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 🌐 Live Demo

- **Live Site**: [https://location-sharing-nextjs.vercel.app/]

## 🎯 Assessment Tasks Completed

## ⚠️ Limitations & Trade-offs

- **CORS**: SignalR hub may require CORS configuration for production
- **Real-time**: WebSocket connection depends on hub availability
