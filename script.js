let tarotCards = [];


fetch('tarotCards.json')
    .then(response => response.json())
    .then(data => {
        tarotCards = data;
    })
    .catch(error => console.error('Error fetching tarot cards:', error));

function pickCard() {
    const cardDisplay = document.getElementById('card-display');
    const result = document.getElementById('result');
    const pickAgainButton = document.getElementById('pick-again');

    
    cardDisplay.style.opacity = '0';

    
    setTimeout(() => {
        
        cardDisplay.classList.add('hidden');
        result.classList.remove('hidden');

        
        const randomIndex = Math.floor(Math.random() * tarotCards.length);
        const selectedCard = tarotCards[randomIndex];
        const cardKey = Object.keys(selectedCard)[0];
        const cardData = selectedCard[cardKey];

        
        document.getElementById('result-image').src = cardData.image;
        document.getElementById('result-name-text').innerText = cardData.name; 
        document.getElementById('result-no').innerText = cardData.no; 
        document.getElementById('result-desc').innerText = cardData.desc;
        document.getElementById('result-quote').innerText = cardData.quote;

        
        result.style.opacity = '1';
    }, 500); 

    
    result.style.opacity = '0';
}


result.style.opacity = '0';



function showModal() {
    const modal = document.getElementById('warning-modal');
    const modalContent = modal.querySelector('.modal-content');
    modal.style.display = 'block'; 
    document.body.style.overflow = 'hidden'; 
    setTimeout(() => {
        modal.classList.add('show'); 
        modalContent.classList.add('show'); 
    }, 10); 
}

const refreshBtn = document.getElementById("home");

function handleClick() {
  window.location.reload();
}

refreshBtn.addEventListener("click", handleClick);


function closeModal() {
    const modal = document.getElementById('warning-modal');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('show'); 
    modal.classList.remove('show'); 

    
    setTimeout(() => {
        modal.style.display = 'none'; 
        document.body.style.overflow = ''; 
    }, 300); 
}

function proceed() {
    closeModal();
    localStorage.setItem('warningAccepted', 'true');
}

if (!localStorage.getItem('warningAccepted')) {
    showModal();
}



function map(val, minA, maxA, minB, maxB) {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  }
  
  function Card3D(card, ev) {
    let img = card.querySelector('img');
    let imgRect = card.getBoundingClientRect();
    let width = imgRect.width;
    let height = imgRect.height;
    let mouseX = ev.offsetX;
    let mouseY = ev.offsetY;
    let rotateY = map(mouseX, 0, 180, -25, 25);
    let rotateX = map(mouseY, 0, 250, 25, -25);
    let brightness = map(mouseY, 0, 250, 1.5, 0.5);
  
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    img.style.filter = `brightness(${brightness})`;
  }
  
  var cards = document.querySelectorAll('.card3d');
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (ev) => {
      Card3D(card, ev);
    });
  
    card.addEventListener('mouseleave', (ev) => {
      let img = card.querySelector('img');
  
      img.style.transform = 'rotateX(0deg) rotateY(0deg)';
      img.style.filter = 'brightness(1)';
    });
  });