function submitForm() {
  $('form').submit(function (e) {
    e.preventDefault();
    $('#section').html('');
    getDogPic();
    this.reset();
  });
}

function getDogPic() {
  let i = $('input#breed').val();
  let dogArr = i.match(/\w+\b/g);
  let dog;
  if (dogArr[1] != undefined) {
    dog = dogArr[1] + '/' + dogArr[0];
  }
  if (dogArr[1] === undefined) {
    dog = dogArr[0];
  }
  console.log(dog);
  fetch('https://dog.ceo/api/breed/' + dog + '/images/random')
    .then((response) => response.json())
    .then((responseJSON) => displayResults(responseJSON))
    .catch((error) => alert(error));
}
function imageHTML(responseJSON) {
  console.log(responseJSON);
  return `<img src="` + responseJSON.message + `">`;
}
function errorHTML(responseJSON) {
  return (
    `<h2>` +
    responseJSON.message +
    `,<br>For a full list of breeds please visit <a href="https://dog.ceo/dog-api/breeds-list"> this link </a></h2>`
  );
}
function displayResults(responseJSON) {
  if (responseJSON.status === 'success') {
    $('#section').append(imageHTML(responseJSON));
  }
  if (responseJSON.status === 'error') {
    $('#section').append(errorHTML(responseJSON));
    console.log(responseJSON);
    throw responseJSON.message;
  }
}
$(submitForm);
