import axios from "axios";
import { PlayCanvasOptions } from "./interfaces";
import {Assets} from './endpoints'
export default class PlayCanvas {
  accessToken: string;
  scenes?: Array<number>;
  projectId?: number;
  branchId?: string;
  projectName?: string;
  resourceUrl?: string;
  assetId?: string;
  headers: {
    "Authorization": string;
    "Content-Type": string
  }

  constructor({
    accessToken,
    scenes,
    projectId,
    branchId,
    projectName,
  }: PlayCanvasOptions) {
    this.accessToken = accessToken;
    this.scenes = scenes;
    this.projectId = projectId;
    this.branchId = branchId;
    this.projectName = projectName;
    this.headers =       {
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      }
  }

  async listAssets() {
    const response = await axios.get(Assets.LIST_ASSETS({projectId:this.projectId,branchId:this.branchId}), {
       headers:this.headers 
    });
    return response.data;
  }
  async getAssets(assetId){
    const response = await axios.get(Assets.GET_ASSETS({assetId:assetId,branchId:this.branchId}), {
        headers:this.headers 
     });
     return response.data;
  }
}
