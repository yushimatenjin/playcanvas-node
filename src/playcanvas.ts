import axios from "axios";
import { PlayCanvasOptions } from "./interfaces";

export default class PlayCanvas {
  accessToken: string;
  scenes?: Array<number>;
  projectId?: number;
  branchId?: string;
  projectName?: string;
  resourceUrl?: string;

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
    this.resourceUrl = `https://playcanvas.com/api/projects/${
      this.projectId
    }/assets?branchId=${this.branchId}`;
  }

  async listAssets() {
    const response = await axios.get(this.resourceUrl, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  }
}
