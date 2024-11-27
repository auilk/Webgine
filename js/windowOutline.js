export class WindowOutline
{
    #tabs;
    #selectedTab;
    #handleTabClick;

    constructor()
    {
        this.#tabs = document.querySelectorAll(".tab");
        this.#selectedTab = null;

        this.#handleTabClick = this.#HandleTabClick.bind(this);

        this.#tabs.forEach((tab) => tab.addEventListener("click", this.#handleTabClick));
    }

    #DrawOutline(tab)
    {
        const container = tab.parentElement.parentElement;
        const outlineSvg = container.querySelector(".outline");
        const outlinePath = outlineSvg.querySelector("path");

        const containerRect = container.getBoundingClientRect();
        const tabRect = tab.getBoundingClientRect();
        const halfStroke = parseFloat(window.getComputedStyle(outlinePath).strokeWidth) / 2;

        const pathData = `
            M${containerRect.left},${containerRect.top}
            L${containerRect.left},${containerRect.bottom - halfStroke}
            L${containerRect.right - halfStroke},${containerRect.bottom - halfStroke}
            L${containerRect.right - halfStroke},${tabRect.bottom - halfStroke}
            L${tabRect.right - halfStroke},${tabRect.bottom - halfStroke}
            L${tabRect.right - halfStroke},${tabRect.top + halfStroke}
            L${tabRect.left},${tabRect.top + halfStroke}
            Z
        `;

        outlinePath.setAttribute("d", pathData);
        outlinePath.style.transition = "stroke-dashoffset 0.5s ease-in-out";
        outlinePath.style.strokeDashoffset = "0";
    }

    #ResetOutline()
    {
        if (!this.#selectedTab) return;

        const container = this.#selectedTab.closest(".window");
        const outlineSvg = container.querySelector(".outline");
        const outlinePath = outlineSvg.querySelector("path");

        outlinePath.style.transition = "stroke-dashoffset 0s ease-in-out";
        outlinePath.style.strokeDashoffset = "1";
    }

    #HandleTabClick(event)
    {
        if (this.#selectedTab === event.target || document.querySelector(".close-btn").contains(event.target)) return;

        this.#ResetOutline();
        this.#selectedTab = event.target;
        this.#DrawOutline(this.#selectedTab);
    }

    HandleResize() {
        if (this.#selectedTab) {
            this.#DrawOutline(this.#selectedTab);
        }
    }
}