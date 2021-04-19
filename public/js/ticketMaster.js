// Jared's API Key: UGD745sux3MI7Ntr5jjdABhluGgm3OoZ

const searchResultCard1 = '<div class="three columns result-card" id="searchResultCard1"><p id="card1result1"></p><p id="card1result2"></p><p id="card1result3"></p></div>'
// const searchResultCard2 = '<div class="three columns result-card" id="searchResultCard2"><p id="card2result1"></p><p id="card2result2"></p><p id="card2result3"></p></div>'
// const searchResultCard3 = '<div class="three columns result-card" id="searchResultCard3"><p id="card3result1"></p><p id="card3result2"></p><p id="card3result3"></p></div>'
// const searchResultCard4 = '<div class="three columns result-card" id="searchResultCard4"><p id="card4result1"></p><p id="card4result2"></p><p id="card4result3"></p></div>'

// .searchBtn Event Listener
$('.searchBtn').on('click', function () {
    // Grabbing the value from .artistSearch search bar
    const artistName = $(".artistSearch").val();
    //Passing artistName into searchBtn function
    searchBtn(artistName);
})

const searchBtn = (artistName) => {
    // Concatinating url with aristName for API call
    const url = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistName.replaceAll(" ", "+") + "&countryCode=US&apikey=UGD745sux3MI7Ntr5jjdABhluGgm3OoZ"
    console.log(url)
    $.ajax({
        type: "GET",
        url: url,
        async: true,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.page.totalElements === 0) {
                // $("#searchResultHeader").empty();
                // $("#searchResultHeader").html('')
            }
            else {
                //     $("#searchResultHeader").empty();
                //     $("#searchResultHeader").html($(".artistSearch").val()+'\'s upcoming shows 🎤');
                $("#searchResultRow").empty();
                $('#homeCard').append('<div class="row" id="searchResultRow"></div>');

                const tourInfo = data._embedded.events;

                for (let i = 0; i < tourInfo.length; i++) {
                    console.log(i)
                    const results = tourInfo[i];
                    console.log(results)
                    let searchResultCard = $('<div class="three columns result-card"></div')
                    let cityTag = $('<p class="city"></p>')
                    let venueTag = $('<p class="venue"></p>')
                    let dateTag = $('<p class="date"></p>')
                    $(cityTag).text(results._embedded.venues[0].city.name)
                    $(venueTag).text(results._embedded.venues[0].name)
                    $(dateTag).text(results.dates.start.localDate)
                    $(searchResultCard).append(cityTag, venueTag, dateTag)
                    $(searchResultCard).append('<button class="button-primary jared-button">GOING 🤘</button>')
                    $('#searchResultRow').append(searchResultCard);
                }

                // $('#searchResultRow').append(searchResultCard1, searchResultCard2, searchResultCard3, searchResultCard4)

                // $("#card1result1").html(data._embedded.events[0]._embedded.venues[0].city.name)
                // $("#card1result2").html(data._embedded.events[0]._embedded.venues[0].name)
                // $("#card1result3").html(data._embedded.events[0].dates.start.localDate)
                // $("#searchResultCard1").append('<button id="jared-button" class="button-primary">GOING 🤘</button>')


                // $("#card2result1").html(data._embedded.events[1]._embedded.venues[0].city.name)
                // $("#card2result2").html(data._embedded.events[1]._embedded.venues[0].name)
                // $("#card2result3").html(data._embedded.events[1].dates.start.localDate)
                // $("#searchResultCard2").append('<button id="jared-button" class="button-primary">GOING 🤘</button>')


                // $("#card3result1").html(data._embedded.events[2]._embedded.venues[0].city.name)
                // $("#card3result2").html(data._embedded.events[2]._embedded.venues[0].name)
                // $("#card3result3").html(data._embedded.events[2].dates.start.localDate)
                // $("#searchResultCard3").append('<button id="jared-button" class="button-primary">GOING 🤘</button>')


                // $("#card4result1").html(data._embedded.events[3]._embedded.venues[0].city.name)
                // $("#card4result2").html(data._embedded.events[3]._embedded.venues[0].name)
                // $("#card4result3").html(data._embedded.events[3].dates.start.localDate)
                // $("#searchResultCard4").append('<button id="jared-button" class="button-primary">GOING 🤘</button>')

                $('#homeCard').append('<br>', '<br>', '<br>')

            }
        },
        error: function (xhr, status, err) {
        }
    });
}
