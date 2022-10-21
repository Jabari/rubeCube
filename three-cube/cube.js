init();

function die() {
  //singular of dice; not fatal
  const random = Math.floor(Math.random() * 12);
  return random;
}

function move(random) {
  switch (random) {
    /**
     * (face, direction)
     * u: up, d: down, f: front, b: back, l: left, r: right
     * 1: clockwise, -1: counterclockwise
     **/
    case 0:
      rotate("u", 1);
      break;

    case 1:
      rotate("u", -1);
      break;

    case 2:
      rotate("f", 1);
      break;

    case 3:
      rotate("f", -1);
      break;

    case 4:
      rotate("d", 1);
      break;

    case 5:
      rotate("d", -1);
      break;

    case 6:
      rotate("b", 1);
      break;

    case 7:
      rotate("b", -1);
      break;

    case 8:
      rotate("l", 1);
      break;

    case 9:
      rotate("l", -1);
      break;

    case 10:
      rotate("r", 1);
      break;

    case 11:
      rotate("r", -1);
      break;
  }
}

function scramble(event) {
  // disable button until scrambling is finished
  event.setAttribute("disabled", true);

  var i = 0;

  var scrambling = setInterval(function () {
    if (i < 25) {
      move(die());
      i++;
    } else {
      event.removeAttribute("disabled");
      clearInterval(scrambling);
    }
  }, 300);
}

