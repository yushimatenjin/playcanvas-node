export const Apps = {
  DONWLAOD_APP: () => `https://playcanvas.com/api/apps/download`,
  GET_PRIMARY_APP: ({ projectId }: { projectId: number }) =>
    `https://playcanvas.com/api/projects/${projectId}/app`,
  GET_PROJECT_APPS: ({ projectId }: { projectId: number }) =>
    `https://playcanvas.com/api/projects/${projectId}/apps`,
  GET_APP: ({ id }: { id: number }) => `https://playcanvas.com/api/apps/${id}`
};

export const Assets = {
  LIST_ASSETS: ({
    projectId,
    branchId
  }: {
    projectId: number;
    branchId: string;
  }) =>
    `https://playcanvas.com/api/projects/${projectId}/assets?branchId=${branchId}`,
  GET_ASSETS: ({ assetId, branchId }: { assetId: number; branchId: string }) =>
    `https://playcanvas.com/api/assets/${assetId}?branchId=${branchId}`,
  DELETE_ASSET: ({
    assetId,
    branchId
  }: {
    assetId: number;
    branchId: string;
  }) => `https://playcanvas.com/api/assets/${assetId}?branchId=${branchId}`,
  GET_ASSET_FILE: ({
    assetId,
    branchId
  }: {
    assetId: number;
    branchId: string;
  }) =>
    `https://playcanvas.com/api/assets/${assetId}/file?branchId=${branchId}`,
  CREATE_ASSET: () => `https://playcanvas.com/api/assets`,
  UPDATE_ASSET: ({ assetId }: { assetId: number }) =>
    `https://playcanvas.com/api/assets/${assetId}`
};

export const Jobs = {
  GET_JOBS: (id: number) => `https://playcanvas.com/api/jobs/${id}`
};

export const Projects = {
  ARCHIVE_PROJECT: (id: number) =>
    `https://playcanvas.com/api/projects/${id}/export`
};

export const Scenes = {
  LIST_SCENES: ({ projectId }: { projectId: number }) =>
    `https://playcanvas.com/api/projects/${projectId}/scenes`
};

export const Branches = {
  LIST_BRANCHES: ({ projectId }: { projectId: number }) =>
    `https://playcanvas.com/api/projects/${projectId}/branches`
};
