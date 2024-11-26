import { Link } from "react-router-dom";
import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NavBar = ({ onClose }) => {
  const [openTransacoes, setOpenTransacoes] = useState(false);

  const handleToggleTransacoes = () => {
    setOpenTransacoes(!openTransacoes);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 200,
        p: 2,
        gap: 1,
      }}
    >
      <Button component={Link} to="/" sx={navButtonStyles} onClick={onClose}>
        <HomeIcon sx={{ marginRight: 2 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>Home</Box>
      </Button>
      <Button
        component={Link}
        to="/usuarios"
        sx={navButtonStyles}
        onClick={onClose}
      >
        <PeopleIcon sx={{ marginRight: 2 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>Usuários</Box>
      </Button>
      <Button
        component={Link}
        to="/cadastro-usuario-conta"
        sx={navButtonStyles}
        onClick={onClose}
      >
        <AccountBalanceIcon sx={{ marginRight: 2 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>Cadastro</Box>
      </Button>

      <Button onClick={handleToggleTransacoes} sx={navButtonStyles}>
        <AccountBalanceWalletIcon sx={{ marginRight: 2 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>Transações</Box>
        {openTransacoes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse in={openTransacoes} timeout="auto" unmountOnExit>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            component={Link}
            to="/saque"
            sx={submenuButtonStyles}
            onClick={onClose}
          >
            <AttachMoneyIcon sx={{ marginRight: 2 }} />
            <Box sx={{ flex: 1, textAlign: "center" }}>SAQUE</Box>
          </Button>
          <Button
            component={Link}
            to="/deposito"
            sx={submenuButtonStyles}
            onClick={onClose}
          >
            <SavingsIcon sx={{ marginRight: 2 }} />
            <Box sx={{ flex: 1, textAlign: "center" }}>DEPÓSITO</Box>
          </Button>
          <Button
            component={Link}
            to="/transferencia"
            sx={submenuButtonStyles}
            onClick={onClose}
          >
            <SyncAltIcon sx={{ marginRight: 2 }} />
            <Box sx={{ flex: 1, textAlign: "center" }}>TRANSFERÊNCIA</Box>
          </Button>
        </Box>
      </Collapse>

      <Button
        component={Link}
        to="/relatorios"
        sx={navButtonStyles}
        onClick={onClose}
      >
        <InsertChartIcon sx={{ marginRight: 2 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>Relatórios</Box>
      </Button>
      <Button
        component={Link}
        to="/notificacoes"
        sx={navButtonStyles}
        onClick={onClose}
      >
        <NotificationsIcon sx={{ marginRight: 2 }} />
        <Box sx={{ flex: 1, textAlign: "center" }}>Notificações</Box>
      </Button>
    </Box>
  );
};

const navButtonStyles = {
  width: "100%",
  color: "primary.contrastText",
  backgroundColor: "primary.main",
  borderRadius: 8,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  "&.active": {
    backgroundColor: "secondary.main",
  },
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const submenuButtonStyles = {
  ...navButtonStyles,
  backgroundColor: "primary.light",
  width: "90%",
  padding: "8px 16px",
  margin: "4px 8px",
};

export default NavBar;
