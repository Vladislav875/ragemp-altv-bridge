import mp from "../shared/mp.js";
import "../shared/index.js";
import "./entities/index.js";
import "./natives.js";
import "./extraNatives.js";
import "./polyfill";

globalThis.mp = mp;
export default mp;