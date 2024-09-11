import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import { API_URL } from "constants/coonstant.";
import MKTypography from "components/MKTypography";

function ModifyStudentInfo() {
  const numETU = localStorage.getItem("numETU");
  const email = localStorage.getItem("email");
  console.log(numETU)
  const navigate = useNavigate();

  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState([{ label: "", level: "" }]);
  const [experience, setExperience] = useState([{ label: "", description: "", company: "", city: "", yearsexperience: "", years: "", skills: "" }]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  const handleModifyInfo = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.put(`${API_URL}/student/complete-registration/${numETU}/${email}`, {
        password : "",
        age: 0,
        skills: skills ? skills.split(",").filter(skill => skill.trim() !== "") : [],
        language: languages.filter(lang => lang.label.trim() !== "" && lang.level.trim() !== ""),
        experience: experience.filter(exp => exp.label.trim() !== "" && exp.description.trim() !== ""),
      });

      const data = response.data;

      if (response.status === 200 && data.success) {
        navigate("/presentation");
      } else {
        setErrorMessage(data.message || "Échec de la modification des informations.");
      }
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout
      title="Modification des informations"
      breadcrumb={[
        { label: "Mes compétences", route: "/competence/modification" },
        { label: "Modification" },
      ]}
    >
      <View title="Skills">
        <form onSubmit={handleModifyInfo}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MKInput
                type="text"
                label="Compétences (séparées par des virgules)"
                fullWidth
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </Grid>
          </Grid>
          {languages.map((lang, index) => (
            <Grid container spacing={3} key={index} mt={2}>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="text"
                  label={`Langue ${index + 1}`}
                  fullWidth
                  value={lang.label}
                  onChange={(e) => handleLanguageChange(index, "label", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  value={lang.level}
                  onChange={(e) => handleLanguageChange(index, "level", e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Niveau
                  </MenuItem>
                  <MenuItem value="Débutant">Débutant</MenuItem>
                  <MenuItem value="Intermédiaire">Intermédiaire</MenuItem>
                  <MenuItem value="Avancé">Avancé</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <MKButton
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  Supprimer cette langue
                </MKButton>
              </Grid>
            </Grid>
          ))}

          <Grid container mt={2}>
            <Grid item xs={12}>
              <MKButton variant="gradient" color="success" onClick={handleAddLanguage} fullWidth>
                Ajouter une langue
              </MKButton>
            </Grid>
          </Grid>
          {experience.map((exp, index) => (
            <Grid container spacing={3} key={index} mt={2}>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="text"
                  label={`Expérience ${index + 1} - Titre`}
                  fullWidth
                  value={exp.label}
                  onChange={(e) => handleExperienceChange(index, "label", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="text"
                  label="Description"
                  fullWidth
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="text"
                  label="Entreprise"
                  fullWidth
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="text"
                  label="Ville"
                  fullWidth
                  value={exp.city}
                  onChange={(e) => handleExperienceChange(index, "city", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="number"
                  label="Années d'expérience"
                  fullWidth
                  value={exp.yearsexperience}
                  onChange={(e) => handleExperienceChange(index, "yearsexperience", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKInput
                  type="text"
                  label="Année"
                  fullWidth
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <MKInput
                  type="text"
                  label="Compétences liées (séparées par des virgules)"
                  fullWidth
                  value={exp.skills}
                  onChange={(e) => handleExperienceChange(index, "skills", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <MKButton
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Supprimer cette expérience
                </MKButton>
              </Grid>
            </Grid>
          ))}

          <Grid container mt={2}>
            <Grid item xs={12}>
              <MKButton variant="gradient" color="success" onClick={handleAddExperience} fullWidth>
                Ajouter une expérience
              </MKButton>
            </Grid>
          </Grid>
          {errorMessage && (
            <MKTypography color="error" mt={2}>
              {errorMessage}
            </MKTypography>
          )}
          <Grid container mt={4}>
            <Grid item xs={12}>
              <MKButton variant="gradient" color="info" fullWidth type="submit" disabled={isLoading}>
                {isLoading ? "Modification en cours..." : "Modifier les informations"}
              </MKButton>
            </Grid>
          </Grid>
        </form>
      </View>
    </BaseLayout>
  );
}

export default ModifyStudentInfo;
