const api_key='';
window.onload=function() {
    set_carousel();
    set_topRated();
    
};
function set_carousel(){
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/popular?api_key='+api_key+'&language=en-US&page=1',

        success: function(trending) {
            let mov=[];
            for(let i=1;i<6;i++) {
                mov[i]=[trending.results[i-1].title, 'https://image.tmdb.org/t/p/original'+trending.results[i-1].backdrop_path, trending.results[i-1].vote_average, trending.results[i-1].id];
            }
            for(let i=1;i<6;i++) {
                document.getElementById('movie'+i).innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov[i][1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov[i][0]+'</h1><p>'+mov[i][2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov[i][3]+')">Look up</a></p></div></div>';
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}
function set_topRated(){
    $.ajax({
        type:'GET',
        url:'https://api.themoviedb.org/3/movie/top_rated?api_key='+api_key+'&language=en-US&page=1',

        success: function(trending) {
            let mov=[];
            for(let i=0;i<10;i++) {
                mov[i]=[trending.results[i].title, 'https://image.tmdb.org/t/p/original'+trending.results[i].poster_path, trending.results[i].vote_average, trending.results[i].id];
            }
            for(let i=0;i<9;i++){
                document.getElementById('top'+i).innerHTML='<img src="'+mov[i][1]+'"><div class="content"><h1>'+mov[i][0]+'</h1><h3>'+mov[i][2]+'</h3></div>';
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}
// function set_genreComedy() {
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate',

//         success: function(trending) {
//             let mov=[];
//             for(let i=0;i<10;i++) {
//                 mov[i]=[trending.results[i].title, 'https://image.tmdb.org/t/p/original'+trending.results[i].poster_path, trending.results[i].vote_average, trending.results[i].id];
//             }
//             for(let i=0;i<9;i++){
//                 document.getElementById('comedy'+i).innerHTML='<img src="'+mov[i][1]+'"><div class="content"><h1>'+mov[i][0]+'</h1><h3>'+mov[i][2]+'</h3></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
// const api_key='b57794c5b4c0edf4144e3d126855037e';
// window.onload=function() {
//     set_carousel();
//     set_topRated();
    
// };
// function set_carousel(){
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/movie/popular?api_key='+api_key+'&language=en-US&page=1',

//         success: function(trending) {
//             let mov=[];
//             for(let i=1;i<6;i++) {
//                 mov[i]=[trending.results[i-1].title, 'https://image.tmdb.org/t/p/original'+trending.results[i-1].backdrop_path, trending.results[i-1].vote_average, trending.results[i-1].id];
//             }
//             for(let i=1;i<6;i++) {
//                 document.getElementById('movie'+i).innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov[i][1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov[i][0]+'</h1><p>'+mov[i][2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov[i][3]+')">Look up</a></p></div></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
// function set_topRated(){
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/movie/top_rated?api_key='+api_key+'&language=en-US&page=1',

//         success: function(trending) {
//             let mov=[];
//             for(let i=0;i<10;i++) {
//                 mov[i]=[trending.results[i].title, 'https://image.tmdb.org/t/p/original'+trending.results[i].poster_path, trending.results[i].vote_average, trending.results[i].id];
//             }
//             for(let i=0;i<9;i++){
//                 document.getElementById('top'+i).innerHTML='<img src="'+mov[i][1]+'"><div class="content"><h1>'+mov[i][0]+'</h1><h3>'+mov[i][2]+'</h3></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
// function set_genreComedy() {
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate',

//         success: function(trending) {
//             let mov=[];
//             for(let i=0;i<10;i++) {
//                 mov[i]=[trending.results[i].title, 'https://image.tmdb.org/t/p/original'+trending.results[i].poster_path, trending.results[i].vote_average, trending.results[i].id];
//             }
//             for(let i=0;i<9;i++){
//                 document.getElementById('comedy'+i).innerHTML='<img src="'+mov[i][1]+'"><div class="content"><h1>'+mov[i][0]+'</h1><h3>'+mov[i][2]+'</h3></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
// function set_carousel(){
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/movie/popular?api_key='+api_key+'&language=en-US&page=1',

//         success: function(trending) {
//             let mov=[];
//             for(let i=1;i<6;i++) {
//                 mov[i]=[trending.results[i-1].title, 'https://image.tmdb.org/t/p/original'+trending.results[i-1].backdrop_path, trending.results[i-1].vote_average, trending.results[i-1].id];
//             }
//             for(let i=1;i<6;i++) {
//                 document.getElementById('movie'+i).innerHTML='<img class="bd-placeholder-img" width="100%" height="100%" src="'+mov[i][1]+'"><div class="container"><div class="carousel-caption" style="background-color: rgba(0,0,0,.5) !important;"><h1>'+mov[i][0]+'</h1><p>'+mov[i][2]+'</p><p><a class="btn btn-lg btn-danger" href="#target1" onclick="load_details('+mov[i][3]+')">Look up</a></p></div></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
// function set_topRated(){
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/movie/top_rated?api_key='+api_key+'&language=en-US&page=1',

//         success: function(trending) {
//             let mov=[];
//             for(let i=0;i<10;i++) {
//                 mov[i]=[trending.results[i].title, 'https://image.tmdb.org/t/p/original'+trending.results[i].poster_path, trending.results[i].vote_average, trending.results[i].id];
//             }
//             for(let i=0;i<9;i++){
//                 document.getElementById('top'+i).innerHTML='<img src="'+mov[i][1]+'"><div class="content"><h1>'+mov[i][0]+'</h1><h3>'+mov[i][2]+'</h3></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
// function set_genreComedy() {
//     $.ajax({
//         type:'GET',
//         url:'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate',

//         success: function(trending) {
//             let mov=[];
//             for(let i=0;i<10;i++) {
//                 mov[i]=[trending.results[i].title, 'https://image.tmdb.org/t/p/original'+trending.results[i].poster_path, trending.results[i].vote_average, trending.results[i].id];
//             }
//             for(let i=0;i<9;i++){
//                 document.getElementById('comedy'+i).innerHTML='<img src="'+mov[i][1]+'"><div class="content"><h1>'+mov[i][0]+'</h1><h3>'+mov[i][2]+'</h3></div>';
//             }
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }
