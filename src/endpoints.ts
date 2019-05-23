export const Apps = {
  DONWLAOD_APP: () => `https://playcanvas.com/api/apps/download`,
  GET_PRIMARY_APP: ({ projectId }) =>
    `https://playcanvas.com/api/projects/${projectId}/app`,
  GET_PROJECT_APPS: ({ projectId }) =>
    `https://playcanvas.com/api/projects/${projectId}/apps`,
  GET_APP: ({ id }) => `https://playcanvas.com/api/apps/${id}`
};

export const Assets = {
  LIST_ASSETS: ({ projectId, branchId }) =>
    `https://playcanvas.com/api/projects/${projectId}/assets?branchId=${branchId}`,
  GET_ASSETS: ({ assetId, branchId }) =>
    `https://playcanvas.com/api/assets/${assetId}?branchId=${branchId}`
};

export const Jobs = {
  GET_JOBS: ({ projectId }) => `https://playcanvas.com/api/jobs/${projectId}`
};

export const Projects = {
  ARCHIVE_PROJECT: id => `https://playcanvas.com/api/projects/${id}/export`
};

export const Scenes = {
  LIST_SCENES: ({ projectId }) =>
    `https://playcanvas.com/api/projects/${projectId}/scenes`
};

export const Branches = {
  LIST_BRANCHES: ({ projectId }) =>
    `https://playcanvas.com/api/projects/${projectId}/branches`
};
