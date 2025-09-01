// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgPerito from "./img/perito.jpg";

// MUI v5
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// 👇 Importamos los peritos desde data.js
import { samplePeritos } from "../data";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Plataforma
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '16px', // Prevents zoom on iOS
            minHeight: '44px', // Touch-friendly
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '44px', // Touch-friendly
          fontSize: '16px',
        },
      },
    },
  },
});

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔑 Lista de usuarios disponibles
  const users = [
    { username: "admin123", password: "adminpass", role: "admin" },
    ...samplePeritos.map((p) => ({
      username: p.username,
      password: p.password,
      role: "perito",
      peritoId: p.id,
    })),
  ];
  console.log(users)

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // 👇 Mandamos también el peritoId (si aplica)
      onLogin(user.role, user.peritoId || null);
      if (user.role === "admin") {
        navigate("/clientes");
      } else {
        navigate("/perito");
      }
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
        <CssBaseline />

        {/* Imagen izquierda - solo visible en web */}
        <Grid
          item
          sx={{
            display: { xs: "none", lg: "block" },
            flexGrow: 1,
            flexBasis: { lg: "50%" },
            backgroundImage: `url(${imgPerito})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        />

        {/* Formulario - responsive */}
        <Grid 
          item 
          xs={12} 
          lg={6} 
          component={Paper} 
          elevation={6} 
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: { xs: "100vw", lg: "auto" },
            backgroundColor: { xs: "white", lg: "white" },
            padding: { xs: 0, lg: 0 },
            margin: { xs: 0, lg: 0 },
            position: { xs: "fixed", lg: "static" },
            top: { xs: 0, lg: "auto" },
            left: { xs: 0, lg: "auto" },
            right: { xs: 0, lg: "auto" },
            bottom: { xs: 0, lg: "auto" },
            zIndex: { xs: 1, lg: "auto" }
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "90%", md: "500px", lg: "600px" },
              px: { xs: 4, md: 6, lg: 8 },
              py: { xs: 4, md: 4, lg: 5 },
              margin: { xs: "auto", lg: 0 },
              height: { xs: "100vh", lg: "auto" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Avatar sx={{ 
                m: 2, 
                bgcolor: "secondary.main",
                width: { xs: 80, md: 100, lg: 120 },
                height: { xs: 80, md: 100, lg: 120 }
              }}>
                <LockOutlinedIcon sx={{ fontSize: { xs: 40, md: 50, lg: 60 } }} />
              </Avatar>
              
              <Typography 
                component="h1" 
                variant="h4"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.25rem", lg: "2.5rem" },
                  textAlign: "center",
                  mb: { xs: 3, md: 4, lg: 5 },
                  fontWeight: 600
                }}
              >
                Ingreso a la Plataforma
              </Typography>
              
              <Box 
                component="form" 
                noValidate 
                onSubmit={handleSubmit} 
                sx={{ 
                  width: "100%",
                  mt: 1
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  sx={{
                    mb: { xs: 2, md: 3, lg: 3 },
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '16px', md: '18px', lg: '18px' }
                    },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '16px', md: '18px', lg: '18px' },
                      minHeight: { xs: '48px', md: '56px', lg: '56px' }
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mb: { xs: 2, md: 3, lg: 3 },
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '16px', md: '18px', lg: '18px' }
                    },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '16px', md: '18px', lg: '18px' },
                      minHeight: { xs: '48px', md: '56px', lg: '56px' }
                    }
                  }}
                />
                {error && (
                  <Typography 
                    color="error" 
                    variant="body2" 
                    sx={{ 
                      mt: 1,
                      textAlign: "center",
                      fontSize: { xs: '14px', md: '16px' },
                      mb: 2
                    }}
                  >
                    {error}
                  </Typography>
                )}
                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  sx={{ 
                    mt: { xs: 2, md: 3, lg: 4 }, 
                    mb: { xs: 2, md: 3, lg: 3 },
                    py: { xs: 1.5, md: 2, lg: 2.5 },
                    fontSize: { xs: '18px', md: '20px', lg: '22px' },
                    minHeight: { xs: '48px', md: '56px', lg: '64px' },
                    fontWeight: 600
                  }}
                >
                  Ingresar
                </Button>
                
                <Grid item xs>
                  <Link 
                    href="/agregar-perito" 
                    variant="body2"
                    sx={{
                      fontSize: { xs: '14px', md: '16px' },
                      textAlign: "center",
                      display: "block",
                      textDecoration: "none",
                      '&:hover': {
                        textDecoration: "underline"
                      }
                    }}
                  >
                    ¿Olvido su Contraseña?
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
