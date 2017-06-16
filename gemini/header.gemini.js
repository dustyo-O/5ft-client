gemini.suite('header', (suite) => {
    suite.setUrl('/')
        .setCaptureElements('.header')
        .capture('plain');
});