navigator.serviceWorker.register('sw.js').then(function() {
  console.log('Registration Worked!');
}).catch(function(){
  console.log('Registration Failed');
});


function getCurrencyList() {  
  const url = `https://free.currencyconverterapi.com/api/v5/currencies`;

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {      
    const values = data.results;    
    let optionsList = `<option value="">Select Currency</option>`;
 
      for(var key in values){
      const currencyId = key;
      const currencyItem = values[key].currencyName;      
      optionsList += `<option value="${currencyId}">${currencyItem}</option>`;                 
    } 
 
  document.getElementById("list1").innerHTML = optionsList;
  document.getElementById("list2").innerHTML = optionsList;

  }).catch(function() {
    console.log("Booo");
  });
}

getCurrencyList();

const addForm = document.forms['frm1'];
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const from = formData.get('from');
  const to = formData.get('to');
  const amount = formData.get('amount');

  const query = `${from}_${to}`;
  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  // document.getElementById("url").innerHTML = url;
  
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

