import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import * as THREE from 'three';
import fs from 'fs';

const loader = new MMDLoader();
const buffer = fs.readFileSync('./public/Chisa/Chisa.pmx');


