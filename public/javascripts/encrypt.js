/*
var cryptoJSON = require('crypto-json')
var cipher = 'camellia-128-cbc'
var passKey = '394rwe78fudhwqpwriufdhr8ehyqr9pe8fud'
var encoding = 'hex'
 
var object = {
  first_name: 'Miles',
  last_name: 'Davis',
  instrument: 'Trumpet',
  birth_year: 1926,
  albums: [
    {title: 'Birth of the Cool', year: 1957},
    {title: 'Bitches Brew', year: 1970}
  ]
}
 
var encrypted = cryptoJSON.encrypt(object, passKey, {
  algorithm: cipher,
  encoding: encoding,
  keys: ['first_name', 'birth_year', 'albums']
})
 
console.dir(encrypted)
*/