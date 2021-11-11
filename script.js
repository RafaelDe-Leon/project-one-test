// fetch('http://localhost:3000/data')
//   .then(res => res.json())
//   .then(data => console.log(data));

fetch(
  'https://gateway-cagi34uoda-uc.a.run.app/credit_score_impact/500?origin=homepage'
)
  .then(res => res.json())
  .then(data => console.log(data));

// cors = CORS(app, (origins = 'https://www.ridewithloop.com'));
