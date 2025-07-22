# DataViz Pro - Interactive Data Visualization Platform

A full-stack web application for uploading CSV datasets and creating interactive scatter plots with dynamic axis selection. Built with a modern black and white brutalist design theme.

## Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 📊 **CSV Dataset Upload** - Drag-and-drop file upload with validation
- 📈 **Interactive Scatter Plots** - Dynamic visualization with real-time updates
- 🎯 **Dynamic Axis Selection** - Live axis switching and data filtering
- 💾 **MongoDB Integration** - User data and file metadata stored in MongoDB Atlas
- 🎨 **Modern UI Design** - Black and white brutalist theme with shadcn/ui
- 📱 **Responsive Design** - Works seamlessly across all devices
- 📊 **Data Analytics** - Real-time statistics and data insights
- 🔒 **Secure File Management** - Files associated with user accounts

## Demo Video

[Click here to watch the demo](https://drive.google.com/file/d/1xbSb74oDS4xPXDubQ4UBS6ibUxqfDY8X/view?usp=sharing)


## Tech Stack

### Frontend
- **Next.js 14** (App Router with TypeScript)
- **Tailwind CSS** for styling
- **shadcn/ui** components library
- **Recharts** for data visualization
- **NextAuth.js** for authentication
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **FastAPI** (Python) with async support
- **MongoDB Atlas** for cloud data storage
- **JWT Authentication** with python-jose
- **Pandas** for data processing and analysis
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- **Python Multipart** for file uploads

## Setup Instructions

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker Desktop installed
- MongoDB Atlas account

#### Quick Start with Docker

1. **Clone the repository:**
```bash
git clone <repository-url>
cd DataViz
```

2. **Create environment file:**
   Create `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/datawiz?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_TIME=86400
CORS_ORIGINS=http://localhost:3000,http://frontend:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Build and run with Docker:**
```bash
docker-compose up --build
```

4. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`

### Option 2: Local Development Setup

#### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB Atlas account

#### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Environment Configuration:**
   Create `.env` file in the backend directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/datawiz?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_TIME=86400
CORS_ORIGINS=http://localhost:3000
```

5. **Start the backend server:**
```bash
python main.py
```
Backend runs on `http://localhost:8000`

#### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Configuration:**
   Create `.env.local` file in the frontend directory:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. **Start the development server:**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login with JWT token

### File Management
- `POST /upload/csv` - Upload CSV file (stores metadata in user document)
- `GET /upload/files` - Get user's uploaded files
- `GET /upload/files/{file_id}/data` - Get file data for visualization

### Data Visualization
- `GET /plot/data/{file_id}` - Get processed data for plotting
- `POST /plot/scatter` - Generate scatter plot configuration

## Project Structure

```
DataViz/
├── docker-compose.yml        # Docker orchestration
├── Dockerfile.backend       # Backend container configuration
├── Dockerfile.frontend      # Frontend container configuration
├── .env                     # Environment variables (create from .env.example)
├── .env.example            # Environment template
├── .dockerignore           # Docker ignore patterns
├── backend/
│   ├── app/
│   │   ├── config.py          # Configuration settings
│   │   ├── database.py        # MongoDB connection
│   │   ├── models/
│   │   │   └── user.py        # User and CSV file models
│   │   ├── routes/
│   │   │   ├── auth.py        # Authentication routes
│   │   │   ├── upload.py      # File upload routes
│   │   │   └── plot.py        # Visualization routes
│   │   └── utils/
│   │       └── auth.py        # JWT utilities
│   ├── uploads/               # File storage directory
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Backend environment variables
├── frontend/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages
│   │   ├── dashboard/        # Dashboard and main app
│   │   ├── globals.css       # Global styles
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── auth/             # Authentication components
│   │   ├── chart/            # Visualization components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # shadcn/ui components
│   │   └── upload/           # File upload components
│   ├── lib/
│   │   ├── api.ts            # API client configuration
│   │   └── utils.ts          # Utility functions
│   ├── next.config.js        # Next.js configuration
│   ├── package.json          # Node.js dependencies
│   └── .env.local            # Frontend environment variables
└── README.md
```

## Key Features

### Modern UI/UX Design
- **Brutalist Black & White Theme** - Clean, professional appearance
- **Consistent Design Language** - Uniform styling across all components
- **Interactive Elements** - Hover effects and smooth transitions
- **Shadow Effects** - Distinctive drop shadows for depth
- **Responsive Layout** - Mobile-first design approach

### Data Management
- **User-Centric Storage** - CSV metadata stored within user documents
- **File Upload** - Drag-and-drop interface with progress indicators
- **Data Validation** - Automatic CSV validation and error handling
- **Real-time Analytics** - Live statistics and data insights

### Visualization Features
- **Interactive Scatter Plots** - Dynamic axis selection and data filtering
- **Real-time Updates** - Live chart updates without page refresh
- **Data Statistics** - Automatic calculation of data ranges and metrics
- **Professional Charts** - Clean, readable visualizations with proper labels

### Authentication & Security
- **JWT-based Authentication** - Secure token-based user sessions
- **Protected Routes** - Middleware protection for authenticated pages
- **User Data Isolation** - Each user's data is completely separate
- **Session Management** - Automatic token refresh and logout

## Development

### Docker Development Commands

```bash
# Start development environment with hot reload
docker-compose up --build

# View logs from all services
docker-compose logs -f

# View logs from specific service
docker-compose logs backend
docker-compose logs frontend

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build backend
docker-compose up -d backend

# Access container shell for debugging
docker-compose exec backend bash
docker-compose exec frontend sh

# Check service status
docker-compose ps
```

### Backend Development
- **API Documentation** - Available at `http://localhost:8000/docs`
- **Development Mode** - Use `uvicorn main:app --reload` for auto-reload
- **Database Management** - MongoDB Atlas dashboard for data inspection

### Frontend Development
- **Hot Reload** - Instant updates during development
- **TypeScript** - Full type safety throughout the application
- **Component Library** - Consistent UI components with shadcn/ui
- **Tailwind CSS** - Utility-first CSS framework

## Deployment

### Docker Deployment Benefits
- **Environment Consistency** - Same environment across development, staging, and production
- **Easy Scaling** - Scale services independently with `docker-compose up --scale backend=3`
- **Isolation** - Each service runs in its own container for security and stability
- **Quick Setup** - One-command deployment on any Docker-enabled server

### Render Deployment
The application is designed for easy deployment on Render:

1. **Backend Service Configuration:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - Environment Variables: MongoDB URI, JWT secrets, CORS origins

2. **Frontend Service Configuration:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: NextAuth configuration, API URLs

### Environment Variables for Production
```env
# Backend
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGINS=https://your-frontend-domain.com

# Frontend
NEXTAUTH_URL=https://your-frontend-domain.com
NEXTAUTH_SECRET=your-production-nextauth-secret
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Usage

1. **Sign Up/Login** - Create account or login with existing credentials
2. **Upload CSV** - Drag and drop your CSV file or click to browse
3. **Dashboard** - View uploaded files and analytics
4. **Create Visualization** - Select X and Y axes for scatter plot
5. **Interactive Analysis** - Explore data with dynamic chart controls

## Docker Configuration

The project includes Docker configuration files for containerized deployment:

### Docker Files Overview
- **`Dockerfile.backend`** - Multi-stage Python container with FastAPI
- **`Dockerfile.frontend`** - Multi-stage Node.js container with Next.js standalone build
- **`docker-compose.yml`** - Orchestrates both services with networking
- **`.dockerignore`** - Excludes unnecessary files from Docker context

### Environment Security
⚠️ **Important Security Note:**
- Never commit the `.env` file with real credentials to Git
- Use `.env.example` as a template for team members
- Set up proper `.gitignore` rules to exclude sensitive files

### Docker Commands Quick Reference
```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View live logs
docker-compose logs -f

# Stop all services
docker-compose down

# Scale services for production
docker-compose up --scale backend=3 --scale frontend=2
```

