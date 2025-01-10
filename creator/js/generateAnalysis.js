$(document).ready(function () {
    // specific chart functions
    if (typeof Chart !== "undefined") {
        // general
        var storageData = localStorage.getItem("NLCreatorStructure");
        if ( storageData !== null ) {
            var structureJSON = JSON.parse(storageData);
            console.log(structureJSON);
        }

        var allMethods = [];
        var allTargetLevels = [];
        var allPhases = [];
        var allSocialForm = [];
        for (let i = 0; i < structureJSON.length; i++) {
            var section = structureJSON[i];
            for (j = 0; j < section.container.length; j++) {
                var thisContainer = section.container[j];

                if (thisContainer.type === "pause") {
                    continue;
                }

                // for method
                var thisMethod = thisContainer.concept.method;
                allMethods.push(thisMethod);

                // for learning objectives
                var thislearningTargetLevel = thisContainer.concept.learningTargetLevel;
                allTargetLevels.push(thislearningTargetLevel);

                // for phase
                var thisPhase = thisContainer.phase;
                allPhases.push(thisPhase);

                // for social form
                var thisSocialForm = thisContainer.concept.socialForm;
                allSocialForm.push(thisSocialForm);
            }
        }

        // evaluation methods
        var chartColor1 = $(":root").css("--chartPrimaryColor1");
        var chartColor2 = $(":root").css("--chartPrimaryColor2");
        var chartColor3 = $(":root").css("--chartPrimaryColor3");
        var chartColor4 = $(":root").css("--chartPrimaryColor4");
        var chartColor5 = $(":root").css("--chartPrimaryColor5");
        var chartColor6 = $(":root").css("--chartPrimaryColor6");
        var chartColor7 = $(":root").css("--chartPrimaryColor7");
        var chartColor8 = $(":root").css("--chartPrimaryColor8");
        var chartColor9 = $(":root").css("--chartPrimaryColor9");

        // isCreatedoughnutChart('evaluationMethods',
        //     {
        //         labels: ['Lehrgespräch', 'Diskussion', 'Aufgaben', 'Demonstration'],
        //         values: [50, 15, 25, 10]
        //     },
        //     calculateColorParts(4)
        //     // [
        //     //     chartColor1,
        //     //     chartColor2,
        //     //     chartColor3,
        //     //     chartColor4,
        //     //     chartColor5,
        //     //     chartColor6,
        //     //     chartColor7,
        //     //     chartColor8
        //     // ]
        // );

        
        var methodChartData = sortStructureChartData(allMethods);
        var methodMaxValue = 0;
        
        let i = 0;
        while (i < methodChartData.length) {
            var thisMethodValue = methodChartData[i].value;
            if (methodChartData[i].key === "" || methodChartData[i].key === undefined) {
                methodChartData.splice(i, 1);
                continue;
            }
            if (thisMethodValue > methodMaxValue) {
                methodMaxValue = thisMethodValue;
            }
            i++; 
        }
        
        if (methodChartData.length > 0) {
            for (let i = 0; i < methodChartData.length; i++) {
                var thisMethodValue = methodChartData[i].value;
                thisMethodPercentage = thisMethodValue / methodMaxValue;
                if (thisMethodPercentage > 0.8) {
                    methodChartData[i].value = 30;
                } else if (thisMethodPercentage > 0.6) {
                    methodChartData[i].value = 22;
                } else if (thisMethodPercentage > 0.3) {
                    methodChartData[i].value = 16;
                } else  {
                    methodChartData[i].value = 10;
                }
            }
        } else {
            methodChartData = [{key: "nicht gesetzt", value: 30}]
        }
        
        isCreateWordCloud('evaluationMethods',
            methodChartData,
            // ["#cceff1", "#99dfe3", "#66cfd4","#cceff1", "#99dfe3", "#66cfd4","#cceff1", "#99dfe3", "#66cfd4","#cceff1", "#99dfe3", "#66cfd4","#cceff1", "#99dfe3", "#66cfd4"]
            calculateColorParts(methodChartData.length)
        );
        


        // evaluation learning objectives
        var allTargetLevelValue = allTargetLevels.length;
        var targetLevelChartData = sortStructureChartData(allTargetLevels);
        console.log(targetLevelChartData);
        targetLevelChartData.sort((a, b) => {
            if (a.level === '') return 1;
            if (b.level === '') return -1;
            return parseInt(a.level) - parseInt(b.level);
        });
        // console.log(targetLevelChartData);

        var targetLevelChartDataLabels = [];
        var targetLevelChartDataValues = [];
        for (let i = 0; i < targetLevelChartData.length; i++) {
            var thisTargetLevelLabel = targetLevelChartData[i].key;
            if ( thisTargetLevelLabel !== '') {
                thisTargetLevelLabel = 'Lernzielstufe ' + thisTargetLevelLabel;
            } else {
                thisTargetLevelLabel = 'nicht gesetzt';
            }
            targetLevelChartDataLabels.push(thisTargetLevelLabel);

            var thisTargetLevelValue = targetLevelChartData[i].value;
            thisTargetLevelValue = thisTargetLevelValue / allTargetLevelValue * 100;
            targetLevelChartDataValues.push(thisTargetLevelValue);
        }

        isCreatedoughnutChart('evaluationLearningObjectives',
            {
                // labels: ['Lernzielstufe 1: Wissen & imitierend handeln', 'Lernzielstufe 2: Verstehen & schematisch handeln', 'Lernzielstufe 3: Anwenden & fachgerecht handeln', 'Lernzielstufe 4: Analysieren & kontextabhängig handeln'],
                // labels: ['Lernzielstufe 1', 'Lernzielstufe 2', 'Lernzielstufe 3', 'Lernzielstufe 4'],
                // values: [42, 12, 20, 26]
                labels: targetLevelChartDataLabels,
                values: targetLevelChartDataValues
            },
            calculateColorParts(targetLevelChartDataLabels.length)
        );

        // evaluation phase
        var allPhasesValue =  allPhases.length;
        var phaseChartData = sortStructureChartData(allPhases);

        var phaseChartDataLabels = [];
        var phaseChartDataValues = [];
        for (let i = 0; i < phaseChartData.length; i++) {
            var thisTargetLevelLabel = phaseChartData[i].key;
            if ( thisTargetLevelLabel !== null) {
                if (thisTargetLevelLabel == 'introduction') {thisTargetLevelLabel = 'Einführung'}
                else if (thisTargetLevelLabel == 'motivation') {thisTargetLevelLabel = 'Motivation'}
                else if (thisTargetLevelLabel == 'elaboration') {thisTargetLevelLabel = 'Erarbeitung'}
                else if (thisTargetLevelLabel == 'consolidation') {thisTargetLevelLabel = 'Festigung'}
                else if (thisTargetLevelLabel == 'application') {thisTargetLevelLabel = 'Anwendung'}
                else if (thisTargetLevelLabel == 'transfer') {thisTargetLevelLabel = 'Transfer'}
                else if (thisTargetLevelLabel == 'completion') {thisTargetLevelLabel = 'Abschluss'}
                else if (thisTargetLevelLabel == 'examination') {thisTargetLevelLabel = 'Prüfung'}
            } else {
                thisTargetLevelLabel = 'nicht gesetzt';
            }
            phaseChartDataLabels.push(thisTargetLevelLabel);

            var thisTargetLevelValue = phaseChartData[i].value;
            thisTargetLevelValue = thisTargetLevelValue / allPhasesValue * 100;
            phaseChartDataValues.push(thisTargetLevelValue);
        }
        isCreatedoughnutChart('evaluationPhase',
            {
                labels: phaseChartDataLabels,
                values: phaseChartDataValues
            },
            calculateColorParts(phaseChartDataLabels.length)
        );

        // evaluation social form
        var allSocialFormValue = allSocialForm.length;
        var socialFormChartData = sortStructureChartData(allSocialForm);

        var socialFormChartDataLabels = [];
        var socialFormChartDataValues = [];
        for (let i = 0; i < socialFormChartData.length; i++) {
            var thisSocialFormLabel = socialFormChartData[i].key;
            if ( thisSocialFormLabel == 'single') {
                thisSocialFormLabel = 'Einzelarbeit';
            } else if ( thisSocialFormLabel == 'partner' ) {
                thisSocialFormLabel = 'Partnerarbeit';
            } else if ( thisSocialFormLabel == 'group' ) {
                thisSocialFormLabel = 'Gruppenarbeit';
            } else if ( thisSocialFormLabel == 'plenum' ) {
                thisSocialFormLabel = 'Plenum';
            } else {
                thisSocialFormLabel = 'nicht gesetzt';
            }
            socialFormChartDataLabels.push(thisSocialFormLabel);

            var thisSocialFormValue = socialFormChartData[i].value;
            thisSocialFormValue = thisSocialFormValue / allSocialFormValue * 100;
            socialFormChartDataValues.push(thisSocialFormValue);
        }
        isCreatedoughnutChart('evaluationSocialForm',
            {
                labels: socialFormChartDataLabels,
                values: socialFormChartDataValues
            },
            calculateColorParts(socialFormChartDataLabels.length)
        );
    }

    // download canvas
    $(".downloadButton").click(function () {
        var canvas = $(this).parents(".chartContainer").find("canvas")[0];
        var filename = $(this).closest(".cardTitleWrapper").children(".cardTitle").text();

        download(canvas, filename);
    });

    // trigger structure analysis
    analyzeStructure();
});

