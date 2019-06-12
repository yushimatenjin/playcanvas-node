import axios from "axios";
import FormData = require("form-data");
import fs = require("fs");
import { PlayCanvasOptions, Asset } from "./interfaces";
import { Assets, Jobs, Branches, Scenes, Apps, Projects } from "./endpoints";

/**
 * @name PlayCanvas
 * @description PlayCanvasのREST APIを操作
 * @param {String} accessToken
 * @param {Array} scenes
 * @param {Number} projectId
 * @param {String} branchId
 * @param {Strting} projectName
 * @example <caption>BASIC</caption>
 * import PlayCanvas from 'playcanvas-node'
 * const playcanvas = new PlayCanvas(options)
 * @return {Object} PlayCanvas
 */
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

  static async scenes({ projectId }) {}

  async updateAssets(remotePath: string, name: string, path: string) {
    try {
      const assetsList = await this.getListAssets();
      const devDir: Asset = assetsList.find((asset: Asset) => {
        if (asset.name === remotePath) return true;
      });

      if (!devDir) throw `${remotePath} is not found.`;

      const parentId = devDir.id;
      const targetAsset: Asset = assetsList.find((asset: Asset) => {
        if (asset.parent === parentId && asset.name === name) return true;
      });

      if (targetAsset) {
        const res = await this.updateAsset({
          assetId: targetAsset.id,
          path: path
        });
        return res;
      } else {
        const res = await this.createNewAsset({
          name: name,
          path: path,
          parent: parentId
        });
        return res;
      }
    } catch (e) {
      return e;
    }
  }

  // functions
  async getListAssets() {
    try {
      const response = await this.listAssets();
      return Object.values(response);
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

  /**
   * @function
   * @name PlayCanvas#getApp
   * @description Gets a published App by id.
   * @param {Number} id
   */
  async getApp(id: number) {
    try {
      const response = await axios.get(Apps.GET_APP({ id }), {
        headers: this.headers
      });
      return response.data.result;
    } catch (e) {
      return e;
    }
  }

  /**
   * @function
   * @name PlayCanvas#listAssets
   * @description Get the details of all assets in a project for a specific branch
   */
  private async listAssets() {
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
      return response.data.result;
    } catch (e) {
      return e;
    }
  }

  /**
   * @function
   * @name PlayCanvas#getAssets
   * @description Get the details of a single asset
   * @param {Number} assetId
   */
  async getAssets(assetId: number) {
    try {
      const response = await axios.get(
        Assets.GET_ASSETS({ assetId: assetId, branchId: this.branchId }),
        {
          headers: this.headers
        }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }
  /**
   * @function
   * @name PlayCanvas#deleteAsset
   * @description Permanently delete an asset from a branch of your project. Warning deleting an asset is permanent and unrecoverable unless you have taken a checkpoint of it.
   * @param {Number} assetId
   */
  async deleteAsset(assetId: number) {
    try {
      const response = await axios.delete(
        Assets.DELETE_ASSET({ assetId: assetId, branchId: this.branchId }),
        {
          headers: this.headers
        }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }
  /**
   * @function
   * @name PlayCanvas#getAssetFile
   * @description Get the details of a single asset
   * @param {Number} assetId
   */
  async getAssetFile(assetId: number) {
    try {
      const response = await axios.get(
        Assets.GET_ASSET_FILE({ assetId: assetId, branchId: this.branchId }),
        {
          headers: this.headers
        }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }
  /**
   * @function
   * @name PlayCanvas#createAsset
   * @description Create a new asset.
   * @param {String} name
   * @param {String} path
   * @param {Number} parent
   * @param {boolean} boolean
   */
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
      return response.data.result;
    } catch (e) {
      return e;
    }
  }

  /**
   * @function
   * @name PlayCanvas#updateAsset
   * @description Update an existing asset's file.
   * @param {Number} assetId
   * @param {Number} path
   */
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
      return response.data.result;
    } catch (e) {
      return e;
    }
  }
  /**
   * @function
   * @name PlayCanvas#listBranches
   * @description Get a list of all open branches for a project
   */
  async listBranches() {
    try {
      const response = await axios.get(
        Branches.LIST_BRANCHES({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }

  /**
   * @function
   * @name PlayCanvas#archiveProject
   * @param {Number} id
   * @description This will allow you to download a zip archive of your entire project. You can import that archive from your Projects Dashboard to create a new Project from that archive.
   */
  async archiveProject(id: number) {
    try {
      const response = await axios.post(
        Projects.ARCHIVE_PROJECT(id),
        {},
        {
          headers: this.headers
        }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }

  /**
   * @function
   * @name PlayCanvas#getJob
   * @description Gets a Job by id.
   */
  async getJob() {
    try {
      const response = await axios.get(
        Jobs.GET_JOBS({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }

  /**
   * @function
   * @name PlayCanvas#listScenes
   * @description Get a list of all scenes for a project
   */
  async listScenes() {
    try {
      const response = await axios.get(
        Scenes.LIST_SCENES({ projectId: this.projectId }),
        { headers: this.headers }
      );
      return response.data.result;
    } catch (e) {
      return e;
    }
  }
}
