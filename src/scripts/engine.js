// ================= STATE AND CONSTANTS =================
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
    },
    cardsprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card_description'),
        type: document.getElementById('card_type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    round: {
        current: 1,
        total: 5,
        roundDisplay: document.getElementById('round-counter'),
        flippedCards: 0,
        isTieBreaker: false // ADICIONE ESTA LINHA
    }
};

const pathImages = './src/assets/icons/';

const cardData = [
    { id: 0, name: "Dragão Branco de Olhos Azuis", type: "Paper", img: `${pathImages}dragon.png`, WinOf: [1, 7], LoseOf: [2, 6] },
    { id: 1, name: "Mago Negro", type: "Rock", img: `${pathImages}magician.png`, WinOf: [2, 6], LoseOf: [0, 5] },
    { id: 2, name: "Exodia", type: "Scissors", img: `${pathImages}exodia.png`, WinOf: [0, 5], LoseOf: [1, 7] },
    // VERIFIQUE SE ESTES ARQUIVOS EXISTEM NA PASTA 'src/assets/icons/'
    { id: 3, name: "Dragão Negro de Olhos Vermelhos", type: "Scissors", img: `${pathImages}red-eyes-black-dragon.jpeg`, WinOf: [1, 7], LoseOf: [0, 4] },
    { id: 4, name: "Mago do Tempo", type: "Rock", img: `${pathImages}timeWizard.png`, WinOf: [3, 6], LoseOf: [2, 5] },
    { id: 5, name: "Kuriboh", type: "Paper", img: `${pathImages}Kuriboh.png`, WinOf: [4, 7], LoseOf: [3, 6] },
    { id: 6, name: "Slifer, o Dragão do Céu", type: "Scissors", img: `${pathImages}slifer.jpeg`, WinOf: [5, 1], LoseOf: [0, 7] },
    { id: 7, name: "Obelisco, o Atormentador", type: "Rock", img: `${pathImages}obelisk.jpeg`, WinOf: [6, 3], LoseOf: [5, 2] }
];


// ================= HELPER FUNCTIONS (UI, CARDS, ETC) =================

function updateScore() {
    const scoreElement = document.getElementById('score_points');
    if (scoreElement) {
        scoreElement.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
    }
}

function updateRoundCounter() {
    if (state.round.roundDisplay) {
        state.round.roundDisplay.textContent = `${state.round.current} / ${state.round.total}`;
        state.round.roundDisplay.classList.add('round-changing');
        setTimeout(() => {
            state.round.roundDisplay.classList.remove('round-changing');
        }, 500);
    }
}

function createCardImage(cardId, cardImage) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `<div class="card-inner"><div class="card-back"><img src="src/assets/icons/card-back.png" alt="Card Back"></div><div class="card-front"><img src="${cardImage}" alt="card"></div></div>`;

    // MODIFICADO: Passa o evento para a função de clique
    cardElement.addEventListener("click", (event) => handleCardClick(event, cardId));

    return cardElement;
}

function getRandomCards(count) {
    const cardsCopy = [...cardData];
    const selectedCards = [];
    for (let i = 0; i < count; i++) {
        if (cardsCopy.length === 0) break;
        const randomIndex = Math.floor(Math.random() * cardsCopy.length);
        selectedCards.push(cardsCopy.splice(randomIndex, 1)[0]);
    }
    return selectedCards;
}

function drawCards(cardContainer, numberOfCards = 5) {
    cardContainer.innerHTML = "";
    const randomCards = getRandomCards(numberOfCards);
    randomCards.forEach(card => {
        const cardElement = createCardImage(card.id, card.img);
        cardContainer.appendChild(cardElement);
    });
}

function drawSelectedCard(cardId) {
    const card = cardData.find(c => c.id === cardId);
    if (!card) return;
    if (state.cardsprites.avatar) {
        state.cardsprites.avatar.src = card.img;
        state.cardsprites.avatar.style.display = 'block';
    }
    if (state.cardsprites.name) state.cardsprites.name.innerText = card.name;
    if (state.cardsprites.type) state.cardsprites.type.innerText = card.type;
}

