const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

/*  local storage */
populateUI()
 
let ticketPrice = +movieSelect.value;

// console.log(typeof ticketPrice);

 
/* ====== save selected movie index and price ====== */
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice)
}
 

 
/* ====== Update total and count ====== */
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  /*  local Storage */
  const seatsIndex = [...selectedSeats].map(function(seat){
    return [...seats].indexOf(seat);
  })

  // console.log(seatsIndex)
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  // console.log(selectedSeat);
  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount)
  // console.log(selected)
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

 
/* ====== Local Storage - Get the data from local storage and populate the ui ====== */
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length > 0){
      seats.forEach((seat, index) => {
        if(selectedSeats.indexOf(index) > -1){
          seat.classList.add('selected');
        }
    })
  }
}
 

 
/* ====== movie select event ====== */
 movieSelect.addEventListener('change', e => {
   ticketPrice = +e.target.value;
   console.log(e.target.selectedIndex, e.target.value)
   updateSelectedCount()
 })


 
/* ====== Event  ====== */

container.addEventListener('click', (e) => {
  // console.log(e.target)
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    // console.log(e.target)
    e.target.classList.toggle('selected');
  }

   updateSelectedCount()
})
