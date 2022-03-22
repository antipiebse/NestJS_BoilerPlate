function myPage() {
    let count = 0;//구매 횟수
    let amount = 0;//총 금액
    let grade = "";


    //   for (let data of myShopping){

    //   }

    for (let i = 0; i < myShopping.length; i++) {
        if (myShopping[i].category === "의류") {
            count++;
            amount += myShopping[i].price;
        }
    }
    if (count >= 0 && count <= 2) {
        grade = "Bronze"
    } else if (count >= 3 && count <= 4) {
        grade = "Silver";
    } else if (count >= 5) {
        grade = "Gold"
    }
	return `의류를 구매한 횟수는 총 ${count}회 금액은 ${amount}원이며 등급은 ${grade}입니다`
}
const myShopping = [
    { category: "과일", price: 12000 },
    { category: "의류", price: 10000 },
    { category: "의류", price: 20000 },
    { category: "장난감", price: 9000 },
    { category: "과일", price: 5000 },
    { category: "의류", price: 10000 },
    { category: "과일", price: 8000 },
    { category: "의류", price: 7000 },
    { category: "장난감", price: 5000 },
    { category: "의류", price: 10000 }
];

myPage()