function revealCard(containerId, cardImg) {
    const container = document.getElementById(containerId);
    const cardImageElement = container.querySelector('.card-field-front img');
    if (container && cardImageElement) {
        cardImageElement.src = cardImg;
        container.classList.add('flipped');
    }
}

function resetFieldCard(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.classList.remove('flipped');
    }
}

function hideGameButtons() {
    document.getElementById('next-duel').classList.add("hidden");
    document.getElementById('restart-round').classList.add("hidden");
}

// ================= GAME LOGIC FUNCTIONS =================

function getComputerCardId(playerCardId) {
    const shouldBeDifferent = Math.random() < 0.8;
    if (shouldBeDifferent) {
        const availableCards = cardData.filter(card => card.id !== playerCardId);
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        return availableCards[randomIndex].id;
    }
    return playerCardId;
}

function checkDuelResults(playerCardId, computerCardId) {
    // NOVA REGRA: 5% de chance de forçar um empate
    const forceDraw = Math.random() < 0.05;
    const playerCard = cardData.find(c => c.id === playerCardId);

    // Se a condição de forçar empate for atendida, trocamos a carta do computador
    if (forceDraw && playerCard) {
        // Filtra todas as cartas que têm o MESMO tipo da carta do jogador
        const possibleDrawCards = cardData.filter(c => c.type === playerCard.type);

        if (possibleDrawCards.length > 0) {
            // Escolhe uma carta aleatória do mesmo tipo
            const newComputerCard = possibleDrawCards[Math.floor(Math.random() * possibleDrawCards.length)];

            // Sobrescreve a escolha original do computador para garantir o empate
            computerCardId = newComputerCard.id;

            console.log(`--- EMPATE FORÇADO! O computador agora joga: ${newComputerCard.name} ---`);
        }
    }

    // Se for a última rodada do desempate e o resultado for empate, refaça a jogada
    if (state.round.isTieBreaker && state.round.current === state.round.total) {
        const playerCard = cardData.find(c => c.id === playerCardId);
        if (!playerCard.WinOf.includes(computerCardId) && !playerCard.LoseOf.includes(computerCardId)) {
            console.log("Empate na Morte Súbita! O computador joga de novo...");
            // Chama a jogada do computador novamente para forçar um resultado
            setTimeout(() => setCardField(playerCardId), 1000);
            return; // Impede que o resultado de empate seja processado
        }
    }

    // A lógica de duelo continua normalmente a partir daqui,
    // usando o computerCardId (que pode ter sido sobrescrito ou não)
    let duelResult = "Empate!";
    let playerWin = false;

    // A verificação de vitória/derrota permanece a mesma
    if (playerCard.WinOf.includes(computerCardId)) {
        duelResult = "Você venceu!";
        state.score.playerScore++;
        playerWin = true;
    } else if (playerCard.LoseOf.includes(computerCardId)) {
        duelResult = "Você perdeu!";
        state.score.computerScore++;
    }

    updateScore();

    if (state.score.playerScore >= 4) {
        setTimeout(() => endGame(), 2000);
        return;
    }

    const nextButton = document.getElementById('next-duel');
    nextButton.innerText = duelResult;
    nextButton.className = "rpgui-button";
    if (playerWin) nextButton.classList.add("win-button");
    else if (duelResult === "Você perdeu!") nextButton.classList.add("lose-button");
    else nextButton.classList.add("draw-button");

    nextButton.classList.remove("hidden");
    document.getElementById('restart-round').classList.remove("hidden");
}

function setCardField(playerCardId) {
    revealCard('player-field-container', cardData.find(c => c.id === playerCardId).img);
    document.getElementById('player-field-card').setAttribute('data-id', playerCardId);

    // O tempo de resposta do computador é controlado aqui
    setTimeout(() => {
        const computerCardId = getComputerCardId(playerCardId);
        revealCard('computer-field-container', cardData.find(c => c.id === computerCardId).img);
        document.getElementById('computer-field-card').setAttribute('data-id', computerCardId);

        // Atraso para verificar os resultados após a carta do computador virar
        setTimeout(() => checkDuelResults(playerCardId, computerCardId), 600);
    }, 500); // ALTERADO DE 1000 PARA 500
}

