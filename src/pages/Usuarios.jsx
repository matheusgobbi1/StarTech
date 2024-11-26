import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [detalhesConta, setDetalhesConta] = useState({});
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/usuarios");
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const handleVerDetalhes = async (userId) => {
    try {
      if (detalhesConta[userId]) return;
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${userId}/conta`
      );
      const data = await response.json();
      if (response.ok) {
        setDetalhesConta((prevState) => ({
          ...prevState,
          [userId]: data,
        }));
      } else {
        setErro(data.error || "Erro ao buscar detalhes da conta.");
      }
    } catch (error) {
      setErro("Erro ao buscar detalhes da conta.");
    }
  };

  const handleExcluirUsuario = async (userId) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/usuarios/${userId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Usuário excluído com sucesso!");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((user) => user.id !== userId)
        );
      } else {
        throw new Error("Erro ao excluir usuário.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#032353",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          marginBottom: 4,
        }}
      >
        LISTA DE USUÁRIOS
      </Typography>
      {erro && (
        <Typography
          color="error"
          align="center"
          sx={{
            marginBottom: 2,
            backgroundColor: "#ffcccc",
            padding: 2,
            borderRadius: 2,
          }}
        >
          {erro}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cadastro-usuario-conta")}
          sx={{
            marginLeft: 2,
            padding: "10px 16px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#EA7730",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#d2691e",
            },
          }}
        >
          Criar Conta
        </Button>
      </Box>
      <Grid container spacing={4}>
        {usuariosFiltrados.map((usuario) => (
          <Grid item xs={12} sm={6} key={usuario.id}>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                color: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Accordion
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                onChange={() => handleVerDetalhes(usuario.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#EA7730" }} />}
                  sx={{
                    padding: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        color: "#EA7730",
                      }}
                    >
                      {usuario.nome}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        color: "#cccccc",
                      }}
                    >
                      {usuario.email}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderRadius: "16px",
                    padding: 3,
                  }}
                >
                  {detalhesConta[usuario.id] ? (
                    <>
                      <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        <strong>Tipo de Conta:</strong>{" "}
                        {detalhesConta[usuario.id].tipo_conta}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        <strong>Banco:</strong>{" "}
                        {detalhesConta[usuario.id].banco}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        <strong>Agência:</strong>{" "}
                        {detalhesConta[usuario.id].agencia}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        <strong>Número da Conta:</strong>{" "}
                        {detalhesConta[usuario.id].numero_conta}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <strong>Saldo:</strong> R${" "}
                        {detalhesConta[usuario.id].saldo}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2">
                      Carregando informações...
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Usuarios;
