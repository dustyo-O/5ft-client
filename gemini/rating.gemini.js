gemini.suite('rating', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.panel__rating')
        .capture('plain');
});

gemini.suite('rating/like', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.panel__rating')
        .capture('plain', function (actions) {
            actions.click('.anek:first-child .panel__like');
            actions.waitForElementToHide('.anek:first-child .panel__dislike', 5000);
        });
});

gemini.suite('rating/dislike', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.panel__rating')
        .capture('plain', function (actions) {
            actions.click('.anek:first-child .panel__dislike');
            actions.waitForElementToHide('.anek:first-child .panel__like', 5000);
        });
});
