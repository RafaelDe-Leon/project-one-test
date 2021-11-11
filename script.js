// fetch('http://localhost:3000/data')
//   .then(res => res.json())
//   .then(data => console.log(data));

// fetch('/credit_score_impact/500')
//   .then(res => res.json())
//   .then(data => console.log(data));

const THE_ORIGIN = 'homepage'; //origin to save in Firestore. Currently supports: homepage, landingpage, referralhomepage
//function to format the cumulative savings amount with the proper commas

// const CREDIT_SCORE_LINK =
//   'https://gateway-rjebnrx5ja-uc.a.run.app/credit_score_impact/';
// const DONUT_LOTTIE_LINK =
//   'https://gateway-rjebnrx5ja-uc.a.run.app/donut_lottie';

//Load initial lottie file as empty.
fetch('/https://rafaeladeleon.com/project-one-test/donut_lottie')
  .then(response => response.json())
  .then(json => {
    let data = json.data;
    const lottie_json = data['lottie_json'];
    let cumul = data['cumulative-savings'];
    cumul = numberWithCommas(cumul);
    const cumulative_savings_sentence =
      'Join the <strong>$' +
      cumul +
      ' </strong>of savings Loop customers will enjoy.';
    cumul_savings.innerHTML = cumulative_savings_sentence;
    player.load(lottie_json);
    console.log(data);
  });
