var db = new PouchDB('http://127.0.0.1:5984/mydatabase');

var seriesArr = [];
var seriesArr2 = [];
var docs = [];
var resp;
var rolesObj = [];
var updateResponse;




function getAllDocs(database) {
    database.allDocs({
            include_docs: true,
            attachments: true
        },
        function (err, response) {
            if (err) {
                return console.log(err);

            } else resp = response;
        });

}

function updateOld() {

    $('.roleselector').each(function () {
        var oldvalue = $(this).val();
        $(this).data('oldValue', oldvalue);
        console.log('bobo');

    });

}


$(document).ready(function () {

    //   $('body').on('focus click', '.roleselector', function () {

    //       var stopped = false;
    //      console.log('CLICK function fired');
    //       if (!stopped){




    $('body').on('change', '.roleselector', function () {
        //    var transfer = $(this).val();
        //     console.log('CHANGE function fired');



        checkCollisions(this, 'role');
        console.log('momo');


    });
    //                    }
    //   });

    /*
    $('.roleselector').each(function() {
    //Store old value
    $(this).data('lastValue', $(this).val());
});

*/
    $('#roleupdater').on({
        "click": function () {
            $('#roleupdater').tooltip({
                items: "#roleupdater",
                content: "Updated!"
            });
            $('#roleupdater').tooltip("open");

        },
        "mouseout": function () {
            if ($(this).data('ui-tooltip')) {
                $(this).tooltip("disable");
            }

        }
    });


    $('body').on('change', '#meetingstart', function () {

        console.log($('#meetingstart').val());
        var validator = RegExp('^1[0-9]-[0-5][0-9]$');
        if (!validator.test($('#meetingstart').val())) {
            alert('Time is incorrect, please fill it again');
            $('#meetingstart').val('');
        } //else if()

        checkAllinputs();
    });


    $('body').on('change', '#meetingend', function () {

        console.log($('#meetingend').val());
        var validator = RegExp('^1[0-9]-[0-5][0-9]$');
        if (!validator.test($('#meetingend').val())) {
            alert('Time is incorrect, please fill it again');
            $('#meetingend').val('');
        }
        checkAllinputs();
    });


    $('body').on('change', '#meetingperson', function () {

        checkAllinputs();

    });





    var specArray = [null, "Vyacheslav Zakharenkov", "Vladimir Vasilyev", "Valeriya Lyameborshay", "Tatyana Pokhodyaeva", "Sergey Alexeev", "Pavel S Alexandrov", "Pavel Chilimov", "Owner Default", "Nikita Trushnikov", "Mikhail Kotyukov", "Mikhail Balashov", "Dmitry Minin", "Alexey Vokhmanov", "Alexey Kozlov", "Alexey Golovlev"]



    /*
        for (i in specArray) {

            var temp = {
                name: specArray[i],
                //          value: resolvedTickets
                value: (Math.floor(Math.random() * 130) + 4)
            };

            var temp2 = {
                name: specArray[i],
                value: (Math.floor(Math.random() * 25) + 1)
            };


            seriesArr.push(temp);
            seriesArr2.push(temp2);


        }
    */




    db.allDocs({
            include_docs: true,
            attachments: true
        },
        function (err, response) {
            if (err) {
                return console.log(err);
            }

            //          $('.roleselector').on('change');


            console.log(response);

            resp = response;

            var lunchtime = ["12-30", "13-15", "14-00", "14-45", "15-30", "16-15", "17-00"];

            for (i in lunchtime) {

                var div = $('<div/>').addClass('lunchrecord').appendTo('#lunches'),
                    div2 = $('<div/>').addClass('time').text(lunchtime[i]).appendTo(div),
                    select = $('<select/>').addClass('lunchselector').attr('id', lunchtime[i] + '_1').appendTo(div),
                    disabledOption = $('<option/>')
                    .text('<Choose a person>')
                    .prop('selected', true)
                    .prop('disabled', true)
                    .prop('value', true)
                    .appendTo(select),
                    select2 = $('<select/>').addClass('lunchselector').attr('id', lunchtime[i] + '_2').appendTo(div),
                    disabledOption2 = $('<option/>')
                    .text('<Choose a person>')
                    .prop('selected', true)
                    .prop('disabled', true)
                    .prop('value', true)
                    .appendTo(select2);
                for (j in response.rows) {

                    //                    console.log(response.rows[j].doc._id);
                    //                    console.log(lunchtime[i]);
                    //                    console.log(response.rows[j].doc.lunch);
                    //                    console.log(lunchtime[i] == response.rows[j].doc.lunch);

                    if (lunchtime[i] == response.rows[j].doc.lunch) {

                        console.log(response.rows[j].doc._id);


                        var selectorString = '#' + lunchtime[i] + '_1 option:selected',
                            selectorString2 = '#' + lunchtime[i] + '_2 option:selected';;

                        if ($(selectorString).text() == '<Choose a person>') {


                            //     ('#' + lunchtime[i] + '_1 option:selected').prop('selected',false);
                            var option = $('<option/>').val(response.rows[j].doc._id).text(response.rows[j].doc._id).prop('selected', true).appendTo(select);


                        } else if ($(selectorString2).text() == '<Choose a person>') {


                            var option2 = $('<option/>').text(response.rows[j].doc._id).val(response.rows[j].doc._id).appendTo(select2).prop('selected', true);
                        }


                    } else {
                        var option = $('<option/>').text(response.rows[j].doc._id).val(response.rows[j].doc._id).appendTo(select),
                            option2 = $('<option/>').text(response.rows[j].doc._id).val(response.rows[j].doc._id).appendTo(select2);
                    }
                }

            }


            for (i in response.rows) {

                //    console.log((response.rows[i].doc.issupervisor).toString());
                if (response.rows[i].doc.issupervisor != true) {
                    var temp = {
                        name: response.rows[i].id,
                        //          value: resolvedTickets
                        value: (Math.floor(Math.random() * 130) + 4)
                    };

                    var temp2 = {
                        name: response.rows[i].id,
                        value: (Math.floor(Math.random() * 25) + 1)
                    };


                    seriesArr.push(temp);
                    seriesArr2.push(temp2);
                }

                var selectOptions = $('<select/>').addClass('roleselector').attr('id', response.rows[i].id)
                    .append('<option value="Analyst">Analyst</option>')
                    .append('<option value="Dispatcher">Dispatcher</option>')
                    .append('<option value="Backup">Backup</option>')
                    .append('<option value="1500">1500</option>')
                    .append('<option value="1500 Backup">1500 Backup</option>')
                    .append('<option value="Advocate">Advocate</option>')
                    .append('<option value="OOO">OOO</option>')
                    .append('<option value="Study">Study</option>');

                var role = 'option:contains("' + response.rows[i].doc.role + '")';

                //selectOptions.find(role).attr("selected", true);
                selectOptions.val(response.rows[i].doc.role);
                //    $(elementChanged).val(oldValue);

                var div = $('<div/>').addClass('employee').appendTo('#usercontainer'),
                    div2 = $('<div/>').addClass('username').text(response.rows[i].id).appendTo(div);




                //   console.log(i + selectOptions.toString());
                div.append(selectOptions);
                //  selector = $('<>')






            }
            var graphdef = {
                categories: ['Assigned', 'Resloved'],
                dataset: {
                    'Assigned': seriesArr2,
                    'Resloved': seriesArr
                },


            }
            var config = {
                dimension: {
                    width: 600,
                    height: 400
                },
                margin: {
                    left: 150
                },
                meta: {
                    caption: 'ДАННЫЕ ПОКА ЧТО ГЕНЕРЯТСЯ РАНДОМНО',
                },
                caption: {
                    fontfamily: '"Tahoma"'
                }
            }


            var chart = uv.chart('StackedBar', graphdef, config);


            updateOld();


            //
            //
            //Function to add meetings from database
            //

            var fillableSelector = $('<select/>').addClass('meetingselector').attr('id', 'meetingperson');

            var placeholderOption = $('<option/>')
                .text('<Choose a person>')
                .prop('selected', true)
                .prop('disabled', true)
                .prop('value', '<Choose a person>')
                .appendTo(fillableSelector);
            for (k in response.rows) {

                var option = $('<option/>').val(response.rows[k].doc._id).text(response.rows[k].doc._id).appendTo(fillableSelector);

            }

            var fillablediv = $('<div/>')
                .addClass('meetingrecord').attr('id', 'fillablemeeting')
                .appendTo('#meetings'),
                fillableinput = $('<input/>').addClass('meetingtime start').attr('id', 'meetingstart').attr('type', 'text').attr('pattern', '^1[0-9]-[0-5][0-9]$')

                .appendTo(fillablediv),
                fillableinput2 = $('<input/>').addClass('meetingtime end').attr('id', 'meetingend').attr('type', 'text').attr('pattern', '^1[0-9]-[0-5][0-9]$')

                .appendTo(fillablediv);



            fillableSelector.appendTo(fillablediv);
            $('<button/>').addClass('meetingcreator').text('Add').attr('onClick', addRemoveMeeting).appendTo(fillablediv);



            for (i in response.rows) {

                if (response.rows[i].doc.meetings.length != 0) {
                    //    console.log(response.rows[i].doc.meetings);


                    var meetingSelector = $('<select/>').addClass('meetingselector');

                    for (k in response.rows) {

                        var option = $('<option/>').val(response.rows[k].doc._id).text(response.rows[k].doc._id).appendTo(meetingSelector);


                    }




                    for (j in response.rows[i].doc.meetings) {

                        var div = $('<div/>')
                            .addClass('meetingrecord')
                            .appendTo('#meetings'),
                            input = $('<span/>').addClass('meetingtime')
                            .text(convertTime(response.rows[i].doc.meetings[j].start) + ' - ')
                            .appendTo(div),
                            input2 = $('<span/>').addClass('meetingtime')
                            .text(convertTime(response.rows[i].doc.meetings[j].end))
                            .appendTo(div);
                        meetingSelector.val(response.rows[i].doc._id).appendTo(div).attr('disabled', true);

                        var removeButton = $('<button/>').addClass('meetingcreator').text('Remove').attr('onClick', addRemoveMeeting).appendTo(div);




                        console.log(response.rows[i].doc._id + ' Start:' + response.rows[i].doc.meetings[j].start);
                        var b = convertTime(response.rows[i].doc.meetings[j].end);

                        console.log('here is date' + b);

                    }


                    /*
                                    var div = $('<div/>').addClass('lunchrecord').appendTo('#lunches'),
                                        div2 = $('<div/>').addClass('time').text(lunchtime[i]).appendTo(div),
                                        select = $('<select/>').addClass('lunchselector').attr('id', lunchtime[i] + '_1').appendTo(div),
                                        disabledOption = $('<option/>')
                                        .text('<Choose a person>')
                                        .prop('selected', true)
                                        .prop('disabled', true)
                                        .prop('value', true)
                                        .appendTo(select),*/
                }



            }


            $('#fillablemeeting .meetingtime').timepicker({
                timeFormat: 'H-i',
                minTime: '10:00am',
                maxTime: '6:30pm',
                step: 10,
                //   useSelect:true

            });

            /*

                        $('#fillablemeeting').datepair({
                            'anchor': $('#meetingstart').val()



                        });

                        $('#meetingstart').on('change', function () {
                            $('#fillablemeeting').option('anchor', $('#meetingstart').val());
                        });
            */


            var anchorExampleEl = document.getElementById('fillablemeeting');
            var anchorDatepair = new Datepair(anchorExampleEl, {
                anchor: 'start',
                timeClass: 'meetingtime',
                defaultTimeDelta: 1800000
            });

            /*            $('#meetingstart').on('change', function () {
                            anchorDatepair.option('anchor', $('#meetingstart').val());
                        });*/





        }); //Getting and displaying all documents



    //  updateRoles();
    /*
        $('.meetingtime').timepicker({
            timeFormat: 'H-i',
            minTime: '10:00am',
            maxTime: '6:30pm',
            step: 10,
            //   useSelect:true

        });*/







});


