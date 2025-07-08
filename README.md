# JobFinder - AI-Powered Job Search Platform

A modern SaaS job search platform built with Next.js 15, featuring AI-powered job matching, Supabase authentication, and a beautiful UI.

## 🚀 Features

### Core Features

- **AI-Powered Job Search**: Advanced algorithms that match candidates with relevant opportunities
- **Real-time Alerts**: Instant notifications for new job postings that match user criteria
- **Application Tracking**: Comprehensive dashboard to track job application progress
- **Company Insights**: Detailed company profiles with culture and hiring information
- **Career Analytics**: Market trends, salary insights, and career progression data

### Authentication & Security

- **Email/Password Authentication**: Secure login with validation
- **OAuth Integration**: Sign in with Google
- **Password Reset**: Secure password recovery via email
- **Session Management**: Persistent authentication with Supabase
- **Data Protection**: Enterprise-grade security and privacy controls

### SaaS Features

- **Multiple Pricing Tiers**: Free, Pro, and Enterprise plans
- **Feature-based Access**: Different capabilities per subscription level
- **Professional UI**: Modern, responsive design with dark/light mode
- **Mobile Optimized**: Fully responsive across all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Type Safety**: TypeScript
- **Theme**: next-themes for dark/light mode

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages group
│   │   ├── login/         # Login page
│   │   ├── signup/        # Registration page
│   │   └── forgot-password/ # Password reset
│   ├── about/             # About us page
│   ├── features/          # Features showcase
│   ├── pricing/           # Pricing plans
│   └── auth/callback/     # OAuth callback handler
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Layout components (header, footer)
│   ├── login-form.tsx    # Login form component
│   ├── signup-form.tsx   # Registration form
│   └── forgot-password-form.tsx
├── lib/                  # Utility libraries
│   ├── actions/          # Server actions
│   │   └── auth.ts      # Authentication actions
│   ├── supabase/        # Supabase client setup
│   │   ├── client.ts    # Browser client
│   │   └── server.ts    # Server client
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
    ├── actions.ts       # Action response types
    └── supabase.ts      # Database schema types
```

## 🔧 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-finder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file with your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Database Setup**

   - Create a Supabase project
   - Run the SQL migrations for user profiles table
   - Configure OAuth providers (Google) in Supabase dashboard

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🔐 Authentication Flow

1. **Email/Password**: Traditional signup/login with validation
2. **OAuth (Google)**: One-click social authentication
3. **Password Reset**: Email-based password recovery
4. **Session Management**: Automatic session handling with middleware
5. **Protected Routes**: Middleware-based route protection

## 💰 Pricing Plans

- **Free**: 5 applications/month, basic features
- **Pro ($19/month)**: Unlimited applications, AI search, premium features
- **Enterprise ($49/month)**: Everything + career coaching, exclusive opportunities

## 🎨 UI Components

Built with a comprehensive design system:

- Consistent typography and spacing
- Professional color scheme
- Responsive layouts
- Accessible components
- Dark/light theme support

## 🚀 Deployment

The application is ready for deployment on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any Node.js hosting provider

## 📄 License

This project is licensed under the MIT License.
