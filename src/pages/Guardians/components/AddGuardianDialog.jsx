import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';

export default function AddGuardianDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontFamily: 'Space Grotesk',
          fontWeight: 600,
          color: '#2f27ce',
          borderBottom: '1px solid #dedcff',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <SchoolIcon sx={{ color: '#2f27ce' }} />
        Add New Guardian
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#666'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ padding: '24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              label="Guardian Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#2f27ce',
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#2f27ce',
                },
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#2f27ce',
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#2f27ce',
                },
              }}
            />
            <TextField
              label="Set Password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#2f27ce',
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#2f27ce',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions 
          sx={{ 
            padding: '16px 24px', 
            borderTop: '1px solid #dedcff',
            gap: '12px'
          }}
        >
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#666',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#2f27ce',
              '&:hover': {
                backgroundColor: '#433bff',
              },
              borderRadius: '8px',
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontWeight: 500,
              padding: '8px 20px',
            }}
          >
            Add Guardian
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
