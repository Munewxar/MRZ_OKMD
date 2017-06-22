/*
        Created on 22.06.2017 by Steven Altamirano
 */

google.charts.load('current', {packages: ['corechart', 'line']});


var operation_abs, operation_compare, operation_multiplication, operation_exponentation,
    operation_subtraction, operation_addition,
    matrixA = [], matrixB = [], matrixC = [], massiveE = [],
    p, m, q, N,
    arrKyN = [], arrEN = [], arrDN = [], arrKyR = [], arrER = [], arrDR = [];

var timeParFirstAdditive = 0, timeParSecondAdditive = 0;

function inputReading() {

    document.getElementById('MassageA').innerHTML = " ";
    document.getElementById('MassageB').innerHTML = " ";
    document.getElementById('MassageC').innerHTML = " ";
    document.getElementById('Massage').innerHTML = " ";

    document.getElementById('TableA').innerHTML = " ";
    document.getElementById('TableB').innerHTML = " ";
    document.getElementById('TableC').innerHTML = " ";

    p = document.getElementById('pElem').value;
    m = document.getElementById('mElem').value;
    q = document.getElementById('qElem').value;
    N = document.getElementById('N').value;
    timeReading();


    if (!p || !m || !q || !operation_abs || !operation_multiplication || !operation_compare || !operation_exponentation || !operation_subtraction || !N)
        alert("Одно или несколько полей пусты, либо сорержат только пробелы");
    else {
        var flag = false;

        if (p.match(/^\d+$/) || m.match(/^\d+$/) || q.match(/^\d+$/) || operation_abs.match(/^\d+$/) || N.match(/^\d+$/) || operation_compare.match(/^\d+$/)
            || operation_multiplication.match(/^\d+$/) || operation_subtraction.match(/^\d+$/) || operation_exponentation.match(/^\d+$/)) {
            p = +p;
            m = +m;
            q = +q;
            operation_abs = +operation_abs;
            operation_compare = +operation_compare;
            operation_multiplication = +operation_multiplication;
            operation_exponentation = +operation_exponentation;
            operation_subtraction = +operation_subtraction;
            operation_addition = +operation_addition;
            N = +N;

        } else
            flag = true;

        if (flag)
            alert("Поле может содержать только целые числа");
        else {
            flag = false;

            if (p <= 0 || m <= 0 || q <= 0 || operation_abs <= 0 || operation_compare <= 0 || operation_multiplication <= 0 || operation_exponentation <= 0 || operation_subtraction <= 0 || N <= 0)
                flag = true;

            if (flag)
                alert("Поля могут содержать только положительные числа");
            else {

                matrixA = generateMatrix(p, m);
                matrixB = generateMatrix(m, q);
                massiveE = generateMassive(m);
                matrixC = generateMatrix(p, q);

                taskCalculation();

                printMatrixA(p, m);
                printMatrixB(m, q);
                printMatrixE(m);
                printMatrixC(p, q);

                paintGraph();
            }
        }
    }

}

function timeReading() {
    operation_abs = document.getElementById('operation_abs').value;
    operation_addition = document.getElementById('operation_addition').value;
    operation_compare = document.getElementById('operation_compare').value;
    operation_multiplication = document.getElementById('operation_multiplication').value;
    operation_exponentation = document.getElementById('operation_exponentation').value;
    operation_subtraction = document.getElementById('operation_subtraction').value;

}

function taskCalculation() {

    findSum(N, m);

    writeMessage(timePosl, timePar, Ky, e, D);
}

function renewVariables(){
    amountAbs = 0;
    amountCompare = 0;
    amountMultiplication = 0;
    amountExponentation = 0;
    amountAddition = 0;
    amountSubtraction = 0;

    rangAbs = 0;
    rangCompare = 0;
    rangMultiplication = 0;
    rangExponentation = 0;
    rangAddition = 0;
    rangSubtraction = 0;
}

function renewVariablesForGr() {
    Ky = 0;
    Sum = 0;
    e = 0;
    D = 0;
    timePar = 0;
    timeParFirstAdditive = 0;
    timeParSecondAdditive = 0;
    timePosl = 0;
    Lavg = 0;
}

