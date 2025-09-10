import tooltipInteraction from './components/common/tooltip-interaction.js';
import dialogInteraction from './components/layout/header/dialog-interaction.js';
import floatingInteraction from './components/sections/floating-interaction.js';
import newsInteraction from './components/sections/news-interaction.js';

export default function initInteractions() {
    tooltipInteraction();
    dialogInteraction();
    floatingInteraction();
    newsInteraction();
}