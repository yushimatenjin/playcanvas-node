
## Installation
```bash
npm install --save playcanvas-node
```

## Documentation

- [REST API - PLAYCANVAS MANUAL](https://developer.playcanvas.com/en/user-manual/api/)


## Example

```javascript
import PlayCanvas from "playcanvas-node";

const options = {
  accessToken: "xxxxxxxxxxxxxxxx",
  scenes: [xxxxxxx],
  projectId: xxxxx,
  branchId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
  projectName: "xxxxxx"
};
const playcanvas = new PlayCanvas(options);

(async () => {
  const res = await playcanvas.listAssets();
  console.log(res)
})();

```

### Apps

- [x] Download app
- [x] Get primary app
- [x] Get project apps
- [x] Get app

### Assets

- [x] Create asset

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

Upload  
This is the supported type. 
`.js`,`.css`,`.txt`,`.json`,`.html`
[https://developer.playcanvas.com/en/user-manual/api/asset-create/](https://developer.playcanvas.com/en/user-manual/api/asset-create/)

```javascript
  const playcanvas = new PlayCanvas(options);
  const remotePath = process.env.NODE_ENV === 'development' ? "dev" : "build"
  await playcanvas.updateAssets(dev,"index.html","./dist/index.html");
```

### Branches

- [x] List branches

### Jobs

- [x] Get job
  
### Projects

- [x] Archive project

### Scenes

- [x] List scenes