function checkAllinputs() {



    if ($('#meetingend').val() == $('#meetingstart').val()) {
        alert('Incorrect time!');
        $('#meetingend').val('');
        $('#meetingend').toggleClass('redborder');
        setTimeout(function () {
            $('#meetingend').toggleClass('redborder');
            $('#meetingend').toggleClass('noborder');
        }, 2000)
        //  $( "#meetingend" ).tooltip( "option", "content", "Awesome title!" );
        /*        $('#meetingend').tooltip({
                    items: "#meetingend",
                    content: "error!"
                });
                $('#meetingend').tooltip("open");*/

        /*        setTimeout(function () {
                    $('#meetingend').tooltip('hide');
                }, 2000);*/




        //  return false;
    } else if (($('#meetingend').val() != '' &&
            $('#meetingstart').val() != '') &&
        (($('#meetingperson').find('option:selected').text() != '<Choose a person>'))) {

        console.log('All set!');


    }
}

function convertTime(timeString) {

    if ((typeof timeString) == 'string') {

        var timeArr = timeString.split('-');

        var t = new Date();

        t.setHours(timeArr[0], timeArr[1], 0, 0);

        return t;

    } else if ((typeof timeString) == 'number') {

        var tempDate = new Date(timeString);

        var tempMinuites = tempDate.getMinutes(),
            tempHours = tempDate.getHours();

        if (tempHours < 10) tempHours = '0' + tempHours;
        if (tempMinuites < 10) tempMinuites = '0' + tempMinuites;


        var t = tempHours + '-' + tempMinuites;

        return t;

    }


}

