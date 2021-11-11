// fetch('http://localhost:3000/data')
//   .then(res => res.json())
//   .then(data => console.log(data));

// fetch('/credit_score_impact/500')
//   .then(res => res.json())
//   .then(data => console.log(data));

const THE_ORIGIN = 'homepage'; //origin to save in Firestore. Currently supports: homepage, landingpage, referralhomepage
//function to format the cumulative savings amount with the proper commas
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CREDIT_SCORE_LINK =
  'https://gateway-rjebnrx5ja-uc.a.run.app/credit_score_impact/';
const DONUT_LOTTIE_LINK =
  'https://gateway-rjebnrx5ja-uc.a.run.app/donut_lottie';

const cumul_savings = document.getElementById('cumul-savings');
const submit_btn = document.getElementById('submit-btn');
const field = document.getElementById('field');
const form = document.getElementById('credit-form');
//this listener is called first. It will invalidate the
//scroll from webflow forms to the section
form.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});
//this listener is called after submit (above)
//it then calls the button to proceed with error checks
//etc.
field.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    //13 == Enter
    event.preventDefault();
    submit_btn.click();
  }
});
const player = document.querySelector('lottie-player');

//Load initial lottie file as empty.
fetch(DONUT_LOTTIE_LINK)
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
  });

//listener for submit button to make HTTP Request
(function clickMe() {
  const savings_text = document.getElementById('savings');
  submit_btn.addEventListener('click', function (e) {
    document.activeElement.blur(); //hides keyboard on mobile
    //grab the selected value from the select field
    let user_input = field.value; //credit score
    if (user_input.length === 0) {
      alert('Please make sure that your input is a valid credit score.');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    try {
      user_input = parseInt(user_input);
      if (typeof user_input !== 'number') {
        alert('Please make sure that your input is a valid credit score.');
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      //for input = .0
      if (!(user_input >= 0)) {
        alert('Please make sure that your credit score is between 0 and 850.');
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (user_input < 0 || user_input > 850) {
        alert('Please make sure that your credit score is between 0 and 850.');
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      let url = CREDIT_SCORE_LINK + user_input + '?origin=' + THE_ORIGIN;
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.errors) {
            alert(json.message);
            return;
          }
          let api_res = '';
          let data = json.data;
          if (data !== undefined) {
            const sentence = data.data;
            const credit_score = data['credit-score'];
            const savings = data['savings'];
            let cumul = data['cumulative-savings'];
            cumul = numberWithCommas(cumul);

            savings_text.innerHTML = '$' + savings;

            const cumulative_savings_sentence =
              'Join the <strong>$' +
              cumul +
              ' </strong>of savings Loop customers will enjoy.';
            cumul_savings.innerHTML = cumulative_savings_sentence;

            const lottie_json = data['lottie_json'];
            player.load(lottie_json);
          } else {
            //empty lottie
            fetch(DONUT_LOTTIE_LINK)
              .then(response => response.json())
              .then(json => {
                let data = json.data;
                const lottie_json = data['lottie_json'];
                player.load(lottie_json);
              });
          }
        });
    } catch {
      alert('Oops! Something went wrong. Please contact our support team.');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
})();
