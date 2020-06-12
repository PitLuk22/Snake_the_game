document.addEventListener('DOMContentLoaded', function () {

    //Create field

    let field = document.createElement('div');
    field.classList.add('field');
    document.body.append(field);

    // Create cells

    function createCells(count) {
        for (let i = 0; i <= count; i++) {
            let cell = document.createElement('div');
            cell.classList.add('excel');
            field.append(cell);
        }
    }
    createCells(575);

    function setAtt() {
        let cells = document.querySelectorAll('.excel');

        let x = 1,
            y = 24;

        for (let i = 0; i < cells.length; i++) {
            if (x > 24) {
                x = 1;
                y--;
            }
            cells[i].setAttribute('posX', x);
            cells[i].setAttribute('posY', y);
            x++;

        }
    }
    setAtt();

    // Generate snake 

    function generateSnakeHead() {
        let posX = Math.round(Math.random() * (24 - 3) + 3); //мин = 3, чтобы не было ошибки с несуществующими ячейками
        let posY = Math.round(Math.random() * (24 - 1) + 1);
        return [posX, posY];
    }

    let coordinates = generateSnakeHead();
    let snakeBody = [
        document.querySelector(`[posX = '${coordinates[0]}'][posY = '${coordinates[1]}']`),
        document.querySelector(`[posX = '${coordinates[0] - 1}'][posY = '${coordinates[1]}']`),
        document.querySelector(`[posX = '${coordinates[0] - 2}'][posY = '${coordinates[1]}']`)
    ];

    for (let item of snakeBody) {
        item.classList.add('snake_body');
    }
    snakeBody[0].classList.add('snake_head');


    // Create apple

    let apple;

    function createApple() {
        function generateApple() {
            let posX = Math.round(Math.random() * (24 - 1) + 1);
            let posY = Math.round(Math.random() * (24 - 1) + 1);
            return [posX, posY];
        }
        let appleCoordinates = generateApple();

        apple = document.querySelector(`[posX = '${appleCoordinates[0]}'][posY = '${appleCoordinates[1]}']`);

        while (apple.classList.contains('snake_body')) {
            appleCoordinates = generateApple();
            apple = document.querySelector(`[posX = '${appleCoordinates[0]}'][posY = '${appleCoordinates[1]}']`);
        }
        apple.classList.add('apple');
        apple.style.transform = 'rotate(0deg)';

    }
    createApple();


    // Score

    let score = 0;
    let out = document.createElement('div');
    out.classList.add('out');
    field.append(out);
    out.textContent = score;
    let scoreTitle = document.createElement('div');
    scoreTitle.classList.add('scoreTitle');
    field.append(scoreTitle);
    scoreTitle.textContent = 'Score:';

    // Restart

    let restart = document.createElement('button');
    restart.classList.add('btn');
    field.append(restart);
    restart.textContent = 'restart';
    restart.addEventListener('click', function () {
        location.reload();
    });

    // Choose speed

    function createSpeed(speedItems) {
        let wrap = document.createElement('div');
        wrap.classList.add('wrap');
        field.append(wrap);
        let speedTitle = document.createElement('div');
        speedTitle.classList.add('speedTitle');
        wrap.append(speedTitle);
        speedTitle.textContent = 'Speed:';
        let count = 10;
        for (let i = 0; i < speedItems; i++) {
            let block = document.createElement('div');
            block.classList.add('speed');
            // block.setAttribute('value', `${i + 1}00`);
            block.textContent = `${count} km/h`;
            count += 30;
            wrap.append(block);
        }
        let velocity = document.querySelectorAll('.speed');
        velocity[0].setAttribute('value', 500);
        velocity[1].setAttribute('value', 350);
        velocity[2].setAttribute('value', 200);
        velocity[3].setAttribute('value', 100);
        velocity[4].setAttribute('value', 40);
    }
    createSpeed(5);






    // Move snake 

    let direction = 'right';
    let steps = false;

    function move() {
        let snakeHeadCoordinates = [+snakeBody[0].getAttribute('posX'), +snakeBody[0].getAttribute('posY')];
        snakeBody[0].classList.remove('snake_head');
        snakeBody[snakeBody.length - 1].classList.remove('snake_body');
        snakeBody.pop();

        if (direction == 'right') {
            if (snakeHeadCoordinates[0] < 24) {
                snakeBody.unshift(document.querySelector(`[posX = '${snakeHeadCoordinates[0] + 1}'][posY = '${snakeHeadCoordinates[1]}']`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = '1'][posY = '${snakeHeadCoordinates[1]}']`));
            }
            snakeBody[0].style.transform = 'rotate(0deg)';
        } else if (direction == 'left') {
            if (snakeHeadCoordinates[0] > 1) {
                snakeBody.unshift(document.querySelector(`[posX = '${snakeHeadCoordinates[0] - 1}'][posY = '${snakeHeadCoordinates[1]}']`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = '24'][posY = '${snakeHeadCoordinates[1]}']`));
            }
            snakeBody[0].style.transform = 'rotate(180deg)';
        } else if (direction == 'up') {
            if (snakeHeadCoordinates[1] < 24) {
                snakeBody.unshift(document.querySelector(`[posX = '${snakeHeadCoordinates[0]}'][posY = '${snakeHeadCoordinates[1] + 1}']`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = '${snakeHeadCoordinates[0]}'][posY = '1']`));
            }
            snakeBody[0].style.transform = 'rotate(-90deg)';
        } else if (direction == 'down') {
            if (snakeHeadCoordinates[1] > 1) {
                snakeBody.unshift(document.querySelector(`[posX = '${snakeHeadCoordinates[0]}'][posY = '${snakeHeadCoordinates[1] - 1}']`));
            } else {
                snakeBody.unshift(document.querySelector(`[posX = '${snakeHeadCoordinates[0]}'][posY = '24']`));
            }
            snakeBody[0].style.transform = 'rotate(90deg)';
        }

        // let cells = document.querySelectorAll('.excel');
        // cells.forEach(elem => {
        //     if (!elem.classList.contains('snake_body') && !elem.classList.contains('snake_head')) {
        //         elem.style.transform = 'rotate(0deg)';
        //     }
        // });

        // Увеличение змейки 
        if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') &&
            snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
            apple.classList.remove('apple');
            createApple();
            let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
            let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
            snakeBody.push(document.querySelector(`[posX = '${a}'][posY = '${b}']`));
            score++;
            out.textContent = score;
        }

        if (snakeBody[0].classList.contains('snake_body')) {
            clearInterval(interval);
            snakeBody[0].style.background = 'url(../img/snake_head_end.svg)';
            snakeBody[0].style.backgroundSize = 'cover';
            alert(`
            GAME OVER
            Your score: ${score}!
            `);

        }

        snakeBody[0].classList.add('snake_head');

        for (let item of snakeBody) {
            item.classList.add('snake_body');
        }

        // SPEED

        speedBlocks.forEach(elem => {
            elem.addEventListener('click', () => {
                for (let item of speedBlocks) {
                    item.classList.remove('active');
                }
                elem.classList.add('active');
                speed = +elem.getAttribute('value');
                clearInterval(interval);
                interval = setInterval(move, speed);
            });
        });


        steps = true;
    }

    let speedBlocks = document.querySelectorAll('.speed');
    speedBlocks[3].classList.add('active');
    let speed = 100;


    let interval = setInterval(move, speed);




    window.addEventListener('keydown', function (event) {
        if (steps == true) {
            if (event.keyCode == 38 && direction != 'down') {
                direction = 'up';
                steps = false;
            } else if (event.keyCode == 40 && direction != 'up') {
                direction = 'down';
                steps = false;
            } else if (event.keyCode == 37 && direction != 'right') {
                direction = 'left';
                steps = false;
            } else if (event.keyCode == 39 && direction != 'left') {
                direction = 'right';
                steps = false;
            }
        }

    });

});