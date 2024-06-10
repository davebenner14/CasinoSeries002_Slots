let money = 100;
const slotImages = [
    '7.png', 'Apple.png', 'Banana.png', 'Bar.png', 'Bell.png', 'BlueGem.png', 'Cherry.png', 
    'FourLeafClover.png', 'Grapes.png', 'GreenApple.png', 'Horseshoe.png', 'Jackpot.png', 
    'Lemon.png', 'MoneyBag.png', 'Peach.png', 'PinkGem.png', 'PurpleGem.png', 'Strawberry.png', 
    'TripleBar.png', 'Watermelon.png'
];

const slotValues = {
    '7.png': 50,
    'Apple.png': 10,
    'Banana.png': 10,
    'Bar.png': 20,
    'Bell.png': 15,
    'BlueGem.png': 30,
    'Cherry.png': 10,
    'FourLeafClover.png': 25,
    'Grapes.png': 10,
    'GreenApple.png': 10,
    'Horseshoe.png': 20,
    'Jackpot.png': 100,
    'Lemon.png': 5,
    'MoneyBag.png': 50,
    'Peach.png': 10,
    'PinkGem.png': 30,
    'PurpleGem.png': 30,
    'Strawberry.png': 10,
    'TripleBar.png': 20,
    'Watermelon.png': 10
};

function spin(betMultiplier) {
    if (money < betMultiplier) {
        displayResult("Not enough money to bet!", "red");
        return;
    }
    
    money -= betMultiplier;
    document.getElementById('money').innerText = `Money: $${money}`;
    
    const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
    const results = [];
    
    slots.forEach((slot, index) => {
        const randomImages = getRandomImages();
        results.push(randomImages[randomImages.length - 1]);
        animateSlot(slot, randomImages, index);
    });
    
    setTimeout(() => calculateWinnings(results, betMultiplier), 1600);
}

function getRandomImages() {
    const images = [];
    for (let i = 0; i < 5; i++) {
        const randomImage = slotImages[Math.floor(Math.random() * slotImages.length)];
        images.push(randomImage);
    }
    return images;
}

function animateSlot(slot, images, index) {
    slot.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `Assets/${image}`;
        slot.appendChild(imgElement);
    });
    slot.style.transition = 'none';
    slot.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        slot.style.transition = 'transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)'; /* Smooth transition */
        slot.style.transform = 'translateY(-400%)';
    }, 10);
    
    setTimeout(() => {
        slot.style.transition = 'none';
        slot.style.transform = 'translateY(0)';
        slot.innerHTML = `<img src="Assets/${images[images.length - 1]}" alt="slot">`;
    }, 1600); /* Ensure the animation timing is correct */
}

function calculateWinnings(results, betMultiplier) {
    const first = results[0];
    const allSame = results.every(result => result === first);
    
    if (allSame) {
        const winAmount = slotValues[first] * betMultiplier;
        money += winAmount;
        displayResult(`You win $${winAmount}!`, "green");
    } else {
        displayResult("You lose!", "red");
    }
    
    document.getElementById('money').innerText = `Money: $${money}`;
}

function displayResult(message, color) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = message;
    resultDiv.style.color = color;
    setTimeout(() => resultDiv.innerText = '', 2000);
}

document.getElementById('money').innerText = `Money: $${money}`;
