import { LOTTO, LOTTO_RANKING_AND_PRIZE_MAP } from "./constant.js"
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
      if(!Number.isInteger(+num)){
          throw LottoNumberValidationError.NOT_INTEGER
      }else if(+num<1||+num>45){
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
    const bonusNum = winningNumsArray[winningNumsArray.length-1]
    let fitCountOfSixNumber =0;
    for(let i=0;i<myNumsArray.length;i++){
      if(winningNumsArray.includes(myNumsArray[i])){
        fitCountOfSixNumber++
      }
    }
    const resultOfBonusNumber=myNumsArray.includes(bonusNum)
    return {fitCountOfSixNumber,resultOfBonusNumber}
  }

  const decideRankingOfLotto = ({fitCountOfSixNumber,resultOfBonusNumber})=>{
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

 

  const createMyLottosResultArray = (myLottosNumArray, winningNumsArray)=>{
    let result=[]
    for(let i=0;i<myLottosNumArray.length;i++){
      result.push(calculateResultOfLotto(myLottosNumArray[i],winningNumsArray))
    }
    return result;
  }

  const createMyLottosRankingArray =(myLottoResultArray)=>{
    let result=[]
    for(let i=0;i<myLottoResultArray.length;i++){
      result.push(decideRankingOfLotto(myLottoResultArray[i]))
    }
    return result
  }

  const calculateTotalReturn =(arrayOfRanking)=>{
    let totalReturn =0;
    for(let i=0;i<arrayOfRanking.length;i++){
      totalReturn+=LOTTO_RANKING_AND_PRIZE_MAP[arrayOfRanking[i]]
    }
    return totalReturn
  }

export const createLottoModalData =(myLottosRankingArray,totalRateOfReturn)=>{
  let n5 = 0; 
  let n4 = 0;
  let n3 = 0;
  let n2 = 0;
  let n1 = 0;
  for(let i=0;i<myLottosRankingArray.length;i++){
    switch (myLottosRankingArray[i]) {
      case 1:n1++
        break;
      case 2:n2++
        break;
      case 3:n3++
        break;
      case 4:n4++
        break;
      case 5:n5++
      default:
        break;
    }
  }
  return [n5,n4,n3,n2,n1,totalRateOfReturn]
}


export const playLotto=(myLottoNumbersArray,winningNumbers,totalMoneyUsed)=>{
  const myLottosResultInfoArray= createMyLottosResultArray(myLottoNumbersArray,winningNumbers)
  const myLottosRankingArray = createMyLottosRankingArray(myLottosResultInfoArray)
  const totalReturnOfMyLottos = calculateTotalReturn(myLottosRankingArray) 
  const totalRateOfReturn = totalReturnOfMyLottos/totalMoneyUsed
  const myLottoModalData = createLottoModalData(myLottosRankingArray,totalRateOfReturn)
  return myLottoModalData
}










