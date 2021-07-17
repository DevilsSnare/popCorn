const api_key='b57794c5b4c0edf4144e3d126855037e';
$(document).ready(function() {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/popular?api_key='+api_key+'&language=en-US&page=1',

        success: function(trending) {
            let mov1=[trending.results[0].title, 'https://image.tmdb.org/t/p/original'+trending.results[0].backdrop_path, trending.results[0].overview, trending.results[0].id];
            let mov2=[trending.results[1].title, 'https://image.tmdb.org/t/p/original'+trending.results[1].backdrop_path, trending.results[1].overview, trending.results[1].id];
            let mov3=[trending.results[2].title, 'https://image.tmdb.org/t/p/original'+trending.results[2].backdrop_path, trending.results[2].overview, trending.results[2].id];
            set_carousel(mov1, mov2, mov3);
        },
        error: function(err) {
            console.log(err);
        }
    });
});
function set_carousel(mov1, mov2, mov3){
    document.getElementById('movie1').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov1[1]+'"><div class="container"><div class="carousel-caption"><h1>'+mov1[0]+'</h1><p>'+mov1[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov1[3]+')">Look up</a></p></div></div>';
    document.getElementById('movie2').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov2[1]+'"><div class="container"><div class="carousel-caption"><h1>'+mov2[0]+'</h1><p>'+mov2[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov2[3]+')">Look up</a></p></div></div>';
    document.getElementById('movie3').innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov3[1]+'"><div class="container"><div class="carousel-caption"><h1>'+mov3[0]+'</h1><p>'+mov3[2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov3[3]+')">Look up</a></p></div></div>';
}



let input = document.getElementById('searchBar');
let button = document.getElementById('searchButton');
button.addEventListener('click', readyTitle);

function readyTitle() {
    let title=document.getElementById('searchBar').value;
    if(title.length>0) {
        let titleCleaned=title.replace(/\s/g,'+')
        get_mId(titleCleaned)
    }
    else {
        console.log('title too short')
    }
}

function get_mId(title) {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+title,

        success: function(movie){
            let mId = movie.results[0].id;
            console.log('Movie Id:'+mId)
            load_details(mId);
        },
        error: function(error) {
            console.log(error);
            console.log('error occured!');
        }
    });
}

function load_details(mId) {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/'+mId+'?api_key='+api_key,

        success: function(movie) {
            let name=movie.original_title;
            let lang=movie.original_language;
            let overview=movie.overview;
            let date=movie.release_date;
            let runtime=movie.runtime;
            let tagline=movie.tagline;
            display_details(name, lang, date, tagline, runtime, overview, mId);
            load_images(mId);
        }
    });
}
function load_images(mId) {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/'+mId+'/images?api_key='+api_key ,
        success: function(images) {
            let poster='https://image.tmdb.org/t/p/w300'+images.posters[0].file_path;
            let backdrop='https://image.tmdb.org/t/p/original'+images.backdrops[0].file_path;
            console.log(poster);
            console.log(backdrop);
            document.getElementById('poster').innerHTML='<img src="'+poster+'">';
        },
        error: function(err) {
            console.log(err);
        }
    })
    
}

function display_details(name, lang, date, tagline, runtime, overview, mId) {
    document.getElementById('mainMov').innerHTML='<div class="col-lg-6 col-md-8 mx-auto"><p class="lead text-muted" id="poster"></p></div><div class="col-lg-6 col-md-8 mx-auto" style="text-align: start;"><h1 class="fw-light" id="mName">'+name+'</h1><p class="lead text-muted"><p>Language:'+lang+'</p><p>Release Date: '+date+'</p><p>Tagline: '+tagline+'</p><p>Runtime: '+runtime+'</p><p>Overview: '+overview+'</p></p><p><a href="#target2" class="btn btn-danger my-2" onclick="recomSim('+mId+')">Recommend Similar Movies</a></p></div>';
    // document.getElementById('movieName').innerHTML=name;
    // document.getElementById('movieDetails').style.textAlign='left';
    // document.getElementById('movieDetails').style.paddingLeft='10px';
    // document.getElementById('movieDetails').innerHTML='<p>Language: '+lang+'</p><p>Release Date: '+date+'</p><p>Tagline: '+tagline+'</p><p>Runtime: '+runtime+'</p><p>Overview: '+overview+'</p>';
    // document.getElementById('recommendButton').innerHTML='<a href="#" class="btn btn-danger my-2" id="set">Recommend Similar Movies</a>';
}

function recomSim(mId) {
    $.ajax({
        // type:'GET',
        // url:'https://api.themoviedb.org/3/movie/'+mId+'/similar?api_key='+api_key+'&language=en-US&page=1',
        
        // success: function(similar) {
        //     let mov1=[similar.results[0].title, 'https://image.tmdb.org/t/p/original'+similar.results[0].backdrop_path, similar.results[0].vote_average, similar.results[0].id];
        //     let mov2=[similar.results[1].title, 'https://image.tmdb.org/t/p/original'+similar.results[1].backdrop_path, similar.results[1].vote_average, similar.results[1].id];
        //     let mov3=[similar.results[2].title, 'https://image.tmdb.org/t/p/original'+similar.results[2].backdrop_path, similar.results[2].vote_average, similar.results[2].id];
        //     let mov4=[similar.results[3].title, 'https://image.tmdb.org/t/p/original'+similar.results[3].backdrop_path, similar.results[3].vote_average, similar.results[3].id];
        //     let mov5=[similar.results[4].title, 'https://image.tmdb.org/t/p/original'+similar.results[4].backdrop_path, similar.results[4].vote_average, similar.results[4].id];
        //     let mov6=[similar.results[5].title, 'https://image.tmdb.org/t/p/original'+similar.results[5].backdrop_path, similar.results[5].vote_average, similar.results[5].id];
        //     setRecom(mov1, mov2, mov3, mov4, mov5, mov6);
        // },
        // error: function(err) {
        //     console.log(err);
        // }
        url: '/recommend',
        type: 'POST',
        dataType: 'json',
        data: document.getElementById('mName').value,

        success: function(result) {
            console.log(result);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function setRecom(mov1, mov2, mov3, mov4, mov5, mov6) {
    document.getElementById('sim1').innerHTML='<div class="card shadow-sm"><img src="'+mov1[1]+'"><div class="card-body"><p class="card-text">'+mov1[0]+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+mov1[2]+'</small></div></div></div>';
    document.getElementById('sim2').innerHTML='<div class="card shadow-sm"><img src="'+mov2[1]+'"><div class="card-body"><p class="card-text">'+mov2[0]+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+mov2[2]+'</small></div></div></div>';
    document.getElementById('sim3').innerHTML='<div class="card shadow-sm"><img src="'+mov3[1]+'"><div class="card-body"><p class="card-text">'+mov3[0]+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+mov3[2]+'</small></div></div></div>';
    document.getElementById('sim4').innerHTML='<div class="card shadow-sm"><img src="'+mov4[1]+'"><div class="card-body"><p class="card-text">'+mov4[0]+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+mov4[2]+'</small></div></div></div>';
    document.getElementById('sim5').innerHTML='<div class="card shadow-sm"><img src="'+mov5[1]+'"><div class="card-body"><p class="card-text">'+mov5[0]+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+mov5[2]+'</small></div></div></div>';
    document.getElementById('sim6').innerHTML='<div class="card shadow-sm"><img src="'+mov6[1]+'"><div class="card-body"><p class="card-text">'+mov6[0]+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+mov6[2]+'</small></div></div></div>';
}