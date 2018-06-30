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

let query;

function saveDataToDB(saveData){
  let request = window.indexedDB.open("CurrencyRatesDB", 1),
  db,
  tx,
  store,
  index;

  request.onupgradeneeded = function(e) {
    let db = request.result,
        store = db.createObjectStore("CurrencyRatesStore", {
          keyPath: "query"})          
  };

  request.onerror = function(e) {
    console.log("Booo:" + e.target.errorCode);
  }

  request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction("CurrencyRatesStore", "readwrite");
    store = tx.objectStore("CurrencyRatesStore");

    db.onerror = function(e) {
      console.log("Booo:" + e.target.errorCode);
    }

    let putData = {"query" : query, "ratio":saveData[query]};

    store.add(putData);

    console.log(putData);  
    
  }
console.log("The data is: " + saveData[query]);

}

const addForm = document.forms['frm1'];
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const from = formData.get('from');
  const to = formData.get('to');
  const amount = formData.get('amount');

  query = `${from}_${to}`;
  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  // document.getElementById("url").innerHTML = url;
  
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    const saveData = data;
    const ratio = data[query];
    const result = amount * ratio;  
    // console.log(result);
    // console.log(saveData[query]);
    saveDataToDB(saveData);
    document.getElementById("result").innerHTML = result;
    
    

  }).then(function(){
    let req = indexedDB.open("CurrencyRatesDB", 1);
    req.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("CurrencyRatesStore", "readwrite");
        let store = tx.objectStore("CurrencyRatesStore");
        let dbData = store.get(query);
        dbData.onerror = function () {
          document.getElementById("db").innerHTML = ("Offline Unavailable");
        }

        dbData.onsuccess = function () {
          let dbRatio = dbData.result.ratio;
          document.getElementById("db").innerHTML = ("Offline Results : " + amount * dbRatio);
        }

    }
  })
  .catch(function() {
    console.log("Booo: " + e.target.errorCode);
  });
});







