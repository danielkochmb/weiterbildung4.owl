/* main script file for whole creator */

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

var type = findGetParameter("type");



$(document).ready(function () {

    // reload data page on local storage update
    window.addEventListener('storage', (event) => {
        if (event.key === 'NLCreatorData' || event.key === 'NLCreatorComments') {
            location.reload();
        }
    });

    // initialize every slider
    $(".slider").each(function () {
        //sliderValue(this);
    });

    var storageData = localStorage.getItem("NLCreatorData");
    if (storageData !== null) {
        var dataJSON = JSON.parse(storageData);
        var savedSliderMinValue = parseInt(dataJSON["userPerEvent"]["min"]); 
        var savedSliderMaxValue = parseInt(dataJSON["userPerEvent"]["max"]); 
    } else {
        var savedSliderMinValue = 40; 
        var savedSliderMaxValue = 60; 
    }
    $(".rangeSliderUI").slider({
        range: true,
        min: 0,
        max: 100,
        values: [savedSliderMinValue, savedSliderMaxValue],
        slide: function(event, ui) {
            $(".dataUserPerEventMin").val(ui.values[0]);
            $(".dataUserPerEventMax").val(ui.values[1]);
            saveData();
        }
    });


    // info button
    $("body").on("click", ".infotextButton", function (event) {
        event.preventDefault();
        var dataInfotext = $(this).attr("data-infotext");
        var title = jsonInfotexts[dataInfotext]["title"];
        var text = jsonInfotexts[dataInfotext]["text"];
        $(".infotextHeadline").text(title);
        $(".infotextText").html(text);
        $(".infotextWrapper").fadeIn(200).addClass("active");
    });

    $("body").on("click", ".infotextBackground", function () {
        $(".infotextWrapper").fadeOut(200).removeClass("active");
    });

    $("body").on("click", ".infotextClose", function () {
        $(".infotextWrapper").fadeOut(200).removeClass("active");
    });


    // content see comments
    $("body").on("click", ".contentCard .contentCardCommentIcon", function () {
        $(".contentCommentWrapper, .contentLightboxCommentOverlay").addClass("active");
        $(".contentCommentWrapper .contentCardTitle").text($(this).siblings(".contentCardTitle").text());
        contentCardId = $(this).parents(".contentCard").attr("data-id");
        $(".contentCommentWrapper").attr("data-id", contentCardId);
        contentCardType = $(this).parents(".contentCard").attr("data-type");
        $(".contentCommentWrapper").attr("data-type", contentCardType);
        $(".contentCommentWrapper .contentCard").toggleClass("bigContentCard", contentCardType === "big");
        loadContentComments(contentCardId);
    });

    $("body").on("click", ".contentLightboxCommentOverlay, .closeContentCommentWrapper", function () {
        $(".contentLightboxCommentOverlay, .contentCommentWrapper").removeClass("active");
    });


    // content send comment
    // Event-Handler für Änderungen im textarea
    $("body").on("input", "#contentWriteCommentID", function () {
        var getComment = $("#contentWriteCommentID").val(); // Den Wert des textarea erhalten
        if ($(".errorEmptyComment").hasClass("active") && getComment !== null) {
            $(".errorEmptyComment").fadeOut(200).removeClass("active");
        }
    });

    // Event-Handler für den Button-Klick Absenden
    $("body").on("click", "button.contentSendComment", function () {
        var getComment = $("#contentWriteCommentID").val(); // Den Wert des textarea erhalten

        var getId = $(".contentCommentWrapper").attr("data-id");

        var getIndex = $(".contentComment").length;

        var today = new Date();
        var date = ('0' + today.getDate()).slice(-2) + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + today.getFullYear(); // Aktuelles Datum im Format DD.MM.YYYY
        var time = today.getHours() + ":" + today.getMinutes().toString().padStart(2, '0') + ' Uhr'; // Aktuelle Uhrzeit im Format HH:MM Uhr
        var getDateWithTime = date + ', ' + time; // Aktuelles Datum und Uhrzeit erhalten

        var getUsername = "Test User"; // Aktuellen Usernamen erhalten

        var newComment = '<div class="contentComment" data-index="' + getIndex + '"><div class="contentCommentData"><div class="contentCommentUserName">' + getUsername + '</div><div class="contentCommentDate">' + getDateWithTime + '</div></div><div class="contentCommentText">' + getComment + '<button type="button" title="Löschen" class="contentCommentButton contentCommentDelete smallPadding"><span class="dooIconContainer dooContainerName-trash userIcon"><i class="dooIcon dooIcon-trash dooIconSize-16"></i></span></button></div></div>';

        if (getComment.trim() === "") {
            // Überprüfen, ob textarea leer ist (nach Entfernen von Leerzeichen)
            $(".errorEmptyComment").fadeIn(200).addClass("active"); // Fehlermeldung anzeigen
        } else {
            $(".errorEmptyComment").fadeOut(200).removeClass("active"); // Fehlermeldung ausblenden, falls sichtbar
            $(newComment).insertAfter(".allContentComments h3"); // Kommentar ganz oben einfügen
            $("#contentWriteCommentID").val(""); // textarea leeren
            saveContentComment(getId, getDateWithTime, getComment);
            countContentComments(getId);
        }
    });


    // content delete comment
    $("body").on("click", "button.contentCommentButton.contentCommentDelete", function () {
        var thisCommentId = $(".contentCommentWrapper").attr("data-id");
        var thisCommentIndex = $(this).parents(".contentComment").attr("data-index");
        $(this).parents(".contentComment").remove();
        countContentComments(thisCommentId);
        deleteOneContentComment(thisCommentId, thisCommentIndex); 
    });

    // content create new content card on enter
    // $(".structureCardContentInner .contentCardTitle").on("keydown", function(event) {
    //     debugger;
    //     if (event.which === 13) {
    //         event.preventDefault(); 
    //         var nextAddSmallContentCard = $(this).parents(".structureCardContentInner").siblings(".addSmallContentCard");
    //         addSmallContentCard(nextAddSmallContentCard);
    //     }
    // });
    // $(".structureCardContentInner").on("keydown", ".contentCardTitle", function(event) {
    //     if (event.which === 13) {
    //         event.preventDefault(); 
    //         var nextAddSmallContentCard = $(this).parents(".structureCardContentInner").siblings(".addSmallContentCard");
    //         addSmallContentCard(nextAddSmallContentCard);
    //     }
    // });
    // $(".contentCardWrapper").on("keydown", ".contentCardTitle", function(event) {
    //     if (event.which === 13) {
    //         event.preventDefault(); 
    //         var nextAddSmallContentCard = $(this).parents(".bigContentCard").siblings(".addSmallContentCard");
    //         addSmallContentCard(nextAddSmallContentCard);
    //     }
    // });



    // template
    //// select duration
    // $("body").on("click", ".templateCard", function () {
    //     $(".templateLightboxWrapper, .templateLightboxOverlay").addClass("active");

    //     var digitalEvent = $(this).attr("data-digitalEvent");
    //     var presenceEvent = $(this).attr("data-presenceEvent");
    //     if (digitalEvent === "true") {
    //         $(".digitalEvent").addClass('active');
    //         $(".digitalEvent").removeClass('inactive');
    //     } else {
    //         $(".digitalEvent").addClass('inactive');
    //         $(".digitalEvent").removeClass('active');
    //     }
    //     if (presenceEvent === "true") {
    //         $(".presenceEvent").addClass('active');
    //         $(".presenceEvent").removeClass('inactive');
    //     } else {
    //         $(".presenceEvent").addClass('inactive');
    //         $(".presenceEvent").removeClass('active');
    //     }

    //     // Zeit von Empfehlungen auslesen und ins input schreiben
    //     var customTemplateTimeValue = parseInt($(this).find(".customTemplateTime").attr("data-customtemplatetimevalue"));
    //     $(".customTimeInput").val(customTemplateTimeValue);

    //     var customTemplateTimeText = $(this).find(".customTemplateTime").attr("data-customtemplatetimetext");
    //     if (customTemplateTimeText === "days") {
    //         $(".buttonEnd").addClass("active");
    //         $(".buttonStart").removeClass("active");
    //     } else if (customTemplateTimeText === "hours") {
    //         $(".buttonEnd").removeClass("active");
    //         $(".buttonStart").addClass("active");
    //     } else if (customTemplateTimeText === "") {
    //         $(".buttonStart").addClass("active");
    //         $(".buttonEnd").removeClass("active");
    //     }
    // });

    // $("body").on("click", ".templateLightboxOverlay, .closeTemplateLightboxWrapper", function () {
    //     $(".templateLightboxOverlay, .templateLightboxWrapper").removeClass("active");
    // });



    // analysis


    $("#toolcheckInfoBox.lightboxWrapper").fadeIn(200).addClass("active");


    // specific chart functions
    // if (typeof Chart !== "undefined") {
    //     ////// evaluation methods
    //     var chartColorInstructionalDiscussion = $(":root").css("--chartColorInstructionalDiscussion");
    //     var chhartColorDiscussion = $(":root").css("--chhartColorDiscussion");
    //     var chartColorTasks = $(":root").css("--chartColorTasks");
    //     var chartColorDemonstration = $(":root").css("--chartColorDemonstration");

    //     isCreatedoughnutChart('evaluationMethods',
    //         {
    //             labels: ['Lehrgespräch', 'Diskussion', 'Aufgaben', 'Demonstration'],
    //             values: [50, 15, 25, 10]
    //         },
    //         [
    //             chartColorInstructionalDiscussion,
    //             chhartColorDiscussion,
    //             chartColorTasks,
    //             chartColorDemonstration
    //         ]
    //     );

    //     ////// evaluation learning objectives
    //     var chartColorLearningObjectiveLevel1 = $(":root").css("--chartColorLearningObjectiveLevel1");
    //     var chartColorLearningObjectiveLevel2 = $(":root").css("--chartColorLearningObjectiveLevel2");
    //     var chartColorLearningObjectiveLevel3 = $(":root").css("--chartColorLearningObjectiveLevel3");
    //     var chartColorLearningObjectiveLevel4 = $(":root").css("--chartColorLearningObjectiveLevel4");

    //     isCreatedoughnutChart('evaluationLearningObjectives',
    //         {
    //             //labels: ['Lernzielstufe 1: Wissen & imitierend handeln', 'Lernzielstufe 2: Verstehen & schematisch handeln', 'Lernzielstufe 3: Anwenden & fachgerecht handeln', 'Lernzielstufe 4: Analysieren & kontextabhängig handeln'],
    //             labels: ['Lernzielstufe 1', 'Lernzielstufe 2', 'Lernzielstufe 3', 'Lernzielstufe 4'],
    //             values: [42, 12, 20, 26]
    //         },
    //         [
    //             chartColorLearningObjectiveLevel1,
    //             chartColorLearningObjectiveLevel2,
    //             chartColorLearningObjectiveLevel3,
    //             chartColorLearningObjectiveLevel4
    //         ]
    //     );

    //     ////// evaluation social form
    //     var chartColorPlenum = $(":root").css("--chartColorPlenum");
    //     var chartColorGroup = $(":root").css("--chartColorGroup");
    //     var chartColorPartner = $(":root").css("--chartColorPartner");

    //     isCreatedoughnutChart('evaluationSocialForm',
    //         {
    //             labels: ['Plenum', 'group', 'Partner'],
    //             values: [55, 25, 20]
    //         },
    //         [
    //             chartColorPlenum,
    //             chartColorGroup,
    //             chartColorPartner
    //         ]
    //     );

    // }

    // //// download canvas
    // $(".downloadButton").click(function () {
    //     var canvas = $(this).parents(".chartContainer").find("canvas")[0];
    //     var filename = $(this).closest(".cardTitleWrapper").children(".cardTitle").text();

    //     download(canvas, filename);
    // });


    // offer
    //// Anzahl an Wörter im textarea begrenzen
    $("#offerShortDescription").on("input", function () {
        var wordCount = $("#offerShortDescription").val().trim().split(/\s+/).length; // Anzahl der Wörter im textarea erhalten
        var remainingWords = 301 - wordCount;

        // Begrenze die Anzahl der Wörter auf maximal 300
        if (remainingWords < 0) {
            var words = $("#offerShortDescription").val().trim().split(/\s+/).slice(0, 300);
            $("#offerShortDescription").val(words.join(" "));
            remainingWords = 0;
        } else if (remainingWords === 0) {
            $("#wordCount").addClass("wordCountNull");
        } else if (remainingWords > 0) {
            $("#wordCount").removeClass("wordCountNull");
        }

        $("#wordCount").text("Verbleibende Wörter: " + remainingWords);
    });

    //// custom input file name
    $('input[type="file"]').change(function (e) {

        var fileName = e.target.files[0].name;
        var inputLabel = $(this).next("label");
        var inputSpan = inputLabel.find("span");

        if (this.files && this.files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else if (e.target.value) {
            fileName = e.target.value.split('\\').pop();
        }
        inputSpan.html(fileName);
        inputSpan.removeClass("fileUploadPlaceholder");
    });

    $('input[type="file"]').on('focus', function () { $('input[type="file"]').addClass('has-focus'); })
    $('input[type="file"]').on('blur', function () { $('input[type="file"]').removeClass('has-focus'); });

    prefillOfferForm();

    // conclusion
    createBubbles();


    // summary
    $("body").on('click', '#summaryPDFDownload', function() {
        // Druckbefehl ausführen
        window.print();

        // Konvertiere HTML zu PDF
        // html2pdf($("body"));
    });


    // in each tab -> listen for changes to localStorage
    window.addEventListener('storage', function(event) {
        if (event.key === 'reloadAllTabs' && event.newValue === 'true') {
            window.location.reload();
        }
    });

    
}); // document ready end


// show data reset lightbox
function deleteAllData() {
    $("#deleteAllData.lightboxWrapper").fadeIn(200).addClass("active");
}

// reset creator
function resetCreator() {
    clearData();
    clearContent();
    clearStructure();
    clearContentComments();
    window.location.reload();
    localStorage.setItem('reloadAllTabs', 'true');
    setTimeout(function() {
        localStorage.removeItem('reloadAllTabs');
    }, 100);
}

// clear localStorage for content
function clearContent() {
    localStorage.removeItem('NLCreatorContent');
}

// clear localStorage for content comments
function clearContentComments() {
    localStorage.removeItem('NLCreatorComments');
}

// clear localStorage for data
function clearData() {
    localStorage.removeItem('NLCreatorData');
}

// clear localStorage for structure
function clearStructure() {
    localStorage.removeItem('NLCreatorStructure');
}

// clear localStorage for offer
function clearOffer() {
    localStorage.removeItem('NLCreatorOffer');
}



/**
 * data functions
 */
function addTextInputList(element, level, text, verb) {
    if (level == undefined) {
        // generate empty
        $(element).parents('.textInputBoxPlaceholder').before('<div class="textInputBox entry-to-delete noLevel dataLearningTargetRow"><div class="conceptRow conceptLearningTargetLevel empty selectLearningTargetLevelButton"><div class="conceptRowLightbox" style="display: none;"><div class="conceptRowLightboxBackground"></div><div class="conceptRowLightboxContent"><div class="card"><div class="conceptRowLightboxInner thinScrollbar"><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="1">Stufe 1: <span class="copy">Wissen &amp; imitierend handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel1">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="2">Stufe 2: <span class="copy">Verstehen &amp; schematisch handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel2">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="3">Stufe 3: <span class="copy">Anwenden &amp; fachgerecht handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel3">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="4">Stufe 4: <span class="copy">Analysieren &amp; kontextabhängig handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel4">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="5">Stufe 5: <span class="copy">Evaluieren &amp; variabel handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel5">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="6">Stufe 6: <span class="copy">Erschaffen</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel6">?</button></div></div></div></div></div><button class="conceptButton"><span class="newText">Lernzielstufe auswählen</span><span class="conceptText"><span class="conceptTitle"></span></span><span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon"><i class="dooIcon dooIcon-pencil dooIconSize-16"></i></span></button></div><p class="textInputTitle">Die Teilnehmenden können</p><input name="dataLearningTargetText" class="input dataLearningTargetText" autocomplete="off" placeholder="Text eingeben..."></input><div class="dropdownContainer"><select class="dropdown smallDropdown dataLearningTargetVerb" name="dataLearningTargetVerb" onchange="changeDropdownStatus(this);"><option value="" disabled selected hidden>Verb auswählen...</option></select><div class="inputListItemArrow"><span class="dooIconContainer dooContainerName-arrow-down"><i class="dooIcon dooIcon-arrow-down dooIconSize-20"></i></span></div></div><div class="deleteEntryButtonContainer" title="Löschen" onclick="deleteEntry(this);"><button class="deleteEntryButton smallPadding"><span class="dooIconContainer dooContainerName-trash"><i class="dooIcon dooIcon-trash dooIconSize-16"></i></span></button></div></div>');
    } else {
        // generate from JSON
        $(element).parents('.textInputBoxPlaceholder').before('<div class="textInputBox entry-to-delete dataLearningTargetRow" data-level="'+level+'"><div class="conceptRow conceptLearningTargetLevel selectLearningTargetLevelButton" data-level="'+level+'"><div class="conceptRowLightbox" style="display: none;"><div class="conceptRowLightboxBackground"></div><div class="conceptRowLightboxContent"><div class="card"><div class="conceptRowLightboxInner thinScrollbar"><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="1">Stufe 1: <span class="copy">Wissen &amp; imitierend handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel1">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="2">Stufe 2: <span class="copy">Verstehen &amp; schematisch handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel2">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="3">Stufe 3: <span class="copy">Anwenden &amp; fachgerecht handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel3">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="4">Stufe 4: <span class="copy">Analysieren &amp; kontextabhängig handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel4">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="5">Stufe 5: <span class="copy">Evaluieren &amp; variabel handeln</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel5">?</button></div><div class="hasInfoButton"><a href="#" class="conceptRowLightboxLink learningTargetLevelLink learningTargetLevelLinkData" data-level="6">Stufe 6: <span class="copy">Erschaffen</span></a><button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel6">?</button></div></div></div></div></div><button class="conceptButton"><span class="newText">Lernzielstufe auswählen</span><span class="conceptText"><span class="conceptTitle">Stufe '+level+'</span></span><span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon"><i class="dooIcon dooIcon-pencil dooIconSize-16"></i></span></button></div><p class="textInputTitle">Die Teilnehmenden können</p><input name="dataLearningTargetText" class="input dataLearningTargetText" autocomplete="off" placeholder="Text eingeben..." value="'+text+'"></input><div class="dropdownContainer"><select class="dropdown smallDropdown dataLearningTargetVerb active" name="dataLearningTargetVerb" onchange="changeDropdownStatus(this);"><option value="'+verb+'" selected>'+verb+'</option></select><div class="inputListItemArrow"><span class="dooIconContainer dooContainerName-arrow-down"><i class="dooIcon dooIcon-arrow-down dooIconSize-20"></i></span></div></div><div class="deleteEntryButtonContainer" title="Löschen" onclick="deleteEntry(this);"><button class="deleteEntryButton smallPadding"><span class="dooIconContainer dooContainerName-trash"><i class="dooIcon dooIcon-trash dooIconSize-16"></i></span></button></div></div>');
    }
    if ($(element).parents('.multipleTextInputWrapper').find('.textInputBox:not(.textInputBoxPlaceholder)').length == 5) {
        $(element).parents('.textInputBoxPlaceholder').hide();
    } else {
        $(element).parents('.textInputBoxPlaceholder').show();
    }
    updateDeleteStatus(element);
}

function updateDeleteStatus(element) {
    if ($(element).parents('.multipleTextInputWrapper').find('.textInputBox:not(.textInputBoxPlaceholder)').length > 1) {
        $(element).parents('.multipleTextInputWrapper').find('.entry-to-delete').removeClass('delete-stop');
    } else {
        $(element).parents('.multipleTextInputWrapper').find('.entry-to-delete').addClass('delete-stop');
    }
}

function changeDropdownStatus(element) {
    $(element).find('option').removeClass('active');
    $(element).addClass('active');
}

function deleteEntry(element) {
    $(element).parents('.textInputBox').siblings('.textInputBoxPlaceholder').show();
    $(element).parents('.entry-to-delete').remove();
    updateDeleteStatus('.textInputBox');

}

// function changeTargetLevelVerb(element, level) {
//     // console.log($(dataLearningTargetRow).find(".dataLearningTargetVerb option:first-child"));
//     $(element).siblings('.dropdownContainer').find('.dataLearningTargetVerb').text("Verb "+ level +" auswählen...");
// }

function multipleButtonActive(element) {
    if ($(element).hasClass("active")) {
        if ($(element).parents(".multipleButton").hasClass('alwaysActive')) {
            // set switch button always active
            $(element).addClass("active");
        } else {
            $(element).parents(".multipleButton").find(".singleMultipleButton").removeClass("active");
        }
        if ($(element).attr("data-format") != undefined) {
            $(element).parents(".inputWrapper").siblings(".additionalQuestionDigitalFormat").slideUp();
            $(".additionalQuestionTimePresence").slideUp();
            $(".additionalQuestionTimeDigital").slideUp();
            $(".additionalQuestionTimeDefault").slideDown();
        }
    } else {
        if ($(element).parents(".multipleButton").hasClass("multipleButtonResponse")) {
            if ($(element).hasClass('multipleButtonResponsePresenceDigital')) {
                $(element).parents(".inputWrapper").siblings(".additionalQuestionDigitalFormat").slideDown();
                $(".additionalQuestionTimePresence").slideDown();
                $(".additionalQuestionTimeDigital").slideDown();
                $(".additionalQuestionTimeDefault").slideUp();
            } else if ($(element).hasClass('multipleButtonResponsePresence')) {
                $(".additionalQuestionTimePresence").slideDown();
                $(element).parents(".inputWrapper").siblings(".additionalQuestionDigitalFormat").slideUp();
                $(".additionalQuestionTimeDigital").slideUp();
                $(".additionalQuestionTimeDefault").slideUp();
            } else if ($(element).hasClass('multipleButtonResponseDigital')) {
                $(".additionalQuestionTimeDigital").slideDown();
                $(element).parents(".inputWrapper").siblings(".additionalQuestionDigitalFormat").slideDown();
                $(".additionalQuestionTimePresence").slideUp();
                $(".additionalQuestionTimeDefault").slideUp();
            } else {
                $(element).parents(".inputWrapper").siblings(".additionalQuestionDigitalFormat").slideUp();
                $(".additionalQuestionTimePresence").slideUp();
                $(".additionalQuestionTimeDigital").slideUp();
                $(".additionalQuestionTimeDefault").slideDown();
            }
        }
        $(element).parents(".multipleButton").find(".singleMultipleButton").removeClass("active");
        $(element).addClass("active");
    }
}

// give slider value output to input field
function sliderValue(element) {
    var sliderValue = $(element).val();
    var output = $(element).parents(".rangeContainer").siblings(".hourDayContainer").find(".sliderInput");
    output.val(sliderValue);
}

// give input field output to slider value
function outputValue(element) {
    var outputValue = $(element).val();
    var slider = $(element).parents(".hourDayContainer").siblings(".rangeContainer").find(".slider");
    slider.val(outputValue);
    sliderLabel(slider);
}

function outputRangeValue(element) {
    var minValue = parseInt($(element).parents(".sliderInputContainer").find(".dataUserPerEventMin").val());
    var maxValue = parseInt($(element).parents(".sliderInputContainer").find(".dataUserPerEventMax").val());
    if (maxValue < minValue) {
        maxValue = minValue + 1
        $(element).parents(".sliderInputContainer").find(".dataUserPerEventMax").val(maxValue);
    }
    $(".rangeSliderUI").slider("values", [minValue, maxValue]);
}

// slider label function
function sliderLabel(element) {
    var sliderValue = $(element).val();
    var sliderWidth = $(element).width();
    var min = parseInt($(element).attr('min'));
    var max = parseInt($(element).attr('max'));
    var newPosition = (sliderValue - min) * (sliderWidth - 27) / (max - min);

    $(element).next('.sliderLabel').text(sliderValue);
    $(element).next('.sliderLabel').css('left', newPosition + 'px');
}

// changes slider range on button choice
function multipleButtonSliderRange(element) {
    var thisSlider = $(element).parents(".hourDayContainer").siblings(".rangeContainer").find(".slider");
    if ($(element).hasClass("sliderConfig1")) {
        thisSlider.attr("max", "16");
        thisSlider.attr("value", "8");
        thisSlider.attr("step", "0.5");
    } else {
        thisSlider.attr("max", "32");
        thisSlider.attr("value", "16");
        thisSlider.attr("step", "1");
    }
    sliderValue(thisSlider);
    sliderLabel(thisSlider);
}

// change slider type to hours or days
function multipleButtonSliderType(element) {
    var thisType = $(element).attr("data-digitalFormat");
    if (thisType == "elearning") {
        loadSliderType("hours");
    } else {
        loadSliderType("days");
    }
}

// check if slider input has illegal values and change it
function validateSliderInput(element) {
    element.value = element.value.replace(/[^0-9]/g, '0');
    if (element.value === '') {
        element.value = 0;
    }
}



/**
 * template functions
 */
function outputTemplateTime(element) {
    // var customTemplateTimeValue = parseInt($(this).find(".customTemplateTimeValue").text());
    // $(".customTimeInput").val(customTemplateTimeValue);

    // var customTemplateTimeText = $(this).find(".customTemplateTimeText").text();
    // if (customTemplateTimeText === "Tage") {
    //     $(".buttonEnd").addClass("active");
    //     $(".buttonStart").removeClass("active");
    // }

    // var thisTemplateTimeValue = $(element).parents('.templateTimeSwitchContainer').find('.customTimeInput').val();
    // var thisTemplateTimeText = $(element).parents(".hourDayContainer").find(".singleMultipleButton.active").text();

    // var thisTemplateTimeText = $(element).text();
    // console.log(thisTemplateTimeText);
    // console.log(thisTemplateTimeValue);
    // if (thisTemplateTimeValue === "") {
    //     thisTemplateTimeValue = 1;
    //     $(element).parents('.templateTimeSwitchContainer').find('.customTimeInput').val(1)
    // }
    // $(element).parents('.templateCard').find('.customTemplateTimeValue').text(thisTemplateTimeValue);
    // $(element).parents('.templateCard').find('.customTemplateTimeText').text(thisTemplateTimeText);
}




/**
 * offer functions
 */
function toggleCheckboxes(element) {
    console.log("toggleCheckboxes wird ausgeführt")
    var radioButton = $(element).parents(".radioList").find(".activateHiddenCheckboxes");

    if (radioButton.is(':checked')) {
        $(element).siblings(".hiddenCheckboxes").slideDown("slow");
    } else {
        $(element).siblings(".hiddenCheckboxes").slideUp("slow");
    }
}

function toggleMoreInformation(element) {
    console.log("toggleMoreInformation wird ausgeführt")
    var activateMoreInformation = $(element).find('input[type="checkbox"], input[type="radio"]');
    var moreInformation = $(element).next('.moreInformation');

    if (activateMoreInformation.is(':checked')) {
        moreInformation.slideDown("slow");
    } else {
        moreInformation.slideUp("slow");
    }
}

// proof delete status utility & agenda
function updateDeleteStatusOffer(element) {
    if ($(element).parents(".inputWrapper").find(".inputListItem").length > 1) {
        $(element).parents(".inputWrapper").find(".entry-to-delete").removeClass("delete-stop");
    } else {
        $(element).parents(".inputWrapper").find(".entry-to-delete").addClass("delete-stop");
    }
}

// proof delete status tutor
function updateDeleteStatusOfferTutor(element) {
    if ($(element).parents(".inputWrapper").find(".textInputBoxTutor").length > 1) {
        $(element).parents(".inputWrapper").find(".entry-to-delete").removeClass("delete-stop");
    } else {
        $(element).parents(".inputWrapper").find(".entry-to-delete").addClass("delete-stop");
    }
}

// add input list item
function addInputList(element) {
    var inputListPlaceholder = $(element).siblings(".inputList").find(".textarea").attr("placeholder");
    var inputListName = $(element).siblings(".inputList").find(".textarea").attr("name");
    var maxInputListItem = $(element).siblings(".inputList").attr("data-maxInputListItem");
    var lengthInputListItemCancelFirstChild = $(element).parents(".inputWrapper").find(".inputList").find(".inputListItem:first-child").find(".inputListItemCancel").length

    $(element).parents(".inputWrapper").find(".inputList").find(".inputListItem:last-child").after('<li class="inputListItem entry-to-delete"><textarea name="' + inputListName + '" class="textarea" autocomplete="off" placeholder=" ' + inputListPlaceholder + ' "></textarea><div class="inputListItemCancel"><i class="iconCancel" onclick="removeInputList(this);"  onkeydown="removeInputListOnKey(this);" tabindex="0"></i></div></li>');

    if ($(element).parents(".inputWrapper").find(".inputListItem").length >= 2 && lengthInputListItemCancelFirstChild < 1) {
        $(element).parents(".inputWrapper").find(".inputList").find(".inputListItem:first-child").find(".textarea").after('<div class="inputListItemCancel"><i class="iconCancel" onclick="removeInputList(this);"  onkeydown="removeInputListOnKey(this);" tabindex="0"></i></div>');
    }

    if ($(element).parents(".inputWrapper").find(".inputListItem").length >= maxInputListItem) {
        $(element).parents(".inputWrapper").find(".addButton").hide();
    } else {
        $(element).parents(".inputWrapper").find(".addButton").show();
    }

    updateDeleteStatusOffer(".addButton");
}

// add input list on enter key

// remove input list
function removeInputList(element) {
    $(element).parents(".inputWrapper").find('.addButton').show();
    $(element).parents(".inputListItem").remove();
    updateDeleteStatusOffer(".iconCancel");
}

// remove input list on enter key
function removeInputListOnKey(element) {
    $(document).keypress(function (event) {
        if (event.which === 13) {
            if ($(element).parents(".inputListItem").find("textarea").hasClass("select-add-input")) {
                addInputList($(element).parents(".inputListItem"));
            }
            $(element).parents(".inputListItem").remove();
            updateDeleteStatusOffer(".iconCancel");
        }
    });
}

// add tutor
function addTutor(element) {
    var inputPlaceholder = $(element).siblings(".textInputBoxTutor").find(".input").attr("placeholder");
    $('<label class="textInputBox textInputBoxTutor entry-to-delete"><span class="labelText padding-right-10">Dozent/Trainer</span><input name="trainer" class="input no-margin" autocomplete="off" placeholder=" ' + inputPlaceholder + ' "></input><div class="inputListItemCancel"><i class="iconCancel iconCancelTutor" onclick="removeTutor(this);" tabindex="0"></i></div></label>').insertBefore($(element));
    updateDeleteStatusOfferTutor(".addButton");
}

// remove tutor
function removeTutor(element) {
    $(element).parents(".inputWrapper").find('.addButtonTutor').show();
    $(element).parents(".textInputBoxTutor").remove();
    updateDeleteStatusOfferTutor(".iconCancelTutor");
}

/*** filling fields based on data ***/

function prefillOfferForm() {
    var offerStorageData = localStorage.getItem("NLCreatorOffer");
    if ( offerStorageData !== null ) {
        var offerJSON = JSON.parse(offerStorageData);
    } else {
        var offerJSON = [];
    }

    var storageData = localStorage.getItem("NLCreatorData");
    if ( storageData !== null ) {
        var dataJSON = JSON.parse(storageData);

        storedTitle = dataJSON.title;
        if (storedTitle) {
            $(".input[name=offerTitel]").val(storedTitle);
        }
    }

    if ( offerJSON['learningFormat'] === undefined || offerJSON['learningFormat'] === "") {
        var storageData = localStorage.getItem("NLCreatorStructure");
        if ( storageData !== null ) {
            var structureJSON = JSON.parse(storageData);

            var allStructureTypes = [];
            structureJSON.forEach(function(structureElement, i) {
                allStructureTypes[i] = structureElement.type;
            });

            allStructureTypes = unique(allStructureTypes);
            if (areAllValuesEqual(allStructureTypes) === false) {
                for (var i = 0; i < allStructureTypes.length; i++) {
                    var thisType = allStructureTypes[i];
                    if (thisType == "presence-seminar") {
                        $(".hiddenCheckboxes [value=Praesenz-Training]").prop('checked', true);
                    } else if (thisType == "live-seminar") {
                        $(".hiddenCheckboxes [value=Live-Online-Training]").prop('checked', true);
                    } else if (thisType == "elearning") {
                        $(".hiddenCheckboxes [value=E-Learning]").prop('checked', true);
                    }
                };
                $(".radioItem [value=Blended-Learning]").prop('checked', true);
                toggleCheckboxes($(".activateHiddenCheckboxes").parent(".radioItem"));
            } else if (allStructureTypes[0] == "presence-seminar") {
                $(".radioItem [value=Praesenz-Training]").prop('checked', true);
            } else if (allStructureTypes[0] == "live-seminar") {
                $(".radioItem [value=Live-Online-Training]").prop('checked', true);
            } else if (allStructureTypes[0] == "elearning") {
                $(".radioItem [value=E-Learning]").prop('checked', true);
            }
        }
    }

    function areAllValuesEqual(array) {
        if (array.length < 2) {
            return true; 
        }
        var firstString = array[0];
        for (var i = 1; i < array.length; i++) {
            if (array[i] !== firstString) {
                return false; 
            }
        }
        return true; 
    }

    function unique(list) {
        var result = [];
        $.each(list, function(i, e) {
          if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
      }
}



/**
 * conclusion functions
 */

var bubbleInterval;
function createBubbles() {
    if ($("#bubble-container").length > 0) {
        const bubbleContainer = document.getElementById('bubble-container');

        function createBubble() {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.top = Math.floor(Math.random() * bubbleContainer.clientHeight) + 'px';
            bubble.style.left = Math.floor(Math.random() * bubbleContainer.clientWidth) + 'px';
            bubble.style.width = Math.floor(Math.random() * 50) + 10 + 'px';
            bubble.style.height = bubble.style.width;
            bubbleContainer.appendChild(bubble);

            setTimeout(() => {
                bubble.classList.add('fadeOut');
                setTimeout(() => {
                    bubbleContainer.removeChild(bubble);
                }, 500);
            }, 1000);
        }
        bubbleInterval = setInterval(() => {
            createBubble();
            createBubble();
            createBubble();
        }, 500);
    }
}








// toast alerts
function toast(type, title, text) {
    html = `
    <div class="card toast-element toast-${type} new-toast">
        <h3>${title}</h3>
        <p>${text}</p>
    </div>
    `;
    $(".toast-container").append(html);
    var element = $(".new-toast");
    setTimeout(function () {
        $(element).addClass("active");
    }, 100);
    setTimeout(function () {
        $(element).removeClass("active");
    }, 6000);
    setTimeout(function () {
        $(element).slideUp();
    }, 6400);
    setTimeout(function () {
        $(element).remove();
    }, 6800);
}