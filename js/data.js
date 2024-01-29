const getRandomNumber = function (from, to, decimalPlaces) {
  if (to < from) {
    return "Ошибка! Значение 'до' должно быть больше или равно значению 'от'.";
  }

  const multiplier = Math.pow(10, decimalPlaces);
  const range = (to - from) * multiplier + 1;
  const randomNumber = Math.floor(Math.random() * range) / multiplier + from;

  return randomNumber.toFixed(decimalPlaces);
}

const generateRandom = function ($data) {

  // Генерируем случайную длину массива в пределах от 1 до длины photos
  const length = Math.floor(Math.random() * $data.length) + 1;

  // Создаем копию массива photos
  const photosCopy = [...$data];

  // Выбираем случайные значения из photosCopy и удаляем их, чтобы избежать повторений
  const random = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * photosCopy.length);
    const randomValue = photosCopy.splice(randomIndex, 1)[0];
    random.push(randomValue);
  }

  return random;
}