/**
 * analysis functions
 */

// general chart function
var primaryColor = $(":root").css("--primaryColor");
var fontColor = $(":root").css("--fontColor");
var fontFamily = $(":root").css("--fontFamily");

// remove click function legend
const newLegendClickHandler = function (e, legendItem, legend) { }

function isCreatedoughnutChart(chartId, data, backgroundColors) {

    const pieChart = document.getElementById(chartId);

    if (pieChart === null) {
        return;
    }

    pieChartCanvasAnalysis = new Chart(pieChart, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                label: '',
                data: data.values,
                backgroundColor: backgroundColors,
                borderWidth: 0,
                borderRadius: 0,
                spacing: 0,
            }]
        },
        options: {
            hoverOffset: 15,
            responsive: true,
            radius: "90%",
            cutout: "75%",
            animation: {
                duration: 2000,
                delay: 0
            },
            maintainAspectRatio: false,
            // aspectRatio: 1,
            // aspectRatio: 2 / 1.4,
            plugins: {
                legend: {
                    onClick: newLegendClickHandler,
                    position: 'right',
                    align: 'center',
                    labels: {
                        boxWidth: 15,
                        boxHeight: 15,
                        padding: 10,
                        color: fontColor,
                        font: {
                            family: fontFamily,
                            size: 12
                        },

                    }
                },
                tooltip: {
                    backgroundColor: "#f2f2f2",
                    titleColor: primaryColor,
                    bodyColor: "#333",
                    cornerRadius: 8,
                    titleFont: {
                        size: 12,
                        family: fontFamily,
                        weight: "600"
                    },
                    bodyFont: {
                        size: 12,
                        family: fontFamily,
                        weight: "normal"
                    },
                    displayColors: false,
                    padding: 10,
                    titleAlign: 0,
                    // wenn 2 Dezimalstellen vorhanden sein sollen toFixed auf 2 setzen
                    callbacks: {
                        label: function (context) {
                            return context.parsed.toFixed(0) + '%';
                        }
                    }
                }
            }
        },
    });
}

