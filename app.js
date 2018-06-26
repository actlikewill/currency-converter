
const addForm = document.forms['frm1'];
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const from = formData.get('from');
  const to = formData.get('to');
  const amount = formData.get('amount');

  const query = `${from}_${to}`;
  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  document.getElementById("url").innerHTML = url;
  
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    const ratio = data[query];
    const result = amount * ratio;  
    console.log(result);
    document.getElementById("result").innerHTML = result;    
  }).catch(function() {
    console.log("Booo");
  });

});

