gemini.suite('panel', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.panel')
        .capture('plain', function (actions) { // FIXME это нужно сделать для всех тестов
            actions.executeJS(function (window) {
                window.document.querySelector('.header').remove();
            });
        });
});
