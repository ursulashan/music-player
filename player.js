var currentSongEl;
var songUrl
var playedPercent;
var currentSong;
var originalTitle;

$(function(){
  console.log('Loading elements.');

  $('body').append('<audio id="player"></audio>');
  $('.playlist li').append('<span class="playbar"></span>').append('<span class="status"></span>');

  originalTitle = $('title').text();

  /* On click/play */
  $('.playlist li').click(function(){
    play(this);    
  });

  /* Percentage */
  $('#player').bind('timeupdate', function(){
    playedPercent = ($(this).get(0).currentTime / $(this).get(0).duration) * 100;
    $(currentSongEl).find('.playbar').css('width', playedPercent + '%');
  });

  /* On error */
  $('#player').bind('error', function(){
    $(currentSongEl).addClass('error');
    next();
  });

  /* On end */
  $('#player').bind('ended', function(){
    next();
  });
});


function play(el) {
  console.log('"' + $(el).find('.title').text() + '"', 'clicked. :)');

  if (!$(el).hasClass('playing')) {
    console.log('Play');

    clearStatus(currentSongEl);
    currentSongEl = el;
    songUrl = $(el).attr('data-src');

    //currentSong = $(el).find('.title').text() + ' by ' + (el).find('.artist').text();
    //document.title = currentSong + ' | ' + originalTitle;

    $(el).addClass('playing');
    $('#player').attr('src', songUrl).get(0).play();
  } else {
    if ($(el).hasClass('paused')) {
      $(el).removeClass('paused');
      $('#player').get(0).play();
    } else {
      $(el).addClass('paused');
      $('#player').get(0).pause();
    }
  }
}


function next() {
  clearStatus(currentSongEl);
  play($(currentSongEl).next());

  $(currentSongEl).find('.playbar').css('width', playedPercent + '%');
}


function clearStatus(el) {
  if (el !== null) {
    console.log('"' + $(el).find('.title').text() + '"', 'finished. D:');

    $(el).removeClass('playing').removeClass('paused').find('.playbar').css('width', '0');
  }
}