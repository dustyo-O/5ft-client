gemini.suite('feed', (suite) => {
    suite.setUrl('/p/1')
        .setCaptureElements('.feed')
        .capture('plain');
});