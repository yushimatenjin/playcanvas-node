import axios from "axios";
import FormData = require("form-data");
import fs = require("fs");
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
    this.branchId = branchId ? branchId : "master";
    this.projectName = projectName;
    this.headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json"
    };
  }
  // functions
  async getListAssets() {
    try {
      const response = await this.listAssets();
      return response.result;
    } catch (e) {
      return e;
    }
  }

  async createNewAsset(options: {
    name: string;
    path: string;
    parent?: number;
  }) {
    try {
      const response = await this.createAsset(options);
      return response;
    } catch (e) {
      return e;
    }
  }
  // Apps
  //  Download app
  async downloadApp() {
    try {
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
    } catch (e) {
      return e;
    }
  }
  //  Get primary app
  async getPrimaryApp() {
    try {
      const response = await axios.get(
        Apps.GET_PRIMARY_APP({ projectId: this.projectId }),
        {
          headers: this.headers
        }
      );

      return response.data;
    } catch (e) {
      return e;
    }
  }

  //  Get project apps
  async getProjectApp() {
    try {
      const response = await axios.get(
        Apps.GET_PROJECT_APPS({ projectId: this.projectId }),
        {
          headers: this.headers
        }
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }

  // Get app
  async getApp(id: number) {
    try {
      const response = await axios.get(Apps.GET_APP({ id }), {
        headers: this.headers
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }

  // Assets

  async listAssets() {
    try {
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
    } catch (e) {
      return e;
    }
  }
  // Get assets
  async getAssets(assetId: number) {
    try {
      const response = await axios.get(
        Assets.GET_ASSETS({ assetId: assetId, branchId: this.branchId }),
        {
          headers: this.headers
        }
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
  //   Delete asset
  async deleteAsset(assetId: number) {
    try {
      const response = await axios.delete(
        Assets.DELETE_ASSET({ assetId: assetId, branchId: this.branchId }),
        {
          headers: this.headers
        }
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
  //   Get Asset File
  async getAssetFile(assetId: number) {
    try {
      const response = await axios.get(
        Assets.GET_ASSET_FILE({ assetId: assetId, branchId: this.branchId }),
        {
          headers: this.headers
        }
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
  //   create asset
  private async createAsset(options: {
    name: string;
    path: string;
    parent?: number;
    preload?: boolean;
  }) {
    try {
      const form = new FormData();
      form.append("name", options.name);
      form.append("projectId", this.projectId);
      form.append("file", fs.createReadStream(options.path));
      if (options.parent) form.append("parent", options.parent);
      if (options.preload) form.append("preload", options.preload);

      const response = await axios.post(Assets.CREATE_ASSET(), form, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": form.getHeaders()["content-type"]
        }
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }

  //  Update asset
  async updateAsset({ assetId, path }) {
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(path));
      form.append("branchId", this.branchId);
      const response = await axios.put(Assets.UPDATE_ASSET({ assetId }), form, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": form.getHeaders()["content-type"]
        }
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }
  // Projects
  // Archive project
  async archiveProject(id: number) {
    try {
      const response = await axios.post(
        Projects.ARCHIVE_PROJECT(id),
        {},
        {
          headers: this.headers
        }
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }

  // Branches
  async listBranches() {
    try {
      const response = await axios.get(
        Branches.LIST_BRANCHES({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data;
    } catch (e) {
      return e;
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
    } catch (e) {
      return e;
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
    } catch (e) {
      return e;
    }
  }
}
