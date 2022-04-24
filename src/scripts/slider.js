class Slider {
    private parent;

    private holder;
    private handle;
    private maxText;

    private min;
    private max;
    public value;

    //listener: (value) => void;

    constructor(parent, min, max, value) {
        this.parent = parent;
        this.min = min;
        this.max = max;
        this.value = value;
    }

    construct() {
        this.holder = document.createElement('div');
        this.holder.classList.add("slider-holder");

        this.minText = document.createElement('span');
        this.minText.classList.add("min");
        this.minText.innerHTML = this.min + "";
        this.holder.appendChild(this.minText);

        let wrapper = document.createElement('div');
        wrapper.classList.add("slider-wrapper");
        {
            this.line = document.createElement('div');
            this.line.classList.add("slider-line");
            wrapper.appendChild(this.line);

            this.handle = document.createElement('div');
            this.handle.classList.add("slider-handle");
            this.handle.tabIndex = 1;

            wrapper.appendChild(this.handle);
        }

        document.body.addEventListener('mousemove', (e) => {
            if (document.activeElement == this.handle) {
                let rect = this.line.getBoundingClientRect();
                let rx = Math.min(Math.max(0, e.clientX - rect.left - (this.handle.offsetWidth / 2)), rect.width - this.handle.offsetWidth);
                this.handle.style.left = rx + "px";
                this.value = MathUtilities.Utils.scaleBetween(rx / (rect.width - this.handle.offsetWidth),this.min,this.max,0,1);
                this.listener(this.value);
            }
        })
        document.body.addEventListener('mouseup', (e) => {
            if (document.activeElement == this.handle) {
                this.handle.blur();
            }
        })

        this.holder.appendChild(wrapper);

        this.maxText = document.createElement('span');
        this.maxText.classList.add("max");
        this.maxText.innerHTML = this.max + "";
        this.holder.appendChild(this.maxText);

        this.parent.appendChild(this.holder);

        this.setValue(this.value);
        setTimeout(() => {
            this.setValue(this.value);
        },1000)
    }

    setValue(value) {
        this.value = Math.min(this.max,Math.max(this.min,value));
        let rect = this.line.getBoundingClientRect();
        let left = MathUtilities.Utils.scaleBetween(this.value,0,rect.width - this.handle.offsetWidth,this.min,this.max);
        this.handle.style.left = left + "px";
        this.listener(this.value);
    }

    setMin(min) {
        this.min = min;
        this.minText.innerHTML = this.min + "";
        this.setValue(this.value);
    }
    setMax(min) {
        this.max = min;
        this.maxText.innerHTML = this.min + "";
        this.setValue(this.value);
    }

    scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
        return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    }
}
