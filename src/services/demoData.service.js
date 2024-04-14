
// game with stages - onTime:
const game1 = {
    "id": null, // back
    "name": "המשחק הראשון שלי", // v
    "isDeleted": false, // back
    "activities": null,
    "stages": [
        {
            "id": null,
            "name": "שלב ראשון",
            "activities": [
                {
                    "id": null,
                    "name": "מה קורה הכל בסדר?",
                    "isDeleted": false,
                    "activityType": "multiple",
                    "currectAnswer": "כן",
                    "activityAnswers": [
                        "כן",
                        "לא",
                        "ככה ככה"
                    ],
                    "correctAnswerId": 0,
                    "timeToRespond": 0,
                    "activityStartTimestamp": 1706767200000,
                    "activityEndTimestamp": 1713157200000,
                    "dateStart": "2024-02-01", // past
                    "timeStart": "08:00", // past
                    "dateEnd": "2024-04-15", // future
                    "timeEnd": "08:00", // future
                    "pointsValue": 1,
                    "maxError": 1,
                    "mediaBefore": null,
                    "mediaAfter": null,
                    "textBefore": "בוקר טוב! השאלה הראשונה ממש פה, מוכן להתחיל?",
                    "textAfter": "תודה רבה שענית, מקווים שיהיה לך יום מדהים",
                    "lifeSaver": [
                        "fifty"
                    ],

                },
                {
                    "id": null,
                    "name": "עכשיו באמת איך אתה מרגיש?",
                    "isDeleted": false,
                    "activityType": "open",
                    "currectAnswer": "סבבה וכו",
                    "activityAswers": null,
                    "correctAnswerId": 0,
                    "timeToRespond": 0,
                    "activityStartTimestamp": 1713157200000,  // future
                    "activityEndTimestamp": 1714280400000,  // future
                    "dateStart": "2024-04-15", // future
                    "timeStart": "08:00", // future
                    "dateEnd": "2024-04-28",  // future
                    "timeEnd": "08:00",  // future
                    "pointsValue": 4,
                    "maxError": 2,
                    "mediaBefore": {
                        "type": "image/png",
                        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521622/ops4it8mbxfdwqwxr7an.png"
                    },
                    "mediaAfter": {
                        "type": "image/jpeg",
                        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521628/lgs8vl4uqnafeupbuvps.jpg"
                    },
                    "textBefore": "הנה תמונה מרגשת להשראה לקראת השאלה הבאה",
                    "textAfter": "עוד תמונה מרגשת לסוף השאלה",
                    "lifeSaver": null
                },
            ],
            "textBefore": "זו הודעה לפני השלב הראשון",
            "textAfter": "זו הודעה אחרי השלב הראשון",
            "stageStartTimestamp": 1706767200000, //past
            // "stageEndTimestamp": 1707631200000, //past
            "stageEndTimestamp": 1715403600000, //future
            "dateStart": "2024-02-01", // past
            "timeStart": "08:00", // past
            "dateEnd": "2024-05-11", //future
            "timeEnd": "08:00", // future
            // "dateEnd": "2024-02-11", //past
            // "timeEnd": "08:00", // past
            "maxError": 1, //past
            "isRequired": true,
        },
        {
            "id": null,
            "name": "שלב שני",
            "activities": [
                {
                    "name": "מה המצב בשטחים?",
                    "activityType": "open",
                    "correctAnswer": "ברוך ה' הכל בסדר",
                    "activityAswers": null,
                    "correctAnswerId": 0,
                    "timeToRespond": 0,
                    "activityStartTimestamp": 0,
                    "activityEndTimestamp": 0,
                    "dateStart": "2024-02-11",
                    "timeStart": "08:00",
                    "dateEnd": "2024-02-11",
                    "timeEnd": "23:25",
                    "pointsValue": 4,
                    "maxError": 0,
                    "mediaBefore": null,
                    "mediaAfter": null,
                    "textBefore": "הודעה לפני השאלה",
                    "textAfter": "הודעה אחרי השאלה",
                    "lifeSaver": [
                        "moreTime"
                    ],

                }
            ],
            "textBefore": "זוהי הודעה לפני השלב השני",
            "textAfter": "זוהי הודעה אחרי השלב השני",
            "stageStartTimestamp": 1715403600000,// future
            "stageEndTimestamp": 1718082000000,// future
            "dateStart": "2024-05-11", // future
            "timeStart": "08:00", // future
            "dateEnd": "2024-06-11", // future
            "timeEnd": "08:00", // future
            "maxError": 0,
            "isRequired": false,

        }
    ],
    "createdDate": "2024-04-08T18:57:43.474Z", // back
    "updatedDate": "2024-04-08T18:57:43.474Z", // back

    // option 1 - !start & !end future
    // "dateStart": "2024-06-01", // v // future
    // "timeStart": "08:00", // v // future
    // "dateEnd": "2024-07-01", // v // future
    // "timeEnd": "08:00", // v // future
    // "gameStartTimestamp": 1717218000000, // v // future
    // "gameEndTimestamp": 1717218000000, // v // future

    // option 2 - start & end past
    // "dateStart": "2024-02-01", // past
    // "timeStart": "08:00", // past
    // "dateEnd": "2024-03-01", // past
    // "timeEnd": "08:00", // past
    // "gameStartTimestamp": 1706767200000, // past
    // "gameEndTimestamp": 1709272800000, // past

    // option 3 - start & !end present
    "dateStart": "2024-02-01", // past
    "timeStart": "08:00", // past
    "gameStartTimestamp": 1706767200000, // past
    "dateEnd": "2024-07-01", // v // future
    "timeEnd": "08:00", // v // future
    "gameEndTimestamp": 1717218000000, // v // future

    "themeColors": [
        "#c86400",
        "#c80064",
        "#c8c8c8"
    ],
    "icon": {
        "type": "image/png",
        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521101/lytvxwhqgnywbcaqnoy9.png"
    },
    "groups": [
        {
            "id": "group1",
            "name": "Group 1",
            "adminAdditionalScore": 0
        },
        {
            "id": "group2",
            "name": "Group 2",
            "adminAdditionalScore": 0
        }
    ],
    "gameType": "stages",
    "activityProgressType": "onTime",
    "admins": [
        {
            "adminId": "c25ca045-9b0b-4c67-d356-08dc57bf9c72"
        }],
    "textBefore": "ממש עוד רגע התחיל את המשחק המרגש! מוכנים?",
    "textAfter": "המשחק המרגש הסתיים",
}

