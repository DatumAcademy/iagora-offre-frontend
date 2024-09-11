import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { API_URL } from "constants/coonstant.";

function StudentCV() {
  const [student, setStudent] = useState(null);
  const numETU = localStorage.getItem("numETU");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/student/${numETU}/${email}`);
        if (response.status === 200 && response.data.success) {
          setStudent(response.data.student);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'étudiant", error);
      }
    };

    fetchStudentDetails();
  }, [numETU, email]);

  return (
    <MKBox component="section" py={{ xs: 3, md: 2 }}>
      <Container>
        {student ? (
          <>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <MKTypography variant="h3" textAlign="center" mb={4}>
                  <p style={{color:'#242975'}}>Nom et Prénom : {student.first_name} {student.last_name}</p>
                </MKTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MKTypography variant="h5" mt={4} mb={2}>
                  <p style={{color:'#242975'}}>Informations générales</p>
                </MKTypography>
                <hr></hr>
                <br></br>
                <MKTypography variant="body1" mb={2}>
                  <strong>Email :</strong> {student.email}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Age :</strong> {student.age} ans
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Genre :</strong> {student.gender}
                </MKTypography>
                <hr></hr>
                <MKTypography variant="h5" mt={4} mb={2}>
                  Diplômes
                </MKTypography>
                {student.diploma?.map((diploma, index) => (
                  <MKTypography key={index} variant="body2" mb={1}>
                    {diploma.label}
                  </MKTypography>
                ))}
                <hr></hr>
                <MKTypography variant="h5" mt={4} mb={2}>
                  Langues
                </MKTypography>
                {student.language?.map((lang, index) => (
                  <MKTypography key={index} variant="body2" mb={1}>
                    {lang.label} - Niveau : {lang.level}
                  </MKTypography>
                ))}
                 <hr></hr>
                 <br></br>
                <MKTypography variant="h5" mb={2}>
                  Compétences
                </MKTypography>
                {student.skills?.map((skill, index) => (
                  <MKTypography key={index} variant="body2" mb={1}>
                    {skill}
                  </MKTypography>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <MKTypography variant="h5" mt={4} mb={2}>
                  <p style={{color:'#242975'}}>Experiences Professionnelles</p>
                </MKTypography>
                <hr></hr>
                <MKTypography variant="h5" mt={4} mb={2}>
                  Expériences
                </MKTypography>
                {student.experience?.map((exp, index) => (
                  <MKBox key={index} mb={3}>
                    <MKTypography variant="body2">
                      <strong>{index+1} - {exp.label}</strong> ({exp.years})
                    </MKTypography>
                    <MKTypography variant="body2" mb={1}>
                      <strong>Entreprise :</strong> {exp.company}, {exp.city}
                    </MKTypography>
                    <MKTypography variant="body2" mb={1}>
                      <strong>Description :</strong> {exp.description}
                    </MKTypography>
                    <MKTypography variant="body2">
                      <strong>Compétences :</strong> {exp.skills.join(", ")}
                    </MKTypography>
                  </MKBox>
                ))}
              </Grid>
            </Grid>
          </>
        ) : (
          <MKTypography variant="h6">Chargement des détails de letudiant...</MKTypography>
        )}
      </Container>
    </MKBox>
  );
}

export default StudentCV;
