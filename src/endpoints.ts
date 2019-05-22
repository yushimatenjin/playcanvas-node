export const Assets = {
  LIST_ASSETS: ({ projectId, branchId }) =>
    `https://playcanvas.com/api/projects/${projectId}/assets?branchId=${branchId}`,
  GET_ASSETS: ({ assetId, branchId }) =>
    `https://playcanvas.com/api/assets/${assetId}?branchId=${branchId}`
};