// game with activities - onProgress
const game2 = {
    "id": null, //back
    "name": "My Game",
    "isDeleted": false, // back
    "activities": [
        {
            "id": null, //back
            "name": "Updated Test Activity 1",
            "isDeleted": false,
            "activityType": "open",
            "correctAnswer": "Hello",
            "activityAswers": null,
            "correctAnswerId": 0,
            "timeToRespond": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "activityStartTimestamp": 0,
            "activityEndTimestamp": 0,
            "pointsValue": 4,
            "maxError": 2,
            "mediaBefore": {
                "type": "image/png",
                "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521622/ops4it8mbxfdwqwxr7an.png"
            },
            "mediaAfter": {
                "type": "image/jpeg",
                "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521628/lgs8vl4uqnafeupbuvps.jpg"
            },
            "textBefore": "sqe",
            "textAfter": "r3r3",
            "lifeSaver": null
        },
        {
            "name": "Updated Test Activity 2",
            "activityType": "yesno",
            "isDeleted": false,
            "correctAnswer": "yes",
            "activityAswers": null,
            "correctAnswerId": 0,
            "timeToRespond": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "activityStartTimestamp": 0,
            "activityEndTimestamp": 0,
            "pointsValue": 4,
            "maxError": 0,
            "mediaBefore": null,
            "mediaAfter": null,
            "textBefore": "csewf",
            "textAfter": "ve",
            "lifeSaver": [
                "skip"
            ]
        },
        {
            "name": "Updated Test Activity 3",
            "activityType": "typing",
            "isDeleted": false,
            "correctAnswer": "Hello3",
            "activityAswers": null,
            "correctAnswerId": 0,
            "timeToRespond": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "activityStartTimestamp": 0,
            "activityEndTimestamp": 0,
            "pointsValue": 5,
            "maxError": 0,
            "mediaBefore": null,
            "mediaAfter": null,
            "textBefore": "fdwfd",
            "textAfter": "fdwfdw",
            "lifeSaver": [
                "skip"
            ]
        }
    ],
    "stages": null,
    "createdDate": "2024-04-08T18:57:43.474Z", //back
    "updatedDate": "2024-04-08T18:57:43.474Z", //back
    "dateStart": "",
    "timeStart": "",
    "dateEnd": "",
    "timeEnd": "",
    "gameStartTimestamp": 1707631200000,
    "gameEndTimestamp": 1718082000000,
    "themeColors": [
        "#c86400",
        "#c80064",
        "#c8c8c8"
    ],
    "icon": {
        "type": "image/png",
        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521101/lytvxwhqgnywbcaqnoy9.png"
    },
    "groups": [
        {
            "id": "iw5k9Psssssssssssssssssssss",
            "name": "x",
            "adminAdditionalScore": 0
        },
        {
            "id": "eXc0sMsssssssssssssssssssss",
            "name": "y",
            "adminAdditionalScore": 0
        }
    ],
    "gameType": "activities",
    "activityProgressType": "onProgress",
    "admins": [
        {
            "adminId": "c25ca045-9b0b-4c67-d356-08dc57bf9c72"
        }],
    "textBefore": "Welcome to My Game!",
    "textAfter": "Congratulations! You have completed My Game successfully.",
}

