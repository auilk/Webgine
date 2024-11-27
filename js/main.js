import {WindowOutline} from "./windowOutline.js";

async function FetchFile(path)
{
    const response = await fetch(path);
    const script = await response.text();
    return script;
}

async function LoadShaders(vertPath, fragPath)
{
    const [vertSource, fragSource] = await Promise.all([
        FetchFile(vertPath),
        FetchFile(fragPath)
    ]);
    return {vertSource, fragSource};
}

/**
 * @param {WebGL2RenderingContext} gl
 */
function CreateShader(gl, type, source)
{
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.error("Shader compilation failed: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

/** 
 * @param {WebGL2RenderingContext} gl 
 */
function CreateProgram(gl, vertShader, fragShader)
{
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error("Program linking failed: ", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

function Render(gl, indices, shaderProgram, VAO)
{
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindVertexArray(VAO);
    gl.useProgram(shaderProgram);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(() => Render(gl, indices, shaderProgram, VAO));
}

async function main()
{
    const canvas = document.getElementById("webgl-canvas");
    /** @type {WebGL2RenderingContext} */
    const gl = canvas.getContext('webgl2');

    const winOutline = new WindowOutline();

    const SetCanvasSize = () => {
        canvas.width = canvas.parentElement.getBoundingClientRect().width;
        canvas.height = canvas.parentElement.getBoundingClientRect().height - 40;

        winOutline.HandleResize();

        gl.viewport(0, 0, canvas.width, canvas.height);
    };

    SetCanvasSize();
    window.addEventListener('resize', SetCanvasSize);

    const shaderSrcs = await LoadShaders("assets/shaders/vertex.vert", "assets/shaders/fragment.frag");

    const vertexShader = CreateShader(gl, gl.VERTEX_SHADER, shaderSrcs.vertSource);
    const fragShader = CreateShader(gl, gl.FRAGMENT_SHADER, shaderSrcs.fragSource);
    const shaderProgram = CreateProgram(gl, vertexShader, fragShader);

    const vertices = new Float32Array([
         0.0,  0.5,
         0.5, -0.5,
        -0.5, -0.5
    ]);

    const indices = new Uint16Array([
        0, 1, 2
    ]);

    const VAO = gl.createVertexArray();
    gl.bindVertexArray(VAO);

    const VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const EBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(shaderProgram, "aPos");
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosLoc);

    gl.bindVertexArray(null);

    Render(gl, indices, shaderProgram, VAO);
}

main();