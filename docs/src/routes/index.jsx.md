# Routes Configuration

**File Path:** `src/routes/index.jsx`

## 📋 Purpose

Centralizes all application routes using React Router v6. Defines the main navigation structure and page components.

## 🚀 Current Routes

### Available Routes:

```javascript
"/"                 -> LoginPage (default)
"/login"           -> LoginPage
"/forgot-password" -> ForgotPasswordPage
```

## 🎯 Features

- **Browser Router**: Uses `createBrowserRouter` for modern routing
- **Default Route**: Root path redirects to login
- **Clean URLs**: No hash routing, uses browser history API

## 🔧 Usage

### Import in App.jsx:

```javascript
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

<RouterProvider router={router} />;
```

### Navigation:

```javascript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/forgot-password");
navigate("/login");
```

## 📝 Route Structure

- **Public Routes**: All routes are currently public
- **Future Routes**: Commented examples for signup and dashboard
- **Expandable**: Easy to add new routes as needed

## 💡 Adding New Routes

To add a new route:

```javascript
{
  path: "/new-route",
  element: <NewPageComponent />,
}
```

## 📝 Notes

- Uses React Router v6 syntax
- Centralized route management
- Ready for authentication guards
- Prepared for nested routes if needed
