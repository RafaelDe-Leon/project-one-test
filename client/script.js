// fetch('http://localhost:3000/data')
//   .then(res => res.json())
//   .then(data => console.log(data));

fetch('/credit_score_impact/500')
  .then(res => res.json())
  .then(data => console.log(data));
