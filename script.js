/*
fetch('https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=lemon', {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
    'x-rapidapi-key': '3e8f7f12d1msh89e2f6e4b63ed11p190647jsn11252f6994a3',
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
*/
const foodInput = document.querySelector('#input1');
const buttonSubmit = document.querySelector('#buttonSubmit');
const caloriesText = document.querySelector('#caloriesText');
const milesText = document.querySelector('#milesText');

const getTodayData = async (food) => {
  try {
    const response = await fetch(
      `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${food}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
          'x-rapidapi-key': '3e8f7f12d1msh89e2f6e4b63ed11p190647jsn11252f6994a3',
        },
      }
    );
    const fetchedData = await response.json();

    console.log(fetchedData);

    caloriesText.textContent = fetchedData.calories;
    milesText.textContent = `${Math.round((fetchedData.calories / 100) * 10) / 10} miles`;
  } catch (err) {}
};

//SUBMIT
buttonSubmit.addEventListener('click', () => {
  console.log(foodInput.value);
  getTodayData(foodInput.value);
});
