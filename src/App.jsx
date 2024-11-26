import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  LinearProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CadastroUsuarioConta from "./pages/CadastroUsuarioConta";
import Saque from "./pages/Saque";
import Deposito from "./pages/Deposito";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import Transferencia from "./pages/Transferencia";
import Usuarios from "./pages/Usuarios";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar
          position="static"
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {loading && <LinearProgress color="secondary" />}
        </AppBar>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
            },
          }}
        >
          <Box sx={{ width: 250 }}>
            <NavBar onClose={handleDrawerToggle} />
          </Box>
        </Drawer>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            animation: "fadeIn 0.5s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route
              path="/cadastro-usuario-conta"
              element={<CadastroUsuarioConta />}
            />
            <Route path="/transferencia" element={<Transferencia />} />
            <Route path="/saque" element={<Saque setLoading={setLoading} />} />
            <Route path="/deposito" element={<Deposito />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/notificacoes" element={<Notificacoes />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
