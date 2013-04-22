$(function(){
    var container = $('.enrollments');

    var place = $('meta[name=place]').attr('content');
    var date = $('meta[name=date]').attr('content');
    $.ajax({
        url: 'http://drinkup-attendee-summary.herokuapp.com/summary?place=' + place + '&date=' + date,
        success: function(results){
            result_objs = JSON.parse(results);
            container.empty();
            $(this).load("attendee_item.html", function(response){
                var html_template = $(response);
                $.each(result_objs, function(index, result) {
                    var html = html_template.clone();
                    $(html).find(".avatar img").attr('src', result['avatar_url']);
                    $(html).find(".name").attr('href', result['html_url']);
                    $(html).find(".name").html(result['login']);
                    $.each(result['avaliable-time'], function(index, day) {
                        $(html).find(".cal-list").append('<div class="cal">' + day + '</div>');
                    });

                    $.each(result['skills-of-interest'], function(index, skill) {
                        $(html).find(".skill-list").append('<div class="skill">' + skill + '</div>');
                    });

                    container.append(html);
                });
            });
        }
    });
});