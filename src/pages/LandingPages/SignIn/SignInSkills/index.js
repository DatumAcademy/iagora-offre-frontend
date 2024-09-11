import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import bgImage from "assets/images/fonds.png";
import { API_URL } from "constants/coonstant.";

function CompleteRegistration() {
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState([{ label: "", level: "" }]);
  const [experience, setExperience] = useState([{ label: "", description: "", company: "", city: "", yearsexperience: "", years: "", skills: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { numETU, email } = useParams();

  const handleAddLanguage = () => {
    setLanguages([...languages, { label: "", level: "" }]);
  };

  const handleRemoveLanguage = (index) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setLanguages(newLanguages);
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...languages];
    newLanguages[index][field] = value;
    setLanguages(newLanguages);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { label: "", description: "", company: "", city: "", yearsexperience: "", years: "", skills: "" }]);
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.put(`${API_URL}/student/complete-registration/${numETU}/${email}`, {
        password,
        age: Number(age),
        skills: skills.split(","),
        language: languages,
        experience,
      });

      const data = response.data;

      if (response.status === 200 && data.success) {
        navigate("/pages/authentication/sign-in");
      } else {
        setErrorMessage(data.message || "Échec de la complétion de l'inscription.");
      }
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
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
        height="auto"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
        }}
      >
      <MKBox px={1} width="100%" minHeight="100vh" mx="auto" position="relative" zIndex={2} mt={10} mb={10} >
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={8} lg={6} xl={5}>
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
                  Complétion Inscription
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleCompleteRegistration}>
                  <MKBox mb={3}>
                    <MKInput
                      type="password"
                      label="Mot de passe"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={3}>
                    <MKInput
                      type="number"
                      label="Âge"
                      fullWidth
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={3}>
                    <MKInput
                      type="text"
                      label="Compétences (séparées par des virgules)"
                      fullWidth
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </MKBox>
                  {languages.map((lang, index) => (
                    <MKBox key={index} mb={3}>
                      <MKInput
                        type="text"
                        label={`Langue ${index + 1}`}
                        fullWidth
                        value={lang.label}
                        onChange={(e) => handleLanguageChange(index, "label", e.target.value)}
                      />
                      <Select
                        fullWidth
                        value={lang.level}
                        onChange={(e) => handleLanguageChange(index, "level", e.target.value)}
                        displayEmpty
                        sx={{ mt: 2 }}
                      >
                        <MenuItem value="" disabled>
                          Niveau
                        </MenuItem>
                        <MenuItem value="Débutant">Débutant</MenuItem>
                        <MenuItem value="Intermédiaire">Intermédiaire</MenuItem>
                        <MenuItem value="Avancé">Avancé</MenuItem>
                      </Select>
                      <MKButton
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => handleRemoveLanguage(index)}
                      >
                        Supprimer cette langue
                      </MKButton>
                    </MKBox>
                  ))}

                  <MKBox mt={3} mb={3}>
                    <MKButton variant="gradient" color="success" fullWidth onClick={handleAddLanguage}>
                      Ajouter une autre langue
                    </MKButton>
                  </MKBox>
                  {experience.map((exp, index) => (
                    <MKBox key={index} mb={3}>
                      <MKInput
                        type="text"
                        label={`Expérience ${index + 1} - Titre`}
                        fullWidth
                        value={exp.label}
                        onChange={(e) => handleExperienceChange(index, "label", e.target.value)}
                      />
                      <MKInput
                        type="text"
                        label="Description"
                        fullWidth
                        sx={{ mt: 2 }}
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                      />
                      <MKInput
                        type="text"
                        label="Entreprise"
                        fullWidth
                        value={exp.company}
                        sx={{ mt: 2 }}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      />
                      <MKInput
                        type="text"
                        label="Ville"
                        fullWidth
                        value={exp.city}
                        sx={{ mt: 2 }}
                        onChange={(e) => handleExperienceChange(index, "city", e.target.value)}
                      />
                      <MKInput
                        type="number"
                        label="Années d'expérience"
                        fullWidth
                        value={exp.yearsexperience}
                        sx={{ mt: 2 }}
                        onChange={(e) => handleExperienceChange(index, "yearsexperience", e.target.value)}
                      />
                      <MKInput
                        type="text"
                        label="Année"
                        fullWidth
                        value={exp.years}
                        sx={{ mt: 2 }}
                        onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
                      />
                      <MKInput
                        type="text"
                        label="Compétences liées (séparées par des virgules)"
                        fullWidth
                        value={exp.skills}
                        sx={{ mt: 2 }}
                        onChange={(e) => handleExperienceChange(index, "skills", e.target.value)}
                      />
                      <MKButton
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => handleRemoveExperience(index)}
                      >
                        Supprimer cette expérience
                      </MKButton>
                    </MKBox>
                  ))}

                  <MKBox mt={3} mb={3}>
                    <MKButton variant="gradient" color="success" fullWidth onClick={handleAddExperience}>
                      Ajouter une autre expérience
                    </MKButton>
                  </MKBox>

                  {errorMessage && (
                    <MKBox mb={3}>
                      <MKTypography color="error">{errorMessage}</MKTypography>
                    </MKBox>
                  )}

                  <MKBox mt={4} mb={3}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Finalisation..." : "Finaliser l'inscription"}
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      </MKBox>
    </>
  );
}
export default CompleteRegistration;
