import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);