import { useEffect, useState } from 'react';
import axios from '../api/api';
import {
  Box, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, TableContainer,
  useMediaQuery, Divider, Button, Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders/');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  const handleDelete = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await axios.delete(`/orders/${orderId}/`);
      console.log(`Order ${orderId} deleted successfully`);
      fetchOrders();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (orderId) => {
  navigate(`/admin/orders/${orderId}/edit`);
};

  return (
    <Box px={isMobile ? 2 : 5} py={3}>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
        All Orders
      </Typography>

      {!isMobile ? (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Items</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Payment</strong></TableCell>
                <TableCell><strong>Paid</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.user.username}</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {order.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </TableCell>
                  <TableCell>Rs: {order.total_price}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phone_number}</TableCell>
                  <TableCell>{order.payment_method}</TableCell>
                  <TableCell>{order.is_paid ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(order.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Mobile View
        <Box>
          {orders.map(order => (
            <Paper key={order.id} elevation={3} sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1"><strong>User:</strong> {order.user.username}</Typography>
              <Typography variant="body2"><strong>Items:</strong> {order.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}</Typography>
              <Typography variant="body2"><strong>Total:</strong> Rs {order.total_price}</Typography>
              <Typography variant="body2"><strong>Address:</strong> {order.address}</Typography>
              <Typography variant="body2"><strong>Phone:</strong> {order.phone_number}</Typography>
              <Typography variant="body2"><strong>Payment:</strong> {order.payment_method}</Typography>
              <Typography variant="body2"><strong>Paid:</strong> {order.is_paid ? 'Yes' : 'No'}</Typography>
              <Typography variant="body2"><strong>Created:</strong> {new Date(order.created_at).toLocaleDateString()}</Typography>

              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(order.id)}
>
                    Edit
                  </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminOrders;