function addRemoveMeeting(action) {

    var testStart = $('#meetingstart').val();
    var testEnd = $('#meetingstart').val();


    //  if()



}


function updateRoles() {

    db.allDocs({
            include_docs: true,
            attachments: true
        },
        function (err, response) {
            if (err) {
                return console.log(err);
            }
            updateResponse = response;

            $(".roleselector").each(function () {
                //     alert($(this).attr("name"));
                //    alert($(this).attr('id') + " " + $(this).children("option:selected").text());//.each(function () {

                var tempObj = {
                    _id: "",
                    role: ""
                };
                tempObj._id = $(this).attr('id');
                tempObj.role = $(this).children("option:selected").text();

                rolesObj.push(tempObj);








                //   });
            });


            for (var i = 0; i < updateResponse.rows.length; i++) {

                for (var j = 0; j < rolesObj.length; j++) {


                    console.log(i + ":" + j);

                    if (rolesObj[j]._id == updateResponse.rows[i].doc._id) {

                        console.log("----");
                        console.log(i + ":" + j);
                        console.log(rolesObj[j]._id == updateResponse.rows[i].doc._id);
                        console.log("rolesObj: " + rolesObj[j]._id);
                        console.log("updateResponse: " + updateResponse.rows[i].doc._id);
                        console.log(rolesObj[j]._id == updateResponse.rows[i].doc._id);
                        console.log("----");


                        var toAdd = updateResponse.rows[i].doc;

                        toAdd.role = rolesObj[j].role;

                        docs.push(toAdd);
                        /*
                            {
                                "_id": "Alexey Kozlov",
                                "_rev": "7-647c36dbec61a87ddb8c0cefc14aa606",
                                "role": "Analyst",
                                "lunch": "",
                                "meetings": {},
                                "issupervisor": false
                            }
                    
                            */

                    }

                }


            }

            db.bulkDocs(docs);




        });




    getAllDocs(db);



}