// game with activities - open
const game3 = {
    "id": null, //back
    "name": "My Game",
    "isDeleted": false, // back
    "activities": [
        {
            "id": null, //back
            "name": "Updated Test Activity 1",
            "isDeleted": false,
            "activityType": "open",
            "correctAnswer": "Hello",
            "activityAswers": null,
            "correctAnswerId": 0,
            "timeToRespond": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "activityStartTimestamp": 1620000000,
            "activityEndTimestamp": 1620003600,
            "pointsValue": 4,
            "maxError": 2,
            "mediaBefore": {
                "type": "image/png",
                "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521622/ops4it8mbxfdwqwxr7an.png"
            },
            "mediaAfter": {
                "type": "image/jpeg",
                "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521628/lgs8vl4uqnafeupbuvps.jpg"
            },
            "textBefore": "sqe",
            "textAfter": "r3r3",
            "lifeSaver": null
        },
        {
            "name": "Updated Test Activity 2",
            "activityType": "yesno",
            "isDeleted": false,
            "correctAnswer": "yes",
            "activityAswers": null,
            "correctAnswerId": 0,
            "timeToRespond": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "activityStartTimestamp": 1620000000,
            "activityEndTimestamp": 1620003600,
            "pointsValue": 4,
            "maxError": 0,
            "mediaBefore": null,
            "mediaAfter": null,
            "textBefore": "csewf",
            "textAfter": "ve",
            "lifeSaver": [
                "skip"
            ]
        },
        {
            "name": "Updated Test Activity 3",
            "activityType": "typing",
            "isDeleted": false,
            "correctAnswer": "Hello3",
            "activityAswers": null,
            "correctAnswerId": 0,
            "timeToRespond": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "activityStartTimestamp": 1620000000,
            "activityEndTimestamp": 1620003600,
            "pointsValue": 5,
            "maxError": 0,
            "mediaBefore": null,
            "mediaAfter": null,
            "textBefore": "fdwfd",
            "textAfter": "fdwfdw",
            "lifeSaver": [
                "skip"
            ]
        }
    ],
    "stages": null,
    "createdDate": "2024-04-08T18:57:43.474Z", //back
    "updatedDate": "2024-04-08T18:57:43.474Z", //back
    "dateStart": "",
    "timeStart": "",
    "dateEnd": "",
    "timeEnd": "",
    "gameStartTimestamp": 1712614800000,
    "gameEndTimestampstamp": 1712956740000,
    "themeColors": [
        "#c86400",
        "#c80064",
        "#c8c8c8"
    ],
    "icon": {
        "type": "image/png",
        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521101/lytvxwhqgnywbcaqnoy9.png"
    },
    "groups": [
        {
            "id": "iw5k9Psssssssssssssssssssss",
            "name": "x",
            "adminAdditionalScore": 0
        },
        {
            "id": "eXc0sMsssssssssssssssssssss",
            "name": "y",
            "adminAdditionalScore": 0
        }
    ],
    "gameType": "activities",
    "activityProgressType": "open",
    "admins": [
        {
            "adminId": "c25ca045-9b0b-4c67-d356-08dc57bf9c72"
        }],
    "textBefore": "Welcome to My Game!",
    "textAfter": "Congratulations! You have completed My Game successfully.",
}

