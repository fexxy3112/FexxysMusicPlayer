
const nwApp = nw.Window.get();
nwApp.showDevTools();
class MainApp{

    constructor(){

    }

    generateToolbar(maximize) {
        let wrapper = document.createElement("div");
        wrapper.classList.add('toolbar');

        let icon = document.createElement('img');
        icon.src = '../assets/icon.png';
        icon.classList.add('icon');
        wrapper.appendChild(icon);

        let title = document.createElement("div");
        title.id = "title";
        title.innerText = "FMP";
        wrapper.appendChild(title);

        let minimize = document.createElement("div");
        minimize.classList.add("minimize");
        wrapper.appendChild(minimize);

        let minimizeSvg = document.createElement('img');
        minimizeSvg.src = "../assets/minimize.svg";
        minimizeSvg.classList.add("toolbar-img")
        minimize.appendChild(minimizeSvg);
        minimizeSvg.addEventListener('click', () => {
            nwApp.minimize();
        });

        if (maximize) {
            let maximize = document.createElement("div");
            maximize.classList.add("maximize");
            wrapper.appendChild(maximize);

            let maximizeSvg = document.createElement('img');
            maximizeSvg.src = "../assets/maximize.svg";
            maximizeSvg.classList.add("toolbar-img")
            maximize.appendChild(maximizeSvg);
            maximizeSvg.addEventListener('click', () => {
                this.maximized = !this.maximized;

                if (!this.maximized) {
                    nwApp.restore()
                } else {
                    nwApp.maximize()
                }
            });
        }

        let close = document.createElement("div");
        close.classList.add('close');
        wrapper.appendChild(close);
        close.addEventListener('click', () => {
            window.close();
        });

        let closeSvg = document.createElement('img');
        closeSvg.classList.add("toolbar-img")
        closeSvg.src = "../assets/close.svg";
        close.appendChild(closeSvg);

        let drag = document.createElement("div");
        drag.id = "drag";
        wrapper.appendChild(drag);

        document.body.append(wrapper);
    }
}

app = new MainApp();
app.generateToolbar(true);
