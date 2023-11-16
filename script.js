document.addEventListener("DOMContentLoaded", function()
{
    let buttonOK = document.getElementById("ButtonOk");
    let inputNick = document.getElementById("InputNick");
    let modal = document.getElementById("Modal");

    let userName = document.getElementById("UserName");
    // let countUser = document.getElementById("UserCount");
    // let countComputer = document.getElementById("ComputerCount");
    // let generateUser = document.getElementById("UserGen");
    // let generateComputer = document.getElementById("CompGen");
    let countOfAttempt = document.getElementById("CountOfAttempt");
    let buttonGen = document.getElementById("ButtonGen");
    let cardBox = document.getElementById("CardBox");
    let currentImages = [];

    let winnerModal = document.getElementById("WinnerWindow");
    let labelWinner = document.getElementById("LabelWinner");
    let buttorRestart = document.getElementById("ButtonRestart");

    function getRandomIndex(currentImages, column) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 5) + 1;
        } while (isIndexInSameColumn(currentImages, randomIndex, column));
        return randomIndex;
    }
    
    function isIndexInSameColumn(currentImages, newIndex, column) {
        const columnStart = (column - 1) % 3;
        const columnEnd = columnStart + 6;

        for (let i = columnStart; i <= columnEnd; i += 3) {
            if (currentImages[i] === newIndex) {
                return true;
            }
        }

        return false;
    }

    function updateImages() {
        currentImages = [];

        for (let i = 1; i <= 9; i++) {
            const box = document.getElementById(`box${i}`);
            const randomIndex = getRandomIndex(currentImages, i);
            currentImages.push(randomIndex);

            let img = box.querySelector('img');
            img.src = `image${randomIndex}.png`;
        }
    }

    
    
    function checkWin() {
        for (let i = 0; i < 9; i += 3) {
            if (currentImages[i] === currentImages[i + 1] && currentImages[i] === currentImages[i + 2]) {
                return true;
            }
        }
        return false;
    }
    
    

    buttonGen.addEventListener("click", function() {
        let attemptCount = parseInt(countOfAttempt.innerHTML, 10);
        if (attemptCount <= 3) {
            updateImages();
            if (checkWin()) {
                winnerModal.style.display = "flex";
                labelWinner.innerHTML = `Переможець: ${userName.innerHTML}. Вітаємо!!!!! Переграти?`;
            } else {
                if(++attemptCount > 3)
                {
                    winnerModal.style.display = "flex";
                    labelWinner.innerHTML = `На жаль, ${userName.innerHTML}, ви не виграли. Спробуйте ще раз!`;
                }
                --attemptCount;
                countOfAttempt.innerHTML = `${++attemptCount}`;
                
            }
        } else {
            winnerModal.style.display = "flex";
            labelWinner.innerHTML = `На жаль, ${userName.innerHTML}, ви не виграли. Спробуйте ще раз!`;
        }
    });

    buttonOK.addEventListener("click", function()
    {
        let inputNickValue = inputNick.value;
        if (inputNickValue == "")
            alert("Рядок з нікнеймом не може бути пустим!");
        else
        {
            modal.style.display = "none";
            userName.innerHTML = inputNick.value;
        }
            
    });

    buttorRestart.addEventListener("click", function()
    {
        winnerModal.style.display = "none";
        countOfAttempt.innerHTML = "1";
    });
});