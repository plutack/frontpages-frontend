import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Header from "@/components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Search from "@/pages/search";
import NewspaperDetail from "@/pages/newspaper-detail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/newspapers/:id" element={<NewspaperDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
