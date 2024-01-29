const map = L.map("map-canvas")
	.on('load', () => {
		mapActive(false);
	})
	.setView({
		lat: 35.6895,
		lng: 139.692
	}, 10)

L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution: '',
	},
).addTo(map);

const mainPinIcon = L.icon({
	iconUrl: "../leaflet/img/main-pin.svg",
	iconSize: [52, 52],
	iconAnchor: [26, 52]
});

const mainPinMarker = L.marker(
	{
		lat: 35.6895,
		lng: 139.692
	},
	{
		draggable: true,
		icon: mainPinIcon,
	}
)

mainPinMarker.addTo(map);

mainPinMarker.on("moveend", (e) => {
	console.log(e.target.getLatLng());
} );



const templateBalun = function (item) {
	const {author, offer} = item;
	const templateCard = document.getElementById("card").content;
	const templateCardItem = templateCard.querySelector(".popup");

	const cloneItem = templateCardItem.cloneNode(true);
	const data = {
		title: cloneItem.querySelector(".popup__title"),
		address: cloneItem.querySelector(".popup__text--address"),
		price: cloneItem.querySelector(".popup__text--price"),
		type: {
			tagName: cloneItem.querySelector(".popup__type"),
			flat: "Квартира",
			bungalow: "Бунгало",
			house: "Дом",
			palace: "Дворец"
		},
		capacity: cloneItem.querySelector(".popup__text--capacity"),
		time: cloneItem.querySelector(".popup__text--time"),
		features: {
			featuresWrap: cloneItem.querySelector(".popup__features"),
			feature: cloneItem.querySelectorAll(".popup__feature")
		},
		description: cloneItem.querySelector(".popup__description"),
		photos: {
			wrap: cloneItem.querySelector(".popup__photos"),
			items: cloneItem.querySelector(".popup__photo")
		},
		avatar: cloneItem.querySelector(".popup__avatar")
	}
	data.avatar.src = author.avatar;
	data.title.textContent = offer.title;
	data.address.textContent = offer.address;
	data.price.textContent = `${offer.price}₽/ночь`;
	data.type.tagName.textContent = data.type[offer.type];
	data.capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
	data.time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

	for (let i = 0; i < data.features.length; i++) {
		if (!data.features[i].classList.contains(`popup__feature--${offer.features[i]}`)) {
			data.features[i].remove();
		}
	}
	data.description.textContent = offer.description;
	data.photos.wrap.innerHTML = "";
	for (let i = 0; i < offer.photos?.length; i++) {
		let img = document.createElement("img");
		img.classList.add("popup__photo");
		img.alt = "Фотография жилья";
		img.width = 45;
		img.height = 45;
		img.src = offer.photos[i];
		data.photos.wrap.appendChild(img);
	}

	return cloneItem;
}

let markers = [];

const resData = function (objData) {
	// Clear existing markers
	clearMarkers();

	for (let obj of objData) {
		const icon = L.icon({
			iconUrl: "../leaflet/img/pin.svg",
			iconSize: [40, 40],
			iconAnchor: [20, 40]
		});

		const marker = L.marker(
			{
				lat: obj.location.lat,
				lng: obj.location.lng
			},
			{
				icon: icon
			}
		);

		marker.addTo(map).bindPopup(templateBalun(obj));

		// Save the marker reference
		markers.push(marker);
	}
};

// Function to clear existing markers
function clearMarkers() {
	for (let marker of markers) {
		marker.remove(); // Remove the marker from the map
	}

	// Clear the markers array
	markers = [];
}


try {
	fetch("https://23.javascript.htmlacademy.pro/keksobooking/data", {
		method: "GET",
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(response => response.json())
		.then(data => {
			document.querySelector(".map__filters").addEventListener("input", function (e) {
				const form = new FormData(document.querySelector(".map__filters"));
				const selectedType = form.get("housing-type");
				const selectedPrice = form.get("housing-price");
				const selectedRooms = form.get("housing-rooms");
				const selectedQuests = form.get("housing-guests");
				const selectedFeatures = form.getAll("features");
				const arr = [selectedType, selectedPrice, selectedRooms, selectedQuests,selectedFeatures ]

				let resFilter = data.filter(item => {
					let priceFilter = 0;
					switch (arr[1]) {
						case "low":
							priceFilter = item.offer.price < 10000;
							break;
						case "middle":
							priceFilter = item.offer.price >= 10000 && item.offer.price <= 50000;
							break;
						case "high":
							priceFilter = item.offer.price > 50000;
							break;
						default:
							priceFilter = true; // No price filter if "any" is selected
							break;
					}

					let featuresFilter = arr[4].length === 0 || (item.offer.features && arr[4].every(feature => item.offer.features.includes(feature)));
					return (
						(arr[0] === "any" || item.offer.type === arr[0]) &&
						priceFilter &&
						(arr[2] === "any" || item.offer.rooms === Number(arr[2])) &&
						(arr[3] === "any" || item.offer.guests === Number(arr[3])) &&
						featuresFilter
					);
				})

				setTimeout(() => {
					resData(resFilter.slice(0, 10))
				}, 500)

			})
			resData(data.slice(0, 10))
		})
} catch (error) {
	console.log(`Error ${error.message}`)
}


