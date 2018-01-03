gemini.suite('header/full', suite => {
    suite.setUrl('/p/1')
        .setCaptureElements('.header')
        .capture('plain');
});

gemini.suite('header/fixed', suite => {
    suite.setUrl('/p/1')
        .setCaptureElements('.header__wrapper')
        .capture('plain', function (actions) {
            actions.executeJS(function (window) {
                window.document.querySelector('.footer').scrollIntoView(false);
            });

            actions.waitForElementToShow('.header_fixed');
        });
});
