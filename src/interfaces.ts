export type PlayCanvasOptions = {
  accessToken: string;
  scenes?: Array<number>;
  projectId?: number;
  branchId?: string;
  projectName?: string;
};

export type Asset = {
  id: number;
  name: string;
  parent: number;
};
