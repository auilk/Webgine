import Vector2 from "./utils/vector2.js";
import WinElement from "./window-manager/window_element.js";
import WindowManager from "./window-manager/window_manager.js";

const container = document.getElementById("container");
const containerRect = container.getBoundingClientRect();

WindowManager.CanSplitWindows(container);

const win = new WinElement("window", container);
win.position = new Vector2(containerRect.width / 2, containerRect.height / 2);
win.scale = new Vector2(containerRect.width, containerRect.height);