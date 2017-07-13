var channels = ["AmazHS", "OgamingSC2", "comster404", "CohhCarnage", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "Forsenlol"];
var offlineStreams = [];
var onlineStreams = [];
var response = [];
var getInfo = function(element){
    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + element, function(data) {
        if (data.stream){
            var logo = data.stream.channel.logo;
            var name = element;
            if (name.length > 14){
                var temp = name.split('');
                var final = '';
                for (i=0; i<12; i++){
                    final+=name[i];
                }
                final+='...';
                name = final;
            }
            var game = data.stream.channel.game;
            $('#output').append('<div class="channel"><div class="img-house"><img src="'+ logo +'" /></div><div class="name-house"><h1>'+ name +'</h1></div><div class="game-house"><h1>'+ game +'</h1></div></div>');
            onlineStreams.push({logo: logo, name: element, game: 'Online'});
            response.push({logo: logo, name: element, game: 'Online'});
        } else if (data.stream === undefined){
            var logo = 'offline.png';
            var name = element;
            if (name.length > 14){
                var temp = name.split('');
                var final = '';
                for (i=0; i<12; i++){
                    final+=name[i];
                }
                final+='...';
                name = final;
            }
            var game = "Account is closed";
            response.push({logo: logo, name: element, game: 'Account is closed'});
        } else {
            var logo = 'offline.png';
            var name = element;
            if (name.length > 14){
                var temp = name.split('');
                var final = '';
                for (i=0; i<12; i++){
                    final+=name[i];
                }
                final+='...';
                name = final;
            }
            var game = "Offline";
            $('#output').append('<div class="channel"><div class="img-house"><img src="'+ logo +'" /></div><div class="name-house"><h1>'+ name +'</h1></div><div class="game-house"><h1>'+ game +'</h1></div></div>');
            offlineStreams.push({logo: logo, name: element, game: 'Offline'});
            response.push({logo: logo, name: element, game: 'Offline'});
        }
    });
}

$(document).ready(function(){
    channels.forEach(getInfo);

    var render = function(data){
        $('#output').append('<div class="channel"><div class="img-house"><img src="'+ data.logo +'" /></div><div class="name-house"><h1>'+ data.name +'</h1></div><div class="game-house"><h1>'+ data.game +'</h1></div></div>');
    };

    $('nav ul li').on('click', function(){
        var action = $(this).attr('id');
        var array;
        if(action == 'All'){
            array = response;
        } else {
            array = (action == 'Online') ? onlineStreams : offlineStreams;
        }
        $('#output').empty();
        array.forEach(render);
    });

});