class Vector2
{
    #x;
    #y;
    #xCallback;
    #yCallback;

    constructor(x = 0, y = 0)
    {
        this.#x = x;
        this.#y = y;
        this.#xCallback = null;
        this.#yCallback = null;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }

    set x(x)
    {
        this.#x = x;
        if (this.#xCallback)
        {
            this.#xCallback();
        }
    }
    
    set y(y)
    {
        this.#y = y;
        if (this.#yCallback)
        {
            this.#yCallback();
        }
    }

    Set(x, y)
    {   
        this.x = x;
        this.y = y;
    }

    Assign(other)
    {
        this.x = other.x;
        this.y = other.y;
    }

    Add(other)
    {
        return new Vector2(this.#x + other.x, this.#y + other.y);
    }

    Substract(other)
    {
        return new Vector2(this.#x - other.x, this.#y - other.y);
    }

    Multiply(other)
    {
        return new Vector2(this.#x * other.x, this.#y * other.y);
    }
    
    Divide(other)
    {
        return new Vector2(this.#x / other.x, this.#y / other.y);
    }

    Scale(scalar)
    {
        return new Vector2(this.#x * scalar, this.#y * scalar);
    }

    Swap()
    {
        const temp = this.#x;
        this.#x = this.#y;
        this.#y = temp;
    }

    SetCallbackFunc(xCallback = null, yCallback = null)
    {
        this.#xCallback = xCallback;
        this.#yCallback = yCallback;
    }
}

export default Vector2