const headerAvatar = document.getElementById('avatar');
const headerPreview = document.querySelector(".ad-form-header__preview img");
const imagesInp = document.getElementById("images");
const imagesPreview = document.querySelector(".ad-form__photo img")


const fileReader = function (inp, preview) {
	inp.addEventListener("change", function () {
		const files = inp.files[0];

		if (files) {
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				preview.src = reader.result;
			})
			reader.readAsDataURL(files);
		}
	});

}

fileReader(headerAvatar, headerPreview);
fileReader(imagesInp, imagesPreview);
