import Icon from "@mui/material/Icon";
import Features from "layouts/sections/page-sections/featuers";
import Navbars from "layouts/sections/navigation/navbars";
import NavTabs from "layouts/sections/navigation/nav-tabs";

import SignIn from "layouts/pages/authentication/sign-in";

import SignUpBasic from "pages/LandingPages/Register";
import CompleteRegistration from "pages/LandingPages/SignIn/SignInSkills";
import PresentationPage from "layouts/pages/presentation";
import Pagination from "layouts/sections/navigation/pagination";

const routes = [
  {
    name: "A propos des offres",
    icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "Acceuil",
        description: "Consultez toutes les offres disponibles",
        route: "/presentation",
        component: <PresentationPage />,
      },
      {
        name: "Liste de mes candidatures",
        description: "Consultez toutes vos candidatures déposées pour des stages ou emplois en un seul endroit.",
        route: "/offres/candidatures",
        component: <NavTabs />,
      },
      {
        name: "Liste des emplois les plus suggérer",
        description: "Découvrez les offres d'emploi les plus recommandées en fonction de votre profil et de vos compétences.",
        route: "/offres/suggestion",
      }
    ],
  },
  {
    name: "Moi",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Modification de mes compétences",
        description: "Mettez à jour vos compétences pour refléter vos dernières acquisitions et augmenter vos chances de trouver des opportunités adaptées.",
        route: "/competence/modification",
        component: <Navbars />,
      },
      {
        name: "Mes informations",
        description: "Consultez le CV complet de l'étudiant, avec ses diplômes, compétences, expériences professionnelles et langues maîtrisées",
        route: "/profil/information",
        component: <Features />,
      }
    ],
  },
  {
    name: "",
    columns: 1,
    icon: <Icon>logout</Icon>,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
          },
        ],
      },
      {
        name: "Detail offre",
        collapse: [
          {
            name: "Detail offre",
            route: "/offre/:id",
            component: <Pagination />,
          },
        ]
      },
      {
        name: "Sign Up",
        collapse:[
          {
            name: "sign up",
            route: "/pages/authentication/signup",
            component: <SignUpBasic />
          }
        ]
      },
      {
        name: "Complete Registration",
        collapse:[
          {
            name: "Complete Registration",
            route: "/pages/authentication/complete-registration/:numETU/:email",
            component: <CompleteRegistration />
          }
        ]
      },
    ],
  }
];

export default routes;
