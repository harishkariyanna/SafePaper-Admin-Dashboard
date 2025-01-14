import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { getUsers, createUser, deleteUser } from "../../services/userService";
import PaperSetterTable from "./components/PaperSetterTable";
import AddPaperSetterDialog from "./components/AddPaperSetterDialog";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function PaperSetters() {
  const [paperSetters, setPaperSetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadPaperSetters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers("paper-setter");
      setPaperSetters(response.data);
    } catch (err) {
      setError(err.message || "Failed to load paper setters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaperSetters();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createUser({
        ...formData,
        role: "paper-setter",
      });
      setOpenDialog(false);
      loadPaperSetters();
    } catch (err) {
      setError(err.message || "Failed to create paper setter");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this paper setter?")) {
      try {
        setError(null);
        await deleteUser(userId);
        loadPaperSetters();
      } catch (err) {
        setError(err.message || "Failed to delete paper setter");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-space-grotesk font-bold text-primary mb-2">
            Paper Setters
          </h1>
          <p className="text-sm text-gray-600 font-poppins">
            Manage question paper creators and reviewers
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<CreateIcon />}
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
          Add Paper Setter
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
              <AssignmentIcon sx={{ color: "#2f27ce", fontSize: 24 }} />
              <h2 className="text-xl font-space-grotesk font-semibold text-textcolor">
                Active Paper Setters
              </h2>
            </div>
            <PaperSetterTable
              paperSetters={paperSetters}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      <AddPaperSetterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
