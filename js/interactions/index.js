import tooltipInteraction from './components/common/tooltipInteraction.js';
import floatingInteraction from './components/sections/floatingInteraction.js';
import newsInteraction from './components/sections/newsInteraction.js';

export default function initInteractions() {
    tooltipInteraction();
    floatingInteraction();
    newsInteraction();
}