const api_key='b57794c5b4c0edf4144e3d126855037e';
$(document).ready(function() {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/popular?api_key='+api_key+'&language=en-US&page=1',

        success: function(trending) {
            let mov1=[trending.results[0].title, 'https://image.tmdb.org/t/p/original'+trending.results[0].backdrop_path, trending.results[0].overview, trending.results[0].id];
            let mov2=[trending.results[1].title, 'https://image.tmdb.org/t/p/original'+trending.results[1].backdrop_path, trending.results[1].overview, trending.results[1].id];
            let mov3=[trending.results[2].title, 'https://image.tmdb.org/t/p/original'+trending.results[2].backdrop_path, trending.results[2].overview, trending.results[2].id];
            let mov4=[trending.results[3].title, 'https://image.tmdb.org/t/p/original'+trending.results[3].backdrop_path, trending.results[3].overview, trending.results[3].id];
            let mov5=[trending.results[4].title, 'https://image.tmdb.org/t/p/original'+trending.results[4].backdrop_path, trending.results[4].overview, trending.results[4].id];
            set_carousel(mov1, mov2, mov3, mov4, mov5);
        },
        error: function(err) {
            console.log(err);
        }
    });
});
function set_carousel(mov1, mov2, mov3, mov4, mov5){
    document.getElementById('movie1').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov1[1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov1[0]+'</h1><p>'+mov1[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov1[3]+')">Look up</a></p></div></div>';
    document.getElementById('movie2').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov2[1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov2[0]+'</h1><p>'+mov2[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov2[3]+')">Look up</a></p></div></div>';
    document.getElementById('movie3').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov3[1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov3[0]+'</h1><p>'+mov3[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov3[3]+')">Look up</a></p></div></div>';
    document.getElementById('movie4').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov4[1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov4[0]+'</h1><p>'+mov4[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov4[3]+')">Look up</a></p></div></div>';
    document.getElementById('movie5').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov5[1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov5[0]+'</h1><p>'+mov5[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov5[3]+')">Look up</a></p></div></div>';
}