function checkCollisions(elementChanged, menuType, oldData) {

    if (menuType == 'role') {

        var existingRoles = [];

        var selected = $(elementChanged).find('option:selected').text();

        var rolesArr = ['Dispatcher', 'Backup', '1500', '1500 Backup', 'Advocate'];

        $('.roleselector').each(function () { //Get all existing roles, but not the changed one

            if ($(elementChanged).attr('id') != $(this).attr('id')) existingRoles.push($(this).find("option:selected").text());

        });



        if (($.inArray(selected, rolesArr) != -1) && ($.inArray(selected, existingRoles) != -1)) {
            console.log($(elementChanged).attr('id'));
            alert('Role already taken!');

            var oldValue = $(elementChanged).data('oldValue');

            $(elementChanged).val(oldValue);

        }

    }
    updateOld();


}




function testAllData() {

    var currentRoles = [];
    $('.roleselector').each(function () {
        var tempSpec = {};
        tempSpec.meetings = [];
        console.log($(this).attr('id'));
        tempSpec.employee = $(this).attr('id');
        tempSpec.role = $(this).find('option:selected').text();

        currentRoles.push(tempSpec);


    });

    $('.lunchselector').each(function () {

        for (i in currentRoles) {

            if ($(this).find('option:selected').text() == currentRoles[i].employee) {

                currentRoles[i].lunch = $(this).attr('id').split('_')[0];
            }

        }


    });

    $('.meetingselector').each(function () {

        for (i in currentRoles) {
            var j = 0;

            if ($(this).find('option:selected').text() == currentRoles[i].employee) {

                currentRoles[i].meetings[j] = {
                    start: '',
                    end: ''
                }
                currentRoles[i].meetings[j].start = $(this).prev().prev().text().split(' ')[0];
                currentRoles[i].meetings[j].end = $(this).prev().text();
            }

        }


    });

    return currentRoles;
}


function updateLunches() {

}




db.info().then(function (info) {
    console.log(info);
})




/* DB POPULATION
var specArray = ["Vyacheslav Zakharenkov", "Vladimir Vasilyev", "Valeriya Lyameborshay", "Tatyana Pokhodyaeva", "Sergey Alexeev", "Pavel S Alexandrov", "Pavel Chilimov", "Owner Default", "Nikita Trushnikov", "Mikhail Kotyukov", "Mikhail Balashov", "Dmitry Minin", "Alexey Vokhmanov", "Alexey Kozlov", "Alexey Golovlev"]
for (var i=0;i< specArray.length; i++) {

    var index = "id" + (i+1);
    console.log(index);
    var doc = {
        "_id": specArray[i],
        "role": "Analyst",
		"lunch": "",
		"meetings":{},		
		"issupervisor": false,
		 
    };
    db.put(doc);
*/
