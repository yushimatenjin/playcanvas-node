import axios from "axios";
import { PlayCanvasOptions } from "./interfaces";
import { Assets, Jobs, Branches, Scenes, Apps, Projects } from "./endpoints";
export default class PlayCanvas {
  accessToken: string;
  scenes?: Array<number>;
  projectId?: number;
  branchId?: string;
  projectName?: string;
  resourceUrl?: string;
  assetId?: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };

  constructor({
    accessToken,
    scenes,
    projectId,
    branchId,
    projectName
  }: PlayCanvasOptions) {
    this.accessToken = accessToken;
    this.scenes = scenes;
    this.projectId = projectId;
    this.branchId = branchId;
    this.projectName = projectName;
    this.headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json"
    };
  }
  // Apps
  //  Download app
  async downloadApp() {
    const response = await axios.post(
      Apps.DONWLAOD_APP(),
      {
        project_id: this.projectId,
        name: this.projectName,
        scenes: this.scenes
      },
      {
        headers: this.headers
      }
    );
    return response.data;
  }
  //  Get primary app
  async getPrimaryApp() {
    const response = await axios.get(
      Apps.GET_PRIMARY_APP({ projectId: this.projectId }),
      {
        headers: this.headers
      }
    );

    return response.data;
  }

  //  Get project apps
  async getProjectApp() {
    const response = await axios.get(
      Apps.GET_PROJECT_APPS({ projectId: this.projectId }),
      {
        headers: this.headers
      }
    );
    return response.data;
  }

  // Get app
  async getApp(id: number) {
    const response = await axios.get(Apps.GET_APP({ id }), {
      headers: this.headers
    });
    return response.data;
  }

  // Assets
  async listAssets() {
    const response = await axios.get(
      Assets.LIST_ASSETS({
        projectId: this.projectId,
        branchId: this.branchId
      }),
      {
        headers: this.headers
      }
    );
    return response.data;
  }
  // Get assets
  async getAssets(assetId: number) {
    const response = await axios.get(
      Assets.GET_ASSETS({ assetId: assetId, branchId: this.branchId }),
      {
        headers: this.headers
      }
    );
    return response.data;
  }

  //   Delete asset
  async deleteAsset(assetId: number) {
    const response = await axios.delete(
      Assets.DELETE_ASSET({ assetId: assetId, branchId: this.branchId }),
      {
        headers: this.headers
      }
    );
    return response.data;
  }
  //   Get Asset File
  async getAssetFile(assetId: number) {
    const response = await axios.get(
      Assets.GET_ASSET_FILE({ assetId: assetId, branchId: this.branchId }),
      {
        headers: this.headers
      }
    );
    return response.data;
  }
  // create asset
  async createAsset(options: {
    name: string;
    parent: number;
    preload: boolean;
    file: any;
  }) {
    const body = {
      name: options.name,
      parent: options.parent,
      preload: options.preload,
      file: options.file,
      project_id: this.projectId
    };
    const response = await axios.post(Assets.CREATE_ASSET(), body, {
      headers: {
        ...this.headers,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  }
  // Projects
  // Archive project
  async archiveProject(id: number) {
    const response = await axios.post(
      Projects.ARCHIVE_PROJECT(id),
      {},
      {
        headers: this.headers
      }
    );
    return response.data;
  }

  // Branches
  async listBranches() {
    try {
      const response = await axios.get(
        Branches.LIST_BRANCHES({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  // Jobs
  async getJob() {
    try {
      const response = await axios.get(
        Jobs.GET_JOBS({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // Scenes
  async listScenes() {
    try {
      const response = await axios.get(
        Scenes.LIST_SCENES({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
