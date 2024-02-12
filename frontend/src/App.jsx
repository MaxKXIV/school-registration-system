import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/login/login.page";
import RegistrationPage from "./pages/registration/registration.page";
import SectionPage from "./pages/section/section.page";
import CartContext from "./context/CartContext";
import CartPage from "./pages/cart/cart.page";
import IDContext from "./context/IDContext";

// Caches some queries so there is not need to ping the server again
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const cart = useState([]);
  const id = 1; //probably a good idea to remove the hard coded id later
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* provides pages access to the cart hook */}
        <IDContext.Provider value={id}>
          {/* provides pages access to id of user */}
          <CartContext.Provider value={cart}>
            <Routes>
              {/* login */}
              <Route path="/" element={<LoginPage />}></Route>
              {/* section list page */}
              <Route
                path="/registration"
                element={<RegistrationPage />}
              ></Route>
              {/* specific section page */}
              <Route path="/registration/:id" element={<SectionPage />}></Route>
              {/* cart page */}
              <Route path="/registration/cart/" element={<CartPage />}></Route>
            </Routes>
          </CartContext.Provider>
        </IDContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
