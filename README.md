# DataViz Pro - Interactive Data Visualization Platform

A full-stack web application for uploading CSV datasets and creating interactive scatter plots with dynamic axis selection.

## Features

- 🔐 User authentication (signup/login)
- 📊 CSV dataset upload with validation
- 📈 Interactive scatter plot generation
- 🎯 Dynamic axis selection with live updates
- 💾 MongoDB Atlas cloud storage
- 🚀 Modern UI with shadcn/ui components
- 🔒 JWT-based authentication
- 📱 Responsive design

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Axios for API calls
- Recharts for data visualization

### Backend
- FastAPI (Python)
- MongoDB Atlas for cloud data storage
- JWT authentication with python-jose
- Pandas for data processing
- Pydantic Settings for configuration
- Uvicorn ASGI server

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.11+ (recommended for compatibility)
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
   - Create `.env` file in the backend directory
   - Add your MongoDB Atlas connection string and JWT secret:
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
Backend will run on `http://localhost:8000`

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
   - Create `.env.local` file in the frontend directory:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. **Start the development server:**
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Data Upload
- `POST /upload/csv` - Upload CSV file
- `GET /upload/files` - List uploaded files

### Data Visualization
- `GET /plot/data/{file_id}` - Get processed data for plotting
- `POST /plot/scatter` - Generate scatter plot configuration

## Project Structure

```
DataViz/
├── backend/
│   ├── app/
│   │   ├── config.py          # Configuration settings
│   │   ├── database.py        # MongoDB connection
│   │   ├── models/           # Pydantic models
│   │   ├── routes/           # API routes
│   │   └── utils/            # Utility functions
│   ├── uploads/              # File upload directory
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
├── frontend/
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   ├── lib/                  # Utility libraries
│   ├── public/              # Static assets
│   ├── package.json         # Node.js dependencies
│   └── .env.local           # Environment variables
└── README.md
```

## Key Features

### Data Upload
- Supports CSV file uploads
- File validation and processing
- Automatic data type detection
- Column header validation

### Interactive Visualization
- Real-time scatter plot generation
- Dynamic axis selection
- Responsive chart design
- Data point hover information

### Authentication
- Secure JWT-based authentication
- User registration and login
- Protected routes
- Session management

## Development

### Backend Development
- FastAPI provides automatic API documentation at `http://localhost:8000/docs`
- Use `uvicorn main:app --reload` for development with auto-reload
- MongoDB Atlas dashboard for database management

### Frontend Development
- Hot reload development server
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component library

## Deployment

### Backend Deployment
- Configure environment variables for production
- Use MongoDB Atlas for cloud database
- Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
- Build the application: `npm run build`
- Deploy to Vercel, Netlify, or similar platforms
- Configure environment variables for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.