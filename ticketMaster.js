// Jared's API Key: UGD745sux3MI7Ntr5jjdABhluGgm3OoZ

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
            // TODO: Switch this to a switch case for 1) no tour dates found 2)no artist found 3) sucess.
            if (data.page.totalElements === 0) {
                $("#searchResultHeader").empty();
                $("#searchResultHeader").html('')
            }
            else {
                $("#searchResultHeader").empty();
                $("#searchResultHeader").html($(".artistSearch").val()+'\'s upcoming shows 🎤');
                
                $("#card1result1").html(data._embedded.events[0]._embedded.venues[0].city.name)
                $("#card1result2").html(data._embedded.events[0]._embedded.venues[0].name)
                $("#card1result3").html(data._embedded.events[0].dates.start.localDate)
                $("#result1").append("<button>add</button>")

                
                $("#card2result1").html(data._embedded.events[1]._embedded.venues[0].city.name)
                $("#card2result2").html(data._embedded.events[1]._embedded.venues[0].name)
                $("#card2result3").html(data._embedded.events[1].dates.start.localDate)
                $("#result2").append("<button>add</button>")

                
                $("#card3result1").html(data._embedded.events[2]._embedded.venues[0].city.name)
                $("#card3result2").html(data._embedded.events[2]._embedded.venues[0].name)
                $("#card3result3").html(data._embedded.events[2].dates.start.localDate)
                $("#result3").append("<button>add</button>")

                
                $("#card4result1").html(data._embedded.events[3]._embedded.venues[0].city.name)
                $("#card4result2").html(data._embedded.events[3]._embedded.venues[0].name)
                $("#card4result3").html(data._embedded.events[3].dates.start.localDate)
                $("#result4").append("<button>add</button>")
            }
        },
        error: function (xhr, status, err) {
        }
    });
}
