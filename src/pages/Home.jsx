import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

function Home() {
  const [estatisticas, setEstatisticas] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/estatisticas");
        if (!response.ok) throw new Error("Erro ao buscar estatísticas.");
        const data = await response.json();
        setEstatisticas(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchEstatisticas();
  }, []);

  if (!estatisticas && !erro) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
        Painel de Controle
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
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "secondary.main",
              color: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Saldo Total
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                R$ {estatisticas?.saldoTotal || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "secondary.main",
              color: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total de Depósitos
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                R$ {estatisticas?.totalDepositos || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "secondary.main",
              color: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total de Saques
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                R$ {estatisticas?.totalSaques || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "secondary.main",
              color: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total de Transações
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {estatisticas?.totalTransacoes || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "secondary.main",
              color: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          ></Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
