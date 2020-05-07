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

/*
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
    display(fetchedData);
  } catch (err) {}
};

//SUBMIT
buttonSubmit.addEventListener('click', () => {
  console.log(foodInput.value);
  getTodayData(foodInput.value);
});

const display = (data) => {
  milesText.textContent = `You need to run ${Math.round((data.calories / 100) * 10) / 10} miles`;
};
*/

const GetInput = (props) => {
  return (
    <div>
      <h3>Get Input:</h3>
      <form onSubmit={props.handleSubmit}>
        <input value={props.input} onChange={props.handleChange} />
        <button type='submit'>Submit!</button>
      </form>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <h3>Calories:</h3>
      <p>{props.calories}</p>
    </div>
  );
};

const Exercise = (props) => {
  return (
    <div>
      <h3>To burn that:</h3>
      <p>{`You need to run ${Math.round((props.calories / 100) * 10) / 10} miles`}</p>
      <p>{`You need to cycle for ${Math.round((props.calories / 600) * 10) / 10} hours`}</p>
      <p>{`You need to lift weights for ${Math.round((props.calories / 250) * 10) / 10} hours`}</p>
    </div>
  );
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      calories: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTodayData = this.getTodayData.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getTodayData(this.state.inputValue);
  }

  getTodayData = async (food) => {
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

      this.setState({
        calories: fetchedData.calories,
      });
    } catch (err) {}
  };

  render() {
    return (
      <div>
        <GetInput input={this.state.inputValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

        <Total calories={this.state.calories} />
        {this.state.calories !== '' ? <Exercise calories={this.state.calories} /> : null}
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<Container />, domContainer);
