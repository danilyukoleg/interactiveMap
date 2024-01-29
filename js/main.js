const templateCard = document.getElementById("card").content;
const templateCardItem = templateCard.querySelector(".popup");
const mapCanvas = document.getElementById("map-canvas");

const mapActive = function (flag) {
    const mapFilters = document.querySelector(".map__filters");
    const mapElement = mapFilters.children;
    const adForm = document.querySelector(".ad-form");
    const addElement = adForm.children;

    if (flag) {
        mapFilters.classList.add('ad-form--disabled');
        adForm.classList.add('ad-form--disabled');
    } else {
        mapFilters.classList.remove('ad-form--disabled');
        adForm.classList.remove('ad-form--disabled');
    }


    for (let i = 0; i < mapElement.length; i++) {
        mapElement[i].disabled = flag;
    }

    for (let i = 0; i < addElement.length; i++) {
        addElement[i].disabled = flag;
    }
}

mapActive(true);

