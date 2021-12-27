import './player.css'

class Player {
    public files: { name: string; file: File; }[] = [];
    public options: { el: HTMLElement; };
    public template: Template;
    public contextmenu: Contextmenu;
    public menus = [
        {
            title: '打开文件',
            click: (_e: Event, player: Player) => {
                window.showOpenFilePicker({multiple: false}).then(async handles => {
                    player.openFile(await handles[0].getFile() as File);
                })
                player.contextmenu.hide();
            }
        },
    ];

    constructor(options: { el: HTMLElement; }) {
        this.options = options;
        this.template = new Template(this)
        this.contextmenu = new Contextmenu(this)

        // handle-files
        if ('launchQueue' in window) {
            // @ts-ignore
            launchQueue.setConsumer(async launchParams => {
                if (!launchParams.files.length)
                    return;

                for (const file of launchParams.files) {
                    this.openFile(await file.getFile() as File)
                }
            });
        } else {
            console.error('File Handling API is not supported!');
        }
    }

    open(src: string) {
        this.template.video.setAttribute('src', src);
    }

    openFile(file: File) {
        console.log(file)
        this.open(URL.createObjectURL(file))
    }
}

export default Player;

class Template {
    public video: HTMLElement;
    public menu: HTMLElement;
    public menuItem: NodeListOf<Element>;

    constructor(player: Player) {
        const menus = player.menus.map(item => {
            return `<div class="player-menu-item">${item.title}</div>`
        })
        player.options.el.innerHTML = `
            <div>
                <video class="player-video" controls autoplay></video>
            </div>
            <div class="player-menu">
                ${menus.join('')}
            </div>
            <div class="player-file-list">
                <div class="player-file-item">Screen_Recording_20210316-232025_1.mp4</div>
                <div class="player-file-item">北京烤鸭与美女.mp4</div>
            </div>
        `
        this.video = player.options.el.querySelector('.player-video')!
        this.menu = player.options.el.querySelector('.player-menu')!
        this.menuItem = player.options.el.querySelectorAll('.player-menu-item')!
    }
}

class Contextmenu {
    private readonly player
    private _show: boolean = false;

    constructor(player: Player) {
        this.player = player
        this.player.options.el.addEventListener('click', (e) => {
            if (this._show) {
                this.hide();
                e.preventDefault();
            }
        })
        this.player.options.el.addEventListener('contextmenu', (e) => {
            this.show(e.clientX, e.clientY);
            e.preventDefault();
        })
        this.player.template.menuItem.forEach((item, index) => {
            item.addEventListener('click', async e => {
                this.player.menus[index].click(e, this.player);
            });
        })
    }

    show(x: number, y: number) {
        this._show = true;
        const menu = this.player.template.menu
        menu.style.display = 'block';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
    }

    hide() {
        this._show = false;
        const menu = this.player.template.menu
        menu.style.display = 'none';
    }
}