function findSum(processorElemAmount, taskRang){

    for (var i = 0, j = 0; i < p, j<q; i++, j++) {

            renewVariables();

            for (var k = 0; k < taskRang; k++) {
                amountAbs += 3;
                amountCompare++;
                rangAbs += 3;
                rangCompare += 2;

                if (Math.abs(Math.abs(matrixA[i][k]) - Math.abs(matrixB[k][j])) < massiveE[k]) {
                    d = matrixA[i][k] * matrixA[i][k];
                    amountExponentation++;
                    rangExponentation += 2;
                } else {
                    d = matrixA[i][k] * matrixA[i][k] * matrixB[k][j];
                    amountExponentation++;
                    amountMultiplication++;
                    rangExponentation += 2;
                    rangMultiplication += 2;
                }

                amountAddition++;
                rangAddition += 2;
                Sum += d;
            }

            matrixC[i][j] = Sum.toFixed(4);

            Sum = 0;

            timePosl += (amountAddition * operation_addition) + (amountCompare * operation_compare) +
                (amountMultiplication * operation_multiplication) + (amountAbs * operation_abs) + (amountExponentation * operation_exponentation) +
                (amountSubtraction * operation_subtraction);

            timeParFirstAdditive += Math.ceil((amountCompare / processorElemAmount) * operation_compare) +
                Math.ceil((amountSubtraction / processorElemAmount) * operation_subtraction) +
            Math.ceil((amountAbs / processorElemAmount) * operation_abs);

            timeParSecondAdditive += Math.ceil((amountCompare / processorElemAmount) * operation_compare) +
                Math.ceil((amountSubtraction / processorElemAmount) * operation_subtraction) +
                Math.ceil((amountAbs / processorElemAmount) * operation_abs) +
                Math.ceil((amountExponentation / processorElemAmount) * operation_exponentation) +
                Math.ceil((amountMultiplication / processorElemAmount) * operation_multiplication);

            timePar += timeParFirstAdditive + timeParSecondAdditive;

            Lavg += ((rangAddition * operation_addition) + (rangExponentation * operation_exponentation) + (rangMultiplication * operation_multiplication) +
            (rangCompare * operation_compare) + (rangAbs * operation_abs) + (rangSubtraction * operation_subtraction));
    }

    sumRang = taskRang*p*q;

    Ky = timePosl / timePar;
    e = Ky / processorElemAmount;
    D = (timePar * sumRang) / Lavg ;
}

function writeMessage(timePosl, timePar, Ky, e, Kr) {
    document.getElementById('Massage').innerHTML = "Время, затраченное при последовательном исчислении: " + timePosl +
        "<br> Время, затраченное при параллельном исчислении: " + timePar + "<br>Коэффициент ускорения: " + Ky +
        "<br>Эффективность: " + e + "<br>Коэффициент расхождения: " + Kr;

}

