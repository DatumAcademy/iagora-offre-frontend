import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import { API_URL } from "constants/coonstant.";
import MKButton from "components/MKButton";

function OfferDetails() {
  const [offer, setOffer] = useState(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.status === 200) {
          setOffer(response.data.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'offre", error);
      }
    };

    fetchOfferDetails();
  }, [id]);

  const isAlreadyCandidate = () => {
    return offer?.candidate?.some((c) => c.student === Number(localStorage.getItem("numETU")));
  };

  const handleApply = async () => {
    setIsSubmitting(true);
    try {
      const numETU = localStorage.getItem("numETU");
      const response = await axios.post(`${API_URL}/student/apply/${numETU}/${id}`);
      
      if (response.status === 200) {
        setOffer((prevOffer) => ({
          ...prevOffer,
          candidate: [...prevOffer.candidate, { student: Number(numETU) }],
        }));
        alert("Candidature soumise avec succès !");
      } else {
        alert("Une erreur est survenue lors de la candidature.");
      }
    } catch (error) { 
      console.error("Erreur lors de la soumission de la candidature", error);
      alert("Erreur lors de la soumission de la candidature.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container sx={{ height: "100%" }}>
      <Grid container justifyContent="center" sx={{ textAlign: "center", mb: 4 }}>
        {offer && (
          <MKTypography variant="h4" mb={2} fontWeight="bold">
            Titre du poste : {offer.label}
          </MKTypography>
        )}
      </Grid>

      <Grid container spacing={4} justifyContent="center">
        {offer ? (
          <>
            <Grid item xs={12} md={6}>
              <MKBox p={3}>
                <MKTypography variant="body1" mb={2}>
                  <strong>Entreprise :</strong> {offer.company}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Description :</strong> {offer.shortdescription}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Ville :</strong> {offer.city}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Date de publication :</strong> {offer.publicationdate}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Date limite :</strong> {offer.deadlinedate}
                </MKTypography>
              </MKBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MKBox p={3}>
                <MKTypography variant="body1" mb={2}>
                  <strong>Type :</strong> {offer.type}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Contrat :</strong> {offer.contract}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Expérience minimale :</strong> {offer.minexperience} ans
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Compétences requises :</strong> {offer.skills}
                </MKTypography>
                <MKTypography variant="body1" mb={2}>
                  <strong>Langue :</strong> {offer.language.label} ({offer.language.level})
                </MKTypography>
              </MKBox>
            </Grid>
            {!isAlreadyCandidate() && (
              <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <MKButton
                  variant="outlined"
                  color="info"
                  onClick={handleApply}
                  disabled={isSubmitting}>
                  Postuler pour cette offre
                </MKButton>
              </Grid>
            )}
          </>
        ) : (
          <MKTypography variant="h6">Chargement des détails de l offre...</MKTypography>
        )}
      </Grid>
    </Container>
  );
}

export default OfferDetails;
