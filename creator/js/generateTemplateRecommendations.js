$(document).ready(function () {
    var storageData = localStorage.getItem("NLCreatorData");
    if ( storageData !== null ) {
        var dataJSON = JSON.parse(storageData);
    }

    var html = "";

    console.log(dataJSON);

    var format = dataJSON.format;
    var digitalFormat = dataJSON.digitalFormat;

    var time = "";
    var timeType = "";

    var individualTemplates = [];

    if (format == undefined) {
        // gebe Templates für Elearning, Präsenz, Live-Online, Digital + Präsenz und Blended-Learning
        time = dataJSON.time.time;
        timeType = dataJSON.time.type;
        individualTemplates = [
            // {
            //     "id": 0,
            //     "templateType": "elearning",
            //     "templateTitle": "E-Learning",
            //     "time": time,
            //     "timeType": timeType
            // },
            {
                "id": 1,
                "templateType": "presence-seminar",
                "templateTitle": "Präsenz",
                "time": time,
                "timeType": timeType
            },
            {
                "id": 2,
                "templateType": "live-seminar",
                "templateTitle": "Live-Online-Event",
                "time": time,
                "timeType": timeType
            }
        ]
    } else if (format == "presence") {
        // gebe Template für Präsenz
        time = dataJSON.timePresence.time;
        timeType = dataJSON.timePresence.type;
        individualTemplates = [
            {
                "id": 0,
                "templateType": "presence-seminar",
                "templateTitle": "Präsenz",
                "time": time,
                "timeType": timeType
            }
        ]
    } else if (format == "digital") {
        // gebe Template für Live-Online ODER für Elearning
        time = dataJSON.timeDigital.time;
        timeType = dataJSON.timeDigital.type;
        var templateTitle = "";
        var templateType = "";
        if (digitalFormat == undefined || digitalFormat == "live-online") {
            templateTitle = "Live-Online-Event";
            templateType = "live-seminar";
        } else {
            templateTitle = "E-Learning";
            templateType = "elearning";
        }
        individualTemplates = [
            {
                "id": 0,
                "templateType": templateType,
                "templateTitle": templateTitle,
                "time": time,
                "timeType": timeType
            }
        ]
    } else if (format == "digital-presence") {
        // gebe Template für Live-Online + Präsenz ODER für Blended-Learning
        if (dataJSON.timePresence.type == "days") {
            dataJSON.timePresence.time = dataJSON.timePresence.time * 8;
        }
        if (dataJSON.timeDigital.type == "days") {
            dataJSON.timeDigital.time = dataJSON.timeDigital.time * 8;
        }

        // time = dataJSON.timePresence.time + dataJSON.timeDigital.time;
        timePresence = dataJSON.timePresence.time;
        timeDigital = dataJSON.timeDigital.time;
        timeType = "hours";

        var templateTitle = "";
        var templateType = "";
        if (digitalFormat == undefined || digitalFormat == "live-online") {
            templateTitle = "Präsenz + Live-Online-Event";
            templateType = "presence-live-seminar";
        } else {
            templateTitle = "Blended-Learning";
            templateType = "blended-learning";
        }
        individualTemplates = [
            {
                "id": 0,
                "templateType": templateType,
                "templateTitle": templateTitle,
                "time": [
                    {
                        "timePresence": timePresence,
                        "timeDigital": timeDigital,
                    }
                ],
                "timeType": timeType
            }
        ]
    }


    if (digitalFormat == undefined || digitalFormat == "live-online") {
        var isEvent = true;
    } else {
        var isEvent = false;
    }

    
    for (i = 0; i < individualTemplates.length; i++) {
        var formatTitle = individualTemplates[i].templateTitle;
        var templateType = individualTemplates[i].templateType;
        var time = individualTemplates[i].time;
        if (Array.isArray(time)) {
            for (var j = 0; j < time.length; j++) {
                var timePresence = time[j].timePresence;
                var timeDigital = time[j].timeDigital;
                time = timePresence + timeDigital;
                timePresence = timePresence / 8;
                timeDigital = timeDigital / 8;
            }
        }

        var timeType = individualTemplates[i].timeType;
        if (timeType == "hours") {
            var timeTypeName = "Stunde(n)";
        } else if (timeType == "days") {
            var timeTypeName = "Tag(e)";
        }

        html += `
        <a href="structure.html?type=${templateType ? `${templateType}` : ''}" class="templateCard card highlighted" data-type="${templateType ? `${templateType}` : ''}" onclick="checkIfStructureExisting(event, this);">
            <p>${formatTitle ? `${formatTitle}` : ''}</p>
            <p class="customTemplateTime" data-timeValue="${time ? `${time}` : ''}" data-timePresenceValue="${timePresence ? `${timePresence}` : ''}" data-timeDigitalValue="${timeDigital ? `${timeDigital}` : ''}" data-timeType="${timeType ? `${timeType}` : ''}">
                <span class="customTemplateTimeValue">${time ? `${time}` : ''}</span>
                <span class="customTemplateTimeText">${timeTypeName ? `${timeTypeName}` : ''}</span>
            </p>
        </a>
        `;
    }


    $("#templateRecommendations").html(html);

});