function init() {
  console.log("init");
  //all functions within req'd for cube formation
  let axis,
    axises,
    camera,
    clicking,
    controls,
    cshift,
    cube,
    cubes,
    curor,
    curpos,
    currentFrame,
    d,
    de2ra,
    defdir,
    findcoord,
    getAxisFromRot,
    getDirFromLocRot,
    getDirFromRot,
    getDirFromTopRot,
    getNewAxis,
    globqty,
    lastFrame,
    lastdir,
    left,
    lerp,
    makecube,
    mouse,
    mousepos,
    movcam,
    moving,
    origincam,
    position,
    ra2de,
    front,
    render,
    renderer,
    right,
    rotWorldMatrix,
    rotate,
    rotateAroundWorldAxis,
    scene,
    shiftcube,
    target,
    targetcam,
    time,
    time2,
    timeDelta,
    bottom,
    top;

  renderer =
    scene =
    camera =
    cube =
    controls =
    lastdir =
    currentFrame =
    timeDelta =
    cube =
    cubes =
    target =
    axis =
    axises =
    position =
    defdir =
    rotWorldMatrix =
    globqty =
      null;

  moving = movcam = shiftcube = clicking = false;

  d = 1.03;
  curpos = "f";
  curor = "u";
  time = time2 = 0;

  mouse = {
    x: 0,
    y: 0,
  };

  mousepos = {
    x: 0,
    y: 0,
  };

  origincam = {
    x: 0,
    y: 0,
  };

  targetcam = {
    x: 0,
    y: 0,
  };

  de2ra = function (degree) {
    return (degree * Math.PI) / 180;
  };

  ra2de = function (degree) {
    return (degree / Math.PI) * 180;
  };

  lerp = function (a, b, t) {
    return a + t * (b - a);
  };

  currentFrame = timeDelta = null;

  lastFrame = Date.now();

  function randomColor() {
    const color = Math.floor(Math.random() * 1000000);
    return color;
  }

  function invertColor() {
    const color = randomColor();
    const invertedColor = 0xffffff ^ color;
    return invertedColor;
  }

  function invertColor1() {
    const color = invertColor();
    const invertedColor = 0x222222 ^ color;
    return invertedColor;
  }

  newColors();
  function newColors() {
    top = randomColor();
    bottom = invertColor();
    front = randomColor() ^ invertColor();
    back = randomColor() & invertColor();
    left = randomColor() | invertColor1();
    right = invertColor1();
  }

  render = function () {
    let c, i, j, len, len1;
    currentFrame = Date.now();
    timeDelta = currentFrame - lastFrame;
    requestAnimationFrame(render);
    if (moving) {
      if (time >= 1) {
        for (i = 0, len = cubes.length; i < len; i++) {
          c = cubes[i];
          rotateAroundWorldAxis(c, axises[i], target[i] - globqty[i]);
        }
        moving = false;
        time = 0;
        getNewAxis();
      } else {
        time += (8 * timeDelta) / 1000;
        for (j = 0, len1 = cubes.length; j < len1; j++) {
          c = cubes[j];
          rotateAroundWorldAxis(
            c,
            axises[j],
            (target[j] * 8 * timeDelta) / 1000
          );
          globqty[j] += (target[j] * 8 * timeDelta) / 1000;
        }
      }
    }
    if (movcam) {
      if (time2 < 1) {
        time2 += (8 * timeDelta) / 1000;
        controls.setRotation(
          lerp(origincam.x, targetcam.x, time2),
          lerp(origincam.y, targetcam.y, time2)
        );
      } else {
        controls.setRotation(targetcam.x, targetcam.y);
        movcam = false;
        time2 = 0;
      }
    }
    if (shiftcube) {
      if (time >= 1) {
        rotateAroundWorldAxis(cube, axis, target - globqty);
        shiftcube = false;
        time = 0;
        getNewAxis();
      } else {
        time += (8 * timeDelta) / 1000;
        rotateAroundWorldAxis(cube, axis, (target * 8 * timeDelta) / 1000);
        globqty += (target * 8 * timeDelta) / 1000;
      }
    }
    controls.update();
    renderer.render(scene, camera);
    return (lastFrame = currentFrame);
  };

  makecube = function () {
    let basegeom,
      cubcol,
      cx,
      cy,
      cz,
      db,
      dc,
      dd,
      df,
      dl,
      dm,
      dr,
      du,
      material,
      plane,
      plcol,
      tiledcube,
      x,
      y,
      z,
      zc,
      i,
      j,
      k;
    dc = df = db = du = dd = dl = dm = dr = false;
    basegeom = new THREE.CubeGeometry(1, 1, 1);
    plane = new THREE.PlaneGeometry(0.96, 0.96);
    material = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    cube = new THREE.Object3D();
    for (x = i = 0; i <= 2; x = ++i) {
      for (y = j = 0; j <= 2; y = ++j) {
        for (z = k = 0; k <= 2; z = ++k) {
          tiledcube = new THREE.Object3D();
          cubcol = new THREE.Mesh(basegeom, material);
          cubcol.position.set(-d + d * x, -d + d * y, -d + d * z);
          tiledcube.add(cubcol);
          dl = x === 0;
          dc = x === 1;
          dr = x === 2;
          db = z === 0;
          zc = z === 1;
          df = z === 2;
          dd = y === 0;
          dm = y === 1;
          du = y === 2;
          if (dl || dr) {
            plcol = new THREE.Mesh(
              plane,
              new THREE.MeshBasicMaterial({
                color: dr ? left : right,
              })
            );
            plcol.rotation.y = de2ra(dr ? 90 : -90);
            plcol.position.x += dl ? -d / 2 : d / 2;
            cubcol.add(plcol);
          }
          if (db || df) {
            plcol = new THREE.Mesh(
              plane,
              new THREE.MeshBasicMaterial({
                color: df ? back : front,
              })
            );
            if (db) {
              plcol.rotation.y = de2ra(180);
            }
            plcol.position.z += db ? -d / 2 : d / 2;
            cubcol.add(plcol);
          }
          if (dd || du) {
            plcol = new THREE.Mesh(
              plane,
              new THREE.MeshBasicMaterial({
                color: du ? top : bottom,
              })
            );
            plcol.rotation.x = de2ra(dd ? 90 : -90);
            plcol.position.y += dd ? -d / 2 : d / 2;
            cubcol.add(plcol);
          }
          cx = x === 1;
          cy = y === 1;
          cz = z === 1;
          if (dl && cy && cz) {
            cubcol.name = "r";
          }
          if (dr && cy && cz) {
            cubcol.name = "l";
          }
          if (db && cx && cy) {
            cubcol.name = "f";
          }
          if (df && cx && cy) {
            cubcol.name = "b";
          }
          if (dd && cx && cz) {
            cubcol.name = "d";
          }
          if (du && cx && cz) {
            cubcol.name = "u";
          }
          cube.add(tiledcube);
        }
      }
    }
    return cube;
  };

  rotateAroundWorldAxis = function (object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setEulerFromRotationMatrix(object.matrix, object.order);
  };

  findcoord = function (objMesh) {
    let boundingBox;
    objMesh.geometry.computeBoundingBox();
    boundingBox = objMesh.geometry.boundingBox;
    position = new THREE.Vector3();
    position.subVectors(boundingBox.max, boundingBox.min);
    position.multiplyScalar(0.5);
    position.add(boundingBox.min);
    position.applyMatrix4(objMesh.matrixWorld);
    return position;
  };

  getAxisFromRot = function (orAx) {
    switch (curpos) {
      case "f":
      case "o":
      case "b":
        switch (curor) {
          case "u":
          case "m":
          case "d":
            return orAx;
          case "l":
          case "c":
          case "r":
            switch (orAx) {
              case "z":
                return "z";
              case "y":
                return "x";
              case "x":
                return "y";
            }
        }
        break;
      case "l":
      case "c":
      case "r":
        switch (curor) {
          case "u":
          case "m":
          case "d":
            switch (orAx) {
              case "z":
                return "x";
              case "x":
                return "z";
              case "y":
                return "y";
            }
            break;
          case "f":
          case "o":
          case "b":
            switch (orAx) {
              case "z":
                return "x";
              case "y":
                return "z";
              case "x":
                return "y";
            }
        }
        break;
      case "u":
      case "m":
      case "d":
        switch (curor) {
          case "f":
          case "o":
          case "b":
            switch (orAx) {
              case "x":
                return "x";
              case "y":
                return "z";
              case "z":
                return "y";
            }
            break;
          case "l":
          case "c":
          case "r":
            switch (orAx) {
              case "x":
                return "z";
              case "y":
                return "x";
              case "z":
                return "y";
            }
        }
    }
    return false;
  };

  getDirFromRot = function (orAx) {
    switch (curpos) {
      case "f":
        switch (curor) {
          case "u":
          case "r":
            return orAx;
          case "l":
          case "d":
            return -orAx;
        }
        break;
      case "b":
        switch (curor) {
          case "u":
          case "r":
            return -orAx;
          case "l":
          case "d":
            return orAx;
        }
        break;
      case "u":
        switch (curor) {
          case "r":
          case "b":
            return orAx;
          case "l":
          case "f":
            return -orAx;
        }
        break;
      case "d":
        switch (curor) {
          case "r":
          case "b":
            return -orAx;
          case "l":
          case "f":
            return orAx;
        }
        break;
      case "l":
        switch (curor) {
          case "u":
          case "f":
            return orAx;
          case "b":
          case "d":
            return -orAx;
        }
        break;
      case "r":
        switch (curor) {
          case "u":
          case "f":
            return -orAx;
          case "b":
          case "d":
            return orAx;
        }
    }
    return false;
  };

  getDirFromLocRot = function (orAx) {
    switch (curpos) {
      case "f":
        return -orAx;
      case "b":
        return orAx;
      case "u":
        return orAx;
      case "d":
        return -orAx;
      case "l":
        return orAx;
      case "r":
        return -orAx;
    }
    return false;
  };

  getDirFromTopRot = function (orAx) {
    switch (curor) {
      case "f":
        return -orAx;
      case "b":
        return orAx;
      case "u":
        return orAx;
      case "d":
        return -orAx;
      case "l":
        return orAx;
      case "r":
        return -orAx;
    }
    return false;
  };

  getNewAxis = function () {
    let cubcle, fname, tname, i, len, ref;
    ref = cube.children;
    for (i = 0, len = ref.length; i < len; i++) {
      cubcle = ref[i];
      if (findcoord(cubcle.children[0]).z < -d / 2) {
        if (cubcle.children[0].name !== "") {
          fname = cubcle.children[0].name;
        }
      }
      if (findcoord(cubcle.children[0]).y > d / 2) {
        if (cubcle.children[0].name !== "") {
          tname = cubcle.children[0].name;
        }
      }
    }
    curpos = fname;
    curor = tname;
  };

  rotate = function (dir, qty) {
    let c,
      cubcle,
      realaxis,
      i,
      j,
      k,
      l,
      len,
      len1,
      len2,
      len3,
      len4,
      len5,
      len6,
      len7,
      m,
      n,
      o,
      p,
      q,
      ref,
      ref1,
      ref2,
      ref3,
      ref4,
      ref5,
      ref6,
      ref7;

    combine = false;

    scene.updateMatrixWorld(true);

    if (!combine) {
      axises = [];
      position = [];
      target = [];
      globqty = [];
      cubes = [];
    }
    switch (dir) {
      case "b":
        ref = cube.children;
        for (i = 0, len = ref.length; i < len; i++) {
          cubcle = ref[i];
          if (findcoord(cubcle.children[0]).z > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("z");
        defdir = getDirFromLocRot(1);
        break;
      case "f":
        ref1 = cube.children;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          cubcle = ref1[j];
          if (findcoord(cubcle.children[0]).z < -d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("z");
        defdir = getDirFromLocRot(-1);
        break;
      case "u":
        ref2 = cube.children;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          cubcle = ref2[k];
          if (findcoord(cubcle.children[0]).y > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("y");
        defdir = getDirFromTopRot(-1);
        break;
      case "m":
        ref2 = cube.children;
        for (p = 0, len2 = ref2.length; p < len2; p++) {
          cubcle = ref2[p];
          if (findcoord(cubcle.children[0]).y > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("y");
        defdir = getDirFromTopRot(-1);
        break;
      case "d":
        ref3 = cube.children;
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          cubcle = ref3[l];
          if (findcoord(cubcle.children[0]).y < -d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("y");
        defdir = getDirFromTopRot(1);
        break;
      case "l":
        ref4 = cube.children;
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          cubcle = ref4[m];
          if (findcoord(cubcle.children[0]).x > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("x");
        defdir = getDirFromRot(-1);
        break;
      case "c":
        ref6 = cube.children;
        for (n = 0, len6 = ref6.length; n < len6; n++) {
          cubcle = ref6[n];
          if (findcoord(cubcle.children[0]).x > d / 3) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("x");
        defdir = getDirFromRot(-1);
        break;
      case "r":
        ref5 = cube.children;
        for (o = 0, len5 = ref5.length; o < len5; o++) {
          cubcle = ref5[o];
          if (findcoord(cubcle.children[0]).x < -d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("x");
        defdir = getDirFromRot(1);
        break;
    }
    moving = true;
    for (q = 0, len6 = cubes.length; q < len6; q++) {
      c = cubes[q];
      switch (axis) {
        case "x":
          realaxis = new THREE.Vector3(1, 0, 0);
          break;
        case "y":
          realaxis = new THREE.Vector3(0, 1, 0);
          break;
        case "z":
          realaxis = new THREE.Vector3(0, 0, 1);
      }
      axises.push(realaxis);
      target.push(de2ra(defdir * 90 * qty));
      globqty.push(0);
    }
    time = 0;
  };
  this.rotate = rotate;
  cshift = function (dir) {
    lastdir = dir;
    switch (dir) {
      case "top":
        axis = new THREE.Vector3(1, 0, 0);
        defdir = -1;
        break;
      case "bottom":
        axis = new THREE.Vector3(1, 0, 0);
        defdir = 1;
        break;
      case "left":
        axis = new THREE.Vector3(0, 1, 0);
        defdir = 1;
        break;
      case "right":
        axis = new THREE.Vector3(0, 1, 0);
        defdir = -1;
    }
    shiftcube = true;
    globqty = 0;
    time = 0;
    target = de2ra(defdir * 90);
  };
  
  document.addEventListener('DOMContentLoaded', function(){
	const gameContainer = document.querySelector("body .container");

    scene = new THREE.Scene();
    cube = makecube(scene);
    scene.add(cube);
    camera = new THREE.PerspectiveCamera(
      60,
      gameContainer.clientWidth / gameContainer.clientHeight,
      0.1,
      1000
    );
	camera.position = scene.position;
    camera.position.z = 6;
    controls = new THREE.OrbitControls(camera);
    controls.rotateLeft(de2ra(180));
    controls.rotateUp(de2ra(20));
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      gameContainer.clientWidth,
      gameContainer.clientHeight
    );

    $("game").empty().append(renderer.domElement);
		
    render();

    document.addEventListener("keydown", function (e) {
      let code, shift;
      if (moving) {
        return;
      }
      if (shiftcube) {
        return;
      }
      code = e.keyCode ? e.keyCode : e.which;
      shift = e.shiftKey ? -1 : 1;
      switch (code) {
        case 70:
          rotate("f", shift);
          break;
        case 66:
          rotate("b", shift);
          break;
        case 76:
          rotate("l", shift);
          break;
        case 67:
          rotate("c", shift);
          break;
        case 82:
          rotate("r", shift);
          break;
        case 85:
          rotate("u", shift);
          break;
        case 77:
          rotate("m", shift);
          break;
        case 68:
          rotate("d", shift);
          break;
        case 38:
          cshift("top");
          break;
        case 40:
          cshift("bottom");
          break;
        case 37:
          cshift("left");
          break;
        case 39:
          cshift("right");
          break;
        default:
          console.log(code);
      }
    });

    document.addEventListener("mouseup", function () {
      movcam = true;
      time2 = 0;
      origincam = controls.currentRot;

      targetcam = {
        x: de2ra(180),
        y: de2ra(70),
      };

      if (origincam.x < 0) {
        origincam.x += Math.PI * 2;
      }
    });

    return renderer;
  });
}
