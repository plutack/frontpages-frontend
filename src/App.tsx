import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Header from "@/components/header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Search from "@/pages/search";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
