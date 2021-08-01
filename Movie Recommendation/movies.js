var counter=0;

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'https://api.themoviedb.org/3/list/7103066?api_key=cd8e56c48d290ee186d2f57c021b8b0c&language=en-US',

    success: function (json) {
      const cards = document.getElementById('cards_wrap');
      const movies = json.items;
      movies.forEach((movie, i) => {
        console.log(movie.poster_path);
        const card = `
      <div  class="card_item">
      <button id=${i} type="button" onclick=ChangeColor(${i}) class="btn btn-outline-light" >
              <div  class="card_inner" id="toggle_${i}" style="background-image: url(https://image.tmdb.org/t/p/w400${movie.poster_path}); background-repeat:no-repeat; background-size: cover;">
              </div>
              </button>
          </div>
    `;
        cards.innerHTML += card;
      })
    }
  })
});




function ChangeColor(clicked_id) {
if(counter >=5 && document.getElementById(`toggle_${clicked_id}`).style.backgroundBlendMode != 'luminosity')
{
  return;
}
else if(counter >=5 && document.getElementById(`toggle_${clicked_id}`).style.backgroundBlendMode == 'luminosity')
{

counter--;
    document.getElementById(`toggle_${clicked_id}`).style.backgroundColor = '#fff';
    document.getElementById(`toggle_${clicked_id}`).style.backgroundBlendMode='normal';
  
}
  else if (document.getElementById(`toggle_${clicked_id}`).style.backgroundBlendMode == 'luminosity') {

  counter--;
    document.getElementById(`toggle_${clicked_id}`).style.backgroundColor = '#fff';
    document.getElementById(`toggle_${clicked_id}`).style.backgroundBlendMode='normal';
  } else {

  counter++;
    document.getElementById(`toggle_${clicked_id}`).style.backgroundColor = '#626262';
    document.getElementById(`toggle_${clicked_id}`).style.backgroundBlendMode = 'luminosity';
  }
}