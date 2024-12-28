import Vector2 from "./utils/vector2.js";
import WinElement from "./window-manager/window_element.js";

const container = document.getElementById("container");

const window1 = new WinElement("window", container);
window1.position = new Vector2(500, 50);
window1.scale = new Vector2(100, 100);

const window2 = new WinElement("window", container);
window2.position = new Vector2(100, 400);
window2.scale = new Vector2(150, 150);
