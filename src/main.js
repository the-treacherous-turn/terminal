import { createApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faItchIo,
  faTwitch,
  faReddit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
library.add(fas, faItchIo, faTwitch, faReddit, faTwitter);
import store from "./store";
import App from "./App.vue";
import Onboarding from "./Onboarding.vue";

import InfoSection from "./components/InfoSection.vue";
import UpgradeSection from "./components/UpgradeSection/index.vue";
import ComputeSection from "./components/TrackerSection/ComputeSection.vue";
import EventLogSection from "./components/TrackerSection/EventLogSection.vue";

import "./index.css";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);

const router = createRouter({
  routes: [
    { path: "/", component: EventLogSection },
    { path: "/eventLog", component: EventLogSection },
    { path: "/compute", component: ComputeSection },
    { path: "/upgrade", component: UpgradeSection },
    { path: "/info", component: InfoSection },
  ],
  // createMemoryHistory does not change the hash URL.
  history: createMemoryHistory(),
});
app.use(router);

// If user arrives at plain url,
// then load the onboarding view
const hash = document.location.hash;
if (!hash) {
  const onboarding = createApp(Onboarding);
  onboarding.mount("#app");
} else {
  app.mount("#app");
}