var saveCurrentTemplate;
function checkIfStructureExisting(event, template){
    var structureExisting = false;
    var currentStorageData = localStorage.getItem("NLCreatorStructure");
    if ( currentStorageData !== null ) {
        var currentStructureJSON = JSON.parse(currentStorageData);
        console.log(currentStructureJSON);
        if (currentStructureJSON.length !== 0) {
            structureExisting = true;
        }
    } 
    console.log(structureExisting);
    if (structureExisting  === true) {
        event.preventDefault();
        saveCurrentTemplate = template;
        $("#chooseTemplate.lightboxWrapper").fadeOut(200).removeClass("active");
        $("#isStructureDataInfoBox.lightboxWrapper").fadeIn(200).addClass("active");
    } else {
        generateTemplateStructure(template);
        window.location.href = "structure.html";
    }
}

function changeTemplate() {
    $('#chooseTemplate.lightboxWrapper').find('.lightboxBackgroundMandatory').addClass('lightboxBackground').removeClass('lightboxBackgroundMandatory');
    $('#chooseTemplate.lightboxWrapper').find('.lightboxFooterMandatory').hide();
    $('#chooseTemplate.lightboxWrapper').find('.lightboxFooterClose').css('display', 'flex');
    $('#chooseTemplate.lightboxWrapper').fadeIn(200).addClass('active');
}

function redirectAndApplyTemplate() {
    var template = saveCurrentTemplate;
    generateTemplateStructure(template);
    window.location.href = "structure.html";
}

function generateTemplateStructure(template) {
    var templateType = $(template).attr("data-type");
    var templateTime = $(template).find(".customTemplateTime").attr("data-timeValue");
    var templateTimePresence = $(template).find(".customTemplateTime").attr("data-timePresenceValue");
    var templateTimeDigital = $(template).find(".customTemplateTime").attr("data-timeDigitalValue");
    // var templateTimeType = $(template).find(".customTemplateTime").attr("data-timeType");

    if ($(template).hasClass("blankTemplate")) {
        structureJSON = blankTemplate;
    }

    if (templateType == "presence-seminar" || templateType == "live-seminar") {
        structureJSON = getPresenceJSON(templateTime, templateType);
    } else if (templateType == "elearning") {
        structureJSON = getElearningJSON(templateTime, "hours");
    } else if (templateType == "presence-live-seminar") {
        presenceSeminarJSON = getPresenceJSON(templateTimePresence, "presence-seminar");
        liveSeminarJSON = getPresenceJSON(templateTimeDigital, "live-seminar");
        structureJSON = presenceSeminarJSON.concat(liveSeminarJSON);
    } else if (templateType == "blended-learning") {
        presenceSeminarJSON = getPresenceJSON(templateTimePresence, "presence-seminar");
        structureJSON = presenceSeminarJSON.concat(getElearningJSON(templateTimeDigital, "days"));
    }

    console.log(structureJSON);
    storageData = JSON.stringify(structureJSON);
    localStorage.setItem("NLCreatorStructure", storageData);

    console.log("successfully saved NLCreatorStructure to localStorage");
}

var structureIndex = 0;
function getPresenceJSON(time, type) {
    // console.log(type);
    // debugger;

    var structureArray = [];
    time = parseFloat(time);

    if (time === 0.5) {
        structureArray = $.extend(true, [], presenceHalfJSON);
    } else if (time === 1) {
        structureArray = $.extend(true, [], presenceFullJSON);
    } else if (time === 1.5) {
        structureArray = $.extend(true, [], $.merge([], presenceMultiFullStartJSON).concat(presenceMultiHalfEndJSON));
    } else if (time === 2) {
        structureArray = $.extend(true, [], $.merge([], presenceMultiFullStartJSON).concat(presenceMultiFullEndJSON));
    } else {
        var integerPart = Math.floor(time);
        var fractionalPart = time - integerPart;
        var allMiddleParts = [];
        if (fractionalPart === 0.5) {
            countMiddlePart = integerPart - 1;
            for (var i = 0; i < countMiddlePart; i++) {
                allMiddleParts = allMiddleParts.concat(presenceMultiFullMiddleJSON);
            }
            structureArray = $.extend(true, [], $.merge([], presenceMultiFullStartJSON).concat(allMiddleParts));
            structureArray = $.extend(true, [], $.merge([], structureArray).concat(presenceMultiHalfEndJSON));
        } else if (fractionalPart === 0) {
            countMiddlePart = integerPart - 2;
            for (var i = 0; i < countMiddlePart; i++) {
                allMiddleParts = allMiddleParts.concat(presenceMultiFullMiddleJSON);
            }
            structureArray = $.extend(true, [], $.merge([], presenceMultiFullStartJSON).concat(allMiddleParts));
            structureArray = $.extend(true, [], $.merge([], structureArray).concat(presenceMultiFullEndJSON));
        }
    }

    for (var i = 0; i <= structureArray.length - 1; i++) {
        // console.log(structureArray);
        structureArray[i].id = structureIndex;
        structureArray[i].type = type;
        structureIndex++;
    }

    // console.log(structureArray);
    return structureArray;
}


