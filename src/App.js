import React from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Login from "./pages/Login";
import MovieList from "./pages/MovieList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signIn" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/movie" element={<MovieList />}>
            <Route path=":genre" element={<MovieList />}></Route>
          </Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
