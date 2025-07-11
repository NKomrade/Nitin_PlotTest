# DataViz Pro - Interactive Data Visualization Platform

A full-stack web application for uploading CSV datasets and creating interactive scatter plots with dynamic axis selection.

## Features

- 🔐 User authentication (signup/login)
- 📊 CSV dataset upload with validation
- 📈 Interactive scatter plot generation
- 🎯 Dynamic axis selection with live updates
- 💾 MongoDB data storage
- 🚀 Modern UI with shadcn/ui components

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- NextAuth.js for authentication
- Recharts for data visualization

### Backend
- FastAPI (Python)
- MongoDB for data storage
- JWT authentication
- Pandas for data processing
- Pydantic for data validation

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.8+
- MongoDB Atlas account or local MongoDB

### Frontend Setup
```bash
cd frontend
npm install
npm run dev