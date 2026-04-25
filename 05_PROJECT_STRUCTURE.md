# 05 - Project Structure & File Organization

## Your Project Layout

```
fluxx/
├── Frontend/                    ← React website
│   ├── src/
│   │   ├── App.tsx             ← Main component with routes
│   │   ├── main.tsx            ← Entry point (loads App)
│   │   ├── pages/              ← Each page of website
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── events/
│   │   │   ├── contact/
│   │   │   └── team/
│   │   ├── components/         ← Reusable UI components
│   │   │   ├── FluxApplicationForm.tsx   ← Application form
│   │   │   ├── layout/         ← Layout components (Navbar, Footer)
│   │   │   ├── sections/       ← Page sections
│   │   │   └── ui/             ← Pre-built UI components
│   │   ├── hooks/              ← Custom React hooks
│   │   │   ├── use-toast.ts
│   │   │   ├── useDarkMode.ts
│   │   │   └── useDeviceType.ts
│   │   ├── lib/                ← Utility functions
│   │   │   ├── supabase.ts
│   │   │   └── utils.ts
│   │   ├── types/              ← TypeScript types
│   │   └── styles/             ← CSS files
│   │
│   ├── package.json            ← Dependencies (React, Tailwind, etc.)
│   ├── vite.config.ts          ← Build configuration
│   └── tailwind.config.js       ← Tailwind styling
│
├── backend/                     ← Node.js API server
│   ├── brain.js                ← Main server file
│   ├── routes/                 ← API endpoints
│   │   ├── auth.js             ← Login/register
│   │   ├── getDetail.js        ← Fetch details
│   │   ├── judge.js            ← Judge operations
│   │   ├── uploadRoutes.js     ← File upload
│   │   └── ideathonTeam.js     ← Team operations
│   ├── models/                 ← Database schemas
│   │   ├── auth.js             ← User schema
│   │   ├── detail.js           ← Application schema
│   │   └── teamModel.js        ← Team schema
│   ├── middleware/             ← Custom middleware
│   ├── package.json            ← Dependencies (Express, MongoDB, etc.)
│   └── .env                    ← Secret keys (not in git)
│
└── .gitignore                  ← Files to ignore in git
```

---

## Frontend Folder Breakdown

### `pages/` - Each Route Has a Page

```
pages/
├── home/               → "/" route
├── about/              → "/about" route
├── events/             → "/events" route
├── contact/            → "/contact" route
├── team/               → "/team" route
└── faculty/            → "/faculty" route
```

Each page is a React component that renders when that route is visited.

**Example:** When user visits `/about`, `<AboutPage />` renders.

### `components/` - Reusable Pieces

```
components/
├── FluxApplicationForm.tsx     ← Application form (used on multiple pages)
├── Loader.tsx                  ← Loading spinner
├── TeamCard.tsx                ← Card for displaying team member
│
├── layout/                     ← Layout wrappers
│   ├── Layout.tsx              ← Desktop layout (Navbar + page + Footer)
│   ├── mobileLayout.tsx        ← Mobile layout
│   ├── Navbar.tsx              ← Navigation bar
│   └── Footer.tsx              ← Footer
│
├── sections/                   ← Parts of pages
│   ├── home/                   ← Homepage sections
│   ├── about/                  ← About page sections
│   ├── events/                 ← Events page sections
│   └── induction/              ← Induction sections
│
└── ui/                         ← Pre-built components (from Shadcn/ui)
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── form.tsx
    └── ... (many more)
```

**Why separate?** Reuse components across pages.

### `hooks/` - Custom React Hooks

```
hooks/
├── use-toast.ts          ← Show toast messages
├── useDarkMode.ts        ← Toggle dark/light mode
├── useDeviceType.ts      ← Detect mobile/desktop
└── useIntersectionObserver.ts  ← Detect when element enters viewport
```

These are custom Hooks you or the team created for common functionality.

### `lib/` - Utility Code

```
lib/
├── supabase.ts     ← Connect to Supabase (database/auth)
├── utils.ts        ← Helper functions
└── content/        ← Static data
```

### `types/` - TypeScript Definitions

```
types/
├── index.ts        ← All types exported
├── events.ts       ← Event data structure
├── faculty.ts      ← Faculty data structure
├── gallery.ts      ← Gallery images
└── types.ts        ← General types
```

This organizes what data looks like (TypeScript helps catch errors).

---

## Backend Folder Breakdown

### `routes/` - API Endpoints

```
routes/
├── auth.js              ← /api/auth/*
│   ├── POST /register   ← Create account
│   ├── POST /login      ← Login
│   └── GET /profile     ← Get user info
│
├── getDetail.js         ← /api/details/*
│   ├── POST /submit     ← Submit application
│   └── GET /user/:id    ← Get application by ID
│
├── judge.js             ← /api/judge/*
│   ├── POST /score      ← Submit judge score
│   └── GET /results     ← Get results
│
├── uploadRoutes.js      ← /api/upload/*
│   └── POST /image      ← Upload image to Cloudinary
│
└── ideathonTeam.js      ← /api/ideathonTeam/*
    ├── POST /create     ← Create team
    └── GET /teams       ← Get all teams
```

Each file handles a group of related endpoints.

### `models/` - Database Schemas

