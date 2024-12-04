"use client";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/apis/firebase";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const Navbar = ({ tokens }: { tokens: any }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function handleLogoutOrLogin() {
        if (tokens) {
            setLoading(true);
            await signOut(getAuth(app));
            await fetch("/api/logout");
            window.location.href = "/login";
        } else {
            router.push("/");
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        X
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sample
                    </Typography>
                    <LoadingButton color="inherit" loading={loading} onClick={handleLogoutOrLogin}>{tokens ? "Logout" : "Login"}</LoadingButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;