"use client";
import React, { FormEvent, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/apis/firebase";
import { useRouter } from "next/navigation";
import { Divider, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ErrorAlert } from '@/components/ErrorAlert';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn() {

  const [loading, setLoading] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleReg = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      router.push("/login");
    } catch (e) {
      ErrorAlert((e as Error).message);
    }
    setLoading(false);
  }
  return (
    <SignInContainer>
      <CssBaseline />
      <Card>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={passwordError}
          helperText={passwordErrorMessage}
          value={password}
          onChange={(e) => {
            if(e.target.value.length < 6) {
              setPasswordErrorMessage('Password must be at least 6 characters');
              setPasswordError(true);
            } else {
              setPasswordErrorMessage('');
              setPasswordError(false);
            }
            setPassword(e.target.value);
          }}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleReg}
          loading={loading}
          disabled={email === "" || password === "" || password.length < 6}
        >
          Register
        </LoadingButton>
        <Divider />
        <Typography variant="body2" color="textSecondary" align="center">
          Already have an account?{' '}
          <Link href="/login" underline="always">
            Sign In
          </Link>
        </Typography>
      </Card>
    </SignInContainer>
  );
}