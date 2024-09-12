import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import routes from "routes";
import Chatbot from "pages/CopiloteChatBot";

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("generateTokken");
    // if (!token) {
    //   navigate("/pages/authentication/sign-in");
    // }
  }, [pathname, navigate]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chatbot />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/pages/authentication/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
