( () => {
    "use strict";
    const e = document.getElementById("mcolor");
    if (e) {
        let t = 0;
        const o = () => {
            e.style.color = `hsl(${t}, 80%, 60%)`,
            t = (t + 5) % 360,
            requestAnimationFrame(o)
        };
        o()
    }
}
) ()