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


function shareImage() {
  const image = document.getElementById('result-image').src; 
  const link = document.createElement('a'); 
  link.href = image; 
  link.download = 'tarot_card.png'; 
  document.body.appendChild(link); 
  link.click(); 
  document.body.removeChild(link); 

  
  const downloadMessage = document.getElementById('download-message');
  downloadMessage.style.display = 'block'; 
  downloadMessage.style.opacity = '1'; 

  
  setTimeout(() => {
      downloadMessage.style.opacity = '0'; 
      setTimeout(() => {
          downloadMessage.style.display = 'none'; 
      }, 500); 
  }, 2000); 
}

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

// Create the custom cursor element
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Update the cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

// Change cursor size on button hover
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.width = '15px'; // Smaller size on hover
        cursor.style.height = '15px'; // Smaller size on hover
    });

    button.addEventListener('mouseleave', () => {
        cursor.style.width = '20px'; // Default size
        cursor.style.height = '20px'; // Default size
    });

    button.addEventListener('mousedown', () => {
        cursor.style.width = '10px'; // Even smaller size on click
        cursor.style.height = '10px'; // Even smaller size on click
    });

    button.addEventListener('mouseup', () => {
        cursor.style.width = '15px'; // Return to smaller size after click
        cursor.style.height = '15px'; // Return to smaller size after click
    });
});

// Reset cursor size when clicking anywhere else
document.addEventListener('mousedown', () => {
    cursor.style.width = '10px'; // Smaller size on click
    cursor.style.height = '10px'; // Smaller size on click
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '20px'; // Return to default size
    cursor.style.height = '20px'; // Return to default size
});