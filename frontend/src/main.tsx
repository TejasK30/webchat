import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import UserContextProvider from "./context/UserContext.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserContextProvider>
    </QueryClientProvider>
  </>
)
