## Installation

```
npm install --save playcanvas-node
```

## Documentation
- [REST API - PLAYCANVAS MANUAL](https://developer.playcanvas.com/en/user-manual/api/)


## Example
```javascript
import PlayCanvas from "./playcanvas";

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
})();

```

## Compatibility Table

### Apps

- [ ] Download app
- [ ] Get primary app
- [ ] Get project apps
- [ ] Get app

### Assets

- [ ] Create asset
- [ ] Delete asset
- [ ] Get Asset File
- [x] Get Asset
- [x] List assets
- [ ] Update asset

### Branches

- [ ] List branches
### Jobs
- [x] Get job
  
### Projects

- [ ] Archive project

### Scenes
- [x] List scenes