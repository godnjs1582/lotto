import * as lottoManager from "./lottoManager.js";
import { LOTTO } from "./constant.js";

const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')
const $ticketNumberContainer =document.getElementById('ticketNumberContainer');
const $lottoPurchaseButton = document.querySelector('.btn-cyan')
const $lottoPurchaseInput = document.getElementById('lotto-purchase-input')
const $lottoNumberCount =document.getElementById('numberOfTicket');
const $ticketIconsContainer =document.getElementById('ticketIconsContainer');
const $toggleShowLottoNumbers =document.querySelector('.lotto-numbers-toggle-button');
const $totalRateOfReturn =document.getElementById('totalRateOfReturn')
let $numberOfTicket=0;
let $totalMoneyUsed=0;
let $myLottoNumbersArray=[]
let $winningNumbersArray =[]
let $myLottoModalData;

const onModalShow = () => {
  const winningNumbers = document.querySelectorAll(".winning-number");
  const bonusNumber=document.querySelector(".bonus-number");
  const numbersArray =[];
  winningNumbers.forEach(input=>{
    numbersArray.push(Number(input.value))
  })
  numbersArray.push(Number(bonusNumber.value));
  $winningNumbersArray=lottoManager.makeWinningNumbersOfLotto(numbersArray);

  $myLottoModalData=lottoManager.playLotto($myLottoNumbersArray,$winningNumbersArray,$totalMoneyUsed)
  updateResultModalInfo()
  $modal.classList.add('open')
}

const updateResultModalInfo =()=>{
  const rows = document.querySelectorAll(".modal-row");
  rows.forEach((row,index)=>{
    const nCell =row.querySelector(".p-3:nth-child(3)");
    if(nCell){
      const nValue=$myLottoModalData[index];
      nCell.textContent=nValue+"개"
    }
  })
  $totalRateOfReturn.innerHTML=$myLottoModalData[$myLottoModalData.length-1]
}


const onModalClose = () => {
  $modal.classList.remove('open')
}

const onClickLottoPurchase = ()=>{
  const inputMoney= $lottoPurchaseInput.value
  const numberOfTicket=lottoManager.purchaseLottos(inputMoney)
  $totalMoneyUsed=numberOfTicket*LOTTO.PRICE
  updateNumberOfLotto(numberOfTicket)
  createTicketIcons(numberOfTicket)
  $myLottoNumbersArray=lottoManager.makeLottoTicketsArray($numberOfTicket)
}


const updateNumberOfLotto =(numberOfTicket)=>{
  $lottoNumberCount.textContent=numberOfTicket;
  $numberOfTicket=numberOfTicket
}
const createTicketIcons =(numberOfTicket)=>{
  deleteTicketIcons()
  for(let i=0;i<numberOfTicket;i++){
    const ticketIcon =document.createElement("span");
    ticketIcon.className ="mx-1 text-4x1";
    ticketIcon.textContent="🎟️";
    $ticketIconsContainer.appendChild(ticketIcon)
  }
}
const deleteTicketIcons =()=>{
  const ticketIcons = document.getElementsByClassName("mx-1 text-4x1");
  const ticketIconsArray = Array.from(ticketIcons);
  ticketIconsArray.forEach(icon=>{
    $ticketIconsContainer.removeChild(icon)
  })
}

const onChangeLottoToggleButton =(e)=>{
  const value=e.target.checked
  if(value){
    deleteTicketIcons()
    showLottoNumbersArray($numberOfTicket)
  }else{
    createTicketIcons($numberOfTicket)
  }
}

const showLottoNumbersArray =()=>{
  for(let i=0;i<$numberOfTicket;i++){
    const lottoNumber =document.createElement("div");
    lottoNumber.textContent=$myLottoNumbersArray[i].join("-");
    $ticketNumberContainer.appendChild(lottoNumber)
  }
}


$toggleShowLottoNumbers.addEventListener('change',onChangeLottoToggleButton )
$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
$lottoPurchaseButton.addEventListener('click', onClickLottoPurchase)

