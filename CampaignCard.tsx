import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import { Share as ShareIcon, Verified as VerifiedIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface CampaignCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  isVerified?: boolean;
  creator: string;
  lastUpdated: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  description,
  image,
  raised,
  goal,
  isVerified = false,
  creator,
  lastUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDonate = () => {
    // TODO: Implement payment processing
    console.log('Donating amount:', amount);
    handleClose();
  };

  const progress = (raised / goal) * 100;

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            sx={{
              objectFit: 'cover',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          />
          {isVerified && (
            <Chip
              icon={<VerifiedIcon />}
              label="Verified"
              color="success"
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
          
          {/* Progress Bar */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Raised: ${raised.toLocaleString()} / ${goal.toLocaleString()}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 5, mt: 1 }}
            />
          </Box>

          {/* Campaign Info */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Created by: {creator}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {lastUpdated}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClickOpen}
            >
              Donate Now
            </Button>
            <IconButton
              color="primary"
              onClick={() => {
                // TODO: Implement social sharing
                navigator.share({
                  title: title,
                  text: description,
                  url: window.location.href,
                });
              }}
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Donation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Make a Donation</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: '$',
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Payment Options:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip label="Credit Card" />
              <Chip label="Debit Card" />
              <Chip label="UPI" />
              <Chip label="PayPal" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDonate} variant="contained" color="primary">
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CampaignCard; 