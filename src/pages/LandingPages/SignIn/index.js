import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import bgImage from "assets/images/fonds.png";
import { Link } from "react-router-dom";
import { API_URL } from "constants/coonstant.";

function SignInBasic() {
  const [numETU, setNumETU] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/student/login`, {
        numETU,
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200 && data.success) {
        localStorage.setItem("generateTokken", data.token);
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Échec de la connexion. Veuillez réessayer.");
      }
    } catch (error) {
      setErrorMessage("Nous n'avons pas trouvé de compte avec vos informations!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  LOGIN
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleLogin}>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Numéro Étudiant"
                      fullWidth
                      value={numETU}
                      onChange={(e) => setNumETU(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Mot de passe"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </MKBox>
                  {errorMessage && (
                    <MKBox mb={2}>
                      <MKTypography color="error">{errorMessage}</MKTypography>
                    </MKBox>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Connexion..." : "Se connecter"}
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Pas encore de compte?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/signup"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Créer un compte
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;
