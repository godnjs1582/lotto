import { LottoNumberValidationError } from "./enum.js"


export const purchaseLottos = (money) =>{
    if(isNaN(money)||money<0) return 0
    const PRICE_OF_A_LOTTO = 1000
    return parseInt(money/PRICE_OF_A_LOTTO)
  }

export const makeWinningNumbersOfLotto =(ArrayOfWinningNumbers)=>{
    if(checkLottoNumbersValidation(ArrayOfWinningNumbers)){
        return ArrayOfWinningNumbers
    }
}



export const checkLottoNumbersValidation = (ArrayOfNumbers)=>{
    const LENGHT_OF_LOTTO_NUMBERS =7
    const numSet = new Set();
    if(ArrayOfNumbers.length!==LENGHT_OF_LOTTO_NUMBERS) throw LottoNumberValidationError.LACK_COUNT_OF_LOTTO_NUMBER
    for(let num of ArrayOfNumbers){
        if(!Number.isInteger(num)){
            throw LottoNumberValidationError.NOT_INTEGER
        }else if(num<1||num>45){
            throw LottoNumberValidationError.VALIDATION
        }else if (numSet.has(num)){
            throw LottoNumberValidationError.DUPLICATION_NUMBER
        }
        numSet.add(num)
    }
    return true
}

  export const makeLottoNumbersArray = (numberOfLottoTicket) =>{
    let lottoTicketsArray =[]
    for(let i=0;i<numberOfLottoTicket;i++){
      lottoTicketsArray.push(makeOneLottoNumbers())
    }
    return lottoTicketsArray;
  }
  
  export const makeOneLottoNumbers =()=>{
 
  const LOTTO_NUMBERS_LENGTH=7
    let singleLottoNumbers =[]
    while(singleLottoNumbers.length<LOTTO_NUMBERS_LENGTH){
        let randomNumber=Math.floor(Math.random() * (45-1)+1);
      if(!singleLottoNumbers.includes(randomNumber)){
        singleLottoNumbers.push(randomNumber)
      }
    }
    return singleLottoNumbers
  }

  
  const play =(money)=>{
    const numberOfTicket =purchaseLottos(money);
    const lottoTicketsArray=makeLottoNumbersArray(numberOfTicket);
    console.log(lottoTicketsArray)
}

play(2000)