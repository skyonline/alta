var serviceURL = "http://www.alta.by/export_199/";
//var serviceURL = "data/default.json";

var catalog_list;

// Лучше вешать на пэйджшоу!
$('#entryPage').bind('pageshow', function (event) {
//Так мы получаем ай-ди, на который кликнули в списке.
    var id = $(this).jqmData('data-id');
    alert("entry for id:" + id);
});

$('#catalogPage').bind('pageshow', function (event) {
    catalog(serviceURL+'?id=160');
});

$('#productsPage').bind('pageshow', function (event) {
    catalog_products(serviceURL+'?id=161');
});

// Так как у нас не реальный сервер, то для простоты тестирования добавил два файла с выдачей. nested - это выдача, если
// кликнуть на строительство(откроется "подсписок"), остальные эдементы простые.
function catalog(url) {
    /* $.getJSON(serviceURL + '?id=160', function(data) { */
    $.getJSON(url, function (response) {
        $('#catalog li').remove();
        catalog_list = response.data.items;
        $.each(catalog_list, function (index, catalog_element) {
            if (catalog_element.id) {
                $('<li><a href="#">' +
/*            '<img src="' + catalog_element.img + '"/>' + */
            '<h4>' + catalog_element.title + '</h4>' +
            '<p>' + catalog_element.description + '</p>' +
            '<span class="ui-li-count">' + catalog_element.id + '</span></a></li>').appendTo($('#catalog')).click(function () {
            // если данный элемент не лист, то при клике на него, генерим "подсписок". 
                if (catalog_element.leaf == "1") {
                // иначе открываем энтри форму. Передаем значение айди , на который кликнули.
                    $("#entryPage").jqmData('data-id', catalog_element.id);
                    $.mobile.changePage($("#entryPage"));
                }
                else {
                // на реальном сервере все урлы будут одинаковы, только отличаться id.
                    catalog(serviceURL+'?id='+catalog_element.id)
                }
            });
            };
        });
        $('#catalog').listview('refresh');

    });
}


function catalog_products(url) {
    /* $.getJSON(serviceURL + '?id=160', function(data) { */
    $.getJSON(url, function (response) {
        $('#catalog_products li').remove();
        catalog_list = response.data.items;
        $.each(catalog_list, function (index, catalog_element) {
            if (catalog_element.id) {
                $('<li><a href="#">' +
            '<h4>' + catalog_element.title + '</h4>' +
            '<p>' + catalog_element.description + '</p>' +
            '<span class="ui-li-count">' + catalog_element.id + '</span></a></li>').appendTo($('#catalog_products')).click(function () {
            // если данный элемент не лист, то при клике на него, генерим "подсписок". 
                if (catalog_element.leaf == "1") {
                // иначе открываем энтри форму. Передаем значение айди , на который кликнули.
                    $("#entryPage").jqmData('data-id', catalog_element.id);
                    $.mobile.changePage($("#entryPage"));
                }
                else {
                // на реальном сервере все урлы будут одинаковы, только отличаться id.
                    catalog_products(serviceURL+'?id='+catalog_element.id)
                }
            });
            };
        });
        $('#catalog_products').listview('refresh');

    });
}
