import { endpointUrlJoin } from "../src/utils/urljoin";

export const Apps = {
  DONWLAOD_APP: () => endpointUrlJoin`/apps/download`,
  GET_PRIMARY_APP: ({ projectId }: { projectId: number }) =>
    endpointUrlJoin`/projects/${projectId}/app`,
  GET_PROJECT_APPS: ({ projectId }: { projectId: number }) =>
    endpointUrlJoin`/projects/${projectId}/apps`,
  GET_APP: ({ id }: { id: number }) => `/apps/${id}`
};

export const Assets = {
  LIST_ASSETS: ({
    projectId,
    branchId
  }: {
    projectId: number;
    branchId: string;
  }) => endpointUrlJoin`/projects/${projectId}/assets?branchId=${branchId}`,
  GET_ASSETS: ({ assetId, branchId }: { assetId: number; branchId: string }) =>
    endpointUrlJoin`/assets/${assetId}?branchId=${branchId}`,
  DELETE_ASSET: ({
    assetId,
    branchId
  }: {
    assetId: number;
    branchId: string;
  }) => endpointUrlJoin`/assets/${assetId}?branchId=${branchId}`,
  GET_ASSET_FILE: ({
    assetId,
    branchId
  }: {
    assetId: number;
    branchId: string;
  }) => endpointUrlJoin`/assets/${assetId}/file?branchId=${branchId}`,
  CREATE_ASSET: () => endpointUrlJoin`/assets`,
  UPDATE_ASSET: ({ assetId }: { assetId: number }) =>
    endpointUrlJoin`/assets/${assetId}`
};

export const Jobs = {
  GET_JOBS: (id: number) => endpointUrlJoin`/jobs/${id}`
};

export const Projects = {
  ARCHIVE_PROJECT: (id: number) => endpointUrlJoin`/projects/${id}/export`
};

export const Scenes = {
  LIST_SCENES: ({ projectId }: { projectId: number }) =>
    endpointUrlJoin`/projects/${projectId}/scenes`
};

export const Branches = {
  LIST_BRANCHES: ({ projectId }: { projectId: number }) =>
    endpointUrlJoin`/projects/${projectId}/branches`
};
