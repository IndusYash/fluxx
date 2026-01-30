# 01 - React Hooks (useState & useEffect)

## What are Hooks?

**Hooks are special functions that let React components use features.**

Common hooks:
- `useState` - Manage state (data that changes)
- `useEffect` - Run code when component loads/updates
- `useContext` - Share data between components
- `useReducer` - Complex state management

Let's focus on the **main two**: `useState` and `useEffect`

---

## Hook #1: useState - Managing State

### What It Does

`useState` lets a component **remember** things and **update** them.

### Syntax

```jsx
const [value, setValue] = useState(initialValue);
```

- `value` = current data
- `setValue` = function to update data
- `initialValue` = starting data

### Example 1: Simple Counter

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);  // count = 0 initially
  
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

**What happens:**
1. Component first shows `count = 0`
2. User clicks button
3. `setCount(1)` is called
4. Component re-renders showing `count = 1`

### Example 2: Multiple State Variables

```jsx
function UserProfile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Name: {name}, Age: {age}</p>
    </div>
  )
}
```

### Real Code from Your Project

From `Frontend/src/App.tsx`:

```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// Check if window is smaller than 768px (mobile size)
// If yes, isMobile = true, else false
```

---

## Hook #2: useEffect - Side Effects

### What It Does

`useEffect` runs code **when something happens**:
- Component loads for first time
- Component updates
- Component is about to be removed

### Syntax

```jsx
useEffect(() => {
  // Code to run
  
  return () => {
    // Cleanup code (optional)
  }
}, [dependencies]);
```

- First part: Function with code to run
- Second part: Dependency array (when to run)

### Dependency Array Explained

```jsx
// Run ONCE when component first loads
useEffect(() => {
  console.log("Component loaded!");
}, []);

// Run WHENEVER 'count' changes
useEffect(() => {
  console.log("Count changed to:", count);
}, [count]);

// Run on EVERY render (avoid this usually)
useEffect(() => {
  console.log("Something changed!");
});
```

### Example 1: Fetch Data When Component Loads

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetch users from API when component loads
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []); // Empty array = run once on load
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

### Example 2: Listen to Window Resize

```jsx
function ResponsiveComponent() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Add listener
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    // Cleanup: remove listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty = set up once, clean up once
  
  return <div>Window width: {width}px</div>
}
```

### Real Code from Your Project

From `Frontend/src/App.tsx`:

```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  // This function runs when window is resized
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  
  // Add the listener
  window.addEventListener("resize", handleResize);
  
  // CLEANUP: Remove listener when component is removed
  return () => window.removeEventListener("resize", handleResize);
}, []); // Empty dependency = set up once
```

**What's happening:**
1. Component loads, checks if window is small
2. Sets up a listener for when window resizes
3. When window resizes, updates state
4. If component is removed, cleans up listener (important!)

---

## Common useEffect Patterns

### Pattern 1: Run on Component Load

```jsx
useEffect(() => {
  console.log("Component just loaded");
}, []);  // Empty array = run once
```

### Pattern 2: Run When Dependency Changes

```jsx
useEffect(() => {
  console.log("count changed to:", count);
}, [count]);  // Array with dependency
```

### Pattern 3: Run on Every Render

```jsx
useEffect(() => {
  console.log("Something changed");
});  // No array = run every time
// ⚠️ Usually causes infinite loops, avoid this!
```

### Pattern 4: Cleanup (Important!)

```jsx
useEffect(() => {
  const listener = () => console.log("Event!");
  window.addEventListener("click", listener);
  
  // Cleanup function
  return () => {
    window.removeEventListener("click", listener);
  }
}, []);
```

**Why cleanup?** 
- Prevents memory leaks
- Removes old listeners when component unmounts
- Important for performance

---

## useState vs useEffect

| Feature | useState | useEffect |
|---------|----------|-----------|
| **Purpose** | Store data | Run side effects |
| **Triggers Re-render** | Yes | No |
| **When to Use** | User input, toggles | API calls, listeners |
| **Example** | Form fields, counters | Fetch data, resize |

---

## Interview Questions

### Q1: "What's the difference between useState and useEffect?"

Answer:
> "useState stores data that can change. When you call setState, the component re-renders.
> useEffect runs code when something happens - like component loads or data changes.
> useEffect doesn't trigger re-renders, but state changes do."

### Q2: "What are dependencies in useEffect?"

Answer:
> "Dependencies tell useEffect when to run.
> Empty array [] = run once on load.
> [count] = run when count changes.
> No array = run on every render (usually bad)."

### Q3: "Why do you need cleanup in useEffect?"

Answer:
> "Cleanup prevents memory leaks. If you add an event listener, you must remove it.
> Otherwise, old listeners pile up when component re-mounts.
> Return a function from useEffect to clean up."

---

## Key Takeaways

✅ `useState` = Store data, trigger re-renders
✅ `useEffect` = Run code when events happen
✅ Dependency array = Control when useEffect runs
✅ Cleanup = Prevent memory leaks
✅ Most common = useState + useEffect combo

---

**Next:** Read `02_FORMS_VALIDATION.md` to learn how forms work in your project.

