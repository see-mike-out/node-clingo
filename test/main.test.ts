import { NcConfig, ClingoStore } from '../src/index';

let config: NcConfig = {
  base_url: './test/asp',
  project: 'project',
  models: 0
};

let clingoObj = new ClingoStore(config);

clingoObj.addStatements([]);

clingoObj.addFiles(['test.lp']);

clingoObj.run().then(result => {
  console.log('result1: ', result);
  // result1:  [ [ 'innocent(sally). ' ] ]
});

clingoObj.addStatements(['motive(dean).']);
clingoObj.run().then(result => {
  console.log('result2: ', result);
  // result2:  [ [ 'innocent(dean). ', 'innocent(sally). ' ] ]
});
