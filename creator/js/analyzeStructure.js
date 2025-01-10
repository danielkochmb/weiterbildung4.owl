// get structure optimization recommendations
// * each recommendation gets an id in code, if returns true, the suggestion gets displayed
// * all ids and optimization analysis:
// ** #1 --> target level in data is not present in structure
// ** #2 --> target level in data is less than 5 percent of total time
// ** #4 --> more than 25 percent is same method
// ** #5 --> more than 50 percent is same method
// ** #6 --> more 3 times in a row same method
// ** #8 --> no introduction phase 
// ** #9 --> no motivation phase
// ** #10 --> no elaboration phase
// ** #11 --> no consolidation phase
// ** #12 --> no application phase
// ** #13 --> no transfer phase
// ** #14 --> no completion phase
// ** #15 --> less than 10 percent of total time for introduction, motivation and completion
// ** #16 --> more than 30 percent of total time for introduction, motivation and completion
// ** #18 --> more than 2 hours without pause


function analyzeStructure() {
    var storageData = localStorage.getItem('NLCreatorStructure');
    if ( storageData !== null ) {
        var structureJSON = JSON.parse(storageData);

        // *** GET DATA
        var allOptimizationArray = {}; // array for all displayed optimizations

        var allTargetLevels = []; // #1, #2
        var allMethods = []; // #4, #5
        var allMethodsStack = []; // #6
        var allPhases = []; // #8, #9, #10, #11, #12, #13, #14, #15, #16
        var allContainerDuration = []; // #18
        for (let i = 0; i < structureJSON.length; i++) {
            var section = structureJSON[i];
            allContainerDuration[i] = [];
            allMethodsStack[i] = [];
            for (j = 0; j < section.container.length; j++) {
                var thisContainer = section.container[j];

                // #18
                if (thisContainer.type === "pause") {
                    allContainerDuration[i].push('');
                } else {
                    allContainerDuration[i].push(thisContainer.durationMinutes);
                }

                // #6
                if (thisContainer.type === "pause") {
                    allMethodsStack[i].push('');
                } else {
                    allMethodsStack[i].push(thisContainer.concept.method);
                }

                // all data, that is independent to pause container type
                if (thisContainer.type === "pause") {
                    continue;
                }

                // #1
                var thisTargetLevel = thisContainer.concept.learningTargetLevel;
                if (section.type !== 'practice-transfer' && section.type !== 'practice-self-learning' && section.type !== 'practice-project') {
                    allTargetLevels.push({'level': thisTargetLevel, 'duration': thisContainer.durationMinutes});
                }

                // #4, #5
                var thisMethod = thisContainer.concept.method;
                allMethods.push(thisMethod);

                // #8, #9, #10, #11, #12, #13, #14, #15, #16
                var thisPhase = thisContainer.phase;
                if (section.type !== 'practice-transfer' && section.type !== 'practice-self-learning' && section.type !== 'practice-project') {
                    allPhases.push(thisPhase);
                }
            }
        }

        // console.log(allMethods);

        // *** CHECK DATA
        totalRecIndex = 1;

        // #1, #2 - START
        if (localStorage.getItem('NLCreatorData') !== null) {
            var dataJSON = JSON.parse(localStorage.getItem('NLCreatorData'));

            var totalStructureTime = 0;
            $.each(allContainerDuration, function(index, subArray) {
                $.each(subArray, function(subIndex, value) {
                    var intValue = parseInt(value, 10);
                    if (!isNaN(intValue)) {
                        totalStructureTime += intValue;
                    }
                });
            });

            $.each(dataJSON['learningTargets'], function(index, target) {
                if (target.level !== '') {

                    var thisTargetLevelDuration = 0;
                    var foundLevelInStructure = false;

                    $.each(allTargetLevels, function(index, obj) {
                        if (obj.level === target.level) {
                            foundLevelInStructure = true;
                            if (Number.isInteger(parseInt(obj.duration))) {
                                thisTargetLevelDuration += parseInt(obj.duration); 
                            }
                        }
                    });

                    if (!foundLevelInStructure) {
                        allOptimizationArray['#1'] = {};
                        allOptimizationArray['#1']['text'] = 'Überprüfen Sie die <b>Passung zwischen Grob- und Feinlernzielen</b>. Aktuell sprechen die Groblernziele eine höhere Lernzielstufe als die Feinlernziele an. Planen Sie dafür Abschnitte, in denen Sie die Feinlernziele der Stufe ' + target.level + ' anstreben.';
                        allOptimizationArray['#1']['detail'] = target.level;
                        allOptimizationArray['#1']['display'] = false;
                        allOptimizationArray['#1']['index'] = totalRecIndex;
                        totalRecIndex++;
                    } else if ((thisTargetLevelDuration / totalStructureTime) * 100 < 5) {
                        // console.log((thisTargetLevelDuration / totalStructureTime) * 100);
                        allOptimizationArray['#2'] = {};
                        allOptimizationArray['#2']['text'] = 'Sie haben relativ <b>wenig Zeit dafür eingeplant, das Groblernziel auf Stufe ' + target.level + '</b> zu erreichen. Überprüfen Sie, ob Sie der Erreichung des Groblernziels mehr Zeit einräumen können. Verlängern Sie bestehende Abschnitte und/oder fügen Sie Abschnitte hinzu, in denen Sie die Lernziele der Stufe ' + target.level + ' anstreben.';
                        allOptimizationArray['#2']['detail'] = target.level;
                        allOptimizationArray['#2']['display'] = true;
                        allOptimizationArray['#2']['index'] = totalRecIndex;
                        totalRecIndex++;
                    }
                }
            });
        }
        // #1. #2 - END
        
        // #4, #5 - START
        var filteredMethods = allMethods.filter(function(method) {
            return method !== "" && method !== undefined;
        });

        var methodCounts = {};
        $.each(filteredMethods, function(index, method) {
            methodCounts[method] = (methodCounts[method] || 0) + 1;
        });
        
        var maxMethodCount = 0;
        var mostFrequentMethod = null;
        $.each(methodCounts, function(method, count) {
            if (count > maxMethodCount) {
                maxMethodCount = count;
                mostFrequentMethod = method;
            }
        });
        
        maxMethodPercent = (maxMethodCount / allMethods.length) * 100;
        
        if (maxMethodPercent > 50) {
            allOptimizationArray['#5'] = {};
            allOptimizationArray['#5']['text'] = 'Die Methode <b>"' + mostFrequentMethod + '"</b> hat in Ihrem Lernangebot einen sehr hohen Anteil von <b>' + maxMethodPercent.toFixed(1) + '%</b> der Gesamtzeit. Bitte nutzen Sie stattdessen auch andere Methoden, wenn möglich. Sie erhöhen so die Lernmotivation und Aufnahmefähigkeit der Teilnehmenden.';
            allOptimizationArray['#5']['detail'] = mostFrequentMethod;
            allOptimizationArray['#5']['display'] = true;
            allOptimizationArray['#5']['index'] = totalRecIndex;
            totalRecIndex++;
        } else if (maxMethodPercent > 25) {
            // console.log("word '" + mostFrequentMethod + "' has more than 25% of all methods");
            allOptimizationArray['#4'] = {};
            allOptimizationArray['#4']['text'] = 'Die Methode <b>"' + mostFrequentMethod + '"</b> hat in Ihrem Lernangebot einen Anteil von <b>' + maxMethodPercent.toFixed(1) + '%</b> der Gesamtzeit. Überprüfen Sie, ob dies in diesem Umfang beabsichtigt ist.';
            allOptimizationArray['#4']['detail'] = mostFrequentMethod;
            allOptimizationArray['#4']['display'] = true;
            allOptimizationArray['#4']['index'] = totalRecIndex;
            totalRecIndex++;
        }
        // #4, #5 - END

        // #6 - START
        var sameMethodCount = 1; 
        var highestMethodStack = 0;
        var previousMethod = '';

        for (var i = 0; i < allMethodsStack.length; i++) {
            for (let j = 0; j < allMethodsStack[i].length; j++) {
                let thisMethod = allMethodsStack[i][j];
                let nextMethod = allMethodsStack[i][j + 1];
                if (thisMethod === previousMethod && thisMethod !== '' && thisMethod !== undefined && nextMethod) {
                    sameMethodCount++;
                } else {
                    if (!nextMethod && thisMethod === previousMethod && thisMethod !== undefined) {
                        sameMethodCount++;
                    }
                    if (sameMethodCount >= 3 && sameMethodCount > highestMethodStack) {
                        // console.log('The word "' + previousMethod + '" appeared ' + sameMethodCount + ' times in a row');
                        allOptimizationArray['#6'] = {};
                        allOptimizationArray['#6']['text'] = 'Sie verwenden die Methode <b>"' + previousMethod + '" ' + sameMethodCount + '-mal</b> hintereinander. Aktivieren und motivieren Sie die Lernenden durch den Einsatz abwechselnder Methoden!';
                        allOptimizationArray['#6']['detail'] = previousMethod;
                        allOptimizationArray['#6']['display'] = true;
                        allOptimizationArray['#6']['index'] = totalRecIndex;
                        if (highestMethodStack === 0) {
                            totalRecIndex++;
                        }
                        highestMethodStack = sameMethodCount;
                    }
                    previousMethod = thisMethod;
                    sameMethodCount = 1;
                }
                
            }
        }
        // #6 - END

        // #8 - START
        if ($.inArray('introduction', allPhases) === -1) {
            allOptimizationArray['#8'] = {};
            allOptimizationArray['#8']['text'] = 'Sie haben <b>keine Einführungsphase</b> für Ihr Lernangebot geplant. Es ist grundsätzlich sinnvoll eine Einführungsphase einzuplanen, um eine positive Lernatmosphäre zu schaffen. Dabei können Aspekte wie z.B. Kontext, Lernziele oder organisatorischer Rahmen geklärt werden.';
            allOptimizationArray['#8']['detail'] = 'introduction';
            allOptimizationArray['#8']['display'] = false;
            allOptimizationArray['#8']['index'] = totalRecIndex;
            totalRecIndex++;
        }
        // #8 - END

        // #9 - START
        if ($.inArray('motivation', allPhases) === -1) {
            allOptimizationArray['#9'] = {};
            allOptimizationArray['#9']['text'] = 'Sie haben <b>keine Motivationsphase</b> für Ihr Lernangebot geplant. Es ist grundsätzlich sinnvoll eine Motivationsphase einzuplanen, um das Interesse der Teilnehmenden zu wecken und sie für ein Thema zu begeistern. Dabei können Aspekte wie z.B. das Vorwissen, Erfahrungen der Teilnehmenden oder die Relevanz des Themas adressiert werden.';
            allOptimizationArray['#9']['detail'] = 'motivation';
            allOptimizationArray['#9']['display'] = false;
            allOptimizationArray['#9']['index'] = totalRecIndex;
            totalRecIndex++;
        } 
        // #9 - END

        // #10 - START
        if ($.inArray('elaboration', allPhases) === -1) {
            allOptimizationArray['#10'] = {};
            allOptimizationArray['#10']['text'] = 'Sie haben <b>keine Erarbeitungsphase</b> für Ihr Lernangebot geplant.  Es ist grundsätzlich sinnvoll eine Erarbeitungsphase einzuplanen, damit sich die Lernenden intensiv mit einem neuen Thema auseinandersetzen. Dabei sind besonders Aspekte wie z.B. die Aktivierung der Teilnehmenden oder eine gute Strukturierung der dargebotenen Inhalte zu beachten.';
            allOptimizationArray['#10']['detail'] = 'elaboration';
            allOptimizationArray['#10']['display'] = false;
            allOptimizationArray['#10']['index'] = totalRecIndex;
            totalRecIndex++;
        } 
        // #10 - END

        // #11 - START
        if ($.inArray('consolidation', allPhases) === -1) {
            allOptimizationArray['#11'] = {};
            allOptimizationArray['#11']['text'] = 'Sie haben <b>keine Festigungsphase</b> für Ihr Lernangebot geplant.  Es ist grundsätzlich sinnvoll eine Festigungsphase einzuplanen, damit die Teilnehmenden die Gelegenheit erhalten, das gelernte Wissen oder die erworbenen Fähigkeiten nachhaltig zu verankern. Dabei sind Elemente wie z.B. Übung, Wiederholung und Zusammenfassung einzuplanen.';
            allOptimizationArray['#11']['detail'] = 'consolidation';
            allOptimizationArray['#11']['display'] = false;
            allOptimizationArray['#11']['index'] = totalRecIndex;
            totalRecIndex++;
        } 
        // #11 - END

        // #12 - START
        if ($.inArray('application', allPhases) === -1) {
            allOptimizationArray['#12'] = {};
            allOptimizationArray['#12']['text'] = 'Sie haben <b>keine Anwendungsphase</b> für Ihr Lernangebot geplant. Es ist grundsätzlich sinnvoll eine Anwendungsphase einzuplanen, damit die Teilnehmenden die Gelegenheit erhalten, das gelernte Wissen oder die erworbenen Fähigkeiten in realen oder simulierten Situationen auszuprobieren.  Dabei sind Aspekte wie z.B. authentische Aufgaben- oder Problemstellungen, Kontextbezug und Reflexionsmöglichkeiten zu beachten.';
            allOptimizationArray['#12']['detail'] = 'application';
            allOptimizationArray['#12']['display'] = false;
            allOptimizationArray['#12']['index'] = totalRecIndex;
            totalRecIndex++;
        } 
        // #12 - END

        // #13 - START
        if ($.inArray('transfer', allPhases) === -1) {
            allOptimizationArray['#13'] = {};
            allOptimizationArray['#13']['text'] = 'Sie haben <b>keine Transferphase</b> für Ihr Lernangebot geplant. Es ist grundsätzlich sinnvoll eine Transferphase einzuplanen, um angeeignetes Wissen oder erworbene Fähigkeiten in reale Praxiskontexte übertragen. Dabei ist es wichtig z.B. praxisbezogene Kontexte zu generieren oder neue Anwendungssituationen zu schaffen.';
            allOptimizationArray['#13']['detail'] = 'transfer';
            allOptimizationArray['#13']['display'] = false;
            allOptimizationArray['#13']['index'] = totalRecIndex;
            totalRecIndex++;
        } 
        // #13 - END

        // #14 - START
        if ($.inArray('completion', allPhases) === -1) {
            allOptimizationArray['#14'] = {};
            allOptimizationArray['#14']['text'] = 'Sie haben <b>keine Abschlussphase</b> für Ihr Lernangebot geplant. Es ist grundsätzlich sinnvoll eine Abschlussphase einzuplanen, damit die Erkenntnisse des abgeschlossenen Lernabschnitts zusammengefasst werden. Außerdem bietet die Abschlussphase Gelegenheit zur Reflexion des Gelernten. Dabei sind Elemente wie z.B. eine Zusammenfassung der Erkenntnisse, Feedback und Ausblick wichtig.';
            allOptimizationArray['#14']['detail'] = 'completion';
            allOptimizationArray['#14']['display'] = false;
            allOptimizationArray['#14']['index'] = totalRecIndex;
            totalRecIndex++;
        } 
        // #14 - END
        
        // #15, #16 - START
        var startEndPhasesCounter = 0;
        for (var i = 0; i <= allPhases.length; i++) { 
            if (allPhases[i] === 'introduction' || allPhases[i] === 'motivation' || allPhases[i] === 'completion') {
                startEndPhasesCounter++;
            }
        }
        var startEndPhasesPercent = startEndPhasesCounter / allPhases.length * 100;
        if (startEndPhasesPercent < 10) {
            allOptimizationArray['#15'] = {};
            allOptimizationArray['#15']['text'] = 'Sie verwenden für die <b>Verlaufsformen Einführung, Motivation und Abschluss verhätnismäßig wenig</b> Zeit. Prüfen Sie, ob Sie den Teilnehmenden für die einzelnen Phasen ausreichend Zeit geben.';
            allOptimizationArray['#15']['detail'] = startEndPhasesPercent;
            allOptimizationArray['#15']['display'] = true;
            allOptimizationArray['#15']['index'] = totalRecIndex;
            totalRecIndex++;
        }
        if (startEndPhasesPercent > 30) {
            allOptimizationArray['#16'] = {};
            allOptimizationArray['#16']['text'] = 'Sie verwenden für die <b>Verlaufsformen Einführung, Motivation und Abschluss verhätnismäßig viel</b> Zeit. Prüfen Sie, ob Sie die geplante Zeit tatsächlich benötigen bzw. für andere Phasen verwenden können.';
            allOptimizationArray['#16']['detail'] = startEndPhasesPercent;
            allOptimizationArray['#16']['display'] = true;
            allOptimizationArray['#16']['index'] = totalRecIndex;
            totalRecIndex++;
        }
        // #15, #16 - END

        // #18 - START
        var durationSummary = 0;
        var isDurationOverLimit = false;
        console.log(allContainerDuration);
        for (var i = 0; i < allContainerDuration.length; i++) {
            durationSummary = 0;
            for (let j = 0; j < allContainerDuration[i].length; j++) {
                if (allContainerDuration[i][j] === '') {
                    durationSummary = 0; 
                } else {
                    durationSummary += parseInt(allContainerDuration[i][j], 10);
                    if (durationSummary > 120) {
                        console.log('i: ' + i + ' j: ' + j);
                        isDurationOverLimit = true;
                        console.log('the time is above 120 min');
                        break;
                    }
                }
            }
            if (isDurationOverLimit == true) {
                break;
            }
        }

        if (isDurationOverLimit == true) {
            allOptimizationArray['#18'] = {};
            allOptimizationArray['#18']['text'] = 'Sie planen eine <b>längere Lernzeit (>2 Stunden)</b> ohne Pause. Integrieren Sie Pausen, um Konzentration, Aufmerksamkeit und Motivation der Lernenden zu unterstützen.';
            allOptimizationArray['#18']['detail'] = '';
            allOptimizationArray['#18']['display'] = true;
            allOptimizationArray['#18']['index'] = totalRecIndex;
            totalRecIndex++;
        }
        // #18 - END


        // -> save allOptimizationArray in local storage
        localStorage.setItem('NLCreatorAnalysis', JSON.stringify(allOptimizationArray));
        console.log("successfully saved NLCreatorAnalysis to localStorage"); 

        // *** MARK RECOMMENDATION IN STRUCTURE
        var sameMethodCount = 1; // #6
        var highestMethodStack = 0; // #6
        var previousMethod = ''; // #6
        var methodIndicesToFlag = []; // #6

        for (let i = 0; i < structureJSON.length; i++) {
            var section = structureJSON[i];

            var durationSummary = 0; // #18
            var durationIndicesToFlag = []; // #18

            for (j = 0; j < section.container.length; j++) {
                var thisContainer = section.container[j];
                var nextContainer = section.container[j + 1];

                // #18
                thisContainer.analysis = {};
                let thisContainerMinutes = parseInt(thisContainer.durationMinutes, 10);
                if (thisContainerMinutes !== 0 && Number.isInteger(thisContainerMinutes) && thisContainer.type !== "pause" && nextContainer) {
                    durationSummary += thisContainerMinutes
                    durationIndicesToFlag.push({ sectionIndex: i, containerIndex: j });
                } else {
                    if (!nextContainer) {
                        durationSummary += thisContainerMinutes
                        durationIndicesToFlag.push({ sectionIndex: i, containerIndex: j });
                    }
                    if (durationSummary > 120) {
                        for (let k = 0; k < durationIndicesToFlag.length; k++) {
                            let flagSection = structureJSON[durationIndicesToFlag[k].sectionIndex];
                            let flagContainer = flagSection.container[durationIndicesToFlag[k].containerIndex];
                            flagContainer.analysis['#18'] = allOptimizationArray['#18']['index'];
                        }
                    }
                    durationSummary = 0; 
                    durationIndicesToFlag = [];
                }

                // AB HIER WERDEN PAUSEN UEBERSPRUNGEN
                if (thisContainer.type === "pause") {
                    continue;
                }

                thisContainer.concept.analysis = {};

                // #2
                if (allOptimizationArray['#2']) {
                    var thisTargetLevel = thisContainer.concept.learningTargetLevel;
                    if (thisTargetLevel == allOptimizationArray['#2']['detail']) {
                        thisContainer.concept.analysis['#2'] = allOptimizationArray['#2']['index'];
                    }
                }

                // #4, #5
                var thisMethod = thisContainer.concept.method;
                if (thisMethod === mostFrequentMethod) {
                    if (allOptimizationArray['#4'] && allOptimizationArray['#4']['index']) {
                        thisContainer.concept.analysis['#4'] = allOptimizationArray['#4']['index'];
                    }
                    if (allOptimizationArray['#5'] && allOptimizationArray['#5']['index']) {
                        thisContainer.concept.analysis['#5'] = allOptimizationArray['#5']['index'];
                    }
                }

                // #6
                if (thisMethod === previousMethod && thisMethod !== '' && thisMethod !== undefined && nextContainer) {
                    sameMethodCount++;
                    methodIndicesToFlag.push({ sectionIndex: i, containerIndex: j });
                } else {
                    if (!nextContainer && thisMethod === previousMethod && thisMethod !== undefined) {
                        sameMethodCount++;
                        methodIndicesToFlag.push({ sectionIndex: i, containerIndex: j });
                    }
                    if (sameMethodCount >= 3 && sameMethodCount > highestMethodStack) {
                        // console.log('The method "' + previousMethod + '" appeared ' + sameMethodCount + ' times in a row');

                        console.log(methodIndicesToFlag);
                        for (let k = 0; k < methodIndicesToFlag.length; k++) {
                            let flagSection = structureJSON[methodIndicesToFlag[k].sectionIndex];
                            let flagContainer = flagSection.container[methodIndicesToFlag[k].containerIndex];
                            flagContainer.concept.analysis['#6'] = allOptimizationArray['#6']['index'];
                        }

                        highestMethodStack = sameMethodCount;
                    }
                    previousMethod = thisMethod; 
                    sameMethodCount = 1; 
                    methodIndicesToFlag = [{ sectionIndex: i, containerIndex: j }];
                }

                // #15, #16
                var thisPhase = thisContainer.phase;
                if (thisPhase === 'introduction' || thisPhase === 'motivation' || thisPhase === 'completion') {
                    if (allOptimizationArray['#15'] && allOptimizationArray['#15']['index']) {
                        thisContainer.analysis['#15'] = allOptimizationArray['#15']['index'];
                    }
                    if (allOptimizationArray['#16'] && allOptimizationArray['#16']['index']) {
                        thisContainer.analysis['#16'] = allOptimizationArray['#16']['index'];
                    }
                }
                
            }
        }

        // -> save updates of structureJSON in local storage
        localStorage.setItem('NLCreatorStructure', JSON.stringify(structureJSON));
        console.log(structureJSON);
        console.log("successfully saved NLCreatorStructure to localStorage"); 

        // *** DISPLAY RECOMMENDATIONS
        console.log(allOptimizationArray);
        if (Object.keys(allOptimizationArray).length !== 0) {
            for (i = 0; i < Object.keys(allOptimizationArray).length; i++) {
                var currentKey = Object.keys(allOptimizationArray)[i];
                var html = `<div class="cardTitleWrapper">
                                <div class="card bigPadding cardOptimizationProposals" data-analysis-id="">
                                    <div class="hex-container" analysis-index="${allOptimizationArray[currentKey]['index']}">
                                        <div class="hex"></div>
                                        <div class="hex-number">${allOptimizationArray[currentKey]['index']}</div>
                                    </div>
                                    <p>${allOptimizationArray[currentKey]['text']}</p>
                                </div>
                            </div>`;
                $('.cardConnectingLine').append(html);
            }
            var structureButton = `<a href="structure.html?analysis=true"><button type="button" class="backButton small">Vorschläge in Struktur ansehen</button></a>`;
            $('.optimizationProposalsWrapper').append(structureButton);
        } else {
            var html = `<div class="cardTitleWrapper">
                            <div class="card bigPadding cardOptimizationProposals" data-analysis-id="">
                                <p><b>Gut gemacht!</b><br>
                                Du hast eine sinnvolle Struktur aufgebaut, welche den individuellen Lernprozess unterstützt. Mit deiner Konzeptionierung trägst Du dazu bei, dass die Lernenden ihr Wissen erweitern und ihre Fähigkeiten verbessern können.
                                <br> Überprüfe deine Konzeption trotzdem noch einmal und achte dabei insbesondere auf folgende Punkte: <br>
                                - Inhaltlicher Umfang: Können die gewählten Inhalte in der geplanten Zeit erarbeitet werden? <br>
                                - Aufgaben: Werden herausfordernde Aufgaben gestellt, die die Erreichung der Lernziele fördern? <br>
                                - Reflexion: Werden Lernenden in ausreichendem Maße angeregt, sich mit dem eigenen Lernprozess auseinanderzusetzen (z.B. durch Hinterfragen eigener Annahmen, Einnahme alternativer Perspektiven, Analyse von Fehlern etc.)?  </p>
                            </div>
                        </div>`;
            $('.cardConnectingLine').append(html);
        }
        
        
    }
}