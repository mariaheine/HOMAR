import React, { Component } from "react";

import * as THREE from "three";

import "./../../../styles/components/home.css";
require("./DejaVu-sdf.fnt");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    var width = document.getElementById("threeContainer").offsetWidth;
    var height = document.getElementById("threeContainer").offsetHeight;
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0);
    this.mount.appendChild(renderer.domElement);

    // why it doesnt work? :(

    // var makeCube = (cubeColor, size) => {
    //   var geo = new THREE.BoxGeometry(size, size, size);
    //   var mat = new THREE.MeshBasicMaterial({
    //     color: cubeColor,
    //     wireframe: false
    //   });
    //   return new THREE.Mesh(geo, mat);
    // };

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var material2 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    var cube2 = new THREE.Mesh(geometry2, material2);
    scene.add(cube2);

    var geometry3 = new THREE.BoxGeometry(3, 3, 3);
    var material3 = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true
    });
    var cube3 = new THREE.Mesh(geometry3, material3);
    scene.add(cube3);

    camera.position.z = 5;

    var animate = function() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      cube2.rotation.x -= 0.005;
      cube2.rotation.y -= 0.005;

      cube3.rotation.x -= 0.005;
      cube3.rotation.y -= 0.005;

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    const threeContainerStyle = {
      margin: "auto",
      width: "95%",
      height: "70vh",
      maxWidth: "1062px",
      margin: "1rem"
    };

    return (
      <div className="container">
        <div id="threeContainer" style={threeContainerStyle}>
          <div ref={ref => (this.mount = ref)} />
        </div>
      </div>
    );
  }
}
