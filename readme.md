# Todo List Application

This is a simple, full-stack to-do list application built with React, Node.js, and PostgreSQL.

## Features
- Display a list of to-do items.
- Add new to-do items.
- Update existing to-do items.
- Delete to-do item

## Prerequisites
- Node.js (https://nodejs.org/) (v18 or later)
- PostgreSQL (https://www.postgresql.org/download/)
- React
- Docker

## Getting Started

### Backend
1. Clone the repository:

bash
git clone https://github.com/billy7038862/technical-backend-express.git
    
2. Install the dependencies.
    
    `npm install`
    
3. Create a .env file with your database credentials.
    
    PGUSER=your_user
    
    PGHOST=your_host
    
    PGDATABASE=your_database
    
    PGPASSWORD=your_password
    
    PGPORT=5400
    
4. Run `dokcer compose up` to init postgreDB

5. Start the backend server.
    
    `npm start`
    
The backend server will start running at http://localhost:3001.


## Testing
To run the tests for the backend or frontend, navigate to the corresponding directory and run the following command:
npm test



