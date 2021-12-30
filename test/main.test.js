"use strict";
exports.__esModule = true;
var index_1 = require("../src/index");
var config = {
    base_url: './test/asp',
    project: 'project',
    models: 0
};
var clingoObj = new index_1.ClingoStore(config);
clingoObj.addStatements([]);
clingoObj.addFiles(['test.lp']);
clingoObj.run().then(function (result) {
    console.log('result1: ', result);
    // result1:  [ [ 'innocent(sally). ' ] ]
});
clingoObj.addStatements(['motive(dean).']);
clingoObj.run().then(function (result) {
    console.log('result2: ', result);
    // result2:  [ [ 'innocent(dean). ', 'innocent(sally). ' ] ]
});
