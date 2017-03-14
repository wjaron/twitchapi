/**
 * Created by wjaron on 14.03.17.
 */

var streamersArr = ["ESL_SC2", "OgamingSC2", "freecodecamp", "brunofin"];
var link = "https://wind-bow.gomix.me/twitch-api/streams/";
var link2 = "https://wind-bow.gomix.me/twitch-api/channels/";
var number = 1;

$(document).ready(function() {
    streamersArr.forEach(function (streamer) {
        $.getJSON(link + streamer + '?callback=?', function (data) {
            var info,
                status;
            if (data.stream === null) {
                info = "Offline";
                status = "offline";
            } else if (data.stream === undefined) {
                info = "Account Closed";
                status = "offline";
            } else {
                info = data.stream.game;
                status = "online";
            }
            ;
            $.getJSON(link2 + streamer + '?callback=?', function (data) {
                var logo = data.logo != null ? data.logo : "nopic.png",
                    name = data.display_name != null ? data.display_name : streamer,
                    description = status === "online" ? ': ' + data.status : info;


                $('tbody').append('<tr><td class="number">' + number + '.</td><td class="logo"><img class="pic" src="' + logo + '"/></td><td class="name"><a href="https://www.twitch.tv/' + name + '" target="_blank">' + name + '</a></td><td class="status">' + description + '</td></tr>');
                number++;
            })
        })
    });
});