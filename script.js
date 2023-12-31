const boxes = document.querySelectorAll(".box");
const main = document.querySelector(".main");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");
const overlay = document.querySelector(".overlay");
const front = document.querySelector(".front-page");

setTimeout(() => {
	front.style.display = "none";
}, 7700);

let playerOScore = 0;
let playerXScore = 0;

let turnO = true;
let count = 0;
const winPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
];
const resetGame = () => {
	turnO = true;
	enableBoxes();
	msgContainer.classList.add("hide");
};

boxes.forEach((box) =>
	box.addEventListener("click", function () {
		if (turnO) {
			//playerO
			box.innerHTML = "O";
			turnO = false;
		} else {
			//playerX
			box.innerHTML = "X";
			turnO = true;
		}
		if (box.innerHTML === "X") {
			box.style.color = "brown";
		} else {
			box.style.color = "indigo";
		}
		box.disabled = true;

		checkWinner();
		count++;
		let isWinner = checkWinner();
		if (count === 9 && !isWinner) {
			gameDraw();
		}
	})
);

const gameDraw = () => {
	msg.innerText = `Game was a Draw.`;
	msgContainer.classList.remove("hide");
	disableBoxes();
	showModal();
};
const disableBoxes = () => {
	for (let box of boxes) {
		box.disabled = true;
	}
};
const enableBoxes = () => {
	for (let box of boxes) {
		box.disabled = false;
		box.innerHTML = "";
	}
};

const showWinner = function (winner) {
	msg.innerHTML = `Congratulations, Winner is ${winner}`;
	msgContainer.classList.remove("hide");
	// if (winner === "X") {
	// 	let scoreofX = 0;
	// 	if (scoreX.innerHTML === scoreofX) {
	// 		scoreX.innerHTML++;
	// 	}
	// } else {
	// 	let scoreofO = 0;
	// 	if (scoreO.innerHTML === scoreofO) {
	// 		scoreofO++;
	// 	}
	// }
	if (winner === "X") {
		updatePlayerXScore();
	} else {
		updatePlayerOScore();
	}

	disableBoxes();
	showModal();
};
const checkWinner = () => {
	for (let pattern of winPatterns) {
		let pos1Val = boxes[pattern[0]].innerText;
		let pos2Val = boxes[pattern[1]].innerText;
		let pos3Val = boxes[pattern[2]].innerText;

		if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
			if (pos1Val === pos2Val && pos2Val === pos3Val) {
				showWinner(pos1Val);
			}
		}
	}
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const showModal = function () {
	// checkWinner();

	msgContainer.classList.remove("hide");
	overlay.classList.remove("hide");
};
const closeModal = function () {
	msgContainer.classList.add("hide");
	overlay.classList.add("hide");
	resetGame();
};
overlay.addEventListener("click", closeModal);
newGameBtn.addEventListener("click", closeModal);

const displayScores = function () {
	document.querySelector("#playerO").textContent = playerOScore;
	document.querySelector("#playerX").textContent = playerXScore;
};
function updatePlayerOScore() {
	playerOScore++;
	if (playerOScore < 10) {
		playerOScore = "0" + playerOScore;
	}
	displayScores();
}

function updatePlayerXScore() {
	playerXScore++;
	if (playerXScore < 10) {
		playerXScore = "0" + playerXScore;
	}

	displayScores();
}
