import { hexToString, removeColorClasses } from "./colors.js";

const deckViewSection = document.querySelector("#deck-view");
const deckViewTitle = document.querySelector(".deck-view__title");
const deckViewCardsEl = document.querySelector(".deck-view__cards");
const deckViewPracticeBtn = document.querySelector(".deck-view__practice-btn");
const deckCardTemplate = document.querySelector("#card-template");

function clearDeckView() {
  if (!deckViewCardsEl) return;
  const preservedItem = deckViewCardsEl.querySelector(
    ".deck-view__new-card-item",
  );
  deckViewCardsEl.innerHTML = "";
  if (preservedItem) {
    deckViewCardsEl.append(preservedItem);
  }
}

function assignPracticeButton(deck) {
  if (!deckViewPracticeBtn) return;
  deckViewPracticeBtn.dataset.deckId = deck.id;
}

function createDeckCardEl(card, deck) {
  const cardItemEl = deckCardTemplate.content
    .querySelector("li")
    .cloneNode(true);
  const cardEl = cardItemEl.querySelector(".deck-view__card");
  const cardTextEl = cardItemEl.querySelector(".deck-view__card-text");
  const flipBtnEl = cardItemEl.querySelector(".deck-view__flip-btn");
  const deleteBtnEl = cardItemEl.querySelector(".deck-view__delete-btn");

  let showingQuestion = true;
  const currentColor = hexToString(deck.color);

  function updateCard() {
    cardTextEl.textContent = showingQuestion ? card.question : card.answer;

    if (showingQuestion) {
      cardEl.classList.remove("carousel__card_color_white");
    } else {
      cardEl.classList.add("carousel__card_color_white");
    }
  }

  removeColorClasses(cardEl);
  if (currentColor) {
    cardEl.classList.add(`carousel__card_color_${currentColor}`);
  }

  cardTextEl.textContent = card.question;
  flipBtnEl.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateCard();
  });

  if (deleteBtnEl) {
    deleteBtnEl.addEventListener("click", () => {
      cardItemEl.remove();
    });
  }

  return cardItemEl;
}

export function renderDeckView(deck) {
  clearDeckView();
  if (deckViewTitle) {
    deckViewTitle.textContent = deck.name;
  }

  assignPracticeButton(deck);

  const newCardItem = deckViewCardsEl?.querySelector(
    ".deck-view__new-card-item",
  );
  deck.cards.forEach((card) => {
    const cardEl = createDeckCardEl(card, deck);
    if (!deckViewCardsEl) return;
    if (newCardItem) {
      deckViewCardsEl.insertBefore(cardEl, newCardItem);
    } else {
      deckViewCardsEl.append(cardEl);
    }
  });
}

export function renderDeckViewSection(
  homeSection,
  carouselSection,
  notFoundSection,
  mainContent,
) {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  deckViewSection.style.display = "flex";
  deckViewPracticeBtn.style.display = "inline-block";
  notFoundSection.style.display = "none";
  if (mainContent) {
    mainContent.classList.remove("page__main-content_location_carousel");
  }
}

export function initDeckViewPracticeButton() {
  if (deckViewPracticeBtn) {
    deckViewPracticeBtn.addEventListener("click", () => {
      const deckId = deckViewPracticeBtn.dataset.deckId;
      if (deckId) {
        window.location.hash = `#carousel/${deckId}`;
      }
    });
  }
}
