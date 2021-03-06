init();

function newCube() {
  init()
  this.i = 0;
}

var i = 0; //i admit, this prolly shouldnt be global

function scramble() {
  
  move( die() );

  setTimeout(function() {
    i++;
    
    if (i < 20) {
      scramble();
    }
  
  }, 500);    
}

function die() { //singular of dice; not fatal
  var random = Math.floor(Math.random() * 12);
  return random;
}

function move(random) {
  switch(random) {
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
    rotate("r", 1)
    break;

    case 11:
    rotate("r", -1);
    break;
  }
}

function init() { //all functions within req'd for cube formation
  var axis, axises, camera, clicking, controls, cshift, cube, cubes, curor, curpos, currentFrame, d, de2ra, defdir, directionalLight, findcoord, getAxisFromRot, getDirFromLocRot, getDirFromRot, getDirFromTopRot, getNewAxis, globqty, lastFrame, lastdir, left, lerp, makecube, mouse, mousepos, movcam, moving, right, origincam, position, ra2de, front, render, renderer, right, rotWorldMatrix, rotate, rotateAroundWorldAxis, scene, shiftcube, target, targetcam, time, time2, timeDelta, bottom, top;

  renderer = scene = camera = cube = directionalLight = controls = lastdir = null;

  newColors();

  function randomColor() {
    var color = Math.floor(Math.random() * 1000000);
    color = color; 
    console.log("random: " + color);
    return color;
  };

  function invertColor() {
    var color = randomColor();
    var invertedColor = 0xFFFFFF ^ color;
    return invertedColor;
  }

  function invertColor1() {
    var color = invertColor();
    var invertedColor = 0x222222 ^ color;
    return invertedColor;
  }

  function newColors() {
    top = randomColor(); 
    bottom = invertColor(); 
    front = randomColor() ^ invertColor(); 
    back = randomColor() & invertColor(); 
    left = randomColor() | invertColor1(); 
    right = invertColor1(); 
  }

  d = 1.03;

  curpos = "f";

  curor = "u";

  time = time2 = 0;

  mouse = {
    x: 0,
    y: 0
  };

  mousepos = {
    x: 0,
    y: 0
  };

  origincam = {
    x: 0,
    y: 0
  };

  targetcam = {
    x: 0,
    y: 0
  };

  clicking = false;

  moving = movcam = shiftcube = false;

  de2ra = function(degree) {
    return degree * Math.PI / 180;
  };

  ra2de = function(degree) {
    return degree / Math.PI * 180;
  };

  lerp = function(a, b, t) {
    return a + t * (b - a);
  };

  currentFrame = timeDelta = null;

  lastFrame = Date.now();

  globqty = null;

  render = function() {
    var c, _i, _j, _len, _len1;
    currentFrame = Date.now();
    timeDelta = currentFrame - lastFrame;
    requestAnimationFrame(render);
    if (moving) {
      if (time >= 1) {
        for (_i = 0, _len = cubes.length; _i < _len; _i++) {
          c = cubes[_i];
          rotateAroundWorldAxis(c, axises[_i], target[_i] - globqty[_i]);
        }
        moving = false;
        time = 0;
        getNewAxis();
      } else {
        time += 8 * timeDelta / 1000;
        for (_j = 0, _len1 = cubes.length; _j < _len1; _j++) {
          c = cubes[_j];
          rotateAroundWorldAxis(c, axises[_j], target[_j] * 8 * timeDelta / 1000);
          globqty[_j] += target[_j] * 8 * timeDelta / 1000;
        }
      }
    }
    if (movcam) {
      if (time2 < 1) {
        time2 += 8 * timeDelta / 1000;
        controls.setRotation(lerp(origincam.x, targetcam.x, time2), lerp(origincam.y, targetcam.y, time2));
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
        time += 8 * timeDelta / 1000;
        rotateAroundWorldAxis(cube, axis, target * 8 * timeDelta / 1000);
        globqty += target * 8 * timeDelta / 1000;
      }
    }
    controls.update();
    renderer.render(scene, camera);
    return lastFrame = currentFrame;
  };

  makecube = function() {
    var basegeom, cubcol, cx, cy, cz, db, dc, dd, df, dl, dm, dr, du, material, plane, plcol, tiledcube, x, y, z, zc, _i, _j, _k;
    dc = df = db = du = dd = dl = dm = dr = false;
    basegeom = new THREE.CubeGeometry(1, 1, 1);
    plane = new THREE.PlaneGeometry(0.96, 0.96);
    material = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    cube = new THREE.Object3D();
    for (x = _i = 0; _i <= 2; x = ++_i) {
      for (y = _j = 0; _j <= 2; y = ++_j) {
        for (z = _k = 0; _k <= 2; z = ++_k) {
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
            plcol = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
              color: dr ? left : right
            }));
            plcol.rotation.y = de2ra(dr ? 90 : -90);
            plcol.position.x += dl ? -d / 2 : d / 2;
            cubcol.add(plcol);
          }
          if (db || df) {
            plcol = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
              color: df ? back : front
            }));
            if (db) {
              plcol.rotation.y = de2ra(180);
            }
            plcol.position.z += db ? -d / 2 : d / 2;
            cubcol.add(plcol);
          }
          if (dd || du) {
            plcol = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({
              color: du ? top : bottom
            }));
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

  rotWorldMatrix = null;

  rotateAroundWorldAxis = function(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setEulerFromRotationMatrix(object.matrix, object.order);
  };

  cube = cubes = target = axis = axises = position = defdir = null;

  findcoord = function(objMesh) {
    var boundingBox;
    objMesh.geometry.computeBoundingBox();
    boundingBox = objMesh.geometry.boundingBox;
    position = new THREE.Vector3();
    position.subVectors(boundingBox.max, boundingBox.min);
    position.multiplyScalar(0.5);
    position.add(boundingBox.min);
    position.applyMatrix4(objMesh.matrixWorld);
    return position;
  };

  getAxisFromRot = function(orAx) {
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

  getDirFromRot = function(orAx) {
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

  getDirFromLocRot = function(orAx) {
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

  getDirFromTopRot = function(orAx) {
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

  getNewAxis = function() {

    var cubcle, fname, tname, _i, _len, _ref;
    _ref = cube.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cubcle = _ref[_i];
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
  rotate = function(dir, qty) {

    var c, cubcle, realaxis, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p, _q, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    //if (combine == null) {
      combine = false;
    //}
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
        _ref = cube.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cubcle = _ref[_i];
          if (findcoord(cubcle.children[0]).z > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("z");
        defdir = getDirFromLocRot(1);
        break;
      case "f":
        _ref1 = cube.children;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          cubcle = _ref1[_j];
          if (findcoord(cubcle.children[0]).z < -d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("z");
        defdir = getDirFromLocRot(-1);
        break;
      case "u":
        _ref2 = cube.children;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          cubcle = _ref2[_k];
          if (findcoord(cubcle.children[0]).y > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("y");
        defdir = getDirFromTopRot(-1);
        break;
      case "m":
        _ref2 = cube.children;
        for (_p = 0, _len2 = _ref2.length; _p < _len2; _p++) {
          cubcle = _ref2[_p];
          if (findcoord(cubcle.children[0]).y > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("y");
        defdir = getDirFromTopRot(-1);
        break;
      case "d":
        _ref3 = cube.children;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          cubcle = _ref3[_l];
          if (findcoord(cubcle.children[0]).y < -d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("y");
        defdir = getDirFromTopRot(1);
        break;
      case "l":
        _ref4 = cube.children;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          cubcle = _ref4[_m];
          if (findcoord(cubcle.children[0]).x > d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("x");
        defdir = getDirFromRot(-1);
        break;
      case "c":
        _ref6 = cube.children;
        for (_n = 0, _len6 = _ref6.length; _n < _len6; _n++) {
          cubcle = _ref6[_n];
          if (findcoord(cubcle.children[0]).x > d / 3) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("x");
        defdir = getDirFromRot(-1);
        break;
      case "r":
        _ref5 = cube.children;
        for (_o = 0, _len5 = _ref5.length; _o < _len5; _o++) {
          cubcle = _ref5[_o];
          if (findcoord(cubcle.children[0]).x < -d / 2) {
            cubes.push(cubcle);
          }
        }
        axis = getAxisFromRot("x");
        defdir = getDirFromRot(1);
        break;  
    }
    moving = true;
    for (_q = 0, _len6 = cubes.length; _q < _len6; _q++) {
      c = cubes[_q];
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
  cshift = function(dir) {
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

  $(document).ready(function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("game").html('');
    $("game").append(renderer.domElement);
    cube = makecube(scene);
    console.log(cube);
    scene.add(cube);
    camera.position.z = 7;
    scene.add(directionalLight);
    controls = new THREE.OrbitControls(camera);
    controls.rotateLeft(de2ra(180));
    controls.rotateUp(de2ra(20));
    render();
    $(document).keydown(function(e) {
      var code, shift;
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
    $(document).mouseup(function(e) {

      movcam = true;
      time2 = 0;
      origincam = controls.currentRot;

      if (origincam.x < 0) {
        origincam.x += Math.PI * 2;
      }

      targetcam = {
        x: de2ra(180),
        y: de2ra(70)
      };
    });
    return renderer;
  
  });
};