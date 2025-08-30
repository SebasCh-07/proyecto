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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        {/* Imagen izquierda - solo visible en web */}
        <Grid
          item
          sx={{
            display: { xs: "none", md: "block" },
            flexGrow: 1,
            flexBasis: { md: "60%" },
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
          md={6} 
          component={Paper} 
          elevation={6} 
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh"
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: "400px" },
              px: { xs: 3, md: 4 },
              py: { xs: 2, md: 4 }
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
                width: { xs: 64, md: 80 },
                height: { xs: 64, md: 80 }
              }}>
                <LockOutlinedIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
              </Avatar>
              
              <Typography 
                component="h1" 
                variant="h4"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.125rem" },
                  textAlign: "center",
                  mb: 3,
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
                    mb: 2,
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '16px', md: '16px' }
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
                    mb: 2,
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '16px', md: '16px' }
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
                    mt: 2, 
                    mb: 2,
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '18px', md: '18px' },
                    minHeight: { xs: '48px', md: '48px' }
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