// game with stages - onProgress:
const game4 = {
    "id": null, // back
    "name": "המשחק הראשון שלי", // v
    "isDeleted": false, // back
    "activities": null,
    "stages": [
        {
            "id": null,
            "name": "שלב ראשון",
            "activities": [
                {
                    "id": null,
                    "name": "מה קורה הכל בסדר?",
                    "isDeleted": false,
                    "activityType": "multiple",
                    "currectAnswer": "כן",
                    "activityAnswers": [
                        "כן",
                        "לא",
                        "ככה ככה"
                    ],
                    "correctAnswerId": 0,
                    "timeToRespond": 0,
                    "activityStartTimestamp": 0,
                    "activityEndTimestamp": 0,
                    "dateStart": "",
                    "timeStart": "",
                    "dateEnd": "",
                    "timeEnd": "",
                    "pointsValue": 1,
                    "maxError": 1,
                    "mediaBefore": null,
                    "mediaAfter": null,
                    "textBefore": "בוקר טוב! השאלה הראשונה ממש פה, מוכן להתחיל?",
                    "textAfter": "תודה רבה שענית, מקווים שיהיה לך יום מדהים",
                    "lifeSaver": [
                        "fifty"
                    ],

                },
                {
                    "id": null,
                    "name": "עכשיו באמת איך אתה מרגיש?",
                    "isDeleted": false,
                    "activityType": "open",
                    "currectAnswer": "סבבה וכו",
                    "activityAswers": null,
                    "correctAnswerId": 0,
                    "timeToRespond": 0,
                    "activityStartTimestamp": 0,
                    "activityEndTimestamp": 0,
                    "dateStart": "",
                    "timeStart": "",
                    "dateEnd": "",
                    "timeEnd": "",
                    "pointsValue": 4,
                    "maxError": 2,
                    "mediaBefore": {
                        "type": "image/png",
                        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521622/ops4it8mbxfdwqwxr7an.png"
                    },
                    "mediaAfter": {
                        "type": "image/jpeg",
                        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521628/lgs8vl4uqnafeupbuvps.jpg"
                    },
                    "textBefore": "הנה תמונה מרגשת להשראה לקראת השאלה הבאה",
                    "textAfter": "עוד תמונה מרגשת לסוף השאלה",
                    "lifeSaver": null
                },
            ],
            "textBefore": "זו הודעה לפני השלב הראשון",
            "textAfter": "זו הודעה אחרי השלב הראשון",
            "stageStartTimestamp": 0,
            "stageEndTimestamp": 0,
            "dateStart": "",
            "timeStart": "",
            "dateEnd": "",
            "timeEnd": "",
            "maxError": 1,
            "isRequired": true,
        },
        {
            "id": null,
            "name": "שלב שני",
            "activities": [
                {
                    "name": "מה המצב בשטחים?",
                    "activityType": "open",
                    "correctAnswer": "ברוך ה' הכל בסדר",
                    "activityAswers": null,
                    "correctAnswerId": 0,
                    "timeToRespond": 0,
                    "activityStartTimestamp": 0,
                    "activityEndTimestamp": 0,
                    "dateStart": "2024-02-11",
                    "timeStart": "08:00",
                    "dateEnd": "2024-02-11",
                    "timeEnd": "23:25",
                    "pointsValue": 4,
                    "maxError": 0,
                    "mediaBefore": null,
                    "mediaAfter": null,
                    "textBefore": "הודעה לפני השאלה",
                    "textAfter": "הודעה אחרי השאלה",
                    "lifeSaver": [
                        "moreTime"
                    ],

                }
            ],
            "textBefore": "זוהי הודעה לפני השלב השני",
            "textAfter": "זוהי הודעה אחרי השלב השני",
            "stageStartTimestamp": 1715403600000,// future
            "stageEndTimestamp": 1718082000000,// future
            "dateStart": "2024-05-11", // future
            "timeStart": "08:00", // future
            "dateEnd": "2024-06-11", // future
            "timeEnd": "08:00", // future
            "maxError": 0,
            "isRequired": false,

        }
    ],
    "createdDate": "2024-04-08T18:57:43.474Z", // back
    "updatedDate": "2024-04-08T18:57:43.474Z", // back

    "dateStart": "2024-02-01", // past
    "timeStart": "08:00", // past
    "gameStartTimestamp": 1706767200000, // past
    "dateEnd": "2024-07-01", // v // future
    "timeEnd": "08:00", // v // future
    "gameEndTimestamp": 1717218000000, // v // future

    "themeColors": [
        "#c86400",
        "#c80064",
        "#c8c8c8"
    ],
    "icon": {
        "type": "image/png",
        "url": "http://res.cloudinary.com/dnluclrao/image/upload/v1712521101/lytvxwhqgnywbcaqnoy9.png"
    },
    "groups": [
        {
            "id": "group1",
            "name": "Group 1",
            "adminAdditionalScore": 0
        },
        {
            "id": "group2",
            "name": "Group 2",
            "adminAdditionalScore": 0
        }
    ],
    "gameType": "stages",
    "activityProgressType": "onTime",
    "admins": [
        {
            "adminId": "c25ca045-9b0b-4c67-d356-08dc57bf9c72"
        }],
    "textBefore": "ממש עוד רגע התחיל את המשחק המרגש! מוכנים?",
    "textAfter": "המשחק המרגש הסתיים",
}

