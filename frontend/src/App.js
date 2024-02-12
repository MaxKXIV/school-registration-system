import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/login/login.page";
import RegistrationPage from "./pages/registration/registration.page";
import SectionPage from "./pages/section/section.page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />}></Route>
          <Route path="/registration/:id" element={<SectionPage />}></Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
