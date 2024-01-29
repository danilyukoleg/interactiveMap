const type = document.getElementById("type");
const price = document.getElementById("price");
const timein = document.getElementById("timein");
const timeout = document.getElementById("timeout");
const rooms = document.getElementById("room_number");
const capacity = document.getElementById("capacity");

type.addEventListener("click", function () {
    let priceResult = 0;
    switch (type.value) {
        case "flat":
            priceResult = 1000;
            break;
        case "house":
            priceResult = 5000;
            break;
        case "palace":
            priceResult = 10000;
            break;
        default:
            priceResult = 0;
            break;
    }

    price.placeholder = priceResult;
    price.min = priceResult;
});


timein.addEventListener("change", function () {
    timeout.value = this.value;
});

timeout.addEventListener("change", function () {
    timein.value = this.value;
});

let index = rooms.value === 100 ? 0 : rooms.value;
const element = capacity.querySelector(`option[value="${index}"]`)
element.selected = true;

rooms.addEventListener("change", function () {
    let index = this.value === '100' ? String(0) : this.value;
    const element = capacity.querySelector(`option[value="${index}"]`)
    element.selected = true;

})

capacity.addEventListener("change", function () {
    let index = this.value === '0' ? String(100) : this.value;
    const element = rooms.querySelector(`option[value="${index}"]`)
    element.selected = true;
})