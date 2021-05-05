let personData;
getDatafromAPI().then(() => {
    renderData(personData);
});

function getDatafromAPI() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
            success: function (response) {
                personData = response;
                resolve();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        })
    })
}

function renderData(personData) {
    console.log(personData);
    let tableBody = $("#table-body");
    renderTableData(personData, tableBody);
}

function renderTableData(personData, tableBody) {
    personData.map((item) => {
        let tableRow = $("<tr>").addClass("data-row");
        tableBody.append(tableRow);
        let tableDataId = $("<td>").addClass("column1").text(item.id);
        tableRow.append(tableDataId);
        let tableDataFirstName = $("<td>").addClass("column2").text(item.firstName);
        tableRow.append(tableDataFirstName);
        let tableDataLastName = $("<td>").addClass("column3").text(item.lastName);
        tableRow.append(tableDataLastName);
        let tableDataEmail = $("<td>").addClass("column4").text(item.email);
        tableRow.append(tableDataEmail);
        let tableDataPhone = $("<td>").addClass("column5").text(item.phone);
        tableRow.append(tableDataPhone);
        tableRow.click(function(){
            $(".data-row").removeClass("active");
            tableRow.addClass("active");
            showDetails(item);
        })

        $("#search-box").on('keyup', function(){
            var value = $(this).val().toLowerCase();
            $(".data-row").each(function () {
                console.log($(this).text().toLowerCase().search(value));
               if ($(this).text().toLowerCase().search(value) > -1) {
                  $(this).show();
                  $(this).prev('.subjectName').last().show();
               } else {
                  $(this).hide();
               }
            });
         })
    })
}

function showDetails(item) {
    let infoContent = $("#info-content").html("");
    infoContent.append($('<div>').html("<b>User selected:</b> "+item.firstName+" "+item.lastName));
    infoContent.append($("<div>").html('<b>Description: </b>').append($('<textarea>').attr({'cols':'50','rows':'5','readonly':'true'}).text(item.description)));
    infoContent.append($('<div>').html("<b>Address:</b> "+item.address.streetAddress));
    infoContent.append($('<div>').html("<b>City:</b> "+item.address.city));
    infoContent.append($('<div>').html("<b>State:</b> "+item.address.state));
    infoContent.append($('<div>').html("<b>Zip:</b> "+item.address.zip));
}