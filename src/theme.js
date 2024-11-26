import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0752dd", // Cor principal para botões e elementos de destaque
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#032353", // Cor para elementos secundários
    },
    background: {
      default: "#f4f6f8", // Cor de fundo da aplicação
      paper: "#ffffff", // Fundo para caixas e cards
    },
    error: {
      main: "#d32f2f", // Cor de erro padrão
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Fonte padrão do projeto
    h4: {
      color: "#0752dd",
      fontWeight: "bold",
    },
  },
});

export default theme;
