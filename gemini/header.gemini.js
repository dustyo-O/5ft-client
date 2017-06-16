gemini.suite('Шапка', (suite) => {
    suite.setUrl('/')
        .setCaptureElements('.header')
        .capture('plain');
});