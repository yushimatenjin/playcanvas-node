export const Assets = {
  LIST_ASSETS: ({ projectId, branchId }) =>
    `https://playcanvas.com/api/projects/${projectId}/assets?branchId=${branchId}`,
  GET_ASSETS: ({ assetId, branchId }) =>
    `https://playcanvas.com/api/assets/${assetId}?branchId=${branchId}`
};

export const Jobs = {
  GET_JOBS: ({ projectId }) => `https://playcanvas.com/api/jobs/${projectId}`
};

export const Scenes = {
  LIST_SCENES: ({ projectId }) =>
    `https://playcanvas.com/api/projects/${projectId}/scenes`
};

export const Branches = {
  LIST_BRANCHES: ({ projectId }) =>
    `https://playcanvas.com/api/projects/${projectId}/branches`
};
