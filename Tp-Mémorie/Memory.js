document.addEventListener('DOMContentLoaded', () => {
    let seconds = 0;
    let timer;
    let tab1 = [];
    let tab2 = [];
    let container = document.querySelector('.container');
    const timerElement = document.querySelector('.timer');
    const winMessage = document.querySelector('.win-message'); 
    const resetButton = document.querySelector('.reset-btn');  
  
    
    function startTimer() {
      timer = setInterval(() => {
        seconds++;
        timerElement.textContent = `Temps écoulé : ${seconds}s`;
      }, 1000);
    }
  
    
    function stopTimer() {
      clearInterval(timer);
    }
  
   
    function melanger(tab) {
      let tab2 = [];
      for (let i = 0; i < tab.length; i++) {
        let x;
        do {
          x = Math.floor(Math.random() * tab.length);
        } while (tab2[x] != undefined);
        tab2[x] = tab[i];
      }
      return tab2;
    }
  
    
    function resetGame() {
      
      stopTimer();
      seconds = 0;
      timerElement.textContent = `Temps écoulé : 0s`;
  
     
      winMessage.style.display = 'none';
  
      
      container.innerHTML = '';
  
      
      tab1 = Array.from({ length: 12 }, (_, i) => i);
      tab2 = melanger(tab1.concat(tab1));
  
      
      tab2.forEach((val) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.innerHTML = `<img src="img/${val}.webp" alt="Tuile ${val}" />`;
        container.appendChild(tile);
      });
  
      
      startTimer();
  
      
      firstTile = null;
      secondTile = null;
      isChecking = false;
    }
  
    let firstTile = null;
    let secondTile = null;
    let isChecking = false;
  
    
    resetGame();
  
    
    container.addEventListener('click', (event) => {
      const clickedTile = event.target.closest('.tile');
  
      if (!clickedTile || clickedTile.classList.contains('matched') || isChecking) return;
  
      clickedTile.classList.add('flipped');
  
      if (!firstTile) {
        firstTile = clickedTile;
      } else if (!secondTile) {
        secondTile = clickedTile;
  
        isChecking = true;
        setTimeout(() => {
          if (firstTile.innerHTML === secondTile.innerHTML) {
            firstTile.classList.add('matched');
            secondTile.classList.add('matched');
          } else {
            firstTile.classList.remove('flipped');
            secondTile.classList.remove('flipped');
          }
  
          firstTile = null;
          secondTile = null;
          isChecking = false;
  
          
          if (document.querySelectorAll('.matched').length === tab2.length) {
            winMessage.style.display = 'block'; 
          }
        }, 1000);
      }
    });
  
    
    resetButton.addEventListener('click', resetGame);
  });