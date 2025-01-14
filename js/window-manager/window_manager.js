import { Clamp } from "../utils/math_helpers.js";
import Vector2 from "../utils/vector2.js";
import WinElement from "./window_element.js";

const LEFT = -10;
const RIGHT = 20;

const WINDOW = {val: 1, str: "window"};
const RESIZER = {val: 0.5, str: "resizer"};


class WindowManager
{
    static CanSplitWindows(container)
    {
        container.addEventListener("click", WindowManager.#SplitWindow);
    }

    static #SplitWindow(event)
    {
        const parent = event.target.parentElement;
        const parentRect = parent.getBoundingClientRect();

        const clickedWindow = event.target.classInstance;

        const mouseX = Clamp(0, event.clientX - parentRect.left, parentRect.right);

        const CreateInsertElement = (TYPE, POSITION) => 
        {
            const element = new WinElement(TYPE.str, parent);
            element.position.y = clickedWindow.position.y;
            element.position.x = clickedWindow.position.x + Math.sign(POSITION) * clickedWindow.scale.x * TYPE.val;

            if (TYPE == WINDOW)
            {
                element.scale = clickedWindow.scale;
            }
            else if (TYPE == RESIZER)
            {
                element.scale = new Vector2(6, clickedWindow.scale.y);
            }

            if (POSITION == LEFT)
            {
                parent.insertBefore(element.element, clickedWindow.element);
            }
            else if (POSITION == RIGHT)
            {
                parent.insertBefore(element.element, clickedWindow.element.nextSibling);
            }
        }

        if (mouseX < clickedWindow.position.x - clickedWindow.scale.x / 2 + 50)
        {
            clickedWindow.position.x += clickedWindow.scale.x / 4;
            clickedWindow.scale.x /= 2;
            CreateInsertElement(WINDOW, LEFT);
            CreateInsertElement(RESIZER, LEFT);

        }
        else if (mouseX > clickedWindow.position.x + clickedWindow.scale.x / 2 - 50)
        {
            clickedWindow.position.x -= clickedWindow.scale.x / 4;
            clickedWindow.scale.x /= 2;
            CreateInsertElement(WINDOW, RIGHT);
            CreateInsertElement(RESIZER, RIGHT);

        }
    }
}

export default WindowManager;