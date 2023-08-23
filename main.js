import * as THREE from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const startTime = Date.now()

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0xffffff, 1)
renderer.setSize( window.innerWidth, window.innerHeight )
document.querySelector('#app').appendChild(renderer.domElement)
renderer.domElement.id = 'gradient'

const colors = ['#f2884b', '#0000ff', '#afff00', '#a331dd', '#ff0000']

const geometry = new THREE.PlaneGeometry( 5, 2 , 300, 300)
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: {value: 0},
    uColor: {value: colors.map((color) => new THREE.Color(color))}
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
})
const cube = new THREE.Mesh( geometry, material )
cube.rotateX(THREE.MathUtils.degToRad(-20))
scene.add(cube)

camera.position.z = 0.5

function animate() {
	requestAnimationFrame( animate )
  cube.material.uniforms.time.value = Date.now() - startTime
	renderer.render( scene, camera )
}
animate()
