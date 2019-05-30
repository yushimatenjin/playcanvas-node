## Installation

```
npm install --save playcanvas-node
```

## Documentation
- [REST API - PLAYCANVAS MANUAL](https://developer.playcanvas.com/en/user-manual/api/)


## Example
```javascript
import PlayCanvas from "./playcanvas-node";

const options = {
  accessToken: "xxxxxxxxxxxxxxxx",
  scenes: [xxxxxxx],
  projectId: xxxxx,
  branchId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
  projectName: "xxxxxx"
};
const playcanvas = new PlayCanvas(options);

(async () => {
  const response = await playcanvas.listAssets();
  console.log(response)
})();

```

## Compatibility Table

### Apps

- [x] Download app
- [x] Get primary app
- [x] Get project apps
- [x] Get app

### Assets

- [x] Create asset

[https://developer.playcanvas.com/en/user-manual/api/asset-create/](https://developer.playcanvas.com/en/user-manual/api/asset-create/)

```javascript
  const options = {
    name: "index.html",
    path: "./dist/index.html"
  };
  await playcanvas.createNewAsset(options);
```

- [x] Delete asset
- [x] Get Asset File
- [x] Get Asset
- [x] List assets
- [x] Update asset

```javascript
  const playcanvas = new PlayCanvas(options);
  const parentDir = "dev"
  const name = "index.html"
  const path = "./dist/index.html"
  
  await playcanvas.updateAssets(parentDir,name,path);
```
### Branches

- [x] List branches
### Jobs
- [x] Get job
  
### Projects

- [x] Archive project

### Scenes
- [x] List scenes
