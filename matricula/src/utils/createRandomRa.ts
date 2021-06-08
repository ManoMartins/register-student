export default function createRandomRa() {
  const currentYear = new Date().getFullYear();
  const randomNumber = Math.floor(Math.random() * 99999) + 1
  
  return +`${currentYear}${randomNumber.toString().padStart(6, '0')}`
}