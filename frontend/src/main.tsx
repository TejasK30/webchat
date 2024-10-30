import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import SocketContextProvider from "./context/SocketContext.tsx"
import "./index.css"

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
      <SocketContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SocketContextProvider>
    </QueryClientProvider>
  </>
)
