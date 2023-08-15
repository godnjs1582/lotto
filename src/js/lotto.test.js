import * as lottoManager from "./lottoManager"

describe("로또 구매 테스트",()=>{
    test("구매한 로또의 개수는 지불한 금액을 로또의 가격(1000원)으로 나눈 몫이다.",()=>{
        expect(lottoManager.purchaseLottos(1000)).toBe(1)
        expect(lottoManager.purchaseLottos(900)).toBe(0)
        expect(lottoManager.purchaseLottos(1500)).toBe(1)
        expect(lottoManager.purchaseLottos(30000)).toBe(30)
    })
    test("양의 정수가 아닌 값을 지불하면 0개의 로또를 가지게된다.",()=>{
        expect(lottoManager.purchaseLottos(-1)).toBe(0)
        expect(lottoManager.purchaseLottos("234")).toBe(0)
        expect(lottoManager.purchaseLottos(0.5)).toBe(0)
    })
})

describe("로또 번호 밸리데이션 테스트",()=>{
    test("로또 번호는 6자리이다",()=>{
        expect(()=>lottoManager.validateLottoNumbers([1,2,3,4,5,6])).not.toThrow();
        expect(()=>lottoManager.validateLottoNumbers([4])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers([1,2,3,4,6,7])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers([1,2,3,4,5,6,7,8])).toThrow();
    })
    test("로또 번호는 1부터 45까지의 자연수이다",()=>{
        expect(()=>lottoManager.validateLottoNumbers([0,1,2,3,4,5])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers([1,2,3,4,5,6])).not.toThrow();
        expect(()=>lottoManager.validateLottoNumbers([2,3,4,5,6,46])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers([2,3,4,5,6,0.3])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers(["1",3,4,5,6,0.3])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers(["a",3,4,5,6,7])).toThrow();
    })
    test("로또 번호는 서로 중복되지 않는다.",()=>{
        expect(()=>lottoManager.validateLottoNumbers([3,3,3,4,5,6])).toThrow();
        expect(()=>lottoManager.validateLottoNumbers([7,7,7,7,7,7])).toThrow();
    })
})

describe("로또 생성 테스트",()=>{
    test("랜덤으로 생성된 로또 번호들은 항상 로또 번호 밸리데이션을 만족한다",()=>{
        const TEST_COUNT=1000;
        for(let i=0;i<TEST_COUNT;i++){
            expect(()=>lottoManager.validateLottoNumbers(makeSerailNumbersOfLotto())).not.toThrow()
        }
    })

    test("구매한 로또 수 만큼의 로또가 발행된다",()=>{
        const RANDOM_INTEGER = Math.floor(Math.random()*100)+1
        expect(lottoManager.makeLottoNumbersArray(RANDOM_INTEGER).length).toBe(RANDOM_INTEGER)
    })
})

describe("로또 당첨 번호 테스트",()=>{
    test("당첨 번호는 총 7자리이다",()=>{
        expect(lottoManager.makeWinningNumbersOfLotto([1,2,3,4,5,6,7]).length).toBe(7)
        expect(()=>lottoManager.makeWinningNumbersOfLotto([1,2,3,4,5,6,7,8])).toThrow()
        expect(()=>lottoManager.makeWinningNumbersOfLotto([1,2,3,4,5])).toThrow()
    })

    test("각 자리 숫자는 1부터 45사이의 자연수이다",()=>{
        expect(()=>lottoManager.makeWinningNumbersOfLotto([-1,2,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto([0.1,2,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto([1,2,3,4,5,6,46])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto(["1",2,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto(["a",2,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto([2/3,2,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto([null,2,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto([undefined,2,3,4,5,6,7])).toThrow();
    })

    test("각 숫자들은 서로 중복되지 않는다.",()=>{
        expect(()=>lottoManager.makeWinningNumbersOfLotto([1,1,3,4,5,6,7])).toThrow();
        expect(()=>lottoManager.makeWinningNumbersOfLotto([7,7,7,7,7,7,7])).toThrow();
    })
})









