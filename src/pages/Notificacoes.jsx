import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Button,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";

function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Simulação de API de notificações
    const fetchNotificacoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notificacoes");
        if (!response.ok) throw new Error("Erro ao buscar notificações.");
        const data = await response.json();
        setNotificacoes(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchNotificacoes();
  }, []);

  const handleMarcarComoLida = (id) => {
    setNotificacoes((prev) =>
      prev.map((notificacao) =>
        notificacao.id === id ? { ...notificacao, lida: true } : notificacao
      )
    );
  };

  const handleExcluir = (id) => {
    setNotificacoes((prev) =>
      prev.filter((notificacao) => notificacao.id !== id)
    );
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#032353", marginBottom: 4 }}
      >
        Notificações
      </Typography>

      {erro && (
        <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
          {erro}
        </Typography>
      )}

      {notificacoes.length === 0 ? (
        <Typography align="center">Sem notificações no momento.</Typography>
      ) : (
        <List>
          {notificacoes.map((notificacao) => (
            <ListItem
              key={notificacao.id}
              sx={{
                backgroundColor: notificacao.lida ? "#f5f5f5" : "#fff",
                marginBottom: 1,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemIcon>
                {notificacao.tipo === "sucesso" && (
                  <CheckCircleIcon color="success" />
                )}
                {notificacao.tipo === "erro" && <ErrorIcon color="error" />}
                {notificacao.tipo === "alerta" && (
                  <WarningIcon color="warning" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={notificacao.titulo}
                secondary={notificacao.mensagem}
              />
              {!notificacao.lida && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleMarcarComoLida(notificacao.id)}
                  sx={{ marginRight: 2 }}
                >
                  Marcar como lida
                </Button>
              )}
              <IconButton
                color="error"
                onClick={() => handleExcluir(notificacao.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default Notificacoes;
