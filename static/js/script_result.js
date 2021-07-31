const api_key='';
$(document).ready(function() {
    let title=document.getElementById('searchBar').placeholder;
    if(title.length>0) {
        let titleCleaned=title.replace(/\s/g,'+');
        get_mId(titleCleaned);
    }
    else {
        console.log('title too short');
    }
});
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
