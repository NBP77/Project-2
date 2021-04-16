// KEY: UGD745sux3MI7Ntr5jjdABhluGgm3OoZ

// Go Button Event Listener
$('.searchBtn').on('click', function () {
    // Grabbing the value from .searchedCity input
    const artistName = $(".artistSearch").val();
    //Retrieving weather - current and forecast for the city 
    searchBtn(artistName);
})

const searchBtn = (artistName) => {
    const url = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistName.replaceAll(" ", "+") + "&countryCode=US&apikey=UGD745sux3MI7Ntr5jjdABhluGgm3OoZ"
    console.log(url)
    $.ajax({
        type: "GET",
        url: url,
        async: true,
        dataType: "json",
        success: function (data) {
            console.log(data);
            // Parse the response.
            if( data.page.totalElements === 0){
                $("#searchResultHeader").html('This artist has no upcoming tour dates 😫')
            }
            else{
            $("#result1").html(data._embedded.events[0].dates.start.localDate)
            $("#result2").html(data._embedded.events[0]._embedded.venues[0].city.name)
            $("#result3").html(data._embedded.events[0]._embedded.venues[0].name)
            }






            
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}
