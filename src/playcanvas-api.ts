import axios from "axios";
import FormData = require("form-data");
import * as fs from "fs";
import { PlayCanvasOptions, Asset } from "./interfaces";
import { Assets, Jobs, Branches, Scenes, Apps, Projects } from "./endpoints";
const Path = require("path");

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
      let assetsList = await this.getListAssets();
      let devDir: Asset = assetsList.find((asset: Asset) => {
        if (asset.name === remotePath && asset.type === "folder") return true;
      }) as Asset;
      let parentId;

      if (!devDir) {
        const res = await this.createAsset({
          name: remotePath,
          isFolder: true
        });
        parentId = res.id;
        assetsList = await this.getListAssets();
        console.log(`${remotePath} was created.`);
      } else {
        parentId = devDir.id;
      }
      const targetAsset: Asset = assetsList.find((asset: Asset) => {
        if (!asset.file) return false;
        if (
          asset.parent === parentId &&
          asset.name === name &&
          this.branchId ===
            asset.file.url.substr(
              asset.file.url.indexOf("branchId=") + "branchId=".length
            )
        )
          return true;
      }) as Asset;
      if (
        typeof targetAsset === "object" &&
        targetAsset !== null &&
        targetAsset.id
      ) {
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
      throw new Error(e);
    }
  }

  async findDirectory(name: string) {
    let assetsList = await this.getListAssets();
    let devDir: Asset = assetsList.find((asset: Asset) => {
      if (asset.name === name && asset.type === "folder") return true;
    }) as Asset;
    return devDir;
  }
  // experimental
  async updateAssetsStrict(remotePath, name, filePath, dest) {
    try {
      const distPath = Path.resolve(".", dest);
      const relativeDirectoryPath = Path.dirname(filePath).replace(
        distPath,
        ""
      );
      const dirs = relativeDirectoryPath.split("/").filter((dir) => !!dir);
      let parentId;
      let devDir = await this.findDirectory(remotePath);

      if (!devDir) {
        const res = await this.createAsset({
          name: remotePath,
          isFolder: true
        });
        parentId = res.id;
      } else {
        parentId = devDir.id;
      }

      for (let dirName of dirs) {
        let dir = await this.findDirectory(dirName);

        if (!dir) {
          const res = await this.createAsset({
            name: dirName,
            isFolder: true,
            parent: parentId
          });
          parentId = res.id;
        } else {
          parentId = dir.id;
        }

        const assetsList = await this.getListAssets();
        const targetAsset: Asset = assetsList.find((asset: Asset) => {
          if (!asset.file) return false;
          if (
            asset.parent === parentId &&
            asset.name === name &&
            this.branchId ===
              asset.file.url.substr(
                asset.file.url.indexOf("branchId=") + "branchId=".length
              )
          )
            return true;
        }) as Asset;
        if (
          typeof targetAsset === "object" &&
          targetAsset !== null &&
          targetAsset.id
        ) {
          const res = await this.updateAsset({
            assetId: targetAsset.id,
            path: filePath
          });
          return res;
        } else {
          const res = await this.createNewAsset({
            name: name,
            path: filePath,
            parent: parentId
          });
          return res;
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  // functions
  async getListAssets() {
    try {
      const response = await this.listAssets();
      return Object.values(response);
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadScript({
    name,
    script,
    parent
  }: {
    name: string;
    script: string;
    parent?: number;
  }) {
    const form = new FormData();
    form.append("projectId", this.projectId);
    form.append("name", name);
    form.append("file", script, {
      filename: name
    });
    form.append("preload", "true");
    // if (parent) form.append("parent", parent);

    try {
      const response = await axios.post(Assets.CREATE_ASSET(), form, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": form.getHeaders()["content-type"]
        }
      });

      return response.data.result;
    } catch (e) {
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
    }
  }
  /**
   * @function
   * @name PlayCanvas#createAsset
   * @description Create a new asset.
   * @param {String} name
   * @param {String} path
   * @param {Number} parent
   * @param {Boolean} preload
   * @param {Boolean} isFolder
   */
  private async createAsset({
    name,
    path,
    parent,
    preload = true,
    isFolder = false
  }: {
    name: string;
    path?: string;
    parent?: number;
    preload?: boolean;
    isFolder?: boolean;
  }) {
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("projectId", this.projectId);
      if (isFolder) {
        form.append("type", "folder");
      } else {
        form.append("file", fs.createReadStream(path));
      }
      if (parent) form.append("parent", parent);
      if (preload) {
        form.append("preload", "true");
      } else {
        form.append("preload", "false");
      }

      const response = await axios.post(Assets.CREATE_ASSET(), form, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": form.getHeaders()["content-type"]
        }
      });

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @function
   * @name PlayCanvas#createAsset
   * @description Create a new asset.
   * @param {String} name
   * @param {Object} asset
   * @param {Number} parent
   * @param {boolean} boolean
   */
  async createNewFile({
    name,
    parent,
    preload = true,
    asset
  }: {
    name: string;
    parent?: number;
    preload?: boolean;
    asset: {
      file: string;
      script: string;
    };
  }) {
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("projectId", this.projectId);
      form.append("file", "data");
      if (parent) form.append("parent", parent);
      if (preload) {
        form.append("preload", "true");
      } else {
        form.append("preload", "false");
      }

      const response = await axios.post(Assets.CREATE_ASSET(), form, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": form.getHeaders()["content-type"]
        }
      });
      return response.data.result;
    } catch (e) {
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
    }
  }

  /**
   * @function
   * @name PlayCanvas#getJob
   * @description Gets a Job by id.
   */
  async getJob(id: number) {
    try {
      const response = await axios.get(Jobs.GET_JOBS(id), {
        headers: this.headers
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
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
      throw new Error(e);
    }
  }
}
