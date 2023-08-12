const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
)

const $lottoPurchaseButton = document.querySelector('.btn-cyan')
const $lottoPurchaseInput = document.getElementById('lotto-purchase-input')

const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}

const onClickLottoPurchase = ()=>{
  const inputMoney= $lottoPurchaseInput.value
  purchaseLottos(inputMoney)
}




export const calculateResultOfOneLotto = (numbersArray, lottoWinningNumbers)=>{
  let count = 0;
  for(let i=0;i<numbersArray.length;i++){
    if(lottoWinningNumbers.includes(numbersArray[i])){
      count++
    }
  }
  return count
}



export const calculateRateOfReturn = (winningAmount,purchaseAmount)=>{
  if(isNaN(winningAmount)||isNaN(purchaseAmount)) return
  return winningAmount*100/purchaseAmount
}

export const printOutResultOfLotto = (rateOfReturn)=>{
  console.log(`총 수익률은 ${rateOfReturn}%입니다`)
}
// 3개 일치 (5,000원) - 1개
// 4개 일치 (50,000원) - 0개
// 5개 일치 (1,500,000원) - 0개
// 5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
// 6개 일치 (2,000,000,000원) - 0개
// 총 수익률은 62.5%입니다.

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
$lottoPurchaseButton.addEventListener('click', onClickLottoPurchase)

