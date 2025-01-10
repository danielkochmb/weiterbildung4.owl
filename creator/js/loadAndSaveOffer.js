$(document).ready(function () {

    if ($('#offer').length > 0) {
        loadOffer();
    }

    $(document).on('change', '#offer input, #offer textarea, #offer select', function() {
        saveOffer();
    });

    $(document).on("click keydown", "#offer .addButton, .iconCancel", function() {
        saveOffer();
    });

});

// offerJSON = {
// };

// save data from offer page
function saveOffer() {
    var offerJSON = {};
    
    offerJSON['title'] = $('#offerTitel').val();
    offerJSON['shortDescription'] = $('#offerShortDescription').val();
    offerJSON['learningFormat'] = $('#offerLearningFormat input[name="learningFormat"]:checked').val();

    if (offerJSON['learningFormat'] == "Blended-Learning") {
        offerJSON['combinedLearningFormat'] = [];
        $('#offerLearningFormat input[name="combinedLearningFormat"]:checked').each( function(i) {
            offerJSON['combinedLearningFormat'][i] = $(this).val();
        });
    }

    offerJSON['utility'] = [];
    $('#offerUtility [name="offerUtilityTextarea"]').each( function(i) {
        offerJSON['utility'][i] = $(this).val();
    });
   
    offerJSON['targetGroup'] = $('#offerTargetGroup').val();

    offerJSON['content'] = [];
    $('#offerContent [name="offerContentTextarea"]').each( function(i) {
        offerJSON['content'][i] = $(this).val();
    });

    offerJSON['completion'] = [];
    $('#offerCompletion input[name="certificate"]:checked').each( function(i) {
        offerJSON['completion'][i] = {};
        offerJSON['completion'][i]['type'] = $(this).val();
        if ($(this).parents('.checkboxItem').next('.moreInformation').find('input').val() !== undefined) {
            offerJSON['completion'][i]['title'] = $(this).parents('.checkboxItem').next('.moreInformation').find('input').val();
        }
    });

    offerJSON['trainer'] = [];
    $('#offerTrainer [name="trainer"]').each( function(i) {
        offerJSON['trainer'][i] = $(this).val();
    });

    offerJSON['price'] = [];
    $('#offerPrice input[name="priceType"]:checked').each( function(i) {
        offerJSON['price'][i] = {};
        offerJSON['price'][i]['type'] = $(this).val();
        var pricePerParticipant = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="pricePerParticipant"]').val();
        if (pricePerParticipant !== undefined) {
            offerJSON['price'][i]['pricePerParticipant'] = pricePerParticipant;
        }
        var pricePerLicense3Months = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="pricePerLicense3Months"]').val();
        if (pricePerLicense3Months !== undefined) {
            offerJSON['price'][i]['pricePerLicense3Months'] = pricePerLicense3Months;
        }
        var pricePerLicense6Months = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="pricePerLicense6Months"]').val();
        if (pricePerLicense6Months !== undefined) {
            offerJSON['price'][i]['pricePerLicense6Months'] = pricePerLicense6Months;
        }
        var pricePerLicense12Months = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="pricePerLicense12Months"]').val();
        if (pricePerLicense12Months !== undefined) {
            offerJSON['price'][i]['pricePerLicense12Months'] = pricePerLicense12Months;
        }
        var discount = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="discount"]').is(':checked') ? true : false;
        if (discount) {
            offerJSON['price'][i]['discount'] = {};
            offerJSON['price'][i]['discount']['requiredNumberOfPersons'] = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="discountNumberOfPersons"]').val();
            offerJSON['price'][i]['discount']['percent'] = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="discountPercent"]').val();
        }
        var includedServices = $(this).parents('.checkboxItem').next('.moreInformation').find('[name="includedServices"]').val();
        if (includedServices !== undefined) {
            offerJSON['price'][i]['includedServices'] = includedServices;
        }
    });

    offerJSON['certification'] = $('#offerCertification').val();

    // save in localStorage
    storageData = JSON.stringify(offerJSON);
    localStorage.setItem('NLCreatorOffer', storageData);

    console.log('successfully saved NLCreatorOffer to localStorage');
    console.log(offerJSON);
}

