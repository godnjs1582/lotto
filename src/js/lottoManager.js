import { LOTTO } from "./constant.js"
import { LottoNumberValidationError } from "./enum.js"

export const purchaseLottos = (money) =>{
    if(isNaN(money)||money<0) return 0
    return parseInt(money/LOTTO.PRICE)
  }

export const makeWinningNumbersOfLotto =(ArrayOfWinningNumbers)=>{
    validateWinningLottoNumbers(ArrayOfWinningNumbers)
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

export const validateWinningLottoNumbers = (ArrayOfNumbers)=>{
  const numSet = new Set(ArrayOfNumbers);
  if(ArrayOfNumbers.length!==LOTTO.LENGTH+1) throw LottoNumberValidationError.LACK_COUNT_OF_LOTTO_NUMBER
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

  export const makeLottoTicketsArray = (numberOfLottoTicket) =>{
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

  const calculateResultOfLotto=(myNumsArray, winningNumsArray)=>{
    const myBonusNum = myNumsArray.at(-1)
    const myWinningNum = winningNumsArray.at(-1)
   
    let fitCountOfSixNumber =0;
    for(let i=0;i<winningNumsArray.length-1;i++){
      if(winningNumsArray.includes(myNumsArray[i])){
        fitCountOfSixNumber ++
      }
    }
    const resultOfBonusNumber = myBonusNum===myWinningNum
    return {fitCountOfSixNumber,resultOfBonusNumber}
  }

  const decideRankingOfLotto = (fitCountOfSixNumber,resultOfBonusNumber)=>{
    let result ;
    if(fitCountOfSixNumber===6){
      result =1
    }else if(fitCountOfSixNumber===5&&resultOfBonusNumber===true){
      result =2
    }else if(fitCountOfSixNumber===5&&resultOfBonusNumber===false){
      result =3
    }else if(fitCountOfSixNumber===4){
      result =4
    }else if(fitCountOfSixNumber===3){
      result=5
    }else {
      result =6
    }
    return result
  }

  const calculateTotalReturn =(arrayOfRanking)=>{
    let totalReturn =0;
    for(let i=0;i<arrayOfRanking;i++){
      totalReturn+=LOTTO_RANKING_AND_PRIZE_MAP[arrayOfRanking[i]]
    }
    return totalReturn
  }

  const createMyLottosResultArray = (myLottosNumArray, winningNumsArray)=>{
    console.log(winningNumsArray,"skdfml")
    let result=[]
    for(let i=0;i<myLottosNumArray.length;i++){
      result.push(calculateResultOfLotto(myLottosNumArray[i],winningNumsArray))
    }
    return result;
  }

  const createMyLottosRankingArray =(myLottoResultArray)=>{
    let result=[]
    for(let i=0;i<myLottoResultArray;i++){
      result.push(decideRankingOfLotto(myLottoResultArray[j]))
    }
  }


const play=(money)=>{
  const numberOfTicket = purchaseLottos(money);
  const totalMoneyUsed = numberOfTicket*LOTTO.PRICE;
  const myLottoNumbersArray= makeLottoTicketsArray(numberOfTicket)
  const winningNumbers = makeWinningNumbersOfLotto([23,24,35,12,3,4,5])
  const myLottosResultInfoArray= createMyLottosResultArray(myLottoNumbersArray,winningNumbers)
  const myLottosRankingArray = createMyLottosRankingArray(myLottosResultInfoArray)
  const totalReturnOfMyLottos = calculateTotalReturn(myLottosRankingArray) 
  const totalRateOfReturn = totalReturnOfMyLottos/totalMoneyUsed
  console.log(numberOfTicket,"numberOfTicket")
  console.log(totalMoneyUsed,"totalMoneyUsed")
  console.log(myLottoNumbersArray,"myLottoNumbersArray")
  console.log(winningNumbers,"winningNumbers")
  console.log(myLottosResultInfoArray,"myLottosResultInfoArray")
  console.log(myLottosRankingArray,"myLottosRankingArray")
  console.log(totalReturnOfMyLottos,"totalReturnOfMyLottos")
  console.log(totalRateOfReturn,"totalRateOfReturn")
}

console.log(play(2400))







