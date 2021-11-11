// fetch('http://localhost:3000/data')
//   .then(res => res.json())
//   .then(data => console.log(data));

fetch(
  'https://gateway-rjebnrx5ja-uc.a.run.app/credit_score_impact/500?origin=homepage'
)
  .then(res => res.json())
  .then(data => console.log(data));
