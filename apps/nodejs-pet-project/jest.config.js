module.exports = {
  name: 'nodejs-pet-project',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nodejs-pet-project',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
