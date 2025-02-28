# Lead Management Frontend Application

A Next.js application for managing immigration case leads, featuring a public lead submission form and an internal lead management interface.

## Features

- **Public Lead Form**: A form for prospects to submit their information
- **Internal Lead Management**: A secure interface for viewing and managing leads
- **Authentication**: Simple authentication for the admin interface
- **Status Management**: Ability to update lead status from PENDING to REACHED_OUT

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **API Routes**: Next.js API routes for backend functionality

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the public form.
5. Access the admin interface at [http://localhost:3000/admin](http://localhost:3000/admin).

### Admin Login Credentials

- Email: admin@alma.ai
- Password: password

## Project Structure

- `/app`: Next.js app router pages
- `/components`: Reusable React components
- `/app/api`: API routes for backend functionality
- `/public`: Static assets

## Design Decisions

- **UI Components**: Used shadcn/ui for consistent, accessible components
- **Form Validation**: Implemented client-side validation with Zod
- **Mock Data**: Used mock data for demonstration purposes
- **Authentication**: Simple authentication flow for the admin interface
- **API Routes**: Implemented Next.js API routes to demonstrate backend functionality

## Future Enhancements

- Implement proper authentication with JWT
- Add email notifications
- Implement file storage for resumes
- Add more advanced filtering and sorting options
- Create a more robust lead status workflow