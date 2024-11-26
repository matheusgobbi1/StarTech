import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";

function Saque() {
  const [contas, setContas] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState(null);

  // Buscar usuários ao carregar a página
  useEffect(() => {
    const fetchContas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/contas");
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        const data = await response.json();
        setContas(data);
      } catch (error) {
        setErro("Erro ao buscar usuários.");
      }
    };

    fetchContas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSelecionado || !valor || valor <= 0) {
      setErro(
        "Conta de origem e valor são obrigatórios, e o valor deve ser positivo."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/saque", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contaOrigem: Number(usuarioSelecionado),
          valor: Number(valor),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Saque realizado com sucesso!");
        setValor(""); // Limpar o campo de valor após o saque
        setUsuarioSelecionado(""); // Limpar o usuário selecionado
      } else {
        setErro(data.error);
      }
    } catch (error) {
      setErro("Erro ao realizar saque.");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        animation: "fadeIn 0.5s ease",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" } }}>
        <Card
          sx={{
            padding: 4,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
            background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
            borderRadius: "16px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                color: "#0752dd",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Saque
            </Typography>
            {erro && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {erro}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                select
                label="Conta de Origem"
                variant="outlined"
                margin="normal"
                value={usuarioSelecionado}
                onChange={(e) => setUsuarioSelecionado(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 8,
                  },
                }}
              >
                {contas.map((conta) => (
                  <MenuItem key={conta.id} value={conta.id}>
                    {conta.banco} - Conta: {conta.numero_conta} Saldo: R$
                    {conta.saldo}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Valor"
                variant="outlined"
                margin="normal"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 8,
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  padding: "10px 0",
                  fontSize: "16px",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  borderRadius: 5,
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "secondary.contrastText",
                    transform: "scale(1.02)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Sacar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Saque;
