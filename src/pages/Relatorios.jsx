import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";

function Relatorios() {
  const [transacoes, setTransacoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/relatorios");
        const data = await response.json();
        if (response.ok) {
          setTransacoes(data.transacoes);
        } else {
          setErro(data.error);
        }
      } catch (error) {
        setErro("Erro ao buscar transações.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransacoes();
  }, []);

  return (
    <Container
      maxWidth="lg"
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
      <Box sx={{ width: "100%" }}>
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
                mb: 4,
              }}
            >
              Relatórios de Transações
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center" mb={2}>
                <CircularProgress color="secondary" />
              </Box>
            ) : erro ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {erro}
              </Alert>
            ) : transacoes.length === 0 ? (
              <Alert severity="info">Não há transações no momento.</Alert>
            ) : (
              <Table sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                      De (Conta Origem)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                      Para (Conta Destino)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                      Tipo
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                      Valor
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                      Data
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transacoes.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>{transacao.conta_origem || "N/A"}</TableCell>
                      <TableCell>{transacao.conta_destino || "N/A"}</TableCell>
                      <TableCell>{transacao.tipo}</TableCell>
                      <TableCell>
                        R$ {Number(transacao.valor).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {new Date(transacao.data).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Relatorios;