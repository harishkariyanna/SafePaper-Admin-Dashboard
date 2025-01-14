import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { getUsers, createUser, deleteUser } from "../../services/userService";
import GuardianTable from "./components/GuardianTable";
import AddGuardianDialog from "./components/AddGuardianDialog";
import { School, Security } from "@mui/icons-material";

export default function Guardians() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadGuardians = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers("guardian");
      setGuardians(response.data);
    } catch (err) {
      setError(err.message || "Failed to load guardians");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuardians();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createUser({
        ...formData,
        role: "guardian",
      });
      setOpenDialog(false);
      loadGuardians();
    } catch (err) {
      setError(err.message || "Failed to create guardian");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this guardian?")) {
      try {
        setError(null);
        await deleteUser(userId);
        loadGuardians();
      } catch (err) {
        setError(err.message || "Failed to delete guardian");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-space-grotesk font-bold text-primary mb-2">
            Exam Guardians
          </h1>
          <p className="text-sm text-gray-600 font-poppins">
            Manage and monitor exam supervision staff
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<School />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: "#2f27ce",
            "&:hover": {
              backgroundColor: "#433bff",
            },
            borderRadius: "8px",
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 500,
            padding: "8px 20px",
          }}
          className="w-full md:w-auto"
        >
          Add Guardian
        </Button>
      </div>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 4,
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "#ff4444",
            },
          }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress sx={{ color: "#2f27ce" }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-secondary bg-opacity-30 rounded-xl shadow-sm p-6 border border-secondary">
            <div className="flex items-center gap-3 mb-6">
              <Security sx={{ color: "#2f27ce", fontSize: 24 }} />
              <h2 className="text-xl font-space-grotesk font-semibold text-textcolor">
                Active Guardians
              </h2>
            </div>
            <GuardianTable guardians={guardians} onDelete={handleDelete} />
          </div>
        </div>
      )}

      <AddGuardianDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
