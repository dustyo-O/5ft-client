gemini.suite('panel', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.panel')
        .capture('plain');
});