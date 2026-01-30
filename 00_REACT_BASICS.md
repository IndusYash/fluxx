# 00 - React Basics

## What is React?

**React is a JavaScript library for building user interfaces.**

Think of it like **LEGO blocks**:
- Each LEGO block is a **Component** (a reusable piece)
- You combine blocks to build bigger structures
- Same blocks can be used multiple times

```
Component = A piece of UI you can reuse and combine
```

---

## Key Idea: Components

A Component is just a **JavaScript function that returns HTML**.

### Example 1: Simple Component

```jsx
function Button() {
  return <button>Click Me</button>
}
```

This component is a button. When you use it:
```jsx
<Button />  // This shows a button on the page
```

### Example 2: Component with Data

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>
}
```

Use it like:
```jsx
<Welcome name="Yash" />    // Shows: Hello, Yash!
<Welcome name="John" />    // Shows: Hello, John!
```

The `name` is called a **prop** (like a parameter).

---

## Props vs State

These are the **TWO ways** to manage data in React:

### Props = Data from Parent (read-only)

```jsx
// Parent component passes data
<Welcome name="Yash" age={25} />

// Child component receives it as props
function Welcome({ name, age }) {
  return <div>{name} is {age} years old</div>
}
```

**Key Points:**
- Parent → Child (one direction)
- Child cannot change props
- Like parameters in a function

### State = Component's Own Data (can change)

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  )
}
```

**Key Points:**
- Component owns its own state
- Can be changed with setState
- When state changes, component re-renders (updates on screen)

---

## Component Lifecycle Concept

Components have a **lifecycle** (birth → life → death):

```
1. MOUNT (Component appears)
   ↓
2. UPDATE (State/Props change, re-render)
   ↓
3. UNMOUNT (Component disappears)
```

You control this with **Hooks** (we'll learn next).

---

## Virtual DOM (Simple Explanation)

React keeps a **copy** of the page in memory.

```
Your Code → React Creates Virtual Copy → Compares with Real Page
                                          ↓
                                   Updates Only Changed Parts
                                          ↓
                                   Page Updates Efficiently
```

**Why?** Updating only changed parts is faster than updating everything.

---

## Your Project Example

Look at `Frontend/src/App.tsx`:

```tsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ... component code
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage isMobile={isMobile} />} />
        <Route path="/about" element={<AboutPage isMobile={isMobile} />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**What's happening:**
- `App` is the main component
- `useState` creates state for mobile detection
- Props `isMobile={isMobile}` pass data to child components
- `Routes` show different pages based on URL

---

## Interview Tip

**If interviewer asks: "What is React?"**

Answer:
> "React is a JavaScript library for building UIs with reusable components. 
> Components are functions that return HTML. 
> They manage data using props (input from parent) and state (component's own data).
> When data changes, React updates only the parts that changed."

---

## Key Takeaways

✅ Components = Reusable UI building blocks
✅ Props = Data from parent
✅ State = Component's own data
✅ Virtual DOM = Efficient updates
✅ JSX = JavaScript that looks like HTML

---

**Next:** Read `01_REACT_HOOKS.md` to learn how to use state and side effects.

