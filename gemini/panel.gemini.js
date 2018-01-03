gemini.suite('panel', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.panel')
        .capture('plain', function (actions) {
            actions.executeJS(function (window) {
                window.document.querySelector('.header').remove();
            });
        });
});