// avishai activities
const game33 = {
    "id": null,
    "name": "My Game",
    "createdDate": "2024-04-08T18:57:43.474Z",
    "updatedDate": "2024-04-08T18:57:43.474Z",
    "gameStartTimestamp": 0,
    "gameEndTimestampstamp": 0,
    "startDate": "2024-04-10",
    "endDate": "2024-04-20",
    "startTime": "10:00 AM",
    "endTime": "5:00 PM",
    "isDeleted": false,
    "activities": [
        {
            "name": "Updated Test Activity 1",
            "isDeleted": false,
            "activityType": "multiple",
            "timeToRespond": 30,
            "activityStartTime": 1620000000,
            "activityEndTime": 1620003600,
            "pointsValue": 100,
            "maxError": 5,
            "correctAnswerId": 1,
            "activityAnswers": ["option1", "option2", "option3"],
            "mediaBefore": { "type": "image", "url": "https://example.com/image1.jpg" },
            "mediaAfter": { "type": "video", "url": "https://example.com/video1.mp4" },
            "textBefore": "Sample pre-test instructions",
            "textAfter": "Sample post-test instructions"
        },
        {
            "name": "Updated Test Activity 2",
            "isDeleted": false,
            "activityType": "typing",
            "timeToRespond": 45,
            "activityStartTime": 1620007200,
            "activityEndTime": 1620010800,
            "pointsValue": 150,
            "maxError": 3,
            "correctAnswerId": 2,
            "activityAnswers": null,
            "mediaBefore": { "type": "audio", "url": "https://example.com/audio1.mp3" },
            "mediaAfter": { "type": "image", "url": "https://example.com/image2.jpg" },
            "textBefore": "Instructions for the activity",
            "textAfter": "Follow-up instructions"
        }],
    "groups": [
        {
            "Id": "group1",
            "name": "Group 1",
            "adminAdditionalScore": 10
        },
        {
            "Id": "group2",
            "name": "Group 2",
            "adminAdditionalScore": 15
        }],
    "themeColors": ["blue", "green", "yellow"],
    "icon": { "type": "png", "url": "https://example.com/icon.png" },
    "gameType": "activities",
    "activityProgressType": "Percentage",
    "admins": [
        {
            "adminId": "c25ca045-9b0b-4c67-d356-08dc57bf9c72"
        }],
    "textBefore": "Welcome to My Game!",
    "textAfter": "Congratulations! You have completed My Game successfully."
}

