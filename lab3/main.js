import {MainPage} from "./pages/main/index.js";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle.js";

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();