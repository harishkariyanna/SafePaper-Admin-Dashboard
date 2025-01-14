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
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SecurityIcon from '@mui/icons-material/Security';

export default function GuardianTable({ guardians, onDelete }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: '12px',
        boxShadow: 'none',
        border: '1px solid #dedcff',
        overflowX: 'auto'
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
                borderBottom: '2px solid #dedcff',
                minWidth: isMobile ? '200px' : 'auto'
              }}
            >
              <div className="flex items-center gap-2">
                <PersonIcon sx={{ fontSize: 20 }} />
                Guardian Details
              </div>
            </TableCell>
            {!isMobile && (
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
            )}
            {!isMobile && (
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
                  Joined
                </div>
              </TableCell>
            )}
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
          {guardians.map((guardian) => (
            <TableRow 
              key={guardian._id}
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
                    {guardian.name.charAt(0)}
                  </Avatar>
                  <div>
                    <div className="font-space-grotesk font-semibold text-textcolor">
                      {guardian.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Chip
                        icon={<SecurityIcon sx={{ fontSize: '16px !important' }} />}
                        label="Guardian"
                        size="small"
                        sx={{
                          backgroundColor: '#dedcff',
                          color: '#2f27ce',
                          fontSize: '0.7rem',
                          height: '20px',
                          fontFamily: 'Poppins'
                        }}
                      />
                      {isMobile && (
                        <span className="text-xs text-gray-500 font-poppins">
                          {guardian.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>
              {!isMobile && (
                <TableCell sx={{ fontFamily: 'Poppins' }}>
                  <div className="flex items-center gap-2 text-gray-600">
                    <EmailIcon sx={{ fontSize: 16, color: '#2f27ce' }} />
                    {guardian.email}
                  </div>
                </TableCell>
              )}
              {!isMobile && (
                <TableCell sx={{ fontFamily: 'Poppins', color: 'gray' }}>
                  {new Date(guardian.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>
              )}
              <TableCell align="center">
                <Tooltip title="Delete Guardian">
                  <IconButton
                    sx={{ 
                      color: '#ff4444',
                      '&:hover': {
                        backgroundColor: '#ffeeee'
                      }
                    }}
                    onClick={() => onDelete(guardian._id)}
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
