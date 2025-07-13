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

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB Atlas account

### Backend Setup

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

### Frontend Setup

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
DataWiz/
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
│   └── .env                  # Environment variables
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
│   ├── package.json          # Node.js dependencies
│   └── .env.local            # Environment variables
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

