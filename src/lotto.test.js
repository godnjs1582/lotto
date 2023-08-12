import { purchaseLottos } from "./js"
test("로또 구입 금액은 양의 정수만 입력가능하고 구입 금액에 해당하는 만큼 로또를 발행한다",()=>{
    expect(purchaseLottos(1000)).toBe(1)
    expect(purchaseLottos(900)).toBe(0)
    expect(purchaseLottos(1500)).toBe(1)
    expect(purchaseLottos(30000)).toBe(30)
    expect(purchaseLottos(-1)).toBe(0)
    expect(purchaseLottos("234")).toBe(0)
})

test("총 7개의 숫자를 입력 받으며, 각 숫자들은 1부터 45까지의 중복없는 정수들로 이루어져 있다",()=>{
    expect(로또숫자입력함수([1,2,3,4,5,6,7])).toBeTruthy()
    expect(로또숫자입력함수(["a",2,3,4,5,6,7])).toBeFalsy()
    expect(로또숫자입력함수(["a",2,3,4,5,6,7])).toBeFalsy()
    expect(로또숫자입력함수([1,1,2,3,4,5,6])).toBeFalsy()
    expect(로또숫자입력함수([0.1,2,3,4,5,6,7])).toBeFalsy()
    expect(로또숫자입력함수([-3,1,2,3,4,5,6])).toBeFalsy()
    expect(로또숫자입력함수([1,2])).toBeFalsy()
})