function handleCardClick(event, cardId) {
    const clickedCardElement = event.currentTarget;

    // Impede a ação se a carta já foi virada
    if (clickedCardElement.classList.contains('flipped')) {
        return;
    }

    // Vira apenas a carta clicada
    clickedCardElement.classList.add('flipped');

    // Incrementa o contador de cartas viradas
    state.round.flippedCards++;

    // Esconde os botões de duelo anterior
    hideGameButtons();

    drawSelectedCard(cardId);
    setCardField(cardId);

    // NOVA REGRA: Verifica se 5 cartas foram viradas para avançar a rodada
    if (state.round.flippedCards >= 5) {
        console.log("5 cartas viradas. Avançando para a próxima rodada...");
        // Adiciona um delay maior para o jogador ver o resultado do último duelo
        setTimeout(() => {
            resetDuel();
        }, 3000);
    }
}

function endGame() {
    const cardBox = document.getElementById("computer-cards");
    const isTie = state.score.playerScore === state.score.computerScore;

    // CONDIÇÃO DE DESEMPATE: Se empatou e NÃO estamos em desempate ainda
    if (isTie && !state.round.isTieBreaker) {
        console.log("Fim de jogo empatado! Iniciando desempate...");
        state.round.isTieBreaker = true; // Ativa o modo de desempate
        state.round.total += 2; // Adiciona 2 rodadas extras

        // Mostra uma mensagem na tela
        cardBox.innerHTML = `<div class="game-over"><h2>EMPATE!</h2><p>+2 Rodadas de Desempate!</p></div>`;

        // Inicia a primeira rodada de desempate após um delay
        setTimeout(() => {
            resetDuel();
        }, 3000);

    } else {
        // CONDIÇÃO DE VITÓRIA/DERROTA FINAL
        let winnerMessage = "O jogo terminou em empate!";
        if (state.score.playerScore > state.score.computerScore) {
            winnerMessage = "Você venceu o jogo!";
        } else if (state.score.playerScore < state.score.computerScore) {
            winnerMessage = "O computador venceu o jogo!";
        }

        cardBox.innerHTML = `<div class="game-over"><h2>Fim de Jogo!</h2><p>${winnerMessage}</p><button id="restart-game" class="rpgui-button">Jogar Novamente</button></div>`;
        document.getElementById("restart-game").addEventListener("click", startNewGame);
    }
}

function startNewGame() {
    state.score.playerScore = 0;
    state.score.computerScore = 0;
    state.round.current = 1;
    state.round.total = 5; // Garante que o total de rodadas volte para 5
    state.round.flippedCards = 0;
    state.round.isTieBreaker = false; // Zera o status de desempate
    init();
}

function resetDuel() {
    hideGameButtons();
    state.round.current++;
    state.round.flippedCards = 0; // Reseta o contador de cartas viradas

    if (state.round.current > state.round.total) {
        endGame();
        return;
    }
    updateRoundCounter();
    resetFieldCard('player-field-container');
    resetFieldCard('computer-field-container');
    drawCards(document.getElementById("computer-cards"), 5);
}

function restartRound() {
    hideGameButtons();
    state.round.flippedCards = 0; // Reseta o contador de cartas viradas

    resetFieldCard('player-field-container');
    resetFieldCard('computer-field-container');
    drawCards(document.getElementById("computer-cards"), 5);
}

// ================= INITIALIZATION =================

function init() {
    hideGameButtons();
    updateScore();
    updateRoundCounter();
    if (state.cardsprites.avatar) state.cardsprites.avatar.style.display = 'none';
    drawCards(document.getElementById("computer-cards"), 5);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('next-duel').addEventListener("click", resetDuel);
    document.getElementById('restart-round').addEventListener("click", restartRound);
    init();
});


