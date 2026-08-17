fetch('http://localhost:3000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test Agent',
    email: 'aviralshukla2612@gmail.com',
    phone: '+1 1234567890',
    message: 'Testing the live server endpoint'
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Fetch error:', err));
