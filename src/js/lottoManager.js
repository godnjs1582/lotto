import { LOTTO } from "./constant.js"
import { LottoNumberValidationError } from "./enum.js"
export const purchaseLottos = (money) =>{
    if(isNaN(money)||money<0) return 0
    return parseInt(money/LOTTO.PRICE)
  }

export const makeWinningNumbersOfLotto =(ArrayOfWinningNumbers)=>{
    validateLottoNumbers(ArrayOfWinningNumbers)
    return ArrayOfWinningNumbers
    
}
export const validateLottoNumbers = (ArrayOfNumbers)=>{
    const numSet = new Set(ArrayOfNumbers);
    if(ArrayOfNumbers.length!==LOTTO.LENGTH) throw LottoNumberValidationError.LACK_COUNT_OF_LOTTO_NUMBER
    if (numSet.size!==ArrayOfNumbers.length){
        throw LottoNumberValidationError.DUPLICATION_NUMBER
    }
    for(let num of ArrayOfNumbers){
        if(!Number.isInteger(num)){
            throw LottoNumberValidationError.NOT_INTEGER
        }else if(num<1||num>45){
            throw LottoNumberValidationError.VALIDATION
        }
    }
}

  export const makeLottoNumbersArray = (numberOfLottoTicket) =>{
    let lottoTicketsArray =[]
    for(let i=0;i<numberOfLottoTicket;i++){
      lottoTicketsArray.push(makeSerailNumbersOfLotto())
    }
    return lottoTicketsArray;
  }
  
  export const makeSerailNumbersOfLotto =()=>{
    let singleLottoNumbers =[]
    while(singleLottoNumbers.length<LOTTO.LENGTH){
        let randomNumber=Math.floor(Math.random() * (LOTTO.MAX_NUM-LOTTO.MIN_NUM)+LOTTO.MIN_NUM);
      if(!singleLottoNumbers.includes(randomNumber)){
        singleLottoNumbers.push(randomNumber)
      }
    }
    return singleLottoNumbers
  }

  
  const play =(money)=>{
    const numberOfTicket =purchaseLottos(money);
    const lottoTicketsArray=makeLottoNumbersArray(numberOfTicket);
}

console.log(makeWinningNumbersOfLotto([1,2,3,4,5,6,7]))
