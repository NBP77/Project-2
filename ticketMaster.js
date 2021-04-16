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
            if( data.page.totalElements === 0){
                $("##searchResultHeader").empty();
                $("#searchResultHeader").html('This artist has no upcoming tour dates 😫')
            }
            else{
            $("#result1").html(data._embedded.events[0].dates.start.localDate)
            $("#result2").html(data._embedded.events[0]._embedded.venues[0].city.name)
            $("#result3").html(data._embedded.events[0]._embedded.venues[0].name)
            }
        },
        error: function (xhr, status, err) {
        }
    });
}
