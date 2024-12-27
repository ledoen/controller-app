const { handleData } = require('../src/dataHandler');
describe('handleData', () => {
    test('should emit "data" event with parsed temperature', (done) => {
        const emitter = {
            emit: jest.fn(),
        };
        handleData.call(emitter, '25.5');

        expect(emitter.emit).toHaveBeenCalledWith('data', 25.5);
        done();
    });
});