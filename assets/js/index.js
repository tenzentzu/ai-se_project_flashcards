import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses, stringToHex } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import {
  renderDeckView,
  renderDeckViewSection,
  initDeckViewPracticeButton,
} from "./deck-view.js";

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const deckViewSection = document.querySelector("#deck-view");
const deckViewPracticeBtn = document.querySelector(".deck-view__practice-btn");

const deckListEl = document.querySelector(".gallery__list");
const deckTemplate = document.querySelector("#deck");
const mainContent = document.querySelector(".page__main-content");

//this should be wrapping other functions? IDK. Figure out later.
function renderHomeView() {
  homeSection.style.display = "flex";
  carouselSection.style.display = "none";
  deckViewSection.style.display = "none";
  deckViewPracticeBtn.style.display = "none";
  notFoundSection.style.display = "none";
  if (mainContent) {
    mainContent.classList.remove("page__main-content_location_carousel");
  }
}

function createDeckEl(item) {
  const deckEl = deckTemplate.content.querySelector("li").cloneNode(true);
  const titleEl = deckEl.querySelector(".card__title");

  if (titleEl) {
    titleEl.textContent = item.name;
  }

  const colorName = hexToString(item.color);
  removeColorClasses(deckEl);

  if (colorName) {
    deckEl.classList.add(`card_color_${colorName}`);
  }

  const deleteBtnEl = deckEl.querySelector(".card__delete-btn");
  deleteBtnEl.addEventListener("click", () => {
    deckEl.remove();
  });

  const deckLinkEl = deckEl.querySelector(".card__link");
  deckLinkEl.href = `#deck/${item.id}`;

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckListEl.prepend(deckEl);
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";
  if (mainContent) {
    mainContent.classList.remove("page__main-content_location_carousel");
  }
}

function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    homeSection.style.display = "flex";
    carouselSection.style.display = "none";
    notFoundSection.style.display = "none";
    renderHomeView();
  } else if (hash === "carousel") {
    const deck = decks[0];

    if (deck) {
      homeSection.style.display = "none";
      carouselSection.style.display = "flex";
      if (deckViewPracticeBtn) deckViewPracticeBtn.style.display = "none";
      notFoundSection.style.display = "none";
      if (mainContent) {
        mainContent.classList.add("page__main-content_location_carousel");
      }
      renderCarouselView(deck);
    } else {
      renderNotFoundView();
    }
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      homeSection.style.display = "none";
      carouselSection.style.display = "flex";
      deckViewPracticeBtn.style.display = "none";
      deckViewSection.style.display = "none";
      notFoundSection.style.display = "none";
      if (mainContent) {
        mainContent.classList.add("page__main-content_location_carousel");
      }
      renderCarouselView(deck);
    } else {
      homeSection.style.display = "none";
      carouselSection.style.display = "none";
      deckViewSection.style.display = "none";
      notFoundSection.style.display = "flex";
      renderNotFoundView();
    }
  } else if (hash.startsWith("deck/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      renderDeckViewSection(
        homeSection,
        carouselSection,
        notFoundSection,
        mainContent,
      );
      renderDeckView(deck);
    } else {
      renderNotFoundView();
    }
  } else {
    renderNotFoundView();
  }
}

decks.forEach(renderDeckEl);

initDeckViewPracticeButton();

router();

window.addEventListener("hashchange", router);