```
models/
├── auth.js          ← User schema
│   {
│     fullName: String,
│     email: String (unique),
│     password: String (hashed),
│     ...
│   }
│
├── detail.js        ← Application schema
│   {
│     fullName: String,
│     email: String,
│     phone: String,
│     branch: String,
│     ...
│   }
│
└── teamModel.js     ← Team schema
    {
      teamName: String,
      members: [String],
      leaderId: String,
      ...
    }
```

Each model defines what data looks like in the database.

### `middleware/` - Request Processing

Custom middleware for:
- Authentication (verify user is logged in)
- Validation (check data format)
- Error handling (catch errors)

---

## How Data Flows Through Project

### Scenario 1: User Submits Application

```
1. FRONTEND
   User fills FluxApplicationForm.tsx
   ↓
2. Form validates with Zod (02_FORMS_VALIDATION.md)
   ↓
3. Form sends POST /api/details/submit
   {
     fullName: "Yash Verma",
     email: "yash@example.com",
     phone: "1234567890",
     ...
   }
   ↓
4. BACKEND (routes/getDetail.js)
   app.post("/submit", async (req, res) => {
     // Receive form data
     const application = await Application.create(req.body);
     // Save to MongoDB (models/detail.js)
     res.json({ success: true });
   });
   ↓
5. FRONTEND
   Receives response
   Shows success message (use-toast.ts)
   Updates UI
```

### Scenario 2: User Logs In

```
1. FRONTEND
   User fills email/password in form
   ↓
2. Form sends POST /api/auth/login
   { email, password }
   ↓
3. BACKEND (routes/auth.js)
   - Find user in MongoDB (models/auth.js)
   - Hash password, compare with stored hash
   - Create JWT token
   - Send back token
   ↓
4. FRONTEND
   localStorage.setItem("token", token)
   Redirect to dashboard
   ↓
5. FUTURE REQUESTS
   All API calls include token in headers
   Backend verifies token
```

---

## Key Files to Understand

### START HERE

| File | Purpose |
|------|---------|
| `Frontend/src/App.tsx` | Main component, defines all routes |
| `Frontend/src/main.tsx` | Entry point, loads App |
| `backend/brain.js` | Server setup, imports routes |

### THEN LOOK AT

| File | Purpose |
|------|---------|
| `Frontend/src/components/FluxApplicationForm.tsx` | Form example (React Hook Form + Zod) |
| `backend/routes/auth.js` | API example (login, register) |
| `backend/models/auth.js` | Database schema example |

### FINALLY EXPLORE

| File | Purpose |
|------|---------|
| `Frontend/src/pages/*/` | Individual pages |
| `Frontend/src/components/layout/Navbar.tsx` | Navigation example |
| `backend/routes/*.js` | Other API endpoints |

---

## Build Tools Used

### Frontend

- **Vite** = Fast build tool (much faster than Create React App)
- **TypeScript** = JavaScript with types (catches errors early)
- **Tailwind CSS** = Utility-first CSS framework (style without writing CSS)
- **React Router** = Client-side routing

### Backend

- **Express.js** = Framework for APIs
- **MongoDB** = Database
- **Mongoose** = ODM for MongoDB
- **dotenv** = Load environment variables from .env

---

## Environment Variables (.env)

Backend needs `.env` file with secrets (not in git):

```
# .env file (keep private!)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/fluxx
JWT_SECRET=my_super_secret_key_12345
CLOUDINARY_KEY=cloudinary_api_key
PORT=4000
```

Frontend might use `.env.local` for API URL:

```
VITE_API_URL=http://localhost:4000
```

**Never commit .env to git!** It contains secrets.

---

## Running the Project

### Frontend

```bash
cd Frontend
npm install      # Install dependencies
npm run dev      # Start development server (http://localhost:5173)
```

### Backend

```bash
cd backend
npm install      # Install dependencies
npm start        # Start server (http://localhost:4000)
```

Both must run simultaneously for the project to work.

---

## Interview Questions

### Q1: "Explain your project structure"

Answer:
> "The project is split into Frontend and Backend.
> Frontend has pages, components, hooks, and styles using React.
> Backend has routes (API endpoints) and models (database schemas) using Express and MongoDB.
> They communicate via HTTP requests and JSON responses."

### Q2: "What does each folder do?"

Answer:
> "Frontend pages/ are different routes. Components are reusable UI pieces.
> Backend routes/ are API endpoints. Models/ define database structure.
> This separation makes code organized and maintainable."

### Q3: "Where would you add a new feature?"

Answer:
> "1. Create new component in Frontend/components/
> 2. Add new route in Frontend/src/App.tsx
> 3. Create new backend route in backend/routes/
> 4. Create database model if needed in backend/models/
> 5. Frontend calls backend API."

---

## Key Takeaways

✅ Frontend = React website with pages and components
✅ Backend = Express API server with routes and database
✅ Routes = API endpoints, handle requests
✅ Models = Define database structure
✅ Components = Reusable UI pieces
✅ Hooks = Custom functionality
✅ Types = TypeScript definitions

---

## You've Learned Everything!

You now understand:
- ✅ React basics and hooks
- ✅ Form handling and validation
- ✅ Backend APIs and routes
- ✅ Database and MongoDB
- ✅ Project structure

**Next:** Look at your actual code files and match them to these concepts!

