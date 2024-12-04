"use client";
import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useTokens } from '@/utils/CustomProvider';
import { useEffect, useState } from "react";
import { User } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, updateUser } from "@/store/features/userSlice";
import { LoadingButton } from "@mui/lab";

export default function Home() {
  const tokens = useTokens();
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.user);
  interface Column {
    id: 'id' | 'name' | 'role' | 'email' | 'createdAt';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [users, setUsers] = useState<User[] | []>([])

  const columns: readonly Column[] = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'role', label: 'Role', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'createdAt', label: 'Created At', minWidth: 170 },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  }

  const handleOpenDialog = (user: any) => {
    setSelectedUser(user);
    setShowForm(true);
  }

  const handleSubmit = async (form: any) => {
    if (selectedUser) {
      form.id = selectedUser.id;
    }
    dispatch(updateUser({ token: tokens.token, form: form }));
  }

  const getData = async () => {
    dispatch(fetchUsers(tokens.token));
  }

  useEffect(() => {
    if (status == "succeeded") {
      setShowForm(false);
      handleClose();
    }
  }, [status])

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Dialog
        open={showForm}
        onClose={() => handleClose()}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            // const email = formJson.email;
            handleSubmit(formJson);
          },
        }}
      >
        <DialogTitle>{selectedUser ? "Update" : "Create"} User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedUser?.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="role"
            name="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedUser?.role}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={selectedUser?.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={status == "submitting"} type="submit">Submit</LoadingButton>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Hello {tokens.decodedToken.email} 👋
        </Typography>
        <Typography variant="body1">
          This is a sample user list data in my firestore
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <LoadingButton variant="contained" loading={status == "loading"} onClick={() => handleOpenDialog(null)}>Create User</LoadingButton>
          <LoadingButton variant="contained" loading={status == "loading"} onClick={() => getData()}>Fetch / Refresh User</LoadingButton>
        </Box>


        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {error &&
                <Typography color={"#DD1919FF"} sx={{ mt: "10px" }}>
                  {error} 😢
                </Typography>
              }

              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ cursor: "pointer" }} onClick={() => handleOpenDialog(user)}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
}