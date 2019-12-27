import { Assets, Jobs, Branches, Scenes, Apps, Projects } from'../src/endpoints'

const jobId = 12345

describe('Jobs', (): void => {
    test("GET_JOBS", (): void => {
        const response: string = Jobs.GET_JOBS(jobId)
        expect(response).toBe('https://playcanvas.com/api/api/jobs/12345');
    })
})