function getElearningJSON(time, timeType) {

    var structureArray = [];
    time = parseFloat(time);

    if (timeType == "days") {
        time = time * 8;
    }

    let elearningCount = Math.ceil(time / 2);
    for (let i = 1; i <= elearningCount; i++) {
        if (time % 2 === 1 && i === elearningCount) {
            var elearningArray = elearningJSON;
        } else {
            var elearningArray = $.extend(true, [], elearningJSON);
            for (var j = 0; j <= elearningArray.length - 1; j++) {
                singleContainer = elearningArray[j].container;
                for (var k = 0; k <= singleContainer.length - 1; k++) {
                    singleContainer[k].durationMinutes = parseFloat(singleContainer[k].durationMinutes) * 2
                }
            }
        }
        structureArray = $.extend(true, [], $.merge([], structureArray).concat(elearningArray));
    }
    
    for (var i = 0; i <= structureArray.length - 1; i++) {
        structureArray[i].id = i;
    }

    // console.log(structureArray);
    return structureArray;
}

// all JSON templates

var blankTemplate = [
]

var presenceFullJSON = [
    {
        "id": 0,
        "title": "",
        "type": "",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "motivation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "60",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 8,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 9,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 10,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 11,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 12,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 13,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 14,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "examination",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

var presenceMultiFullStartJSON = [
    {
        "id": 0,
        "title": "",
        "type": "",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "motivation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "motivation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "60",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 8,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 9,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 10,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 11,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 12,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 13,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 14,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

var presenceMultiFullMiddleJSON = [
    {
        "id": 0,
        "title": "",
        "type": "",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "60",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 8,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 9,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 10,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 11,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 12,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 13,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 14,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

var presenceMultiFullEndJSON = [
    {
        "id": 0,
        "title": "",
        "type": "",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "60",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 8,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 9,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 10,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 11,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 12,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 13,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 14,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "examination",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

var presenceHalfJSON = [
    {
        "id": 0,
        "title": "",
        "type": "",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

var presenceMultiHalfEndJSON = [
    {
        "id": 0,
        "title": "",
        "type": "",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einstiegsphase",
                "durationMinutes": "30",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "pause",
                "title": "Pause",
                "durationMinutes": "30",
                "phase": "",
                "isContentCreated": true,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Arbeitsphase",
                "durationMinutes": "30",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "base",
                "title": "Abschlussphase",
                "durationMinutes": "30",
                "phase": "examination",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

var elearningJSON = [
    {
        "id": 0,
        "title": "",
        "type": "elearning",
        "duration": "",
        "startTime": "",
        "container": [
            {
                "id": 0,
                "type": "base",
                "title": "Einführung/Motivation",
                "durationMinutes": "5",
                "phase": "introduction",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 1,
                "type": "base",
                "title": "Einführung/Motivation",
                "durationMinutes": "5",
                "phase": "motivation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 2,
                "type": "base",
                "title": "Erarbeitung/Festigung",
                "durationMinutes": "5",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 3,
                "type": "base",
                "title": "Anwendung/Transfer",
                "durationMinutes": "10",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 4,
                "type": "base",
                "title": "Erarbeitung/Festigung",
                "durationMinutes": "5",
                "phase": "elaboration",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 5,
                "type": "base",
                "title": "Anwendung/Transfer",
                "durationMinutes": "10",
                "phase": "application",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 6,
                "type": "base",
                "title": "Erarbeitung/Festigung",
                "durationMinutes": "5",
                "phase": "consolidation",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 7,
                "type": "base",
                "title": "Anwendung/Transfer",
                "durationMinutes": "10",
                "phase": "transfer",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            },
            {
                "id": 8,
                "type": "base",
                "title": "Abschluss/Prüfung",
                "durationMinutes": "5",
                "phase": "completion",
                "isContentCreated": false,
                "content": [],
                "concept": {
                    "isConceptCreated": false,
                    "learningTargetLevel": "",
                    "learningTargetLevelText": "",
                    "learningTargetFormulation": "",
                    "learningTargetVerb": "",
                    "socialForm": "",
                    "method": ""
                }
            }
        ]
    }  
]

