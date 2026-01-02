# News Explorer

A React application that allows users to search for news articles using the News API and save them to their profiles. This is the frontend portion of a full-stack application built as the final project for TripleTen's Web Development Program.

## Features

- **Search Functionality**: Search for news articles by keyword using NewsAPI
- **Responsive Design**: Clean, mobile-first interface matching Figma designs
- **User Authentication**: Registration and login functionality
- **Save Articles**: Authenticated users can save and manage favorite articles
- **Protected Routes**: Secure access to saved articles page
- **Real-time Updates**: Dynamic loading states and error handling

## Technologies Used

- **Frontend**: React (functional components with hooks)
- **Routing**: React Router
- **Styling**: CSS3 with BEM methodology
- **API**: News API for article data
- **Development**: Vite build tool
- **Deployment**: GitHub Pages

## Live Demo

🔗 [View Live Site](your-deployed-site-url-here)

## Design

🎨 [Figma Design](https://www.figma.com/file/3ottwMEhlBt95Dbn8dw1NH/Your-Final-Project?type=design&node-id=0-1&mode=design)

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

3. Create environment variables:

   ```bash
   cp .env.example .env
   # Add your News API key to .env
   REACT_APP_NEWS_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view in browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── App/            # Main app component
│   ├── Header/         # Site header and navigation
│   ├── Main/           # Main page layout
│   ├── NewsCard/       # Individual article cards
│   ├── SearchForm/     # Search functionality
│   └── Modal/          # Login/Register modals
├── utils/              # Utility functions and API calls
├── images/             # Image assets
└── vendor/             # Third-party resources
```

## API Integration

This application integrates with:

- **News API** for fetching news articles
- Custom backend API for user authentication and saved articles (Stage 2/3)

## Features Implementation

### Stage 1 (Current)

- ✅ React component architecture
- ✅ Responsive design implementation
- ✅ News API integration
- ✅ Search functionality
- ✅ Modal components
- ✅ Frontend deployment

### Stage 2 (Optional)

- 🔄 Backend API development
- 🔄 User authentication system
- 🔄 Database integration

### Stage 3 (Optional)

- 🔄 Frontend-backend integration
- 🔄 Full authentication flow
- 🔄 Production deployment

## Contributing

This is a student project for TripleTen's Web Development Program. Feedback and suggestions are welcome!

## About This Project

This project demonstrates proficiency in:

- Modern React development patterns
- API integration and data management
- Responsive web design
- Git workflow and version control
- Project planning and execution

**Program**: TripleTen Web Development Bootcamp  
**Timeline**: December 2025  
**Project Type**: Final Capstone Project

## Author

**Bharat Saran**  
TripleTen Web Development Program Graduate  
📧 [email](bharatsaran@gmail.com)  
🔗 [LinkedIn](linkedin.com/in/bharatsaran)  
💻 Portfolio: Coming Soon

## Setup Repositories Task

**Status**: ✅ Completed

### Checklist:

- [x] Create repositories for frontend and backend
- [x] Make initial commits in each repository
- [x] Create stage-1 branch (stage-2 for the backend repo) and switch to these branches

### Repository Information:

- **Frontend Repo**: news-explorer-frontend (current)
- **Backend Repo**: news-explorer-backend (to be created in Stage 2)
- **Current Branch**: stage-1-frontend-and-api
- **Main Branch**: Contains only initial README commit

# Trigger deployment with API key secret
