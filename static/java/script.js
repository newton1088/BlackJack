
function ageindays()
{
    var birthyear=prompt('What is your birthyear');
    var ageind= (2020-birthyear) * 365;
    var h1=document.createElement('h1');
    var textanswer=document.createTextNode('Your age in days is '+ageind + ' days.')
    h1.setAttribute('id','ageindays');
    h1.appendChild(textanswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('this').remove();
}

//challenege 5 
let blackjackGame={
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap' :{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1, 11]},
    'wins':0,
    'losses':0,
    'draw':0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound= new Audio('static/sound/swish.m4a');
const winSound =new Audio('static/sound/cash.mp3');
const lossSound =new Audio('static/sound/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
function blackjackHit() {
    if(blackjackGame['isStand']=== false) {
    let card=randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    console.log(YOU['score']);
    showScore(YOU);
    }
   //  alert('hh');
    
}

function randomCard(){
    let randomIndex= Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if(activePlayer['score']<=21)
    {
    let cardImage= document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}


function blackjackDeal() {
    // showResult(computeWinner());
     if(blackjackGame['turnsOver']==true){
     let yourImages = document.querySelector('#your-box').querySelectorAll('img');
     let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
     for(i=0;i<yourImages.length;i++)
     {
       yourImages[i].remove();
     }
     for(i=0;i<dealerImages.length;i++)
     {
       dealerImages[i].remove();
     }
     YOU['score']=0;
     DEALER['score']=0;

     document.querySelector('#your-blackjack-result').textContent=0;
     document.querySelector('#dealer-blackjack-result').textContent=0;
     
     document.querySelector('#your-blackjack-result').style.color='white';
     document.querySelector('#dealer-blackjack-result').style.color='white';

     document.querySelector('#blackjack-result').textContent= 'Let,s play';
     document.querySelector('#blackjack-result').style.color='black';

     blackjackGame['isStand']=false;
     blackjackGame['turnsOver']=false;
}
}

function updateScore(card, activePlayer){
    if(card==='A'){
    if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
     activePlayer['score']+=blackjackGame['cardsMap'][card][1];
    }
    else{
        activePlayer['score']+=blackjackGame['cardsMap'][card][0];
    }
}else{
    activePlayer['score']+= blackjackGame['cardsMap'][card];
}
}

function showScore(activePlayer){
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}


async  function dealerLogic(){
    blackjackGame['isStand']=true;

    while(DEALER['score'] <16 && blackjackGame['isStand']===true){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(1000);
}
    
    blackjackGame['turnsOver']= true;
    showResult(computeWinner());
    
    

}

function computeWinner() {

    let winner;

    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
           // console.log(' win ');
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score']<DEALER['score']){
         //   console.log('loss');
            blackjackGame['losses']++;
            winner = DEALER;
    } else if(YOU['score']=== DEALER['score']){
        blackjackGame['draw']++;
        //console.log(' drew');
    }


    }else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        //console.log('lost');
        winner=DEALER;


    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draw']++;
        //console.log('YOU DREW');
    }
   // console.log('winner is',winner);
   console.log(blackjackGame);
    return winner;
}

function showResult(winner)
{
     let message,messageColor;
     if(winner=== YOU){
         document.querySelector('#wins').textContent= blackjackGame['wins'];
         message='You Won1';
         messageColor='green';
         winSound.play();
     }
     else if(winner === DEALER){
        document.querySelector('#losses').textContent= blackjackGame['losses'];
         message = 'You Lost';
         messageColor = 'red';
         lossSound.play();
     }
     else{
        document.querySelector('#draws').textContent= blackjackGame['draw'];
         message= 'You Drew';
         messageColor = 'black';
     }
     document.querySelector('#blackjack-result').textContent= message;
     document.querySelector('#blackjack-result').style.color=messageColor;

}
/*
const url = 'https://randomuser.me/api/?results=10';
fetch(url)
    .then(resp=>resp.json())
    .then(data=>{
        let authors= data.results;
        console.log(author);
        for(i=0;i<authors.length;i++) {
            let div= document.createElement('div');
            let image= document.createElement('img');
            let p= document.createElement('p');
            p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
            image.src = authors[i].picture.large;
            div.appendChild(image);
            div.appendChild(p);
            document.querySelector('.container-6.flex-ajax-row-1').appendChild(div);
        }
    });

let title= str=>str[0].toUpperCase() + str.slice(1);

function mustafa() {
    return '5'
}
mustafa()

function resp() {

}
*/