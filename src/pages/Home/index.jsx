import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, Alert } from "@mui/material";
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { login } from '../../services/authService';
import { showToast } from '../../utils/toast';
import LockIcon from '@mui/icons-material/Lock';

export default function Home() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await login(formData);
      if (response.token) {
        dispatch(loginSuccess(response.token));
        showToast.success("Login successful");
        navigate("/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      dispatch(loginFailure(err.message || "Login failed"));
      showToast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <Container maxWidth="xs">
        <div className="bg-secondary bg-opacity-30 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <LockIcon className="text-primary" fontSize="large" />
          </div>
          <h1 className="text-center text-2xl font-bold text-textcolor mb-2 font-space-grotesk">
            Welcome
          </h1>
          <p className="text-center text-textcolor mb-4 font-poppins">
            Please login to your account
          </p>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-secondary text-textcolor rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-secondary text-textcolor rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-4 mb-2 bg-accent text-white hover:bg-primary transition duration-300 ease-in-out rounded-md shadow-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