function isCreateWordCloud (chartId, words, wordColors) {
    const wordCloud = document.getElementById(chartId);

    new Chart(wordCloud.getContext("2d"), {
        type: "wordCloud",
        data: {
            labels: words.map((d) => d.key),
            datasets: [
            {
                label: "",
                data: words.map((d) => 10 + d.value * 1),
                color: wordColors,
                hoverColor: "#002325"
            }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: {
                display: false,
                text: ""
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}

// download charts
// function downloadCanvas(element) {
//     var canvas = $(element).parents(".chartContainer").find("canvas")
//     var filename = $(element).closest(".cardTitleWrapper").children(".cardTitle").text();

//     console.log(filename)
//     download(canvas, filename);
// }

function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}

// calculate color parts for chart and wordcloud
function calculateColorParts(numParts) {
    var colorOffset = 9 / numParts;
    var chartColorArray = []
    for (let i = 0; i < numParts; i++) {
        var thisOffset = Math.floor(colorOffset * i) + 1;
        var variableColor = $(":root").css("--chartPrimaryColor" + thisOffset.toString());
        chartColorArray.push(variableColor);
    }
    // console.log(chartColorArray);
    return chartColorArray;
}

// sort structure data based on quantity
function sortStructureChartData(allValues) {
    var allChartData = [];
    for (let i = 0; i < allValues.length; i++) {
        let currentValue = allValues[i];
    
        let count = 1; 
        for (let j = i + 1; j < allValues.length; j++) {
            if (allValues[j] === currentValue) {
                count++;
                allValues.splice(j, 1);
                j--; 
            }
        }
        let dataObject = {
            key: currentValue,
            value: count
        };
        allChartData.push(dataObject);
    
        allValues.splice(i, 1);
        i--;
    }

    let j = 0;
    while (j < allChartData.length) {
        if (allChartData[j].key === undefined) {
            allChartData.splice(j, 1);
            continue;
        }
        j++;
    }

    return allChartData;
}


