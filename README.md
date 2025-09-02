# AI Interview Preparation Platform

Interview SideKick, a sophisticated web application that helps users practice job interviews with an AI-powered interviewer, providing real-time feedback and comprehensive assessments.

![Interview SideKick Hero](public/readme.png)

## Features

### 1. AI-Powered Interview Sessions

- Real-time voice interactions with an AI interviewer
- Natural conversation flow with professional and contextual responses
- Dynamic question generation based on job role and requirements

### 2. Customizable Interview Experience

- Configure interviews based on:
  - Job role
  - Industry field
  - Required skills
  - Experience level
  - Interview type (behavioral/technical focus)
  - Number of questions

### 3. Comprehensive Feedback System

- Detailed performance assessment in key areas:
  - Communication skills
  - Technical knowledge
  - Problem-solving abilities
  - Cultural and role fit
  - Confidence and clarity
- Strengths and areas for improvement
- Actionable suggestions for enhancement
- Final assessment summary

### 4. Personal Dashboard

- Track interview history
- View all feedback reports
- Monitor progress over time
- Access interview statistics

## Technology Stack

### Frontend

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

### Backend

[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle_ORM-000000?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![VAPI AI](https://img.shields.io/badge/VAPI_AI-5B21B6?style=for-the-badge&logo=v&logoColor=white)](https://vapi.ai/)
[![GPT-4](https://img.shields.io/badge/GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Deepgram](https://img.shields.io/badge/Deepgram-302F4D?style=for-the-badge&logo=deepgram&logoColor=white)](https://deepgram.com/)
[![Eleven Labs](https://img.shields.io/badge/Eleven_Labs-000000?style=for-the-badge&logo=elevenlabs&logoColor=white)](https://elevenlabs.io/)

### Database

[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-000000?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Features:

- User profiles
- Interview sessions
- Feedback reports

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/emmamayne23/ai-interview-prep.git
```

1. Install dependencies:

```bash
npm install
```

1. Set up environment variables:

Create a `.env` file with the following variables:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
VAPI_API_KEY=your_vapi_api_key
```

1. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
