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
            recomSim(name);
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
    document.getElementById('mainMov').innerHTML='<div class="col-lg-6 col-md-8 mx-auto"><p class="lead text-muted" id="poster"></p></div><div class="col-lg-6 col-md-8 mx-auto" style="text-align: start;   padding-top: 4%"><h1 class="fw-light" id="mName" style="font-size: 50px;">'+name+'</h1><p class="lead text-muted"><p>Language:'+lang+'</p><p>Release Date: '+date+'</p><p>Tagline: '+tagline+'</p><p>Runtime: '+runtime+' minutes</p><p>Overview: '+overview+'</p></p></div>';
}

function recomSim(mName) {
    $.ajax({
        type: 'POST',
        url: '/recommend',
        data: {'name': mName},
        success: function(result) {
            let sim=JSON.parse(result);
            for(let i=0;i<6;i++) {
                get_info(i+1, sim[i]);
            }
            
            console.log('success!');
        },
        error: function(err) {
            console.log(err);
        },
    });
}

function get_info(i, name) {
    let title=name.replace(/\s/g,'+')
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+title,

        success: function(movie){
            let mId = movie.results[0].id;
            console.log('Movie Id:'+mId);
            get_info_1(i, mId);
        },
        error: function(error) {
            console.log(error);
            console.log('error occured!');
        }
    });
}
function get_info_1(i, mId) {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/'+mId+'?api_key='+api_key,

        success: function(movie) {
            let name=movie.original_title;
            let vote=movie.vote_average;
            get_info_2(i, name, vote, mId);
        },
        error: function(err) {
            console.log(err);
        }
    });
}
function get_info_2(i, name, vote, mId) {
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/'+mId+'/images?api_key='+api_key ,
        success: function(images) {
            let backdrop='https://image.tmdb.org/t/p/original'+images.backdrops[0].file_path;
            setRecom(i, name, vote, backdrop);
        },
        error: function(err) {
            console.log(err);
        }
    })
}
function setRecom(i , name, vote, backdrop) {
    document.getElementById('sim'+i).innerHTML='<div class="card shadow-sm"><img src="'+backdrop+'"><div class="card-body"><p class="card-text">'+name+'</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">Add to Watchlist</button></div><small class="text-muted">'+vote+'</small></div></div></div>';
    
}
