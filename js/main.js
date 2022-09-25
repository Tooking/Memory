const letters = ["a", "a", "b", "b", "c", "c", "d", "d", "e", "e", "f", "f", "g", "g", "h", "h", "i", "i", "j", "j", "k", "k", "l", "l", "m", "m", "n", "n", "o", "o", "p", "p", "q", "q", "r", "r", "s", "s", "t", "t", "u", "u", "v", "v", "w", "w", "x", "x", "y", "y", "z", "z"];
const game = document.getElementById('game');
const size = document.querySelectorAll('.size-option');
let step = document.getElementById('numbersOfSteps');
let pair = [];

size.forEach(s => {
  let sizeNumber;
  s.addEventListener('click', ()=>{
    step.innerText = 0;
    game.innerText = "";
    sizeNumber = s.innerText;
    handleCards(sizeNumber);
    process();
  })
})

function handleCards(countOfNumbers){
  const stack = letters.slice(0, countOfNumbers);
  const shuffleStack = stack.sort(() => Math.random() - 0.5);

    shuffleStack.forEach((item, index) => {
      const button = document.createElement('button');
      button.classList.add('card');
      button.id = index;
      button.innerText = item;
      game.appendChild(button);
      // console.log(item);
    })
}
function process(){
  const cards = document.querySelectorAll('.card');
  let i = 0;
    cards.forEach(c => {
      c.addEventListener('click', () =>{
        c.classList.add('open'); //открывает карточку
        pair.push({id: c.id, value: c.innerText}); //добавляет в массив пару открытых карточек
        c.setAttribute('disabled', 'disabled'); //делает эти краточки не активными
        if(pair.length === 2){ // проверка того, что в массиве "пар" находиться 2 карточки
          cards.forEach(item =>{
            if(!item.classList.contains('open')){ //проверка на НЕ наличия класса open
              item.setAttribute('disabled', 'disabled') //все элементы массива карт становяться не активными
            }
            if(pair[0].value === pair[1].value){ //проверка значений карт, если они сходяться, то выполняеться код:
              pair.forEach(el =>{
                cards[el.id].classList.remove('card', 'open'); //удаление классов, что бы обозначить алгоритму, что это не карточка больше
              })
              if(item.classList.contains('card')) { //проверка на содержание класса, который показывает алгоритму, что это карточка еще
                item.removeAttribute('disabled'); //делаем оставшиеся карточки активны
              }
            }else{ //если же карточки не совпали между собой, то
              setTimeout(()=>{
                if(item.classList.contains('card')){
                  item.removeAttribute('disabled'); //делаем карточки снова активными
                  item.classList.remove('open'); // убираем значение "открытая" карта
                }
              }, 1500)
            }
          })
          pair = [];
          step.innerText = ++i;
        }
      })
    })
  }
