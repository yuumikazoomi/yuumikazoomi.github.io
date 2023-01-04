class Gameboard{
    constructor(xtilecount,ytilecount){
        this.tiles = new Array(xtilecount);
        for(let x = 0; x < xtilecount;++x){
            this.tiles[x] = new Array(ytilecount);
        }
        for(let x = 0; x < xtilecount;++x){
            let grid = document.querySelector('.grid');
            let row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('Y',x);
            for(let y = 0; y < ytilecount;++y){
                let cell = document.createElement('button');
                cell.classList.add('cell');
                cell.setAttribute('x',x);
                cell.setAttribute('y',y);
                row.appendChild(cell);
                this.tiles[x][y] = new Tile(x,y,cell);
            }
            grid.appendChild(row);
        }
    }
}