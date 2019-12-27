import {endpointUrlJoin} from "../../src/utils/urljoin"
describe('urljoin', (): void => {
    test('Download', (): void => {
        const response: string = endpointUrlJoin`/apps/download`;
        expect(response).toBe('https://playcanvas.com/api/apps/download');
    });
})
