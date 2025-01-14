import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { getUsers, createUser, deleteUser } from "../../services/userService";
import ExamCenterTable from "./components/ExamCenterTable";
import AddExamCenterDialog from "./components/AddExamCenterDialog";
import { showToast } from "../../utils/toast";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ExamCenters() {
  const [examCenters, setExamCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadExamCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers("exam-center");
      setExamCenters(response.data);
    } catch (err) {
      setError(err.message || "Failed to load exam centers");
      showToast.error(err.message || "Failed to load exam centers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExamCenters();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createUser({
        ...formData,
        role: "exam-center",
      });
      showToast.success("Exam center created successfully");
      setOpenDialog(false);
      loadExamCenters();
    } catch (err) {
      setError(err.message || "Failed to create exam center");
      showToast.error(err.message || "Failed to create exam center");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this exam center?")) {
      try {
        setError(null);
        await deleteUser(userId);
        showToast.success("Exam center deleted successfully");
        loadExamCenters();
      } catch (err) {
        setError(err.message || "Failed to delete exam center");
        showToast.error(err.message || "Failed to delete exam center");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-space-grotesk font-bold text-primary mb-2">
            Exam Centers
          </h1>
          <p className="text-sm text-gray-600 font-poppins">
            Manage examination venues and locations
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<LocationCityIcon />}
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
          Add Exam Center
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
              <LocationOnIcon sx={{ color: "#2f27ce", fontSize: 24 }} />
              <h2 className="text-xl font-space-grotesk font-semibold text-textcolor">
                Registered Centers
              </h2>
            </div>
            <ExamCenterTable
              examCenters={examCenters}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      <AddExamCenterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
