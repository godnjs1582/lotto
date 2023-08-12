const {describe, expect, test} = require('@jest/globals'); 
const { purchaseLottos, makeWinningNumbersOfLotto, makeOneLottoNumbers, validateLottoNumbers, makeSerailNumbersOfLotto } =require("./src/js/lottoManager");

describe("로또 구매 테스트",()=>{
    test("구매한 로또의 개수는 지불한 금액을 로또의 가격(1000원)으로 나눈 몫이다.",()=>{
        expect(purchaseLottos(1000)).toBe(1)
        expect(purchaseLottos(900)).toBe(0)
        expect(purchaseLottos(1500)).toBe(1)
        expect(purchaseLottos(30000)).toBe(30)
    })
    test("양의 정수가 아닌 값을 지불하면 0개의 로또를 가지게된다.",()=>{
        expect(purchaseLottos(-1)).toBe(0)
        expect(purchaseLottos("234")).toBe(0)
    })
})

describe("로또 번호 밸리데이션 테스트",()=>{
    test("로또 번호는 7자리이다",()=>{
        expect(()=>validateLottoNumbers([1,2,3,4,5,6,7])).not.toThrow();
        expect(()=>validateLottoNumbers([4])).toThrow();
        expect(()=>validateLottoNumbers([1,2])).toThrow();
        expect(()=>validateLottoNumbers([1,2,3,4,5,6,7,8])).toThrow();
    })
    test("로또 번호는 1부터 45까지의 자연수이다",()=>{
        expect(()=>validateLottoNumbers([1,2,3,4,5,6,7])).not.toThrow();
        expect(()=>validateLottoNumbers([0,1,2,3,4,5,6])).toThrow();
        expect(()=>validateLottoNumbers([1,2,3,4,5,6,46])).toThrow();
        expect(()=>validateLottoNumbers([1,2,3,4,5,6,0.3])).toThrow();
        expect(()=>validateLottoNumbers(["1",2,3,4,5,6,0.3])).toThrow();
        expect(()=>validateLottoNumbers(["a",2,3,4,5,6,7])).toThrow();
    })
    test("로또 번호는 서로 중복되지 않는다.",()=>{
        expect(()=>validateLottoNumbers([3,3,3,4,5,6,7])).toThrow();
        expect(()=>validateLottoNumbers([7,7,7,7,7,7,7])).toThrow();
    })
})

describe("로또 번호 생성 테스트",()=>{
    test("랜덤으로 생성된 로또 번호들은 항상 로또 번호 밸리데이션을 만족한다",()=>{
        const TEST_COUNT=1000;
        for(let i=0;i<TEST_COUNT;i++){
            expect(validateLottoNumbers(makeSerailNumbersOfLotto())).toBeTruthy()
        }
    })

    test("구매한 로또 수 만큼의 로또가 발행된다",()=>{

    })
})

describe("로또 당첨 번호 테스트",()=>{
    test("당첨 번호는 총 7자리이다",()=>{
        expect(makeWinningNumbersOfLotto([1,2,3,4,5,6,7])).toEqual([1,2,3,4,5,6,7]);
        expect(makeWinningNumbersOfLotto([1,2,3,4,5,6,7,8])).toThrow()
        expect(makeWinningNumbersOfLotto([1,2,3,4,5])).toThrow()
    })

    test("각 자리 숫자는 1부터 45사이의 자연수이다",()=>{
        expect(makeWinningNumbersOfLotto([-1,2,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto([0.1,2,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto([1,2,3,4,5,6,46])).toThrow();
        expect(makeWinningNumbersOfLotto(["1",2,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto([2/3,2,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto([null,2,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto([undefined,2,3,4,5,6,7])).toThrow();
    })

    test("각 숫자들은 서로 중복되지 않는다.",()=>{
        expect(makeWinningNumbersOfLotto([1,1,3,4,5,6,7])).toThrow();
        expect(makeWinningNumbersOfLotto([7,7,7,7,7,7,7])).toThrow();
    })
})



// test("로또 당첨 번호로 7개의 숫자를 입력 받으며,각 숫자들은 1부터 45까지의 중복없는 정수들로 이루어져 있다",()=>{
//     expect(makeWinningNumbersOfLotto([1,2,3,4,5,6,7])).toEqual([1,2,3,4,5,6,7])
//     expect(()=>makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto([1,1,2,3,4,5,6])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto([0.1,2,3,4,5,6,7])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto([-3,1,2,3,4,5,6])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto([1,0.4,2,3,4,5,6])).toThrow()
//     expect(()=>makeWinningNumbersOfLotto([1,2])).toThrow()
// })





