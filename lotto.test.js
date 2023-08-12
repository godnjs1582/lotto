const {describe, expect, test} = require('@jest/globals'); 
const { purchaseLottos, makeWinningNumbersOfLotto, makeOneLottoNumbers, checkLottoNumbersValidation } =require("./src/js/lottoManager");


test("로또 구입 금액은 양의 정수만 입력가능하고 구입 금액에 해당하는 만큼 로또를 발행한다",()=>{
    expect(purchaseLottos(1000)).toBe(1)
    expect(purchaseLottos(900)).toBe(0)
    expect(purchaseLottos(1500)).toBe(1)
    expect(purchaseLottos(30000)).toBe(30)
    expect(purchaseLottos(-1)).toBe(0)
    expect(purchaseLottos("234")).toBe(0)
})

test("checkLottoNumbersValidation 함수는 1부터 7까지 중복없는 7개의 정수로 이루어져 있는 경우에만 true를 반환한다",()=>{
    expect(checkLottoNumbersValidation([1,2,3,4,5,6,7])).toBeTruthy();
    expect(()=>checkLottoNumbersValidation([-1,2,3,4,5,6,7])).toThrow();
    expect(()=>checkLottoNumbersValidation([1,2])).toThrow();
    expect(()=>checkLottoNumbersValidation(["a",2,3,4,5,6,7])).toThrow();
    expect(()=>checkLottoNumbersValidation([1,2,3,4,5,6,100])).toThrow();
    expect(()=>checkLottoNumbersValidation([3,3,3,4,5,6,7])).toThrow();
})

test("랜덤으로 만들어진 로또번호들들은 1부터 45가지 중복없는 7개의 정수들로 이루어져 있다",()=>{
    //여러번 실행하기
    const TEST_COUNT=10000;
    for(let i=0;i<TEST_COUNT;i++){
        expect(checkLottoNumbersValidation(makeOneLottoNumbers())).toBeTruthy()
    }
})

test("로또 당첨 번호로 7개의 숫자를 입력 받으며,각 숫자들은 1부터 45까지의 중복없는 정수들로 이루어져 있다",()=>{
    expect(makeWinningNumbersOfLotto([1,2,3,4,5,6,7])).toEqual([1,2,3,4,5,6,7])
    expect(()=>makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow()
    expect(()=>makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow()
    expect(()=>makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow()
    expect(()=>makeWinningNumbersOfLotto([1,1,2,3,4,5,6])).toThrow()
    expect(()=>makeWinningNumbersOfLotto([0.1,2,3,4,5,6,7])).toThrow()
    expect(()=>makeWinningNumbersOfLotto([-3,1,2,3,4,5,6])).toThrow()
    expect(()=>makeWinningNumbersOfLotto([1,0.4,2,3,4,5,6])).toThrow()
    expect(()=>makeWinningNumbersOfLotto([1,2])).toThrow()
})





