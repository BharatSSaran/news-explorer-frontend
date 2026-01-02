# News Explorer

A React application that allows users to search for news articles using the News API and save them to their profiles. This is the frontend portion of a full-stack application built as the final project for TripleTen's Web Development Program.

## 🎥 Video Overview

[Video walkthrough will be added here]

## Features

- **Search Functionality**: Search for news articles by keyword using NewsAPI
- **Responsive Design**: Fully responsive layout optimized for desktop (1440px), tablet (768px), and mobile (320px)
- **User Authentication**: Registration and login functionality with form validation
- **Save Articles**: Authenticated users can save and manage favorite articles
- **Protected Routes**: Secure access to saved articles page
- **Real-time Updates**: Dynamic loading states with skeleton loaders and error handling
- **Image Placeholders**: Elegant fallbacks for articles without images

## Technologies Used

- **Frontend Framework**: React 19 with functional components and hooks
- **Routing**: React Router DOM v7
- **Build Tool**: Vite 7
- **Styling**: CSS3 with BEM methodology
- **Fonts**: Roboto, Roboto Slab, Inter, Source Sans Pro with @font-face
- **Layout**: CSS Grid and Flexbox
- **Icons**: SVG components
- **API**: News API for article data
- **Deployment**: GitHub Pages

## Live Demo

🔗 [View Live Site](https://bharatssaran.github.io/news-explorer-frontend/)

## Design

🎨 Figma Design - Responsive layouts implemented for 1440px, 768px, and 320px breakpoints

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- News API key (register at [newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BharatSSaran/news-explorer-frontend.git
   cd news-explorer-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view in browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/          # React components
│   ├── App/            # Main app component
│   ├── Header/         # Site header with navigation
│   ├── Footer/         # Site footer
│   ├── HomePage/       # Home page with search
│   ├── Main/           # Main content area
│   ├── NewsCard/       # Individual article cards
│   ├── NewsCardList/   # Grid of news cards
│   ├── SearchForm/     # Article search functionality
│   ├── SavedNews/      # Saved articles page
│   ├── Navigation/     # Mobile navigation menu
│   ├── Modal/          # Base modal component
│   ├── LoginModal/     # Login form modal
│   ├── SignupModal/    # Registration form modal
│   ├── InfoModal/      # Success/info messages
│   ├── About/          # About the author section
│   ├── Preloader/      # Loading animation
│   ├── SkeletonLoader/ # Skeleton loading states
│   └── ErrorBoundary/  # Error handling wrapper
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication state
├── utils/              # Utility functions
│   ├── newsApi.js      # News API integration
│   ├── authAPI.js      # Authentication API calls
│   └── storage.js      # LocalStorage helpers
├── styles/             # Global styles
├── fonts/              # Custom fonts
├── assets/             # Images and icons
└── vendor/             # Third-party CSS (normalize.css)
```

## API Integration

This application integrates with:

- **News API** for fetching news articles
- Custom backend API for user authentication and saved articles (to be implemented in Stages 2/3)

## Responsive Design

The application is fully responsive with three main breakpoints:

- **Desktop**: 1440px - 3-column grid, cards 400x575px
- **Tablet**: 768px - 3-column grid, cards 224x420px
- **Mobile**: 320px - Single column, cards 288x444px

All layouts are optimized for intermediate screen sizes with no horizontal scrolling.

## Key Features Implementation

### Stage 1 (Current) ✅

- ✅ React component architecture with hooks
- ✅ Responsive design for all breakpoints (320px, 768px, 1440px)
- ✅ News API integration with search functionality
- ✅ Modal system (Login, Signup, Info)
- ✅ Form validation
- ✅ Skeleton loaders and error states
- ✅ Image placeholder fallbacks
- ✅ BEM naming methodology
- ✅ Semantic HTML
- ✅ Frontend deployment to GitHub Pages
- ✅ @font-face custom fonts with fallbacks
- ✅ SVG icons
- ✅ CSS Grid and Flexbox layouts

### Stage 2 (Planned)

- 🔄 Backend API development with Node.js/Express
- 🔄 MongoDB database integration
- 🔄 User authentication system with JWT
- 🔄 API endpoints for saved articles

### Stage 3 (Planned)

- 🔄 Frontend-backend integration
- 🔄 Full authentication flow
- 🔄 Production deployment on Google Cloud

## Development Best Practices

- Semantic HTML5 elements
- BEM (Block Element Modifier) CSS methodology
- Component-based React architecture
- Error boundary implementation
- Loading states with skeleton screens
- Form validation with user feedback
- Accessible focus states
- Mobile-first responsive design
- Git workflow with meaningful commits

## Contributing

This is a student project for TripleTen's Web Development Program. Feedback and suggestions are welcome!

## Project Requirements Met

This project demonstrates proficiency in:

- ✅ Modern React development patterns (functional components, hooks, Context API)
- ✅ API integration and asynchronous data management
- ✅ Responsive web design (mobile-first approach)
- ✅ CSS Grid and Flexbox layouts
- ✅ BEM naming methodology
- ✅ Semantic HTML5
- ✅ Form validation and user feedback
- ✅ Git workflow and version control
- ✅ Project planning and execution
- ✅ Component reusability
- ✅ Accessibility considerations
- ✅ Error handling and loading states

## About This Project

**Program**: TripleTen Web Development Bootcamp  
**Timeline**: December 2025 - January 2026  
**Project Type**: Final Capstone Project (Stage 1)

This project serves as the frontend foundation for a full-stack news aggregation application. It showcases modern React development practices, responsive design implementation, and API integration skills learned throughout the TripleTen program.

## Author

**Bharat Saran**  
Full-Stack Web Developer | TripleTen Graduate

Hi, I'm Bharat Saran, a full-stack web developer specializing in React, JavaScript, and responsive design. I create clean, user-focused applications that work seamlessly across all devices.

I completed my training at TripleTen, where I mastered modern web development practices, API integration, and component-based architecture. I'm passionate about building intuitive digital experiences and helping businesses bring their ideas to life through code.

📧 Email: bharatsaran@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/bharatsaran)  
💻 [GitHub](https://github.com/BharatSSaran)

## Acknowledgments

- TripleTen Web Development Program for project specifications and support
- News API for providing article data
- Figma design specifications

---

**Note**: This is Stage 1 of a three-stage project. Stages 2 and 3 will add backend functionality and full-stack integration.