// load data from offer page
function loadOffer() {
    // load from localStorage
    var storageData = localStorage.getItem('NLCreatorOffer');
    if (storageData !== null) {
        var offerJSON = JSON.parse(storageData);
        console.log(offerJSON);

        $('#offerTitel').val(offerJSON['title']);
        $('#offerShortDescription').val(offerJSON['shortDescription']);
        $('#offerLearningFormat input[name="learningFormat"][value="' + offerJSON['learningFormat'] + '"]').prop('checked', true);
        toggleCheckboxes($('#offerLearningFormat input[name="learningFormat"][value="' + offerJSON['learningFormat'] + '"]').parents(".radioItem"));

        if (offerJSON['combinedLearningFormat'] !== undefined) {
            for (let i = 0; i < offerJSON['combinedLearningFormat'].length; i++) {
                $('#offerLearningFormat input[name="combinedLearningFormat"][value="' + offerJSON['combinedLearningFormat'][i] + '"]').prop('checked', true);
            }
        }

        for (let i = 0; i < offerJSON['utility'].length; i++) {
            if (i > 0) {
                $('#offerUtility').siblings('.addButton').click();
            }
            $('#offerUtility .inputListItem:nth-child(' + (i + 1) + ') [name="offerUtilityTextarea"]').val(offerJSON['utility'][i]);
        }

        $('#offerTargetGroup').val(offerJSON['targetGroup']);

        for (let i = 0; i < offerJSON['content'].length; i++) {
            if (i > 0) {
                $('#offerContent').siblings('.addButton').click();
            }
            $('#offerContent .inputListItem:nth-child(' + (i + 1) + ') [name="offerContentTextarea"]').val(offerJSON['content'][i]);
        }

        for (let i = 0; i < offerJSON['completion'].length; i++) {
            $('#offerCompletion input[name="certificate"][value="' + offerJSON['completion'][i]['type'] + '"]').prop('checked', true);
            toggleMoreInformation($('#offerCompletion input[name="certificate"][value="' + offerJSON['completion'][i]['type'] + '"]').parents(".checkboxItem"));
            $('#offerCompletion input[name="certificate"][value="' + offerJSON['completion'][i]['type'] + '"]').parents('.checkboxItem').next('.moreInformation').find('input').val(offerJSON['completion'][i]['title']);
        }

        for (let i = 0; i < offerJSON['trainer'].length; i++) {
            if (i > 0) {
                $('#offerTrainer').find('.addButton').click();
            }
            $('#offerTrainer .textInputBoxTutor:nth-child(' + (i + 1) + ') [name="trainer"]').val(offerJSON['trainer'][i]);
        }

        for (let i = 0; i < offerJSON['price'].length; i++) {
            $('#offerPrice input[name="priceType"][value="' + offerJSON['price'][i]['type'] + '"]').prop('checked', true);
            toggleMoreInformation($('#offerPrice input[name="priceType"][value="' + offerJSON['price'][i]['type'] + '"]').parents(".checkboxItem"));
            var moreInformation = $('#offerPrice input[name="priceType"][value="' + offerJSON['price'][i]['type'] + '"]').parents('.checkboxItem').next('.moreInformation');
            if (offerJSON['price'][i]['pricePerParticipant'] !== undefined) {
                moreInformation.find('[name="pricePerParticipant"]').val(offerJSON['price'][i]['pricePerParticipant']);
            }
            if (offerJSON['price'][i]['discount'] !== undefined) {
                moreInformation.find('[name="discount"]').prop('checked', true);
                toggleMoreInformation(moreInformation.find('[name="discount"]').parents(".checkboxItem"));
                moreInformation.find('[name="discountNumberOfPersons"]').val(offerJSON['price'][i]['discount']['requiredNumberOfPersons']).addClass('active');
                moreInformation.find('[name="discountPercent"]').val(offerJSON['price'][i]['discount']['percent']).addClass('active');
            }
            if (offerJSON['price'][i]['includedServices'] !== undefined) {
                moreInformation.find('[name="includedServices"]').val(offerJSON['price'][i]['includedServices']);
            }
        }

        $('#offerCertification').val(offerJSON['certification']);

    }
}