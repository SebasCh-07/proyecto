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

const theme = createTheme();

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
        <CssBaseline />

        {/* Imagen izquierda */}
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
            flexGrow: 1,
            flexBasis: { sm: "40%", md: "60%" },
            backgroundImage: `url(${imgPerito})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        />

        {/* Formulario derecha */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 25,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingreso a la Plataforma
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
                Ingresar
              </Button>
              <Grid item xs>

                <Link href="/agregar-perito" variant="body2">
                  ¿Olvido su Contraseña?
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
