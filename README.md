# Infuy
This sets up a basic server listening on port 3000, and accepts JSON payloads at the `/validate` endpoint. 
The validation logic should be implemented in the `/validate` endpoint handler.

Here is an example implementation of the first 3 validation rules:

```javascript
app.post('/validate', (req, res) => {
  const cardNumber = req.body.cardNumber;
  const expiryDate = req.body.expiryDate;
  const cvv = req.body.cvv;

  const expiryDateObj = new Date(expiryDate);
  const currentDate = new Date();

  if (expiryDateObj <= currentDate) {
    return res.json({ success: false });
  }

  const isAmex = cardNumber.startsWith('34') || cardNumber.startsWith('37');
  if ((isAmex && cvv.length !== 4) || (!isAmex && cvv.length !== 3)) {
    return res.json({ success: false });
  }

  if (cardNumber.length < 16 || cardNumber.length > 19) {
    return res.json({ success: false });
  }

  // All checks passed
  res.json({ success: true });
});
```

This code takes the card number, expiry date, and CVV from the request, checks if the expiry date is in the future,
checks if the CVV length is correct depending on whether the card is an American Express card or not, and checks if the card number length is between 16 and 19.
If any of the checks fail, it immediately responds with a JSON object where `success` is false. If all checks pass, it responds with a JSON object where `success` is true.