function generateMatrix(x, y) {

    var maxNumber = 1;
    var minNumber = -1;
    var matrix = [];

    for (var i = 0; i < x; i++) {
        matrix[i] = [];
        for (var j = 0; j < y; j++) {
            matrix[i][j] = (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(4);
        }
    }
    return matrix;
}

function generateMassive(x){
    var maxNumber = 1;
    var minNumber = -1;
    var matrix = [];

    for (var i = 0; i < x; i++) {
        matrix[i] = (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(4);
    }

    return matrix;
}

function printMatrixA(p, m) {

    document.getElementById('MassageA').innerHTML = "Матрица: A";
    for (var row = 0; row < p; row++) {
        document.getElementById('TableA').insertRow(-1);
        for (var column = 0; column < m; column++) {
            document.getElementById('TableA').rows[row].insertCell(-1);
            document.getElementById('TableA').rows[row].cells[column].innerText = matrixA[row][column];
        }
    }

}

function printMatrixB(m, q) {
    document.getElementById('MassageB').innerHTML = "Матрица: B";
    for (var row = 0; row < m; row++) {
        document.getElementById('TableB').insertRow(-1);
        for (var column = 0; column < q; column++) {
            document.getElementById('TableB').rows[row].insertCell(-1);
            document.getElementById('TableB').rows[row].cells[column].innerText = matrixB[row][column];
        }
    }

}

function printMatrixC(p, q) {
    document.getElementById('MassageC').innerHTML = "Матрица: C";
    for (var row = 0; row < p; row++) {
        document.getElementById('TableC').insertRow(-1);
        for (var column = 0; column < q; column++) {
            document.getElementById('TableC').rows[row].insertCell(-1);
            document.getElementById('TableC').rows[row].cells[column].innerText = matrixC[row][column];
        }
    }
}

function printMatrixE(m){

    document.getElementById('MassageE').innerHTML = "Матрица: E";

    document.getElementById('TableE').insertRow(-1);

    for (var column = 0; column < m; column++) {
        document.getElementById('TableE').rows[0].insertCell(-1);
        document.getElementById('TableE').rows[0].cells[column].innerText = massiveE[column];
    }
}

function paintGraph() {
    arrKyN = generateMatrix(N, m + 1);
    arrEN = generateMatrix(N, m + 1);
    arrDN = generateMatrix(N, m + 1);
    arrKyR = generateMatrix(m, N + 1);
    arrER = generateMatrix(m, N + 1);
    arrDR = generateMatrix(m, N + 1);

    graphN_Calculating();
    graphR_Calculating();

    google.charts.setOnLoadCallback(KyN);
    google.charts.setOnLoadCallback(EN);
    google.charts.setOnLoadCallback(DN);
    google.charts.setOnLoadCallback(KyR);
    google.charts.setOnLoadCallback(DR);
    google.charts.setOnLoadCallback(ER);
}

var timePar = 0, timePosl = 0;
var d, Sum = 0, Ky = 0, e = 0, D = 0;
var amountAbs = 0, amountCompare = 0, amountMultiplication = 0, amountAddition = 0, amountDivision = 0,
    amountSubtraction = 0, amountExponentation = 0;
var rangAbs = 0, rangCompare = 0, rangMultiplication = 0, rangAddition = 0, rangDivision = 0,
    rangExponentation = 0, rangSubtraction = 0;
var Lavg = 0;

function graphR_Calculating() {
    for (var r = 1; r <= m; r++) {
        for (var n = 1; n <= N; n++) {

            renewVariablesForGr();
            findSum(n, r);

            arrKyR[r - 1][n] = Ky;
            arrER[r - 1][n] = e;
            arrDR[r - 1][n] = D;

        }
        arrKyR[r - 1][0] = r;
        arrER[r - 1][0] = r;
        arrDR[r - 1][0] = r;

    }
}

function graphN_Calculating() {
    for (var n = 1; n <= N; n++) {
        for (var r = 1; r <= m; r++) {

            renewVariablesForGr();
            findSum(n, r);

            arrKyN[n - 1][r] = Ky;
            arrEN[n - 1][r] = e;
            arrDN[n - 1][r] = D;
        }
        arrKyN[n - 1][0] = n;
        arrDN[n - 1][0] = n;
        arrEN[n - 1][0] = n;
    }
}

function KyR() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'r');

    for (var i = 1; i <= N; i++) {
        data.addColumn('number', 'n = ' + i);
    }

    data.addRows(arrKyR);

    var options = {
        hAxis: {
            title: 'r'
        },
        vAxis: {
            title: 'Ky(r,n)'
        },
        height: 650
    };

    var chart = new google.visualization.LineChart(document.getElementById('KyR'));
    chart.draw(data, options);
}

function ER() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'r');

    for (var i = 1; i <= N; i++) {
        data.addColumn('number', 'n = ' + i);
    }

    data.addRows(arrER);

    var options = {
        hAxis: {
            title: 'r'
        },
        vAxis: {
            title: 'e(r,n)'
        },
        height: 650
    };

    var chart = new google.visualization.LineChart(document.getElementById('ER'));
    chart.draw(data, options);
}

function DR() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'r');

    for (var i = 1; i <= N; i++) {
        data.addColumn('number', 'n = ' + i);
    }

    data.addRows(arrDR);

    var options = {
        hAxis: {
            title: 'r'
        },
        vAxis: {
            title: 'D(r,n)'
        },
        height: 650
    };

    var chart = new google.visualization.LineChart(document.getElementById('DR'));
    chart.draw(data, options);
}

function KyN() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'n');

    for (var i = 1; i <= m; i++) {
        data.addColumn('number', 'r = ' + i);
    }

    data.addRows(arrKyN);

    var options = {
        hAxis: {
            title: 'n'
        },
        vAxis: {
            title: 'Ky(n,r)'
        },
        height: 650
    };

    var chart = new google.visualization.LineChart(document.getElementById('KyN'));
    chart.draw(data, options);
}

function EN() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'n');

    for (var i = 1; i <= m; i++) {
        data.addColumn('number', 'r = ' + i);
    }

    data.addRows(arrEN);

    var options = {
        hAxis: {
            title: 'n'
        },
        vAxis: {
            title: 'e(n,r)'
        },
        height: 650
    };

    var chart = new google.visualization.LineChart(document.getElementById('EN'));
    chart.draw(data, options);
}

function DN() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'n');

    for (var i = 1; i <= m; i++) {
        data.addColumn('number', 'r = ' + i);
    }

    data.addRows(arrDN);

    var options = {
        hAxis: {
            title: 'n'
        },
        vAxis: {
            title: 'D(n,r)'
        },
        height: 650
    };

    var chart = new google.visualization.LineChart(document.getElementById('DN'));
    chart.draw(data, options);
}
