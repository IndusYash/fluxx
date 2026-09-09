# 02 - Forms & Validation

## The Problem with HTML Forms in React

Normal HTML forms work, but managing them in React is annoying:

```jsx
// Bad way (lots of boilerplate)
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

// Too much code! 😩
```

Your project uses **React Hook Form** + **Zod** to make this easy.

---

## Solution: React Hook Form + Zod

**React Hook Form** = Manages form state easily
**Zod** = Validates form data (makes sure it's correct)

### How It Works (Simple View)

```
1. Define validation rules (Zod Schema)
   ↓
2. Create form with React Hook Form
   ↓
3. User fills form
   ↓
4. On submit, Zod validates
   ↓
5. If valid: send to backend
   If invalid: show error messages
```

---

## Step 1: Create Validation Schema (Zod)

Think of Zod as **rules** for your form data.

```jsx
import * as z from "zod";

// Define what email must look like
const email = z.string().email("Must be a valid email");

// Define what password must look like
const password = z.string().min(6, "Password must be 6+ characters");

// Combine all rules
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Too short")
});
```

### Common Validations

```jsx
const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18+"),
  agree: z.boolean().refine(val => val === true, "Must agree"),
  phone: z.string().regex(/^\d{10}$/, "Must be 10 digits")
});
```

---

## Step 2: Create Form with React Hook Form

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Define validation schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Too short")
});

// 2. Create component
function LoginForm() {
  const {
    register,      // Hook up input to form
    handleSubmit,  // Handle form submission
    formState: { errors }  // Get validation errors
  } = useForm({
    resolver: zodResolver(schema)  // Use Zod for validation
  });

  // 3. Handle submit
  const onSubmit = (data) => {
    console.log("Valid data:", data);
    // Send to backend
  };

  // 4. Render form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email input */}
      <input
        {...register("email")}  // Connect to form
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* Password input */}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Real Example from Your Project

From `Frontend/src/components/FluxApplicationForm.tsx`:

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schema
const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
});

export default function FluxApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm({
    resolver: zodResolver(applicationSchema)
  });

  const onSubmit = async (data) => {
    // Send to backend
    const response = await fetch("/api/submit-application", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("fullName")} placeholder="Full Name" />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("phone")} placeholder="Phone" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

---

## What Each Part Does

### `register("email")`

Connects the input field to React Hook Form:
- Tracks user typing
- Validates on submit
- Stores value in form state

### `handleSubmit(onSubmit)`

Validation handler:
1. User clicks submit
2. `handleSubmit` runs validation using Zod schema
3. If all valid: calls `onSubmit(data)`
4. If invalid: shows error messages, doesn't call `onSubmit`

### `errors.email`

Shows validation error for that field:
```jsx
{errors.email && <span>{errors.email.message}</span>}
// Shows: "Invalid email" if validation fails
```

### `isLoading`

Track if form is being submitted:
```jsx
<button disabled={isLoading}>
  {isLoading ? "Submitting..." : "Submit"}
</button>
```

---

## Form Submission Flow

```
User fills form
   ↓
Clicks "Submit" button
   ↓
handleSubmit runs Zod validation
   ↓
   ├─→ Invalid? Show error messages, stop
   │
   └─→ Valid? Call onSubmit(data)
        ↓
        Send to backend via API
        ↓
        Show success/error message
```

---

## Advanced: Custom Validation

Sometimes Zod isn't enough. You can add custom rules:

```jsx
const schema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
);

// Now both passwords must match!
```

---

## Interview Questions

### Q1: "Why do you use React Hook Form?"

Answer:
> "React Hook Form makes form handling simpler. Instead of managing each field separately,
> it provides register() to connect inputs and handles validation automatically.
> This reduces boilerplate code."

### Q2: "What is Zod?"

Answer:
> "Zod is a validation library. You define a schema with rules like 'email must be valid',
> 'password must be 6+ characters'. Then React Hook Form uses it to validate on submit.
> This separates validation logic from the form component."

### Q3: "What happens when validation fails?"

Answer:
> "React Hook Form doesn't call onSubmit. Instead, it populates the errors object.
> We check for errors and show messages to the user.
> The form doesn't submit to backend until all validation passes."

---

## Key Takeaways

✅ React Hook Form = Manage form state easily
✅ Zod = Define validation rules
✅ `register()` = Connect input to form
✅ `handleSubmit()` = Run validation, then submit
✅ `errors` = Show validation messages
✅ Custom validation = Advanced rules

---

**Next:** Read `03_BACKEND_API.md` to learn how the backend works.

