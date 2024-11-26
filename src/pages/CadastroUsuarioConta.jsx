import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CadastroUsuarioConta() {
  const [activeStep, setActiveStep] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [id, setId] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroConta, setNumeroConta] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const steps = ["Informações do Usuário", "Contas e Carteiras"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/cadastro-usuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setId(data.userId);
        handleNext(); // Avança para a próxima etapa
      } else {
        setErro(data.error);
      }
    } catch (error) {
      setErro("Erro ao registrar usuário.");
    }
  };

  const handleSubmitConta = async (e) => {
    e.preventDefault();

    // Validações
    const bancoRegex = /^\d{4}$/; // Banco deve ter exatamente 4 dígitos numéricos
    const agenciaRegex = /^\d{4}$/; // Agência deve ter exatamente 4 dígitos numéricos
    const numeroContaRegex = /^\d{8}-\d$/; // Número da conta no formato 8 números e 1 dígito após o hífen (ex: 12345678-9)

    if (!bancoRegex.test(banco)) {
      setErro("Banco deve ter exatamente 4 dígitos numéricos.");
      return;
    }

    if (!agenciaRegex.test(agencia)) {
      setErro("Agência deve ter exatamente 4 dígitos numéricos.");
      return;
    }

    if (!numeroContaRegex.test(numeroConta)) {
      setErro(
        "Número da conta deve estar no formato 8 números e 1 dígito após o hífen (ex: 12345678-9)."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/cadastro-conta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, tipoConta, banco, agencia, numeroConta }),
      });

      if (response.ok) {
        alert("Conta cadastrada com sucesso!");
        navigate("/usuarios"); // Redireciona para a página de usuários
      } else {
        const data = await response.json();
        setErro(data.error);
      }
    } catch (error) {
      setErro("Erro ao cadastrar conta.");
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
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

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
            {activeStep === 0 ? (
              <Box component="form" onSubmit={handleSubmitUsuario}>
                <Typography variant="h5" gutterBottom>
                  Informações do Usuário
                </Typography>
                {erro && (
                  <Typography color="error" align="center" sx={{ mb: 2 }}>
                    {erro}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  margin="normal"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, padding: "10px 0", fontSize: "16px" }}
                >
                  Próximo
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmitConta}>
                <Typography variant="h5" gutterBottom>
                  Contas e Carteiras
                </Typography>
                {erro && (
                  <Typography color="error" align="center" sx={{ mb: 2 }}>
                    {erro}
                  </Typography>
                )}
                <Select
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={tipoConta}
                  onChange={(e) => setTipoConta(e.target.value)}
                  displayEmpty
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 8,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Tipo de Conta
                  </MenuItem>
                  <MenuItem value={"Corrente"}>Corrente</MenuItem>
                  <MenuItem value={"Poupança"}>Poupança</MenuItem>
                  <MenuItem value={"Carteira"}>Carteira</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  label="Banco"
                  variant="outlined"
                  margin="normal"
                  value={banco}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Permitir apenas números
                    setBanco(value.slice(0, 4)); // Limitar a 4 caracteres
                  }}
                  inputProps={{
                    maxLength: 4, // Máximo de 4 caracteres
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 8,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Agência"
                  variant="outlined"
                  margin="normal"
                  value={agencia}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Permitir apenas números
                    setAgencia(value.slice(0, 4)); // Limitar a 4 caracteres
                  }}
                  inputProps={{
                    maxLength: 4, // Máximo de 4 caracteres
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 8,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Número da Conta"
                  variant="outlined"
                  margin="normal"
                  value={numeroConta}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9-]/g, ""); // Permitir apenas números e hífen
                    if (/^\d{0,8}(-\d{0,1})?$/.test(value)) {
                      setNumeroConta(value); // Aceitar apenas o formato válido
                    }
                  }}
                  inputProps={{
                    maxLength: 10, // Máximo de 8 números + 1 hífen + 1 dígito
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 8,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, padding: "10px 0", fontSize: "16px" }}
                >
                  Cadastrar Conta
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default CadastroUsuarioConta;
