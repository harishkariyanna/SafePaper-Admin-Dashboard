import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';

export default function ExamCenterTable({ examCenters, onDelete }) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: '12px',
        boxShadow: 'none',
        border: '1px solid #dedcff'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8f8ff' }}>
            <TableCell 
              sx={{ 
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                color: '#2f27ce',
                borderBottom: '2px solid #dedcff'
              }}
            >
              <div className="flex items-center gap-2">
                <BusinessIcon sx={{ fontSize: 20 }} />
                Center Details
              </div>
            </TableCell>
            <TableCell 
              sx={{ 
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                color: '#2f27ce',
                borderBottom: '2px solid #dedcff'
              }}
            >
              <div className="flex items-center gap-2">
                <EmailIcon sx={{ fontSize: 20 }} />
                Contact
              </div>
            </TableCell>
            <TableCell 
              sx={{ 
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                color: '#2f27ce',
                borderBottom: '2px solid #dedcff'
              }}
            >
              <div className="flex items-center gap-2">
                <CalendarTodayIcon sx={{ fontSize: 20 }} />
                Registration Date
              </div>
            </TableCell>
            <TableCell 
              align="center"
              sx={{ 
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                color: '#2f27ce',
                borderBottom: '2px solid #dedcff'
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examCenters.map((center) => (
            <TableRow 
              key={center._id}
              sx={{ 
                '&:hover': { 
                  backgroundColor: '#fbfbfe',
                  transition: 'background-color 0.2s'
                }
              }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar 
                    sx={{ 
                      bgcolor: '#dedcff',
                      color: '#2f27ce',
                      width: 40,
                      height: 40,
                      fontSize: '1.1rem',
                      fontFamily: 'Space Grotesk'
                    }}
                  >
                    <LocationOnIcon />
                  </Avatar>
                  <div>
                    <div className="font-space-grotesk font-semibold text-textcolor">
                      {center.name}
                    </div>
                    <Chip
                      label="Exam Center"
                      size="small"
                      sx={{
                        backgroundColor: '#dedcff',
                        color: '#2f27ce',
                        fontSize: '0.7rem',
                        height: '20px',
                        fontFamily: 'Poppins'
                      }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell sx={{ fontFamily: 'Poppins' }}>
                <div className="flex items-center gap-2 text-gray-600">
                  <EmailIcon sx={{ fontSize: 16, color: '#2f27ce' }} />
                  {center.email}
                </div>
              </TableCell>
              <TableCell sx={{ fontFamily: 'Poppins', color: 'gray' }}>
                {new Date(center.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Delete Center">
                  <IconButton
                    sx={{ 
                      color: '#ff4444',
                      '&:hover': {
                        backgroundColor: '#ffeeee'
                      }
                    }}
                    onClick={() => onDelete(center._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