// avishai stages
const game44 = {
    "id": null,
    "name": "My Game",
    "createdDate": "2024-04-08T18:57:43.474Z",
    "updatedDate": "2024-04-08T18:57:43.474Z",
    "gameStartTimestamp": 0,
    "gameEndTimestampstamp": 0,
    "startDate": "2024-04-10",
    "endDate": "2024-04-20",
    "startTime": "10:00 AM",
    "endTime": "5:00 PM",
    "isDeleted": false,
    "activities": null,
    "stages": [
        {
            "id": null,
            "gameId": null,
            "name": "Stage 1",
            "activities": [
                {
                    "name": "Updated Test Activity 1",
                    "isDeleted": false,
                    "activityType": "multipleChoice",
                    "timeToRespond": 30,
                    "activityStartTime": 1620000000,
                    "activityEndTime": 1620003600,
                    "pointsValue": 100,
                    "maxError": 5,
                    "correctAnswerId": 1,
                    "activityAnswers": ["option1", "option2", "option3"],
                    "mediaBefore": { "type": "image", "url": "https://example.com/image1.jpg" },
                    "mediaAfter": { "type": "video", "url": "https://example.com/video1.mp4" },
                    "testBefore": "Sample pre-test instructions",
                    "testAfter": "Sample post-test instructions"
                },
                {
                    "name": "Updated Test Activity 2",
                    "isDeleted": false,
                    "activityType": "fillInTheBlanks",
                    "timeToRespond": 45,
                    "activityStartTime": 1620007200,
                    "activityEndTime": 1620010800,
                    "pointsValue": 150,
                    "maxError": 3,
                    "correctAnswerId": 2,
                    "activityAnswers": ["answer1", "answer2", "answer3"],
                    "mediaBefore": { "type": "audio", "url": "https://example.com/audio1.mp3" },
                    "mediaAfter": { "type": "image", "url": "https://example.com/image2.jpg" },
                    "testBefore": "Instructions for the activity",
                    "testAfter": "Follow-up instructions"
                }],
            "textBefore": "Welcome to Stage 1",
            "textAfter": "Stage 1 completed successfully",
            "stageStartDate": 0,
            "stageEndDate": 0,
            "maxError": 0
        }],
    "groups": [
        {
            "Id": "group1",
            "name": "Group 1",
            "adminAdditionalScore": 10
        },
        {
            "Id": "group2",
            "name": "Group 2",
            "adminAdditionalScore": 15
        }],
    "themeColors": ["blue", "green", "yellow"],
    "icon": { "type": "png", "url": "https://example.com/icon.png" },
    "gameType": "stages",
    "activityProgressType": "Percentage",
    "admins": [
        {
            "adminId": "c25ca045-9b0b-4c67-d356-08dc57bf9c72"
        }],
    "textBefore": "Welcome to My Game!",
    "textAfter": "Congratulations! You have completed My Game successfully."
}

function getGame1() {
    return Promise.resolve(game1)
}
function getGame2() {
    return Promise.resolve(game2)
}
function getGame3() {
    return Promise.resolve(game3)
}
function getGame4() {
    return Promise.resolve(game4)
}

export const demoDataService = {
    getGame1,
    getGame2,
    getGame3,
    getGame4
}