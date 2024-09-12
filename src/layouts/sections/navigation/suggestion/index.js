/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Stats page components
import SuggestionOffrePage from "./components";

// Stats page components code
import tabsSimpleCode from "layouts/sections/navigation/nav-tabs/components/TabsSimple/code";

function SuggestionOffre() {
  return (
    <BaseLayout
      title=""
      breadcrumb={[
        { label: "Offres", route: "/offres/suggestion" },
        { label: "Recommandation" },
      ]}
    >
      <View title="LES PLUS RECOMMANDE" code={tabsSimpleCode}>
        <MKBox bgColor="white" py={6}>
          <SuggestionOffrePage />
        </MKBox>
      </View>
    </BaseLayout>
  );
}

export default SuggestionOffre;
