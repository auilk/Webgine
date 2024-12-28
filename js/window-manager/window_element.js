import Vector2 from "../utils/vector2.js";

class WinElement
{
    #position;
    #scale;
    #parent;
    #element;

    constructor(classNames = "", parent = document.body, position = new Vector2(window.innerWidth / 2, window.innerHeight / 2), scale = new Vector2(25, 25))
    {
        this.#position = position;
        this.#scale = scale;
        this.#parent = parent ? parent : document.body;
        this.#element = null;

        const xCallback = this.#UpdateX.bind(this);
        const yCallback = this.#UpdateY.bind(this);
        this.#position.SetCallbackFunc(xCallback, yCallback);
        this.#scale.SetCallbackFunc(xCallback, yCallback);

        this.#CreateElement();
        this.AddElementClass(classNames);

        this.#UpdateX();
        this.#UpdateY();
    }

    get position()
    {
        return this.#position;
    }

    get scale()
    {
        return this.#scale;
    }

    get parent()
    {
        return this.#parent;
    }

    get element()
    {
        return this.#element;
    }

    set position(newPos)
    {
        this.#position.x = newPos.x;
        this.#position.y = newPos.y;
    }

    set scale(newScale)
    {
        this.#scale.x = newScale.x;
        this.#scale.y = newScale.y;
    }

    set parent(newParent)
    {
        if (!newParent)
        {
            this.#parent = document.body;
            document.body.appendChild(this.#element);
        }
        else
        {
            this.#parent = newParent;
            this.#parent.appendChild(this.#element);
        }
    }

    AddElementClass(addedClasses)
    {
        addedClasses = addedClasses ? String(addedClasses).split(" ").filter(className => addedClasses.trim() != "") : "";
        this.#element.classList.add(...addedClasses);
    }

    RemoveElementClass(removedClasses)
    {
        removedClasses = removedClasses ? String(removedClasses).split(" ").filter(className => removedClasses.trim() != "") : "";
        this.#element.classList.remove(...removedClasses);
    }

    RelativeToParent(isRelative)
    {
        if (this.#parent != document.body)
        {
            if (isRelative)
            {
                this.#parent.style.position = "relative";
            }
            else
            {
                this.#parent.style.position = "static";
            }

        }
    }

    #CreateElement()
    {
        this.#element = document.createElement("div");
        this.#element.classInstance = this;
        this.#parent.appendChild(this.#element);
    }

    #UpdateX()
    {
        this.element.style.left = `${this.#position.x - this.#scale.x / 2}px`;
        this.#element.style.width = `${this.#scale.x}px`;
    }

    #UpdateY()
    {
        this.#element.style.top = `${this.#position.y - this.#scale.y / 2}px`;
        this.#element.style.height = `${this.#scale.y}px`;
    }
}

export default WinElement;