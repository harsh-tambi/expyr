# Expyr.ai Landing Page

A modern, interactive landing page for Expyr.ai, built with Next.js and Tailwind CSS.

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd expyr-main
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
- Local: [http://localhost:3001](http://localhost:3001)
- Network: [http://0.0.0.0:3001](http://0.0.0.0:3001)

## Project Structure

```
expyr-main/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main landing page component
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
├── public/               # Static assets
│   └── images/          # Image assets
└── firebase.ts          # Firebase configuration
```

## Features

- Modern, responsive design
- Interactive animations and effects
- Firebase integration for email signups
- Mobile-optimized layout
- Performance-optimized assets

## Development Notes

- The site uses Tailwind CSS for styling
- Animations are implemented using CSS keyframes
- Firebase is used for the backend
- Images should be placed in the `public/images` directory

## Troubleshooting

1. If you see Firebase initialization errors:
   - Make sure your `.env.local` file is properly configured
   - Verify that your Firebase project is set up correctly

2. If images don't load:
   - Ensure all images are placed in the `public/images` directory
   - Check that image paths in the code match your file structure

3. If styles aren't applying:
   - Run `npm run build` to verify the build process
   - Clear your browser cache

## Contact

For any questions or issues, please contact:
- Email: contact@expyr.ai
