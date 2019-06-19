export type PlayCanvasOptions = {
  accessToken: string;
  scenes?: Array<number>;
  projectId?: number;
  branchId?: string;
  projectName?: string;
};

type File = {
  filename: string;
  size: number;
  hash: string;
  url: string;
};
export type Asset = {
  id: number;
  name: string;
  parent: number;
  type: string;
  file: null | File;
};
