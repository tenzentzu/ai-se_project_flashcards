import { hexToString, removeColorClasses } from "./colors.js";

function renderCarouselView(deck) {
  const carouselEl = document.querySelector(".carousel");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");
  const carouselCardTitle = carouselEl.querySelector(".carousel__title");
  const carouselCard = carouselEl.querySelector(".carousel__card");
  const carouselCardText = carouselEl.querySelector(".carousel__card-text");
  const carouselColor = deck.color;

  let currentIndex = 0;
  let showingQuestion = true;

  removeColorClasses(carouselCard);

  const currentColor = hexToString(carouselColor);
  carouselCard.classList.add(`carousel__card_color_${currentColor}`);

  function getCarouselTitleString(deck, currentIndex) {
    return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
  }

  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    carouselCardTitle.textContent = getCarouselTitleString(deck, currentIndex);

    if (showingQuestion) {
      carouselCardText.textContent = currentCard?.question;
      carouselCard.classList.remove("carousel__card_color_white");
    } else {
      carouselCardText.textContent = currentCard?.answer;
      carouselCard.classList.add("carousel__card_color_white");
    }

    updateArrows();
  }

  function updateArrows() {
    if (currentIndex <= 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex >= deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

function disableButton(buttonEl) {
  buttonEl.classList.add("carousel__btn_disabled");
  buttonEl.disabled = true;
}
function enableButton(buttonEl) {
  buttonEl.classList.remove("carousel__btn_disabled");
  buttonEl.removeAttribute("disabled");
}
export { renderCarouselView };

/* copilot made. might use.
function cardAnswer(deck, currentIndex) {
  return deck.cards[currentIndex]?.answer || "";
} */

/* Quick question with some context for whoever reviews this:
  I used the copilot ai to help when i was stumped on certain parts, like the part 6 of task 6 updateDisplay() function and the updateArrows() stuff.
  Writing the functions wasn't dificult, but understanding where they needed to be called was something I had trouble understanding. Like i had it to where
  I'd have to refresh the page to show the question again after flipping to the answer and its kinda obvious to call it there. I dont really understand
  this one thing. 

  My question is: Is there a sure fire way to know where you need to call a function like that? Because what i was doing before was calling it 
  only at the end of the code, just before the disableButton() functions. */
