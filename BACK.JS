document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var cardNumber = document.getElementById('card-number').value;
    var expiryDate = document.getElementById('expiry-date').value;
    var cvv = document.getElementById('cvv').value;
  
    fetch('/validate', {
      method: 'POST',
      body: JSON.stringify({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        var responseElement = document.getElementById('response');
        if (data.success) {
          responseElement.innerHTML = '<span style="color:green">✔️</span>';
        } else {
          responseElement.innerHTML = '<span style="color:red">❌</span>';
        }
      });
  });