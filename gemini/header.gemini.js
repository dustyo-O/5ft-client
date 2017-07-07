gemini.suite('header', (suite) => {
    suite.setUrl('/')
        .setCaptureElements('.header')
        .capture('plain')
        .capture('scrolled', function(actions) {
            actions.executeJS(function(window) {
                window.scrollBy(0, 200);
            });
        });
});