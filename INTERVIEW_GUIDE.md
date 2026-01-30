# 📖 Interview Guide - Fluxx Project

## Quick Overview

**What is this project?**
A full-stack web application that manages applications, events, and teams using:
- **Frontend**: React website with forms and pages
- **Backend**: Node.js API server with database

---

## 🎯 What to Study First

Before the interview, you need to understand these **5 basic concepts**:

1. ✅ **React Basics** - What is React? How components work?
2. ✅ **React Hooks** - useState and useEffect
3. ✅ **Forms & Validation** - How forms are handled
4. ✅ **Backend API** - How frontend talks to backend
5. ✅ **Database** - How data is stored

Each concept has a separate file with easy explanations.

---

## 📁 Files to Read (In This Order)

```
1. 00_REACT_BASICS.md        ← Start here
2. 01_REACT_HOOKS.md         ← Then here
3. 02_FORMS_VALIDATION.md    ← Then here
4. 03_BACKEND_API.md         ← Then here
5. 04_DATABASE.md            ← Finally here
6. 05_PROJECT_STRUCTURE.md   ← Understand your project
```

---

## 🔥 Top 10 Interview Questions

These are the **most likely** questions an interviewer will ask:

### Frontend Questions

1. **"What is React?"**
   - Library for building UI with reusable components
   - See: `00_REACT_BASICS.md`

2. **"What are React Hooks?"**
   - Functions that let you use state and other features
   - See: `01_REACT_HOOKS.md`

3. **"How do you handle forms in React?"**
   - Using React Hook Form + Zod validation
   - See: `02_FORMS_VALIDATION.md`

4. **"What's the difference between props and state?"**
   - Props = data from parent, State = component's own data
   - See: `00_REACT_BASICS.md`

5. **"What is React Router?"**
   - Enables navigation between pages without refresh
   - Your app uses it for `/`, `/about`, `/events`, etc.

### Backend Questions

6. **"What is a REST API?"**
   - Backend provides endpoints that frontend calls
   - See: `03_BACKEND_API.md`

7. **"What is Express.js?"**
   - Framework for building APIs in Node.js
   - See: `03_BACKEND_API.md`

8. **"How does authentication work?"**
   - Passwords are hashed, tokens (JWT) are created
   - See: `03_BACKEND_API.md`

9. **"What is MongoDB?"**
   - Database that stores data like JSON documents
   - See: `04_DATABASE.md`

10. **"How do frontend and backend communicate?"**
    - Frontend sends HTTP requests, backend sends JSON responses
    - See: `03_BACKEND_API.md`

---

## 💡 Simple Analogy

Think of your project like a **Restaurant**:

```
FRONTEND (Restaurant UI):
- Menu (pages: home, about, events)
- Form (order form - FluxApplicationForm)
- Display (shows what you ordered - component)

BACKEND (Kitchen):
- Routes (different types of orders)
- Database (storage for orders)
- Authentication (who can order?)

COMMUNICATION:
- Customer fills form (frontend)
- Waiter takes order to kitchen (HTTP request)
- Kitchen prepares and sends back (API response)
- Customer receives (frontend shows result)
```

---

## 🚀 During Interview Tips

1. **Start Simple**: "React is a library for building UIs with components"
2. **Use Examples**: Point to your code: "In my project, I use useState like this..."
3. **Be Honest**: If you don't know, say "I haven't explored that yet, but I can explain..."
4. **Show Understanding**: "This is important because..."
5. **Ask Questions**: "Should I explain this more or move on?"

---

## 📚 Next Steps

1. Read each .md file carefully
2. Open the actual code files mentioned
3. Try to understand how your code matches the concepts
4. Practice explaining these concepts out loud
5. Be ready to answer "Why did you use X instead of Y?"

Good luck! 🎓

