/* generate and save structure page content */




function getConfig() {

    var template = "presence";

    // var storageData = localStorage.getItem("NLCreatorStructure");
    // if ( storageData !== null ) {
    //     var structureJSON = JSON.parse(storageData);
    //     return structureJSON;
    // }


    if (type == "live-online-event") {
        return {
            "data": {
                "title": "Beispiel-Titel",
                "learningTargets": [],
                "format": "digital",
                "time": "",
                "timePresence": "",
                "timeDigital": "",
            },
            "content": [
                {
                    "id": 1,
                    "title": "Oberthema 1",
                    "content": [
                        {
                            "id": 2,
                            "title": "Unterthema 1",
                            "comments": [
                                {
                                    "text": "Das ist ein Test-Kommentar für das Unterthema",
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "title": "Unterthema 2",
                            "comments": [],
                        },
                    ],
                    "comments": [
                        {
                            "text": "Das ist ein Test-Kommentar für Oberthema",
                        }
                    ]
                },
            ],



            "structure": [
                {
                    "id": 4,
                    "title": "Überschrift ...",
                    "type": "live-seminar",
                    "duration": "4h",
                    "startTime": "09:00",
                    "container": [
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "motivation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "elaboration",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "application",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "completion",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "examination",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },

                    ]
                },

            ],

        };
    }


    else if (type == "presence-seminar") {
        return {
            "data": {
                "title": "Beispiel-Titel",
                "learningTargets": [],
                "format": "digital",
                "time": "",
                "timePresence": "",
                "timeDigital": "",
            },
            "content": [
                {
                    "id": 1,
                    "title": "Oberthema 1",
                    "content": [
                        {
                            "id": 2,
                            "title": "Unterthema 1",
                            "comments": [
                                {
                                    "text": "Das ist ein Test-Kommentar für das Unterthema",
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "title": "Unterthema 2",
                            "comments": [],
                        },
                    ],
                    "comments": [
                        {
                            "text": "Das ist ein Test-Kommentar für Oberthema",
                        }
                    ]
                },
            ],



            "structure": [
                {
                    "id": 4,
                    "title": "Tag 1",
                    "type": "presence-seminar",
                    "duration": "8h",
                    "startTime": "09:00",
                    "container": [
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "motivation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "elaboration",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "elaboration",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "60",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "application",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "application",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "completion",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "completion",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "examination",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },

                    ],
                },
                {
                    "id": 4,
                    "title": "Tag 2",
                    "type": "presence-seminar",
                    "duration": "8h",
                    "startTime": "09:00",
                    "container": [
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "elaboration",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "elaboration",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "60",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "application",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "application",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "completion",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Pause",
                            "type": "pause",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "completion",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "completion",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "examination",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },

                    ],
                },

            ],

        };
    }













    else if (type == "elearning") {
        return {
            "data": {
                "title": "Beispiel-Titel",
                "learningTargets": [],
                "format": "digital",
                "time": "",
                "timePresence": "",
                "timeDigital": "",
            },
            "content": [
                {
                    "id": 1,
                    "title": "Oberthema 1",
                    "content": [
                        {
                            "id": 2,
                            "title": "Unterthema 1",
                            "comments": [
                                {
                                    "text": "Das ist ein Test-Kommentar für das Unterthema",
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "title": "Unterthema 2",
                            "comments": [],
                        },
                    ],
                    "comments": [
                        {
                            "text": "Das ist ein Test-Kommentar für Oberthema",
                        }
                    ]
                },
            ],



            "structure": [
                {
                    "id": 4,
                    "title": "Lehrmittel 1",
                    "type": "elearning",
                    "duration": "1h",
                    "startTime": "09:00",
                    "container": [
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "5",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "5",
                            "phase": "motivation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "5",
                            "phase": "elaboration",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "10",
                            "phase": "application",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "5",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "10",
                            "phase": "transfer",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "5",
                            "phase": "consolidation",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "10",
                            "phase": "transfer",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "5",
                            "phase": "examination",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        },


                    ]
                },

            ],

        };
    }


















    else {
        return {
            "data": {
                "title": "Beispiel-Titel",
                "learningTargets": [],
                "format": "digital",
                "time": "",
                "timePresence": "",
                "timeDigital": "",
            },
            "content": [
                {
                    "id": 1,
                    "title": "Oberthema 1",
                    "content": [
                        {
                            "id": 2,
                            "title": "Unterthema 1",
                            "comments": [
                                {
                                    "text": "Das ist ein Test-Kommentar für das Unterthema",
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "title": "Unterthema 2",
                            "comments": [],
                        },
                    ],
                    "comments": [
                        {
                            "text": "Das ist ein Test-Kommentar für Oberthema",
                        }
                    ]
                },
            ],



            "structure": [
                {
                    "id": 4,
                    "title": "Überschrift ...",
                    "type": "live-seminar",
                    "duration": "30 min.",
                    "startTime": "09:00",
                    "container": [
                        {
                            "id": 5,
                            "title": "Überschrift eingeben...",
                            "durationMinutes": "30",
                            "phase": "introduction",
                            "content": null,
                            "concept": {
                                "isConceptCreated": false,
                                "learningTargetLevel": "",
                                "learningTargetLevelText": "",
                                "learningTargetFormulation": "",
                                "learningTargetVerb": "",
                                "method": "",
                                "socialForm": ""
                            }
                        }

                    ]
                },

            ],

        };
    }





    // return {
    //     "data": {
    //         "title": "Beispiel-Titel",
    //         "learningTargets": [],
    //         "format": "digital",
    //         "time": "",
    //         "timePresence": "",
    //         "timeDigital": "",
    //     },
    //     "content": [
    //         {
    //             "id": 1,
    //             "title": "Oberthema 1",
    //             "content": [
    //                 {
    //                     "id": 2,
    //                     "title": "Unterthema 1",
    //                     "comments": [
    //                         {
    //                             "text": "Das ist ein Test-Kommentar für das Unterthema",
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "id": 3,
    //                     "title": "Unterthema 2",
    //                     "comments": [],
    //                 },
    //             ],
    //             "comments": [
    //                 {
    //                     "text": "Das ist ein Test-Kommentar für Oberthema",
    //                 }
    //             ]
    //         },
    //     ],



    //     "structure": [
    //         {
    //             "id": 4,
    //             "title": "Grundlagen der Fachausbilderqualifizierung",
    //             "type": "presence-seminar",
    //             "duration": "8h",
    //             "container": [
    //                 {
    //                     "id": 5,
    //                     "title": "Einführung",
    //                     "durationMinutes": "30",
    //                     "phase": "",
    //                     "content": null,
    //                     "concept": {
    //                         "isConceptCreated": false,
    //                         "learningTargetLevel": "",
    //                         "learningTargetLevelText": "",
    //                         "learningTargetFormulation": "",
    //                         "learningTargetVerb": "",
    //                         "method": "",
    //                         "socialForm": ""
    //                     }
    //                 },
    //                 {
    //                     "id": 8,
    //                     "title": "Überschrift eingeben...",
    //                     "durationMinutes": "120",
    //                     "phase": "motivation",
    //                     "content": [
    //                         {
    //                             "id": 9,
    //                             "title": "Unterthema 1",
    //                         },
    //                         {
    //                             "id": 10,
    //                             "title": "Unterthema 2",
    //                         }
    //                     ],
    //                     "concept": {
    //                         "isConceptCreated": true,
    //                         "learningTargetLevel": "1",
    //                         "learningTargetLevelText": "Wissen & imitierend handeln",
    //                         "learningTargetFormulation": "irgendwas",
    //                         "learningTargetVerb": "ausführen",
    //                         "method": "Brainstorming",
    //                         "socialForm": "group"
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 4,
    //             "title": "Ausbildungsumsetzung im Betrieb",
    //             "type": "elearning",
    //             "duration": "2h",
    //             "container": [
    //                 {
    //                     "id": 5,
    //                     "title": "Einführung",
    //                     "durationMinutes": "30",
    //                     "phase": "elaboration",
    //                     "content": [
    //                         {
    //                             "id": 6,
    //                             "title": "Ziel & Überblick",
    //                         },
    //                         {
    //                             "id": 7,
    //                             "title": "Lernen lernen",
    //                         }
    //                     ],
    //                     "concept": {
    //                         "isConceptCreated": true,
    //                         "learningTargetLevel": "1",
    //                         "learningTargetLevelText": "Wissen & imitierend handeln",
    //                         "learningTargetFormulation": "",
    //                         "learningTargetVerb": "ausführen",
    //                         "method": "Brainstorming",
    //                         "socialForm": "group"
    //                     }
    //                 },
    //                 {
    //                     "id": 8,
    //                     "title": "Überschrift eingeben...",
    //                     "durationMinutes": "",
    //                     "phase": "motivation",
    //                     "content": [
    //                         {
    //                             "id": 9,
    //                             "title": "Unterthema 1",
    //                         },
    //                         {
    //                             "id": 10,
    //                             "title": "Unterthema 2",
    //                         }
    //                     ],
    //                     "concept": {
    //                         "isConceptCreated": false,
    //                         "learningTargetLevel": "",
    //                         "learningTargetLevelText": "",
    //                         "learningTargetFormulation": "",
    //                         "learningTargetVerb": "",
    //                         "method": "",
    //                         "socialForm": ""
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 4,
    //             "title": "It's your turn!",
    //             "type": "practice",
    //             "duration": "2h",
    //             "container": [
    //                 {
    //                     "id": 5,
    //                     "title": "Einführung",
    //                     "durationMinutes": "30",
    //                     "phase": "introduction",
    //                     "content": [
    //                         {
    //                             "id": 6,
    //                             "title": "Ziel & Überblick",
    //                         },
    //                         {
    //                             "id": 7,
    //                             "title": "Lernen lernen",
    //                         }
    //                     ],
    //                     "concept": {
    //                         "isConceptCreated": true,
    //                         "learningTargetLevel": "1",
    //                         "learningTargetLevelText": "Wissen & imitierend handeln",
    //                         "learningTargetFormulation": "",
    //                         "learningTargetVerb": "ausführen",
    //                         "method": "Brainstorming",
    //                         "socialForm": "group"
    //                     }
    //                 },
    //                 {
    //                     "id": 8,
    //                     "title": "Überschrift eingeben...",
    //                     "durationMinutes": "30",
    //                     "phase": "motivation",
    //                     "content": [
    //                         {
    //                             "id": 9,
    //                             "title": "Unterthema 1",
    //                         },
    //                         {
    //                             "id": 10,
    //                             "title": "Unterthema 2",
    //                         }
    //                     ],
    //                     "concept": {
    //                         "isConceptCreated": true,
    //                         "learningTargetLevel": "1",
    //                         "learningTargetLevelText": "Wissen & imitierend handeln",
    //                         "learningTargetFormulation": "",
    //                         "learningTargetVerb": "ausführen",
    //                         "method": "Brainstorming",
    //                         "socialForm": "group"
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // };
}

// JSON template
structureJSON = [
    // {
    //     "id": 0,
    //     "title": "",
    //     "type": "",
    //     "duration": "",
    //     "startTime": ""
    // }  
]

// SAVE STRUCTURE

// save data from content page
function saveStructure() {
    // get old content concept, if not changed
    var currentStorageData = localStorage.getItem("NLCreatorStructure");
    if ( currentStorageData !== null ) {
        var currentStructureJSON = JSON.parse(currentStorageData);
    }

    structureJSON = [];
    $("#structure .structureElement").each(function( i ) {
        structureJSON[i] = {};
        structureJSON[i]["id"] = i;
        structureJSON[i]["title"] = $(this).find(".structureElementHeader .structureElementHeaderHeading").html();
        structureJSON[i]["type"] = $(this).attr("data-type");
        structureJSON[i]["duration"] = $(this).find(".structureElementHeaderDurationValue").html();
        structureJSON[i]["startTime"] = $(this).find(".headerStartingTime input").val();
        structureJSON[i]["container"] = []; 
        $(this).find(".structureElementInner .structureCard").each(function( j ) {
            structureJSON[i]["container"].push({});
            structureJSON[i]["container"][j]["id"] = j;
            structureJSON[i]["container"][j]["type"] = $(this).attr("data-container-type");
            structureJSON[i]["container"][j]["title"] = $(this).find(".structureCardHeaderText").html();
            structureJSON[i]["container"][j]["durationMinutes"] = $(this).find(".structureCardHeaderDuration input").val();
            if (currentStructureJSON[i]?.container[j]?.analysis) {
                structureJSON[i]["container"][j]["analysis"] = currentStructureJSON[i]["container"][j]["analysis"];
            }
            if (structureJSON[i]["container"][j]["type"] === "base") {
                structureJSON[i]["container"][j]["phase"] = $(this).find(".structureCardHeaderSelectPhase").attr("data-selected-phase");
                if ( $(this).hasClass("noContent") ) {
                        structureJSON[i]["container"][j]["isContentCreated"] = false;
                } else {
                    structureJSON[i]["container"][j]["isContentCreated"] = true;
                }
                structureJSON[i]["container"][j]["content"] = [];
                $(this).find(".contentCard").each(function( k ) {
                    structureJSON[i]["container"][j]["content"].push({});
                    structureJSON[i]["container"][j]["content"][k]["id"] = $(this).attr("data-id");
                    structureJSON[i]["container"][j]["content"][k]["type"] = $(this).hasClass("bigContentCard") ? "big" : "small";
                    structureJSON[i]["container"][j]["content"][k]["title"] = $(this).find(".contentCardTitle").html();
                    if ( $(this).hasClass("inContentConceptEditMode") ) {
                        // console.log("neuer content inhalt gespeichert");
                        structureJSON[i]["container"][j]["content"][k]["contentConcept"] = [];
                        $("#moveLightbox").find(".contentConceptCard").each(function( l ) {
                            structureJSON[i]["container"][j]["content"][k]["contentConcept"].push({});
                            structureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["id"] = l;
                            structureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["title"] = $(this).find(".contentConceptCardTitle").html();
                        });
                    } else if (currentStructureJSON[i]?.container?.[j]?.content?.[k]) {
                        if ( currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"] ) {
                            // console.log("alte content inhalte aus altem local storage save übernommen");
                            structureJSON[i]["container"][j]["content"][k]["contentConcept"] = [];
                            $(currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"]).each(function( l ) {
                                structureJSON[i]["container"][j]["content"][k]["contentConcept"].push({});
                                structureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["id"] = currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["id"];
                                structureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["title"] = currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["title"];
                            });
                        }
                    }
                });
                structureJSON[i]["container"][j]["concept"] = {};
                if ( $(this).find(".structureCardBottom").hasClass("empty") ) {
                    structureJSON[i]["container"][j]["concept"]["isConceptCreated"] = false;
                } else {
                    structureJSON[i]["container"][j]["concept"]["isConceptCreated"] = true;
                }
                structureJSON[i]["container"][j]["concept"]["learningTargetLevel"] = $(this).find(".conceptLearningTargetLevel").attr("data-level");
                structureJSON[i]["container"][j]["concept"]["learningTargetLevelText"] = $(this).find(".conceptLearningTargetLevel .conceptText .conceptContent").html();
                structureJSON[i]["container"][j]["concept"]["learningTargetFormulation"] = $(this).find(".conceptLearningTargetFormulation").attr("data-formulation");
                structureJSON[i]["container"][j]["concept"]["learningTargetVerb"] = $(this).find(".conceptLearningTargetFormulation").attr("data-verb");
                structureJSON[i]["container"][j]["concept"]["socialForm"] = $(this).find(".conceptSocialForm").attr("data-socialform");
                structureJSON[i]["container"][j]["concept"]["method"] = $(this).find(".conceptMethods").attr("data-method");
                structureJSON[i]["container"][j]["concept"]["info"] = $(this).find(".conceptInformationTextarea").val();
                structureJSON[i]["container"][j]["concept"]["task"] = $(this).find(".conceptTaskTextarea").val();
                if (currentStructureJSON[i]?.container[j]?.concept?.analysis) {
                    structureJSON[i]["container"][j]["concept"]["analysis"] = currentStructureJSON[i]["container"][j]["concept"]["analysis"];
                }
            }
        });
    });

    console.log(structureJSON);

    // save in localStorage
    storageData = JSON.stringify(structureJSON);
    localStorage.setItem("NLCreatorStructure", storageData);

    console.log("successfully saved NLCreatorStructure to localStorage");

    // generate new analisis in stucture
    var isAnalysis = getUrlParameter('analysis');
    if (isAnalysis === 'true') {
        analyzeStructure();
    }
}

$(document).on("click", ".lightboxContentInsert, #structure .conceptRowLightboxLink, #structure .saveLearningTargetFormulation, .addStructureCard, .structureCardDelete, .structureElementDelete, .addStructureElementButton, .structureElementButton, .addSectionButton, .conceptCollapse, .contentCardDelete", function() {
    setTimeout(function() {
        saveStructure();
        if (findGetParameter('analysis') !== 'true') {
            flagStructureAsApproved(false);
        };
    }, 100);
});

$(document).on("input", "#structure .structureElementHeaderHeading, #structure .structureCardHeaderText, #structure input, #structure select, .structureCardContentInner .contentCardTitle", function() {
    saveStructure();
    if (findGetParameter('analysis') !== 'true') {
        flagStructureAsApproved(false);
    };
});





// GENERATE STRUCTURE

function generateSection(section) {
    var html = "";

    var sectionName = "";
    if (section.type == "live-seminar") {
        sectionName = "Live-Online Veranstaltung";
    } else if (section.type == "presence-seminar") {
        sectionName = "Präsenz-Veranstaltung";
    } else if (section.type == "elearning") {
        sectionName = "E-Learning";
    } else if (section.type == "practice-transfer") {
        sectionName = "Transferphase";
    } else if (section.type == "practice-self-learning") {
        sectionName = "Selbstlernphase";
    } else if (section.type == "practice-project") {
        sectionName = "Projektphase";
    }


    html += `
    <div class="structureElement" data-type="${section.type}">
        <div class="structureElementHeader">
            <button type="button" class="structureElementButton structureElementDelete smallPadding">
                <span class="dooIconContainer dooContainerName-trash userIcon">
                    <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
                </span>
            </button>
            <div class="structureElementHeaderRow ${section.title ? `` : 'empty'}">
                <h2 class="structureElementHeaderHeading" contenteditable="true" spellcheck="true">${section.title}</h2>
                <h2 class="structureElementHeaderPlaceholder">Überschrift ...</h2>
                <div class="headerTypeBadge fontSizeSmall">${sectionName}</div>
            </div> 
            <div class="structureElementHeaderRow headerRowTime fontSizeSmall">
                <div class="structureElementHeaderDuration">Dauer: <span class="structureElementHeaderDurationValue">${section.duration !== "" ? section.duration : "00:00"}</span> Stunden</div>
                <div class="headerStartingTime">
                    <label class="startingTimeLabel">
                        <span class="startingTimeLabelText">Startzeit:</span>
                        <input type="time" ${section.startTime ? `` : 'class="empty"'} ${section.startTime ? `value="${section.startTime}"` : ''}>
                    </label>
                </div>
            </div>
        </div>
        <div class="structureElementInner">
    `;

    if (section.container) {
        for (j = 0; j < section.container.length; j++) {
            var container = section.container[j];
            html += generateContainer(container, section.type);
        }
    }

    html += `
        </div>
        <div class="addStructurePartContainer">
            <div class="addStructurePartOverlay"></div>
            <div class="addStructurePartInner">
                <div class="addStructureBar">
                    <span class="dooIconContainer dooContainerName-btnadd">
                        <i class="dooIcon dooIcon-btnadd dooIconSize-16"></i>
                    </span>
                </div>
                <div class="addStructureButtons">
                    <button type="button" class="tertiaryButton small addStructurePartButton addStructureCard" data-container-type="base">+ Abschnitt</button>
                    <button type="button" class="tertiaryButton small addStructurePartButton addStructureCard" data-container-type="pause">+ Pause</button>
                </div>
            </div>
        </div>
    </div>
    `;

    return html;
}



function generateContainer(container, sectionType) {
    var html = "";

    var introduction = container.phase == "introduction";
    var motivation = container.phase == "motivation";
    var elaboration = container.phase == "elaboration";
    var consolidation = container.phase == "consolidation";
    var application = container.phase == "application";
    var transfer = container.phase == "transfer";
    var completion = container.phase == "completion";
    var examination = container.phase == "examination";

    var phaseName = "";
    if (container.phase === "introduction") {
        phaseName = "Einführung";
    } else if (container.phase === "motivation") {
        phaseName = "Motivation";
    } else if (container.phase === "elaboration") {
        phaseName = "Erarbeitung";
    } else if (container.phase === "consolidation") {
        phaseName = "Festigung";
    } else if (container.phase === "application") {
        phaseName = "Anwendung";
    } else if (container.phase === "transfer") {
        phaseName = "Transfer";
    } else if (container.phase === "completion") {
        phaseName = "Abschluss";
    } else if (container.phase === "examination") {
        phaseName = "Prüfung";
    }

    if (container.type == "pause") {

        html += `
        <div class="structureCard pause" data-container-type="${container.type ? `${container.type}` : ''}">
            <div class="card structureCardInner">
                <div class="structureCardButton structureCardDrag smallPadding">
                    <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                        <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
                    </span>
                </div>
                <button type="button" class="structureCardButton structureCardDelete smallPadding">
                    <span class="dooIconContainer dooContainerName-trash userIcon">
                        <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
                    </span>
                </button>
                <div class="structureCardHeader ${container.title ? `` : 'empty'}">
                    <div class="structureCardHeaderTop padding">
                        <span class="structureCardHeaderText">Pause</span>
                        <label class="structureCardHeaderDuration">
                            <input type="text" class="inputOnlyNumbers ${container.durationMinutes ? `` : 'empty'}" maxlength="3" ${container.durationMinutes ? `value="${container.durationMinutes}"` : ''}>
                            <span class="durationMinLabel">Min.</span>
                        </label>
                        <div class="structureCardHeaderTime fontSizeExtraSmall"><span class="timeStart"></span> - <span class="timeEnd"></span> Uhr</div>
                    </div>
                </div>
            </div>
            <div class="addStructurePartContainer">
                <div class="addStructurePartOverlay"></div>
                <div class="addStructurePartInner">
                    <div class="addStructureBar">
                        <span class="dooIconContainer dooContainerName-btnadd">
                            <i class="dooIcon dooIcon-btnadd dooIconSize-16"></i>
                        </span>
                    </div>
                    <div class="addStructureButtons">
                        <button type="button" class="tertiaryButton small addStructurePartButton addStructureCard" data-container-type="base">+ Abschnitt</button>
                        <button type="button" class="tertiaryButton small addStructurePartButton addStructureCard" data-container-type="pause">+ Pause</button>
                    </div>
                </div>
            </div>
        </div>
        `;

    } else {

        html += `
        <div class="structureCard ${container.isContentCreated ? `` : 'noContent'}" data-container-type="${container.type ? `${container.type}` : ''}">
            <div class="card structureCardInner">
            <div class="hex-containers">
                    ${
                        container?.analysis && Object.keys(container?.analysis).length !== 0 ? Object.keys(container.analysis).map(key => {
                            const customKeys = ["#15", "#16", "#18"];
                            if (customKeys.includes(key)) {
                                const analysisIndex = container.analysis[key];
                                return `
                                <div class="hex-container" analysis-index="${analysisIndex}">
                                    <div class="hex"></div>
                                    <div class="hex-number">${analysisIndex}</div>
                                </div>`;
                            }
                        }).join('') 
                        : ''
                    }
                    </div>
            <div class="structureCardButton structureCardDrag smallPadding">
                <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                    <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
                </span>
            </div>
            <button type="button" title="Duplizieren" class="structureCardButton structureCardCopy smallPadding">
                <span class="dooIconContainer dooContainerName-copy userIcon">
                    <i class="dooIcon dooIcon-copy dooIconSize-16"></i>
                </span>
            </button>
            <button type="button" class="structureCardButton structureCardDelete smallPadding">
                <span class="dooIconContainer dooContainerName-trash userIcon">
                    <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
                </span>
            </button>
            <div class="structureCardHeader ${container.title ? `` : 'empty'}">
                <div class="structureCardHeaderTop padding">
                    <span class="structureCardHeaderText" contenteditable="true" spellcheck="true">${container.title ? `${container.title}` : ''}</span>
                    <div class="structureCardHeaderPlaceholder">Überschrift eingeben...</div>
                    <div class="structureCardHeaderTime fontSizeExtraSmall"><span class="timeStart"></span> - <span class="timeEnd"></span> Uhr</div>
                </div>
                <div class="structureCardHeaderBottom padding">
                    <div class="conceptRow structureCardHeaderSelectPhase conceptSelectPhase ${container.phase ? '' : 'empty'}" data-selected-phase="${container.phase ? `${container.phase}` : ''}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Phase:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="introduction">Einführung</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseIntroduction">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="motivation">Motivation</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseMotivation">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="elaboration">Erarbeitung</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseElaboration">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="consolidation">Festigung</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseConsolidation">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="application">Anwendung</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseApplication">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="transfer">Transfer</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseTransfer">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="completion">Abschluss</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseCompletion">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptPhaseLink" data-phase="examination">Prüfung</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="phaseExamination">?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton">
                            <span class="newText">Phase wählen...</span>
                            <span class="conceptText">
                                <span class="conceptContent">${container.phase ? `${phaseName}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-arrow-down userIcon">
                                <i class="dooIcon dooIcon-arrow-down dooIconSize-14"></i>
                            </span>
                        </button>
                    </div>
                    <label class="structureCardHeaderDuration">
                        <input type="text" class="inputOnlyNumbers ${container.durationMinutes ? `` : 'empty'}" maxlength="3" ${container.durationMinutes ? `value="${container.durationMinutes}"` : ''}>
                        <span class="durationMinLabel">Min.</span>
                    </label>
                </div>
            </div>
            <div class="structureCardContent">
                <div class="structureCardContentInner padding">
            `;


        if (Array.isArray(container.content) && container.content.length) {
            for (k = 0; k < container.content.length; k++) {
                var content = container.content[k];
                html += generateContentCard(content);
            }
        }

        var socialFormName = "";
        if (container.concept.socialForm == "single") {
            socialFormName = "Einzelarbeit";
        } else if (container.concept.socialForm == "partner") {
            socialFormName = "Partnerarbeit";
        } else if (container.concept.socialForm == "group") {
            socialFormName = "Gruppenarbeit";
        } else if (container.concept.socialForm == "plenum") {
            socialFormName = "Plenum";
        }

        var sectionTypeGroup = "";
        if (sectionType === 'practice-transfer' || sectionType === 'practice-self-learning' || sectionType === 'practice-project')  {
            sectionTypeGroup = "practice";
        } else if (sectionType === 'elearning') {
            sectionTypeGroup = "elearning";
        } else {
            sectionTypeGroup = "event";
        }

        html += `
                </div>
                <div class="addContentCardWrapper padding">
                    <button type="button" class="addContentCard">+ Inhalt</button>
                    <button type="button" class="addContentCardEmpty">+ Inhalt</button>
                </div>
            </div>
            <div class="structureCardBottom ${container.concept.isConceptCreated ? `` : 'empty'} ${sectionTypeGroup !== 'practice' ? (container.phase ? `` : 'conceptDisabled') : ``}">
                <button type="button" class="buttonText conceptNew">+ Feinplanung</button>
                <button type="button" class="buttonText conceptCollapse padding">
                    <span class="conceptCollapseArrow dooIconContainer dooContainerName-toggle-down userIcon">
                        <i class="dooIcon dooIcon-toggle-down dooIconSize-12"></i>
                    </span> Feinplanung </button>
                <div class="conceptWrapper padding">
                    ${sectionTypeGroup !== 'practice' ? `
                    <div class="conceptRow conceptLearningTargetLevel ${container.concept.learningTargetLevel ? `` : 'empty next'}" data-level="${container.concept.learningTargetLevel ? `${container.concept.learningTargetLevel}` : ''}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Lernzielstufe wählen:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink learningTargetLevelLink" data-level="1">Stufe 1: <span class="copy">Wissen & imitierend handeln</span>
                                            </a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel1">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink learningTargetLevelLink" data-level="2">Stufe 2: <span class="copy">Verstehen & schematisch handeln</span>
                                            </a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel2">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink learningTargetLevelLink" data-level="3">Stufe 3: <span class="copy">Anwenden & fachgerecht handeln</span>
                                            </a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel3">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink learningTargetLevelLink" data-level="4">Stufe 4: <span class="copy">Analysieren & kontextabhängig handeln</span>
                                            </a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel4">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink learningTargetLevelLink" data-level="5">Stufe 5: <span class="copy">Evaluieren & variabel handeln</span>
                                            </a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel5">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink learningTargetLevelLink" data-level="6">Stufe 6: <span class="copy">Erschaffen</span>
                                            </a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="learningTargetLevel6">?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton" data-concepttype="learningTargetLevel">
                            <span class="newText">+ Lernzielstufe</span>
                            <span class="conceptText">
                                <span class="conceptTitle">${container.concept.learningTargetLevel ? `Lernzielstufe ${container.concept.learningTargetLevel}:` : ''}</span>
                                <span class="conceptContent">${container.concept.learningTargetLevelText ? `${container.concept.learningTargetLevelText}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                        <div class="hex-containers">
                        ${
                            container.concept?.analysis && Object.keys(container.concept?.analysis).length !== 0 ? Object.keys(container.concept.analysis).map(key => {
                                const customKeys = ["#2"];
                                if (customKeys.includes(key)) {
                                    const analysisIndex = container.concept.analysis[key];
                                    return `
                                    <div class="hex-container" analysis-index="${analysisIndex}">
                                        <div class="hex"></div>
                                        <div class="hex-number">${analysisIndex}</div>
                                    </div>`;
                                }
                            }).join('') 
                            : ''
                        }
                        </div>
                    </div>
                    ` : ''}
                    ${sectionTypeGroup !== 'practice' ? `
                    <div class="conceptRow conceptLearningTargetFormulation ${container.concept.learningTargetFormulation ? `` : 'empty'} ${container.concept.learningTargetLevel ? `` : 'disabled'}" data-formulation="${container.concept.learningTargetFormulation ? `${container.concept.learningTargetFormulation}` : ''}" data-verb="${container.concept.learningTargetVerb ? `${container.concept.learningTargetVerb}` : ''}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Lernzielformulierung:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <span class="learningTargetFormulationHeadline">Die Teilnehmenden können
                                            <div class="infoFormButtonWrapper">
                                                <button class="infotextButton infoFormButton" type="button" title="Erklärung anzeigen" data-infotext="structureLearningTargetFormulation">?</button>
                                            </div>
                                        </span>
                                        <div class="learningTargetFormulationInner">
                                            <input type="text" placeholder="Text eingeben..." class="learningTargetFormulationText empty">
                                            <label class="chooseLearningTargetFormulation">
                                                <div class="selectWrapper">
                                                    <select class="learningTargetSelect empty"></select>
                                                </div>
                                            </label>                                            
                                        </div>
                                        <button type="button" class="primaryButton small saveLearningTargetFormulation inactive">Übernehmen</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton" data-concepttype="learningTargetFormulation">
                            <span class="newText">+ Lernzielformulierung</span>
                            <span class="conceptText">
                                <span class="conceptTitle">Lernzielformulierung:</span>
                                <span class="conceptContent">Die Teilnehmenden können ${container.concept.learningTargetFormulation ? `${container.concept.learningTargetFormulation}` : ''} ${container.concept.learningTargetVerb ? `${container.concept.learningTargetVerb}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                    </div>
                    ` : ''}
                    ${sectionTypeGroup !== 'practice' && sectionTypeGroup !== 'elearning' ? `
                    <div class="conceptRow conceptSocialForm ${container.concept.socialForm ? `` : 'empty next'}" data-socialForm="${container.concept.socialForm ? `${container.concept.socialForm}` : ''}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Sozialform wählen:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptSocialFormLink" data-form="single">Einzelarbeit</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="socialFormSingle">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptSocialFormLink" data-form="partner">Partnerarbeit</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="socialFormPartner">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptSocialFormLink" data-form="group">Gruppenarbeit</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="socialFormGroup">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptSocialFormLink" data-form="plenum">Plenum</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="socialFormPlenum">?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton" data-concepttype="socialForm">
                            <span class="newText">+ Sozialform</span>
                            <span class="conceptText">
                                <span class="conceptTitle">${container.concept.socialForm ? `Sozialform:` : ''}</span>
                                <span class="conceptContent">${container.concept.socialForm ? `${socialFormName}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                    </div>
                    ` : ''}
                    ${sectionTypeGroup !== 'practice' && sectionTypeGroup !== 'elearning' ? `
                    <div class="conceptRow conceptMethods ${container.concept.method ? `` : 'empty'} ${container.concept.learningTargetLevel ? `` : 'disabled'}" data-method="${container.concept.method ? `${container.concept.method}` : ''}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Empfohlene Methode wählen:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptMethodLink recommendation">Brainstorming</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodBrainstorming">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptMethodLink recommendation">Quizaufgaben</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodQuizaufgaben">?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton" data-conceptType="method">
                            <span class="newText">+ Methode</span>
                            <span class="conceptText">
                                <span class="conceptTitle">${container.concept.method ? `Methode:` : ''}</span>
                                <span class="conceptContent">${container.concept.method ? `${container.concept.method}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                       <div class="hex-containers">
                        ${
                            container.concept?.analysis && Object.keys(container.concept?.analysis).length !== 0 ? Object.keys(container.concept.analysis).map(key => {
                                const customKeys = ["#4", "#5", "#6"];
                                if (customKeys.includes(key)) {
                                    const analysisIndex = container.concept.analysis[key];
                                    return `
                                    <div class="hex-container" analysis-index="${analysisIndex}">
                                        <div class="hex"></div>
                                        <div class="hex-number">${analysisIndex}</div>
                                    </div>`;
                                }
                            }).join('') 
                            : ''
                        }
                        </div>
                    </div>
                    ` : ''}
                    ${sectionTypeGroup === '' ? `              
                    <div class="conceptRow conceptTask empty">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Aufgabe wählen:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptTaskLink recommendation">Brainstorming</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodBrainstorming">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptTaskLink recommendation">Video</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodVideo">?</button>
                                        </div>
                                        <div class="hasInfoButton">
                                            <a href="#" class="conceptRowLightboxLink conceptTaskLink recommendation">Quiz</a>
                                            <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodQuiz">?</button>
                                        </div>
                                        <a href="#" class="conceptRowLightboxMoreCollapse"> Weitere Aufgaben <span class="conceptCollapseArrow dooIconContainer dooContainerName-toggle-down userIcon">
                                                <i class="dooIcon dooIcon-toggle-down dooIconSize-12"></i>
                                            </span>
                                        </a>
                                        <div class="conceptRowLightboxMore">
                                            <div class="hasInfoButton">
                                                <a href="#" class="conceptRowLightboxLink conceptTaskLink">Kurzumfrage</a>
                                                <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodKurzumfrage">?</button>
                                            </div>
                                            <div class="hasInfoButton">
                                                <a href="#" class="conceptRowLightboxLink conceptTaskLink">Lehrvortrag</a>
                                                <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodLehrvortrag">?</button>
                                            </div>
                                            <div class="hasInfoButton">
                                                <a href="#" class="conceptRowLightboxLink conceptTaskLink">PDF-Datei</a>
                                                <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodPDF">?</button>
                                            </div>
                                            <div class="hasInfoButton">
                                                <a href="#" class="conceptRowLightboxLink conceptTaskLink">Diskussion</a>
                                                <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="methodDiskussion">?</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton">
                            <span class="newText">+ Aufgabe</span>
                            <span class="conceptText">
                                <span class="conceptTitle"></span>
                                <span class="conceptContent"></span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                    </div>
                    ` : ''}
                    ${sectionTypeGroup === 'practice' ? `
                    <div class="conceptRow conceptTask ${container.concept.task ? `` : 'empty'}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Aufgabenstellung:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <textarea class="conceptTaskTextarea">${container.concept.task ? `${container.concept.task}` : ''}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton">
                            <span class="newText">+ Aufgabenstellung</span>
                            <span class="conceptText">
                                <span class="conceptTitle">${container.concept.task ? `Aufgabenstellung:` : ''}</span>
                                <span class="conceptContent">${container.concept.task ? `${container.concept.task}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                    </div>
                    ` : ''}
                    <div class="conceptRow conceptInformation ${container.concept.info ? `` : 'empty'}">
                        <div class="conceptRowLightbox">
                            <div class="conceptRowLightboxBackground"></div>
                            <div class="conceptRowLightboxContent">
                                <div class="card">
                                    <div class="conceptRowLightboxHeader">Zusätzliche Informationen:</div>
                                    <div class="conceptRowLightboxInner thinScrollbar">
                                        <textarea class="conceptInformationTextarea">${container.concept.info ? `${container.concept.info}` : ''}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="conceptButton">
                            <span class="newText">+ Zusätzliche Informationen</span>
                            <span class="conceptText">
                                <span class="conceptTitle">${container.concept.info ? `Informationen:` : ''}</span>
                                <span class="conceptContent">${container.concept.info ? `${container.concept.info}` : ''}</span>
                            </span>
                            <span class="conceptEditButton dooIconContainer dooContainerName-pencil userIcon">
                                <i class="dooIcon dooIcon-pencil dooIconSize-16"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <div class="addStructurePartContainer">
                <div class="addStructurePartOverlay"></div>
                <div class="addStructurePartInner">
                    <div class="addStructureBar">
                        <span class="dooIconContainer dooContainerName-btnadd">
                            <i class="dooIcon dooIcon-btnadd dooIconSize-16"></i>
                        </span>
                    </div>
                    <div class="addStructureButtons">
                        <button type="button" class="tertiaryButton small addStructurePartButton addStructureCard" data-container-type="base">+ Abschnitt</button>
                        <button type="button" class="tertiaryButton small addStructurePartButton addStructureCard" data-container-type="pause">+ Pause</button>
                    </div>
                </div>
            </div>
        </div>
        `;

    }

    return html;
}


function generateContentCard(content) {
    var html = "";

    html += `
    <div class="contentCard ${content.title ? `` : 'empty'} ${content.type == "big" ? 'bigContentCard' : ''}" data-id="${content.id ? `${content.id}` : ''}" data-type="${content.type ? `${content.type}` : ''}">
        <div class="contentCardIcon contentCardDragIcon smallPadding">
            <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
            </span>
        </div>
        <div class="contentCardIcon contentCardCheckbox smallPadding">
            <label class="checkboxItem">
                <input type="checkbox">
                <span></span>
            </label>
        </div>
        <div class="contentCardTitle smallPadding" contenteditable="true">${content.title ? `${content.title}` : ''}</div>
        <div class="contentCardPlaceholder">Unterthema eingeben...</div>
        <button type="button" title="Kommentare" class="contentCardIcon contentCardCommentIcon smallPadding">
            <span class="numberOfComments"></span>
            <span class="dooIconContainer dooContainerName-community userIcon"> 
                <i class="dooIcon dooIcon-community dooIconSize-20"></i>
            </span>
        </button>
        <button type="button" title="Löschen" class="contentCardButton contentCardDelete smallPadding">
            <span class="dooIconContainer dooContainerName-trash userIcon">
                <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
            </span>
        </button>
        <button type="button" title="Duplizieren" class="contentCardButton contentCardCopy smallPadding">
            <span class="dooIconContainer dooContainerName-copy userIcon">
                <i class="dooIcon dooIcon-copy dooIconSize-16"></i>
            </span>
        </button>
        <button type="button" title="Bearbeiten" class="contentCardButton contentCardEdit smallPadding">
            <span class="dooIconContainer dooContainerName-edit userIcon">
                <i class="dooIcon dooIcon-edit dooIconSize-16"></i>
            </span>
        </button>
    </div>
    `;

    return html;
}



function generateContentConcept(contentCard) {

    var currentStorageData = localStorage.getItem("NLCreatorStructure");
    if ( currentStorageData !== null ) {
        var currentStructureJSON = JSON.parse(currentStorageData);
    }

    var html = "";

    $("#structure .structureElement").each(function( i ) {
        $(this).find(".structureElementInner .structureCard").each(function( j ) {
            $(this).find(".contentCard").each(function( k ) {
                if ( $(this).hasClass("inContentConceptEditMode") ) {
                    if ( currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"] ) {
                        $(currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"]).each( function( l ) {
                            // var conceptContentId = currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["id"];
                            var conceptContentTitle = currentStructureJSON[i]["container"][j]["content"][k]["contentConcept"][l]["title"];
                            html += `
                                <div class="contentConceptCard">
                                    <div class="contentConceptCardIcon contentConceptCardDragIcon smallPadding ">
                                        <span class="dooIconContainer dooContainerName-drag_handle userIcon">
                                            <i class="dooIcon dooIcon-drag_handle dooIconSize-16"></i>
                                        </span>
                                    </div>
                                    <div class="contentConceptCardTitle ${conceptContentTitle == "Inhaltstyp auswählen..." ? 'contentConceptCardUnset' : ''}">${conceptContentTitle}</div>
                                    <div class="contentConceptCardIcon contentConceptCardSelectIcon smallPadding ">
                                        <span class="dooIconContainer dooContainerName-arrow-down userIcon">
                                            <i class="dooIcon dooIcon-arrow-down dooIconSize-18"></i>
                                        </span>
                                    </div>
                                    <button type="button" title="Löschen" class="contentCardButton contentCardDelete smallPadding">
                                        <span class="dooIconContainer dooContainerName-trash userIcon">
                                            <i class="dooIcon dooIcon-trash dooIconSize-16"></i>
                                        </span>
                                    </button>
                                    <div class="contentConceptDropdown">
                                        <div class="contentConceptDropdownRow firstDropdownRow">
                                            <div class="contentConceptDropdownContainer">
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Text" ? 'contentConceptSelected' : ''}">Text</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Überschrift" ? 'contentConceptSelected' : ''}">Überschrift</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Überschrift mit Text" ? 'contentConceptSelected' : ''}">Überschrift mit Text</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Auflistung" ? 'contentConceptSelected' : ''}">Auflistung</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Sprechblase" ? 'contentConceptSelected' : ''}">Sprechblase</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Notizzettel" ? 'contentConceptSelected' : ''}">Notizzettel</div>
                                            </div>

                                            <div class="contentConceptDropdownContainer">
                                                <div class="contentConceptDropdownItem" ${conceptContentTitle == "Bild" ? 'contentConceptSelected' : ''}>Bild</div>
                                                <div class="contentConceptDropdownItem" ${conceptContentTitle == "Panorama" ? 'contentConceptSelected' : ''}>Panorama</div>
                                                <div class="contentConceptDropdownItem" ${conceptContentTitle == "Text mit Bild" ? 'contentConceptSelected' : ''}>Text mit Bild</div>
                                                <div class="contentConceptDropdownItem" ${conceptContentTitle == "Text auf Hintergrund" ? 'contentConceptSelected' : ''}>Text auf Hintergrund</div>
                                                <div class="contentConceptDropdownItem" ${conceptContentTitle == "Bild-Slider" ? 'contentConceptSelected' : ''}>Bild-Slider</div>
                                            </div>

                                            <div class="contentConceptDropdownContainer">
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Lokales Video" ? 'contentConceptSelected' : ''}">Lokales Video</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Externes Video" ? 'contentConceptSelected' : ''}">Externes Video</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Audio" ? 'contentConceptSelected' : ''}">Audio</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "PDF" ? 'contentConceptSelected' : ''}">PDF</div>
                                            </div>
                                        </div>
                                        <div class="contentConceptDropdownRow secondDropdownRow">
                                            <div class="contentConceptDropdownContainer">
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Accordion" ? 'contentConceptSelected' : ''}">Accordion</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Tab-Element" ? 'contentConceptSelected' : ''}">Tab-Element</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Bild mit Hotspots" ? 'contentConceptSelected' : ''}">Bild mit Hotspots</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Zeitstrahl" ? 'contentConceptSelected' : ''}">Zeitstrahl</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Slider" ? 'contentConceptSelected' : ''}">Slider</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Lernkarte" ? 'contentConceptSelected' : ''}">Lernkarte</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Bildvergleich" ? 'contentConceptSelected' : ''}">Bildvergleich</div>
                                            </div>

                                            <div class="contentConceptDropdownContainer">
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Single/Multiple Choice-Frage" ? 'contentConceptSelected' : ''}">Single/Multiple Choice-Frage</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Zuordnungs-Frage" ? 'contentConceptSelected' : ''}">Zuordnungs-Frage</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Bilder-Frage" ? 'contentConceptSelected' : ''}">Bilder-Frage</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Lückentext-Frage" ? 'contentConceptSelected' : ''}">Lückentext-Frage</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Reihenfolge-Frage" ? 'contentConceptSelected' : ''}">Reihenfolge-Frage</div>
                                                <div class="contentConceptDropdownItem ${conceptContentTitle == "Schieberegler-Frage" ? 'contentConceptSelected' : ''}">Schieberegler-Frage</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                    } 
                }
            });
        });
    });

    $("#moveLightbox").find(".contentConceptInner").html(html);
}

function structureTimeCalculation() {
    $(".structureElement").each( function() {
        var initialTime = $(this).find(".headerStartingTime input").val();
        var sectionDuration = 0;
        $(this).find(".structureCard").each( function() {
            var containerTime = parseInt($(this).find(".structureCardHeaderDuration input").val());
            if (initialTime !== "NaN:NaN") {
                $(this).find(".structureCardHeaderTime .timeStart").html(initialTime);
            } else {
                $(this).find(".structureCardHeaderTime .timeStart").html("--");
            }

            var parts = initialTime.split(":");
            var hours = parseInt(parts[0]);
            var minutes = parseInt(parts[1]);
            var totalMinutes = hours * 60 + minutes + containerTime;
            var newHours = Math.floor(totalMinutes / 60) % 24;
            var newMinutes = totalMinutes % 60;

            var newTime = (newHours < 10 ? "0" : "") + newHours + ":" + (newMinutes < 10 ? "0" : "") + newMinutes;
            initialTime = newTime;
            if (initialTime !== "NaN:NaN") {
                $(this).find(".structureCardHeaderTime .timeEnd").html(initialTime);
            } else {
                $(this).find(".structureCardHeaderTime .timeEnd").html("--");
            }
            if (!isNaN(containerTime)) {
                sectionDuration = sectionDuration + containerTime;
            }
        }); 
        var totalHours = Math.floor(sectionDuration / 60);
        var totalMinutes = sectionDuration % 60;
        var formattedHours = (totalHours < 10 ? "0" : "") + totalHours;
        var formattedMinutes = (totalMinutes < 10 ? "0" : "") + totalMinutes;
        var formattedDuration = formattedHours + ":" + formattedMinutes;
        
        $(this).find(".structureElementHeaderDuration .structureElementHeaderDurationValue").html(formattedDuration);
        saveStructure();
    });
}



$(document).ready(function () {
    // generate structure page

    var storageData = localStorage.getItem("NLCreatorStructure");
    if ( storageData !== null ) {
        var structureJSON = JSON.parse(storageData);
    } else {
        structureJSON = {
            "id": 0,
            "title": "",
            "type": "",
            "duration": "",
            "startTime": ""
        };
        $("#chooseTemplate.lightboxWrapper").fadeIn(200).addClass("active");
    }

    var localStorageData = localStorage.getItem("NLCreatorData");
    if ( localStorageData !== null ) {
        var dataJSON = JSON.parse(localStorageData);
        if (dataJSON["structureVisited"] !== null) {
            if (dataJSON["structureVisited"] == "false") {
                $("#structureExplanation.lightboxWrapper").fadeIn(200).addClass("active");
            }
        }
        $(".headerTitle").text(dataJSON["title"]);
    }

    

    var html = "";

    for (i = 0; i < structureJSON.length; i++) {
        var section = structureJSON[i];
        html += generateSection(section);
    }

    html += `
    <div class="addStructureElement">
        <div class="addStructureElementButtonGroup">
            <button class="secondaryButton extraSmall addStructureElementButton addSeminar addStructure"> + Veranstaltung <span class="dooIconContainer dooContainerName-toggle-down authorIcon addStructureArrow">
                    <i class="dooIcon dooIcon-toggle-down dooIconSize-12"></i>
                </span>
            </button>
            <ul class="addStructureDropdown card thinScrollbar">
                <li>
                    <a href="#" class="addStructureDropdownItem hasInfoButton infoButtonMarginRight addSectionButton" data-type="live-seminar"> Live-Online Veranstaltung <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="Live-Online Veranstaltung">?</button>
                    </a>
                </li>
                <li>
                    <a href="#" class="addStructureDropdownItem hasInfoButton infoButtonMarginRight addSectionButton" data-type="presence-seminar"> Präsenz-Veranstaltung <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="Präsenz-Veranstaltung">?</button>
                    </a>
                </li>
            </ul>
        </div>
        <button class="secondaryButton extraSmall addStructureElementButton addElearning addSectionButton" data-type="elearning">+ E-Learning</button>
        <div class="addStructureElementButtonGroup">
            <button class="secondaryButton extraSmall addStructureElementButton addPractice addStructure"> + Praxis <span class="dooIconContainer dooContainerName-toggle-down authorIcon addStructureArrow">
                    <i class="dooIcon dooIcon-toggle-down dooIconSize-12"></i>
                </span>
            </button>
            <ul class="addStructureDropdown card thinScrollbar">
                <li>
                    <a href="#" class="addStructureDropdownItem hasInfoButton infoButtonMarginRight addSectionButton" data-type="practice-transfer"> Transferphase <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="Transferphase">?</button>
                    </a>
                </li>
                <li>
                    <a href="#" class="addStructureDropdownItem hasInfoButton infoButtonMarginRight addSectionButton" data-type="practice-self-learning"> Selbstlernphase <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="Selbstlernphase">?</button>
                    </a>
                </li>
                <li>
                    <a href="#" class="addStructureDropdownItem hasInfoButton infoButtonMarginRight addSectionButton" data-type="practice-project"> Projektphase <button class="infotextButton" type="button" title="Erklärung anzeigen" data-infotext="Projektphase">?</button>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    `;

    $("#structureContent").html(html);

    structureTimeCalculation();



}); // document ready end

$(document).on("blur", ".headerStartingTime input, .structureCardHeaderDuration input, .inputOnlyNumbers", function() {
    structureTimeCalculation();
});
